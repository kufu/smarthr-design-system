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
  ogTitle?: string
  description?: string
  meta?: Array<{
    name: string
    content: string
  }>
}

export const Head: FC<Props> = ({ title, ogTitle, description, meta = [] }) => {
  const data = useStaticQuery<GatsbyTypes.HeadQuery>(query)
  const siteMetadata = data.site?.siteMetadata

  const pageTitle = title ? `${title} | ${siteMetadata?.title}` : siteMetadata?.title
  const metaDescription = description || siteMetadata?.description
  const ogImagePath = `${siteMetadata?.siteUrl}${siteMetadata?.ogimage}`

  let ogCloudinaryUrl: string | null = null
  if (ogTitle) {
    ogCloudinaryUrl = `https://res.cloudinary.com/${
      process.env.CLOUDINARY_CLOUD_NAME
    }/image/upload/w_1200,c_fit,fl_relative,l_text:sds:notosansbold.otf_72_bold_normal_center:${encodeURIComponent(
      ogTitle,
    )},w_1100/fl_layer_apply,g_center,y_-0.05/sds/sds_ogp_base.jpg`
  }

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
        { property: 'og:image', content: ogCloudinaryUrl || ogImagePath },
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
