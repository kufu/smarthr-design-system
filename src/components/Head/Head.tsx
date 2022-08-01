import React, { FC } from 'react'
import { Helmet } from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'

const query = graphql`
  query Head {
    site {
      siteMetadata {
        title
        description
        siteUrl
        author
        ogimage
      }
    }
  }
`

type Props = {
  title?: string
  description?: string
  meta?: Array<{
    name: string
    content: string
  }>
}

export const Head: FC<Props> = ({ title, description, meta = [] }) => {
  const data = useStaticQuery<GatsbyTypes.HeadQuery>(query)
  const siteMetadata = data.site?.siteMetadata

  const pageTitle = title ? `${title} | ${siteMetadata?.title}` : siteMetadata?.title
  const metaDescription = description || siteMetadata?.description
  const ogImagePath = `${siteMetadata?.siteUrl}${siteMetadata?.ogimage}`

  return (
    <Helmet
      htmlAttributes={{ lang: 'ja' }}
      title={pageTitle}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: pageTitle,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        { property: 'og:image', content: ogImagePath },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: siteMetadata?.author || '',
        },
        {
          name: 'twitter:title',
          content: pageTitle,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
        ...meta,
      ]}
    />
  )
}
