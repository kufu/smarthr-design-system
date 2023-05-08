import { CSS_COLOR, CSS_FONT_SIZE } from '@Constants/style'
import { graphql, useStaticQuery } from 'gatsby'
import React, { FC, useCallback } from 'react'
import styled from 'styled-components'

const query = graphql`
  query ComponentCaptureData {
    allComponentCapture {
      nodes {
        id
        captures {
          displayName
          resourceKey
        }
        groupName
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
        <ComponentGroup key={node.id}>
          <h2>{node.groupName}</h2>
          <ComponentList>
            {node.captures.map((capture) => {
              return capture.resourceKey ? (
                <li key={capture.resourceKey}>
                  <ComponentLink href={convertKebab(capture.displayName)}>
                    <img src={`https://snapshots.chromatic.com/snapshots/${capture.resourceKey}/thumb/capture.png`} alt={``} />
                  </ComponentLink>
                  <span>{capture.displayName}</span>
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
`
const ComponentLink = styled.a`
  display: inline-block;
  border: 1px solid ${CSS_COLOR.SEMANTICS_BORDER};
  width: 100%;
  height: 200px;

  img {
    max-width: 100%;
    max-height: 100%;
    height: auto;
    object-fit: cover;
    object-position: 0 0;
    vertical-align: top;
  }
`
