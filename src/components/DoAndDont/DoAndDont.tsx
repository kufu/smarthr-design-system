import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { FaCheckCircleIcon, FaTimesCircleIcon, defaultColor, defaultSpacing } from 'smarthr-ui'

type Props = {
  type: 'do' | 'dont'
  img: React.ReactNode
  label: React.ReactNode
}

export const DoAndDont: FC<Props> = ({ type, img, label }) => {
  return (
    <Wrapper>
      <ImageArea>{img}</ImageArea>
      <LabelArea $type={type}>
        <Status $type={type}>
          {type === 'do' ? (
            <>
              <FaCheckCircleIcon className="icon" />
              Do
            </>
          ) : (
            <>
              <FaTimesCircleIcon className="icon" />
              Don&apos;t
            </>
          )}
        </Status>
        {label}
      </LabelArea>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-block: 16px 0;
`

const ImageArea = styled.div`
  img {
    vertical-align: top;
  }
`

const Status = styled.div<{ $type: 'do' | 'dont' }>`
  ${({ $type }) => {
    return css`
      display: flex;
      align-items: center;
      font-weight: bold;

      > .icon {
        color: ${$type === 'do' ? defaultColor.MAIN : defaultColor.DANGER};
        margin-right: ${defaultSpacing.XXS};
      }
    `
  }}
`

const LabelArea = styled.div<{ $type: 'do' | 'dont' }>`
  ${({ $type }) => {
    return css`
      background-color: ${defaultColor.BACKGROUND};
      padding: ${defaultSpacing.XS};
      border-top: ${defaultSpacing.XXS} solid ${$type === 'do' ? defaultColor.MAIN : defaultColor.DANGER};
    `
  }}
`
