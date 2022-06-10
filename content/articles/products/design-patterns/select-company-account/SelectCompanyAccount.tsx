import React, { useState } from 'react'
import { Base, Button, Heading, RadioButton, Stack } from 'smarthr-ui'
import styled, { css } from 'styled-components'

const companyList = [
  { id: 0, name: '株式会社スマートエイチアール' },
  { id: 1, name: '株式会社スマートエイチアール1' },
  { id: 2, name: '株式会社スマートエイチアール2' },
  { id: 3, name: '株式会社スマートエイチアール3' },
] as const

export const SelectCompanyAccount = () => {
  const [selectedId, setSelectedId] = useState<number>(0)

  return (
    <Wrapper>
      <Heading type="sectionTitle">&#x7B;機能名&#x7D;を利用する企業アカウントを選択してください。</Heading>
      <CompanyList>
        {companyList.map(({ id, name }) => (
          <li key={id}>
            <CompanyItem onClick={() => setSelectedId(id)}>
              <RadioButton name="companyAccount" checked={id === selectedId}>
                {name}
              </RadioButton>
            </CompanyItem>
          </li>
        ))}
      </CompanyList>
      <div>
        <SubmitButton>次へ</SubmitButton>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled(Stack).attrs({ gap: 1.5 })`
  ${({ theme: { space } }) => css`
    padding-block: ${space(3)};
  `}
`
const CompanyList = styled(Stack).attrs({ as: 'ul' })``
const CompanyItem = styled(Base)`
  ${({ theme: { leading, shadow, space } }) => css`
    cursor: pointer;
    padding: ${space(1)};
    line-height: ${leading.NONE};

    :focus-within {
      ${shadow.focusIndicatorStyles}
    }

    .smarthr-ui-RadioButton-radioButton:focus + span {
      box-shadow: revert;
    }

    .smarthr-ui-RadioButton-label {
      /* 視覚的な調整 */
      margin-inline-start: ${space(0.75)};
    }
  `}
`
const SubmitButton = styled(Button).attrs({ variant: 'primary' })`
  padding-inline: 3em;
`
