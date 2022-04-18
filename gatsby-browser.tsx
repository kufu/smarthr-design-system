import React from 'react'
import { GatsbyBrowser } from 'gatsby'
import { LoginContextProvider } from './src/context/LoginContext'
import { SidebarScrollContextProvider } from './src/context/SidebarScrollContext'

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({ element, props }) => {
  return (
    <LoginContextProvider {...props}>
      <SidebarScrollContextProvider {...props}>{element}</SidebarScrollContextProvider>
    </LoginContextProvider>
  )
}
