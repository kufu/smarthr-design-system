import { CSS_COLOR, CSS_FONT_SIZE } from '@Constants/style'
import { graphql, useStaticQuery } from 'gatsby'
import React, { FC, useCallback } from 'react'
import styled from 'styled-components'

const THUMBNAIL_SIZE = '200'

const query = graphql`
  query ComponentCaptureData {
    allComponentCapture {
      nodes {
        id
        groupName
        storyKinds {
          kindName
          iframeUrl
          displayName
          numberOfStories
        }
      }
    }
  }
`

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
                  <div>
                    <iframe
                      width={THUMBNAIL_SIZE}
                      height={THUMBNAIL_SIZE}
                      title={storyKind.displayName}
                      src={storyKind.iframeUrl}
                    />
                  </div>
                  <a href={convertKebab(storyKind.displayName)}>{storyKind.displayName}</a>
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
      margin-top: 32px;
      font-size: ${CSS_FONT_SIZE.PX_20};
    }
  }
`
const ComponentList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 16px 8px;
  list-style: none;
  margin: 16px 0 0;
  padding: 0;

  li {
    width: ${THUMBNAIL_SIZE}px;
  }

  iframe {
    border: 1px solid ${CSS_COLOR.SEMANTICS_BORDER};
  }
`
