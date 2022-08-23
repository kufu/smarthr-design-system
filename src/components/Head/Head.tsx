import React, { FC } from 'react'
import { Helmet } from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'
import { loadDefaultJapaneseParser } from 'budoux'

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

const countChars = (text: string) => {
  let sum = 0
  text.split('').forEach((char) => {
    //半角は1、全角は2文字分としてカウント
    char.match(/[ -~]/) ? (sum += 1) : (sum += 2)
  })
  return sum
}

const fragmentText = (text: string, maxChar: number) => {
  const line1: string[] = []
  const line2: string[] = []
  const parser = loadDefaultJapaneseParser()
  for (const word of parser.parse(text)) {
    if (line2.length === 0) {
      line1.push(word)
      //2単語目以降で横幅がはみ出る場合は2行目に送る
      if (line1.length > 1 && countChars(line1.join('')) > maxChar) {
        line1.pop()
        line2.push(word)
      }
    } else {
      line2.push(word)
      //2単語目以降で横幅がはみ出る場合
      if (line2.length > 1 && countChars(line2.join('')) > maxChar) {
        line2.pop()
        line2.push('…')
        break
      }
    }
  }

  return line2.length === 0 ? [line1.join('')] : [line1.join(''), line2.join('')]
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
      fragmentText(ogTitle, 25).join('\n'),
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
