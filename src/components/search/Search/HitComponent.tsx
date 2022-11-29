import { Link as LinkComponent } from 'gatsby'
import React, { FC } from 'react'
import styled from 'styled-components'

interface Categories {
  concept: string
  foundation: string
  basics: string
  products: string
  accessibility: string
  communication: string
  'operational-guideline': string
}

const categories = {
  concept: 'コンセプト',
  foundation: '基本原則',
  basics: '基本要素',
  products: 'プロダクト',
  accessibility: 'アクセシビリティ',
  communication: 'コミュニケーション',
  'operational-guideline': '運用ガイドライン',
} as Categories

export const HitComponent: FC = (props: any) => {
  const categoryKey: keyof Categories = props.hit.category

  return (
    <Wrapper>
      <LinkComponent to={`/${props.hit.path}`}>
        {props.hit.title}&nbsp;{categories[categoryKey] ? `|${'\u00A0'}${categories[categoryKey]}` : ''}
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
