import { CSS_COLOR, CSS_FONT_SIZE } from '@Constants/style'
import { graphql, useStaticQuery } from 'gatsby'
import React, { FC } from 'react'
import { Section } from 'smarthr-ui'
import styled from 'styled-components'

const query = graphql`
  query ComponentCaptureData {
    allComponentCapture {
      nodes {
        id
        groupName
        storyKinds {
          kindName
          iframeUrl
          thumbnailFileName
          displayName
          componentPath
          numberOfStories
        }
      }
    }
  }
`

// 一覧表示するサムネイル用画像は、`ts-node ./scripts/component-thumbnails/componentThumbnails.ts`を実行して生成します
export const ComponentCaptures: FC = () => {
  const { allComponentCapture } = useStaticQuery<Queries.ComponentCaptureDataQuery>(query)
  return (
    <Wrapper>
      {allComponentCapture.nodes.map((node) => (
        <ComponentGroupSection key={node.groupName}>
          <h2 id={`component-${node.groupName}`}>{node.groupName}</h2>
          <ComponentList>
            {node.storyKinds.map((storyKind) => storyKind.iframeUrl ? (
                <li key={storyKind.iframeUrl}>
                  <a href={`/products/components/${storyKind.componentPath}/`}>
                    <div>
                      {/* この画像はリンクテキストと同等の内容なので、altは空が適切 */}
                      {/* eslint-disable-next-line smarthr/a11y-image-has-alt-attribute */}
                      <img width={300} height={200} src={`/thumbnails/component-stories/${storyKind.thumbnailFileName}`} alt="" />
                    </div>
                    <p>{storyKind.displayName}</p>
                  </a>
                </li>
              ) : null)}
          </ComponentList>
        </ComponentGroupSection>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div``
const ComponentGroupSection = styled(Section)`
  && {
    > h2 {
      margin-top: 64px;
      font-size: ${CSS_FONT_SIZE.PX_20};
    }
  }
`
const ComponentList = styled.ul`
  && {
    display: flex;
    flex-wrap: wrap;
    gap: 16px 8px;
    list-style: none;
    margin-block-start: 16px;
    padding: 0;

    img {
      display: block;
    }

    div {
      margin: 0;
      padding: 0;
      border: 1px solid ${CSS_COLOR.SEMANTICS_BORDER};
    }

    p {
      margin-block-start: 0;
    }
  }
`
