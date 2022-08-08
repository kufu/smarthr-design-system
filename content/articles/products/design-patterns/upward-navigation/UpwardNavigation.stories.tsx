import React from 'react'

import { Header } from 'smarthr-ui'

import { ComponentMeta } from '@storybook/react'
import { UpwardNavigation as StoryComponent } from './UpwardNavigation'

export const UpwardNavigation = () => {
  return <StoryComponent />
}

export default {
  title: 'UpwardNavigation',
  component: UpwardNavigation,
  decorators: [
    (Story) => (
      <>
        <Header />
        <div style={{ padding: '1rem' }}>
          <Story />
        </div>
      </>
    ),
  ],
} as ComponentMeta<typeof UpwardNavigation>
