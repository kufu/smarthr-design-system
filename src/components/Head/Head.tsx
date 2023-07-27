import { CLOUDINARY_CLOUD_NAME } from '@Constants/application'
import { graphql, useStaticQuery } from 'gatsby'
import React, { FC } from 'react'

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
  const data = useStaticQuery<Queries.HeadQuery>(query)
  const siteMetadata = data.site?.siteMetadata

  const pageTitle = title ? `${title} | ${siteMetadata?.title}` : siteMetadata?.title
  const metaDescription = description || siteMetadata?.description
  const ogImagePath = `${siteMetadata?.siteUrl}${siteMetadata?.ogimage}`

  let ogCloudinaryUrl: string | null = null
  if (ogTitle) {
    ogCloudinaryUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/w_1200,c_fit,fl_relative,l_text:sds:notosansbold.otf_72_bold_normal_center:${encodeURIComponent(
      ogTitle,
    )},w_1100/fl_layer_apply,g_center,y_-0.05/sds/sds_ogp_base.jpg`
  }

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription ?? ''} />
      <meta property="og:title" content={pageTitle ?? ''} />
      <meta property="og:description" content={metaDescription ?? ''} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogCloudinaryUrl ?? ogImagePath} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={siteMetadata?.author ?? ''} />
      <meta name="twitter:title" content={pageTitle ?? ''} />
      <meta name="twitter:description" content={metaDescription ?? ''} />
      {meta.map((item, index) => {
        return <meta key={index} name={item.name} content={item.content} />
      })}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
      <link rel="manifest" href="/webmanifest.manifest" />
      <meta name="apple-mobile-web-app-title" content={siteMetadata?.title || ''} />
      <meta name="application-name" content={siteMetadata?.title || ''} />
    </>
  )
}
