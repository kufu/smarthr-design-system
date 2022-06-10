import React from 'react'

import { ComponentMeta } from '@storybook/react'
import { SelectCompanyAccount as StoryComponent } from './SelectCompanyAccount'

export const SelectCompanyAccount = () => {
  return <StoryComponent />
}

export default {
  title: 'SelectCompanyAccount',
  component: SelectCompanyAccount,
} as ComponentMeta<typeof SelectCompanyAccount>
