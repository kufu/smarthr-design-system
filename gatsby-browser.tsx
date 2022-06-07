import React from 'react'
import { GatsbyBrowser } from 'gatsby'
import { LoginContextProvider } from '@Context/LoginContext'
import { SidebarScrollContextProvider } from '@Context/SidebarScrollContext'

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({ element, props }) => {
  return (
    <LoginContextProvider {...props}>
      <SidebarScrollContextProvider {...props}>{element}</SidebarScrollContextProvider>
    </LoginContextProvider>
  )
}
