import React, { FC, TrackHTMLAttributes } from 'react'
import styled from 'styled-components'

type Props = {
  source: string
  poster: string
  title: string
  youtubeUrl?: string
  tracks?: Array<TrackHTMLAttributes<HTMLTrackElement>>
}

export const VideoEmbed: FC<Props> = ({ source, poster, title, youtubeUrl, tracks = [] }) => (
  <>
    <Video controls poster={poster}>
      <source src={source} type="video/mp4" title={title}></source>
      {youtubeUrl ? (
        <p>動画を再生できない場合は以下のYouTubeリンク先を参照してください。</p>
      ) : (
        <p>動画再生に対応した環境でご覧ください。</p>
      )}
      {tracks.map((track, index) => (
        <track {...track} key={index} />
      ))}
    </Video>

    {youtubeUrl && (
      <a href={youtubeUrl} target="_blank" rel="noreferrer">
        {title} | YouTube
      </a>
    )}
  </>
)

const Video = styled.video`
  max-width: 100%;
  width: 100%;

  /* Firefoxでは::cue(<selector>)が効かないため::cueに背景色を指定 */
  ::cue {
    background-color: rgba(0, 0, 0, 0.5);
  }

  /* Firefox以外のブラウザでは::cueが効かないため、セレクタを指定 */
  ::cue(.bgBlack50) {
    background-color: rgba(0, 0, 0, 0.5);
  }
`
