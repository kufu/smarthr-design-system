import React from 'react'
import { FaArrowLeftIcon, Heading, Stack, Text, TextLink } from 'smarthr-ui'
import styled, { css } from 'styled-components'

export const UpwardNavigation = () => (
  <Wrapper>
    <UpwardLink>
      <TextLink href="#" prefix={<FaArrowLeftIcon />}>
        分析レポートに戻る
      </TextLink>
    </UpwardLink>
    <Stack>
      <Heading>分析対象の従業員項目</Heading>
      <Text as="p">
        一部の数値データにおいて、クロス集計する際の集計単位を変更できます例えば「年齢」を「60」以上をまとめる、「20」以下をまとめる、「10」単位でまとめるのように設定すると、以下のように出力されます。
      </Text>
    </Stack>
  </Wrapper>
)

const Wrapper = styled(Stack).attrs({ gap: 1.5 })`
  ${({ theme: { space } }) => css`
    padding-block: ${space(2)};
  `}
`
const UpwardLink = styled.div`
  ${({ theme: { leading, space } }) => css`
    /* アイコン(1)とその間隔（0.25）分をずらしている */
    transform: translateX(${space(-1.25)});
    /* Stack の margin を上書くために詳細度を上げる
     * https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity */
    &&& {
      /* UpwardLink がない場合にレイアウトが崩れないように negative margin で制御 */
      margin-block-start: ${space(-1)};
    }
    line-height: ${leading.NONE};

    @media (max-width: 480px) {
      transform: revert;
    }
  `}
`
