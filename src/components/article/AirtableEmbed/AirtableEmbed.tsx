import React, { FC } from 'react'
import { AnchorButton, FaFileDownloadIcon } from 'smarthr-ui'
import styled from 'styled-components'

type Props = {
  children: React.ReactNode
  tableName: string
}

export const AirtableEmbed: FC<Props> = ({ children, tableName }) => {
  return (
    <>
      {children}
      <ButtonWrapper>
        <AnchorButton href={`/csv/${tableName}.csv`} prefix={<FaFileDownloadIcon alt="" />} variant="primary" size="s">
          Download CSV
        </AnchorButton>
      </ButtonWrapper>
    </>
  )
}

const ButtonWrapper = styled.div`
  text-align: right;
`
