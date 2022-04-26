const React = require('react')
import { LoginContextProvider } from './src/context/LoginContext'
import { SidebarScrollContextProvider } from './src/context/SidebarScrollContext'

/* eslint react/jsx-filename-extension: 0 */
export const wrapPageElement = ({ element, props }) => {
  return (
    <LoginContextProvider {...props}>
      <SidebarScrollContextProvider {...props}>{element}</SidebarScrollContextProvider>
    </LoginContextProvider>
  )
}
