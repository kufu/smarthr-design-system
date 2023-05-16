import { CSS_COLOR, CSS_FONT_SIZE } from '@Constants/style'
import { graphql, useStaticQuery } from 'gatsby'
import React, { FC } from 'react'
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
          displayName
          numberOfStories
        }
      }
    }
  }
`

export const ComponentCaptures: FC = () => {
  const { allComponentCapture } = useStaticQuery<Queries.ComponentCaptureDataQuery>(query)

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
                    <iframe title={storyKind.displayName} src={storyKind.iframeUrl} />
                  </div>
                  <span>{storyKind.displayName}</span>
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
  gap: 16px;
  list-style: none;
  margin: 16px 0 0;
  padding: 0;

  > li {
    flex-basis: 200px;
    width: 100%;
    height: 100%;
  }

  iframe {
    border: 1px solid ${CSS_COLOR.SEMANTICS_BORDER};
  }
`
