import { CSS_COLOR, CSS_FONT_SIZE, CSS_SIZE } from '@Constants/style'
import { LoginContext, LoginStatusKey } from '@Context/LoginContext'
import React, { FC, useContext, useState } from 'react'
import { Button, FaLockIcon, Input } from 'smarthr-ui'
import styled from 'styled-components'

export const LoginPage: FC = () => {
  const [password, setPassword] = useState('')
  const [errMessage, setErrMessage] = useState('')

  const { updateLoginStatus } = useContext(LoginContext)

  return (
    <Wrapper>
      <h1>限定コンテンツログイン</h1>
      <p>SmartHR社従業員・制作パートナーが社内限定のリソースを閲覧・ダウンロードする場合は、ログインしてください。</p>
      <div className="inputs">
        <Input
          type="password"
          prefix={<FaLockIcon />}
          width="100%"
          onChange={(e) => setPassword(e.currentTarget.value)}
          value={password}
          name="password"
        />

        <Button
          variant="primary"
          wide={true}
          onClick={() => login(password, () => setPassword(''), setErrMessage, updateLoginStatus)}
        >
          ログイン
        </Button>

        {errMessage !== '' && <span className="warn">{errMessage}</span>}

        <span className="note">パスワードは1Password、または社内Slack bot「SDSパスワード」から確認できます。</span>
      </div>
    </Wrapper>
  )
}

type Login = (
  password: string,
  clearInput: () => void,
  setErrMessage: (message: string) => void,
  updateLoginStatus: (newStatus: LoginStatusKey) => void,
) => Promise<void>
const login: Login = async (password, clearInput, setErrMessage, updateLoginStatus) => {
  const formDataString = `password=${password}`

  clearInput()
  setErrMessage('')

  const res = await fetch('/private', {
    method: 'POST',
    body: formDataString,
    redirect: 'manual',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
  })

  // ログインが成功し、Cookieが発行され、リダイレクトされる場合、statusは0になる。
  // https://fetch.spec.whatwg.org/#concept-filtered-response-opaque-redirect

  if (res.status === 0) {
    // ログインに成功したら前のページに戻る
    updateLoginStatus('loggedIn')
    history.back()
    return

    // ログイン済みだとPOSTではコンテンツがとれないので404になる。
  } else if (res.status === 404) {
    updateLoginStatus('loggedIn')
    setErrMessage('ログイン済みです。')
    return

    // パスワードが違うとパスワード画面が401で返される
  } else if (res.status === 401) {
    updateLoginStatus('loggedOut')
    setErrMessage('ログインに失敗しました')
    return

    // ここにたどり着くことはないはず
  } else {
    process.env.NODE_ENV === 'development' && console.log(res.status)
    return
  }
}

const Wrapper = styled.div`
  box-sizing: border-box;
  max-width: 480px;
  border: 1px solid ${CSS_COLOR.LIGHT_GREY_1};
  margin-inline: auto;
  padding: 48px 72px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (width <= ${CSS_SIZE.BREAKPOINT_MOBILE_2}) {
    padding: 1rem;
  }

  .inputs {
    color: white;
    margin-top: 16px;
    display: flex;
    gap: 1rem;
    flex-direction: column;

    .warn {
      color: ${CSS_COLOR.DANGER};
    }
  }

  & h1 {
    padding: 0;
    margin: 0;
    text-align: center;
  }

  & p {
    padding: 0;
    margin: 0;
    color: ${CSS_COLOR.TEXT_BLACK};
    line-height: 1.6;
  }

  .note {
    font-size: ${CSS_FONT_SIZE.PX_12};
    line-height: 1.6;
    color: ${CSS_COLOR.TEXT_GREY};
  }
`
