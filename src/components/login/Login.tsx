import { PRIVATE_DOC_PATH } from '@Constants/application'
import { CSS_COLOR, CSS_FONT_SIZE, CSS_SIZE } from '@Constants/style'
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
      <MaintenanceText>現在ログインできません。システム復旧中です。</MaintenanceText>
      <p>限定コンテンツを利用したい場合、次の2つの方法で利用できます。（社内限定）</p>
      <ul>
        <li>
          <p>
            社内Slack<code>#design_system_相談</code>で利用したい限定コンテンツを伝える
          </p>
        </li>
        <li>
          <p>
            GitHubリポジトリを確認する（
            <a href="https://github.com/kufu/smarthr-design-system-private" target="_blank" rel="noreferrer">
              https://github.com/kufu/smarthr-design-system-private
            </a>
            ）
          </p>
        </li>
      </ul>
      <p>
        そのほか相談、問い合わせ先
        <br />
        社内Slack<code>#design_system_相談</code>
      </p>
      <div className="inputs">
        <Input
          type="password"
          prefix={<FaLockIcon />}
          width="100%"
          onChange={(e) => setPassword(e.currentTarget.value)}
          value={password}
          name="password"
          disabled={true}
        />

        <Button
          variant="primary"
          wide={true}
          onClick={() => login(password, () => setPassword(''), setErrMessage, updateLoginStatus)}
          disabled={true}
        >
          ログイン
        </Button>

        {errMessage !== '' && <span className="warn">{errMessage}</span>}
      </div>
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

const MaintenanceText = styled.p``

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

  & ${MaintenanceText} {
    color: ${CSS_COLOR.DANGER};
  }

  & p {
    padding: 0;
    margin: 0;
    color: ${CSS_COLOR.TEXT_BLACK};
    line-height: 1.6;
    & code {
      padding: 0.125rem 0.25rem;
      border-radius: 4px;
      background-color: ${CSS_COLOR.LIGHT_GREY_2};
      font-size: ${CSS_FONT_SIZE.PX_14};
      vertical-align: 0.05rem;
      margin: 0.125rem;
    }
  }
`
