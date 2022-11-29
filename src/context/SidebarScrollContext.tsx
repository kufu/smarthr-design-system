import React, { FC, ReactNode, createContext, useContext, useState } from 'react'

type Props = {
  children?: ReactNode
}
type SidebarScrollStatus = {
  position: number
  savePosition: (newPosition: number) => void
}

export const SidebarScrollContext = createContext<SidebarScrollStatus>({
  position: 0,
  savePosition: () => {
    return
  },
})

export const SidebarScrollContextProvider: FC<Props> = ({ children }) => {
  const state = useContext(SidebarScrollContext)
  const [position, setPosition] = useState<number>(state.position)

  const savePosition = (newPosition: number) => {
    setPosition(newPosition)
  }

  const value = { position, savePosition }

  return <SidebarScrollContext.Provider value={value}>{children}</SidebarScrollContext.Provider>
}
