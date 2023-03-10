import React, { FC } from 'react'
import styled from 'styled-components'

type Props = {
  source: string
  poster: string
  title: string
  youtubeUrl?: string
}

export const VideoEmbed: FC<Props> = ({ source, poster, title, youtubeUrl }) => {
  return (
    <>
      <Video controls poster={poster}>
        <source src={source} type="video/mp4" title={title}></source>
        {youtubeUrl ? (
          <p>動画を再生できない場合は以下のYouTubeリンク先を参照してください。</p>
        ) : (
          <p>動画再生に対応した環境でご覧ください。</p>
        )}
      </Video>

      {youtubeUrl && (
        <a href={youtubeUrl} target="_blank" rel="noreferrer">
          {title} | YouTube
        </a>
      )}
    </>
  )
}

const Video = styled.video`
  max-width: 100%;
  width: 100%;
`
