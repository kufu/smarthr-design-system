import { PRIVATE_DOC_PATH } from '@Constants/application'
import React, { FC, ReactNode, createContext, useContext, useState } from 'react'

export type LoginStatusKey = 'pending' | 'loggedIn' | 'loggedOut'
type Props = {
  children?: ReactNode
}
type LoginStatus = {
  loginStatus: LoginStatusKey
  loginLabel: string
  updateLoginStatus: (newStatus: LoginStatusKey) => void
}

export const LoginContext = createContext<LoginStatus>({
  loginStatus: 'pending',
  loginLabel: '',
  updateLoginStatus: () => {
    return
  },
})

export const LoginContextProvider: FC<Props> = ({ children }) => {
  const state = useContext(LoginContext)
  const [loginStatus, setLoginStatus] = useState<LoginStatusKey>(state.loginStatus)
  const labels: { [key in LoginStatusKey]: string } = {
    pending: '',
    loggedIn: 'ログイン中',
    loggedOut: '従業員向けログイン',
  }

  const fetchPrivateContent = (): void => {
    // Chromeで、history.back()後のfetchが失敗する現象が起こるため、setTimeout()からタスクに追加してバグを回避する。
    // https://bugs.chromium.org/p/chromium/issues/detail?id=1244230
    setTimeout(() => {
      fetch(PRIVATE_DOC_PATH).then(
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

  const updateLoginStatus = (newStatus: LoginStatusKey) => {
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

  const value = { loginStatus, loginLabel: labels[loginStatus], updateLoginStatus }

  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
}
