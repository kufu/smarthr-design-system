import { PRIVATE_DOC_PATH } from '@Constants/application'
import React, { FC, ReactNode, createContext, useContext, useState } from 'react'

export type LoginStatusKey = 'pending' | 'loggedIn' | 'loggedOut'
type Props = {
  children?: ReactNode
}
type LoginStatus = {
  loginStatus: LoginStatusKey
  loginLabel: string
  password: string
  updateLoginStatus: (newStatus: LoginStatusKey, newPassword: string) => void
}

export const LoginContext = createContext<LoginStatus>({
  loginStatus: 'pending',
  loginLabel: '',
  password: '',
  updateLoginStatus: () => undefined,
})

export const LoginContextProvider: FC<Props> = ({ children }) => {
  const state = useContext(LoginContext)
  const [loginStatus, setLoginStatus] = useState<LoginStatusKey>(state.loginStatus)
  const [password, setPassword] = useState<string>('')
  const labels: { [key in LoginStatusKey]: string } = {
    pending: '',
    loggedIn: 'ログイン中',
    loggedOut: 'ログイン',
  }

  const fetchPrivateContent = (): void => {
    // Chromeで、history.back()後のfetchが失敗する現象が起こるため、setTimeout()からタスクに追加してバグを回避する。
    // https://bugs.chromium.org/p/chromium/issues/detail?id=1244230
    setTimeout(() => {
      fetch(PRIVATE_DOC_PATH, {
        method: 'HEAD',
        headers: {
          'Sds-Private-Auth': password,
        },
      }).then(
        (res) => {
          if (res.status === 200) {
            setLoginStatus('loggedIn')
          } else {
            setLoginStatus('loggedOut')
          }
        },
        () => {
          setLoginStatus('loggedOut')
        },
      )
    }, 100)
  }

  const updateLoginStatus = (newStatus: LoginStatusKey, newPassword: string) => {
    if (newPassword) setPassword(newPassword)
    setLoginStatus(newStatus)
  }

  if (loginStatus === 'pending') {
    fetchPrivateContent()
  }

  // ログイン後は`history.back()`で元のページに戻るが、Safariでキャッシュされた古い内容が表示されることがあるため、状態を更新する。
  if (typeof window !== 'undefined') {
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) {
        fetchPrivateContent()
      }
    })
  }

  const value = { loginStatus, loginLabel: labels[loginStatus], password, updateLoginStatus }

  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
}
