import React, { useContext, useEffect, useState } from 'react'
import type { VFC } from 'react'
import { FaExclamationCircleIcon, FaLockIcon, SecondaryButtonAnchor } from 'smarthr-ui'
import styled from 'styled-components'
import { micromark } from 'micromark'
import { mdxjs } from 'micromark-extension-mdxjs'
import { CSS_COLOR, CSS_FONT_SIZE } from '../../../constants/style'

import { LoginContext } from '../../../context/LoginContext'

type Props = {
  /** .mdファイルまでのパス。
   * ex) smarthr-design-system-private/public/basics/1.md を指定したい場合、
   * ここでは'/basics/1.md'を指定する
   */
  path: string | undefined
}

export const Private: VFC<Props> = ({ path }) => {
  const [privateData, setPrivateData] = useState('')
  const [isShow, setIsShow] = useState(false)
  const { loginStatus } = useContext(LoginContext)
  useEffect(() => {
    ;(async () => {
      if (path === undefined) {
        process.env.NODE_ENV === 'development' && console.error('Privateコンポーネントにパスを指定してください。')
        return
      }

      //ログインしていなければ何もせず返す
      if (loginStatus !== 'loggedIn') return

      // /private配下は/static/_redirectsの設定でリダイレクトが設定されている
      // 中身はsmarthr-design-system-privateにある
      const res = await fetch(`/private/${path}`, {
        method: 'GET',
      }).catch((err) => {
        throw new Error(err)
      })

      // これはログインしてないだけなので何もせず返す
      if (res.status === 401) return

      if (res.status !== 200) {
        process.env.NODE_ENV === 'development' &&
          console.error('コンテンツの取得に失敗しました。パスが正しくない可能性があります。')
        return
      }

      const mdString = await res.text()
      const html = micromark(mdString, { extensions: [mdxjs()] })

      setPrivateData(html)
      setIsShow(true)
    })()
  }, [path, loginStatus])

  return isShow ? (
    // ログイン済みの時の表示
    <AuthView>
      <AuthViewTitle>
        <FaLockIcon size={16} />
        <span>SmartHR社従業員限定コンテンツ</span>
        <Tooltip>
          <FaExclamationCircleIcon size={14} />
          <p className="message">制作パートナー・グループ会社への共有は可能ですが、SNS等へのシェアはしないでください。</p>
        </Tooltip>
      </AuthViewTitle>
      <div dangerouslySetInnerHTML={{ __html: privateData }}></div>
    </AuthView>
  ) : (
    // ログイン前の表示
    <UnAuthView>
      <p>
        🔓パスワードを入力すると従業員限定コンテンツを閲覧できます。
        <br />
        従業員は必ずパスワードを入力して閲覧・利用してください。
      </p>
      <SecondaryButtonAnchor href="/login">パスワード入力</SecondaryButtonAnchor>
    </UnAuthView>
  )
}

const UnAuthView = styled.div`
  margin-block: 48px;
  background-color: ${CSS_COLOR.LIGHT_GREY_3};
  text-align: center;
  padding: 32px 0;
  border: 1px solid ${CSS_COLOR.LIGHT_GREY_1};
  border-radius: 6px;

  /* 本文 */
  & p {
    padding: 0;
    margin: 0;
    font-size: ${CSS_FONT_SIZE.PX_16};
    line-height: 1.25;
  }

  /* パスワード入力ボタン */
  & button {
    margin-top: 1.5rem;
    & a {
      text-decoration: none;
      color: inherit;
    }
  }
`

const AuthView = styled.div`
  margin-block: 48px;
  background-color: ${CSS_COLOR.CAUTION_LIGHT};
  padding: 30px 36px;
  border: 1px solid ${CSS_COLOR.CAUTION_HEAVY};
  border-radius: 6px;

  /* Level2 */
  h2 {
    color: ${CSS_COLOR.CAUTION_DEFAULT};
    font-size: ${CSS_FONT_SIZE.PX_12} !important; /* md用のスタイルを上書きする */
    line-height: 1.33;
    font-weight: bold;
  }

  /* Level3 */
  h3 {
    font-size: ${CSS_FONT_SIZE.PX_18};
    line-height: 1.38;
    margin-block: 19px 0;
  }

  /* Level4 */
  h4 {
    font-size: ${CSS_FONT_SIZE.PX_16};
    line-height: 1.38;
    margin-block: 19px 0;
  }

  /* 本文 */
  p {
    font-size: ${CSS_FONT_SIZE.PX_16};
    line-height: 2.12;
    margin-block: 19px 0;
  }
`

const AuthViewTitle = styled.h2`
  font-weight: bold;
  margin: 0 !important; /* md用のスタイルを上書きする */
  padding: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const Tooltip = styled.div`
  color: ${CSS_COLOR.LIGHT_GREY_4};
  position: relative;
  height: 14px;
  & svg {
    cursor: pointer;
  }

  &:hover .message {
    display: block;
  }
  & p {
    display: none;
    top: -60px; /* 絶対的な値なのでremじゃなくpxで指定 */
    left: -30px; /* 絶対的な値なのでremじゃなくpxで指定 */
    position: absolute;
    background-color: ${CSS_COLOR.TEXT_BLACK};
    color: ${CSS_COLOR.WHITE};
    font-weight: normal;
    font-size: ${CSS_FONT_SIZE.PX_11};
    white-space: nowrap;
    padding: 8px;
    border-radius: 4px;
  }
  & p::before {
    content: '';
    position: absolute;
    top: 100%;
    left: 8.8%;
    border: 8px solid transparent; /* 絶対的な値なのでremじゃなくpxで指定 */
    border-top: 8px solid ${CSS_COLOR.BLACK}; /* 絶対的な値なのでremじゃなくpxで指定 */
    margin-left: -15px; /* 絶対的な値なのでremじゃなくpxで指定 */
  }
`
