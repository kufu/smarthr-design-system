import { CSS_COLOR, CSS_FONT_SIZE } from '@Constants/style'
import { graphql, useStaticQuery } from 'gatsby'
import React, { FC, useCallback } from 'react'
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
          numberOfStories
        }
      }
    }
  }
`

// 一覧表示するサムネイル用画像は、`ts-node ./scripts/component-thumbnails/componentThumbnails.ts`を実行して生成します
export const ComponentCaptures: FC = () => {
  const { allComponentCapture } = useStaticQuery<Queries.ComponentCaptureDataQuery>(query)
  const convertKebab = useCallback((target: string) => {
    return target
      .replace(/[^a-zA-Z0-9-]/g, '') // 全角文字などの半角英数字以外を除去
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
      .toLowerCase()
  }, [])

  return (
    <Wrapper>
      {allComponentCapture.nodes.map((node) => (
        <ComponentGroup key={node.groupName}>
          <h2>{node.groupName}</h2>
          <ComponentList>
            {node.storyKinds.map((storyKind) => {
              return storyKind.iframeUrl ? (
                <li key={storyKind.iframeUrl}>
                  <a href={convertKebab(storyKind.displayName)}>
                    <div>
                      <img
                        width={300}
                        height={200}
                        src={`/thumbnails/component-stories/${storyKind.thumbnailFileName}`}
                        alt={storyKind.displayName}
                      />
                    </div>
                    <p>{storyKind.displayName}</p>
                  </a>
                </li>
              ) : null
            })}
          </ComponentList>
        </ComponentGroup>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div``
const ComponentGroup = styled.div`
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
