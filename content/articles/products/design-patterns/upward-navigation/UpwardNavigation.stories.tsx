import React from 'react'

import { Header } from 'smarthr-ui'

import { ComponentMeta } from '@storybook/react'
// @ts-ignore
import { UpwardNavigation as StoryComponent } from 'smarthr-patterns/src/patterns/UpwardNavigation/UpwardNavigation'

export const UpwardNavigation = () => {
  return <StoryComponent withUpwardLink={true} withAppNavi={false} />
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
