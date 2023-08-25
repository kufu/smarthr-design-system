import { PRIVATE_DOC_PATH } from '@Constants/application'
import { CSS_COLOR, CSS_SIZE } from '@Constants/style'
import { LoginContext, LoginStatusKey } from '@Context/LoginContext'
import { navigate } from 'gatsby'
import React, { FC, useContext, useState } from 'react'
import { Button, FaLockIcon, Input } from 'smarthr-ui'
import styled from 'styled-components'

export const LoginPage: FC = () => {
  const [password, setPassword] = useState('')
  const [errMessage, setErrMessage] = useState('')

  const { updateLoginStatus } = useContext(LoginContext)

  return (
    <Wrapper>
      <h1>従業員ログイン</h1>
      <p>ログインすると限定コンテンツにアクセスできます。パスワードの確認方法は2つあります。</p>
      <ul>
        <li>
          <p>SmartHR社の1Passwordを利用する</p>
        </li>
        <li>
          <p>SmartHR社のSlackに「SDSパスワード」と入力する（自動レスポンスがあります）</p>
        </li>
      </ul>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          login(password, () => setPassword(''), setErrMessage, updateLoginStatus)
        }}
      >
        <div className="inputs">
          <Input
            type="password"
            prefix={<FaLockIcon />}
            width="100%"
            onChange={(e) => setPassword(e.currentTarget.value)}
            value={password}
            name="password"
          />

          <Button variant="primary" wide={true}>
            ログイン
          </Button>

          {errMessage !== '' && <span className="warn">{errMessage}</span>}
        </div>
      </form>
    </Wrapper>
  )
}

type Login = (
  password: string,
  clearInput: () => void,
  setErrMessage: (message: string) => void,
  updateLoginStatus: (newStatus: LoginStatusKey, newPassword: string) => void,
) => Promise<void>
const login: Login = async (password, clearInput, setErrMessage, updateLoginStatus) => {
  clearInput()
  setErrMessage('')

  const res = await fetch(PRIVATE_DOC_PATH, {
    method: 'HEAD',
    redirect: 'manual',
    headers: {
      'Sds-Private-Auth': password,
    },
  })

  if (res.status === 200) {
    // ログインに成功したらパスワードを保存し前のページに戻る
    updateLoginStatus('loggedIn', password)
    let prevPath = '/'
    try {
      const previousUrl = new URL(document.referrer)
      if (previousUrl.hostname === window.location.hostname) {
        prevPath = previousUrl.pathname
      }
    } catch (error) {
      // 前のページがない場合はトップに戻る
    }
    navigate(prevPath) // history.back()だとcontextが失われるのでnavigateを使う
    return

    // パスワードが違うと401が返る
  } else if (res.status === 401) {
    updateLoginStatus('loggedOut', '')
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

  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_2}) {
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
`
