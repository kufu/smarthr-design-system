import React, { FC } from 'react'
import { FaCircleCheckIcon, FaCircleXmarkIcon, defaultBreakpoint, defaultColor, defaultSpacing } from 'smarthr-ui'
import styled, { css } from 'styled-components'

type Props = {
  type: 'do' | 'dont'
  img: React.ReactNode
  label: React.ReactNode
  width?: string | number
}

export const DoAndDont: FC<Props> = ({ type, img, label, width }) => {
  const actualWidth = typeof width === 'number' ? `${width}px` : width

  return (
    <Wrapper $width={actualWidth ? actualWidth : undefined}>
      <ImageArea>{img}</ImageArea>
      <LabelArea $type={type}>
        <Status $type={type}>
          {type === 'do' ? (
            <>
              <FaCircleCheckIcon className="icon" />
              Do
            </>
          ) : (
            <>
              <FaCircleXmarkIcon className="icon" />
              Don&apos;t
            </>
          )}
        </Status>
        {label}
      </LabelArea>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ $width: string | undefined }>`
  ${({ $width }) => css`
    margin-block: 24px 0;
    width: ${$width !== undefined ? $width : 'auto'};

    @media (max-width: ${defaultBreakpoint.SP}px) {
      min-width: 100%;
    }
  `}
`

const ImageArea = styled.div`
  img {
    vertical-align: top;
  }
`

const Status = styled.div<{ $type: 'do' | 'dont' }>`
  ${({ $type }) => css`
    display: flex;
    align-items: center;
    font-weight: bold;

    > .icon {
      color: ${$type === 'do' ? defaultColor.MAIN : defaultColor.DANGER};
      margin-right: ${defaultSpacing.XXS};
    }
  `}
`

const LabelArea = styled.div<{ $type: 'do' | 'dont' }>`
  ${({ $type }) => css`
    background-color: ${defaultColor.BACKGROUND};
    padding: ${defaultSpacing.XS};
    border-top: ${defaultSpacing.XXS} solid ${$type === 'do' ? defaultColor.MAIN : defaultColor.DANGER};
  `}
`
