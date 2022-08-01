import React, { FC } from 'react'
import { Link as LinkComponent } from 'gatsby'
import styled from 'styled-components'

interface Categories {
  about: string
  foundations: string
  products: string
  marketing: string
  employees: string
}

const categories = {
  about: '概要',
  foundations: '基本原則',
  products: 'プロダクト',
  marketing: 'マーケティング',
  employees: '従業員向け',
} as Categories

export const HitComponent: FC = (props: any) => {
  const categoryKey: keyof Categories = props.hit.category

  return (
    <Wrapper>
      <LinkComponent to={`/${props.hit.path}`}>
        {props.hit.title}&nbsp;|&nbsp;{categories[categoryKey]}
      </LinkComponent>
      {props.hit.description && <StyledParagraph>{props.hit.description}</StyledParagraph>}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 0 0 16px;
`

const StyledParagraph = styled.p`
  font-size: 0.9rem;
  margin: 0;
`
