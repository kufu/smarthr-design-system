import { CSS_COLOR, CSS_FONT_SIZE, CSS_SIZE } from '@Constants/style'
import { useLocation } from '@reach/router'
import { Link } from 'gatsby'
import React, { FC, useState } from 'react'
import { Cluster, FaBarsIcon, FaSearchIcon, defaultColor, Dialog as shrDialog } from 'smarthr-ui'
import styled, { createGlobalStyle, css } from 'styled-components'

import navigationItem from '../../../data/navigationItem.json'
import { FootStaticLinks } from '../Footer/FootStaticLinks'

type Props = {
  isIndex?: boolean
}
export const Header: FC<Props> = ({ isIndex = false }) => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const isCurrent = (url: string) => {
    const regexp = new RegExp(`${url}`)
    const pathname = location.pathname
    return regexp.test(pathname)
  }

  return (
    <>
      <Wrapper isIndex={isIndex}>
        <Container>
          <SiteNameLink to="/">
            <img src="/images/logo_smarthr_design_system.svg" alt="SmartHR Design System" width="264" height="24" />
          </SiteNameLink>
          <StyledLinkMenu>
            <ul className="-optional">
              <li>
                <StyledSearchLink to="/search/">
                  <FaSearchIcon />
                  さがす
                </StyledSearchLink>
              </li>
            </ul>
            <ul>
              {navigationItem.map(({ title, key, path }) => (
                <li key={key}>
                  <StyledLink to={path} className={key && (isCurrent(key) ? '-active' : '')}>
                    {title}
                  </StyledLink>
                </li>
              ))}
            </ul>
            <MenuContainer>
              <StyledOpenButton
                type="button"
                onClick={() => {
                  setIsOpen(true)
                }}
                title="メニューを開く"
                aria-haspopup="true"
                aria-controls="panel-menu"
              >
                <FaBarsIcon />
              </StyledOpenButton>
              {typeof window !== 'undefined' ? (
                <Dialog
                  isOpen={isOpen}
                  onPressEscape={() => {
                    setIsOpen(false)
                  }}
                  ariaLabel="メニュー"
                  id="panel-menu"
                >
                  <MenuContentsContainer>
                    <StyledCloseButton
                      type="button"
                      title="メニューを閉じる"
                      onClick={() => {
                        setIsOpen(false)
                      }}
                    >
                      <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_1090_7843)">
                          <path
                            d="M6.70542 25.7015C6.19286 25.189 6.23395 24.3168 6.79721 23.7536L22.4351 8.11563C22.9984 7.55238 23.8705 7.51128 24.3831 8.02385L25.0018 8.64256C25.5144 9.15513 25.4733 10.0273 24.91 10.5905L9.27208 26.2284C8.70883 26.7917 7.8367 26.8328 7.32414 26.3202L6.70542 25.7015Z"
                            fill="#23221F"
                          />
                          <path
                            d="M24.3851 25.9665C23.8725 26.479 23.0004 26.4379 22.4372 25.8747L6.79923 10.2367C6.23597 9.67347 6.19488 8.80135 6.70744 8.28878L7.32616 7.67007C7.83872 7.1575 8.71085 7.1986 9.2741 7.76185L24.912 23.3998C25.4753 23.963 25.5164 24.8352 25.0038 25.3477L24.3851 25.9665Z"
                            fill="#23221F"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1090_7843">
                            <rect width="32" height="32" fill="white" transform="translate(0 0.996094)" />
                          </clipPath>
                        </defs>
                      </svg>
                    </StyledCloseButton>
                    <MenuLinkContainer>
                      <MenuStyledCategoryUl>
                        {navigationItem.map(({ title, key, path }) => (
                          <li key={key}>
                            <StyledMenuLink to={path} className={key && (isCurrent(key) ? '-active' : '')}>
                              {title}
                            </StyledMenuLink>
                          </li>
                        ))}
                      </MenuStyledCategoryUl>
                      <MenuFootLinkContainer>
                        <FootStaticLinks />
                      </MenuFootLinkContainer>
                    </MenuLinkContainer>
                  </MenuContentsContainer>
                </Dialog>
              ) : null}
            </MenuContainer>
          </StyledLinkMenu>
        </Container>
      </Wrapper>
      <GlobalStyleForMenu />
      <Overlay isOpen={isOpen} />
    </>
  )
}

const Wrapper = styled.header<{ isIndex: boolean }>`
  /* サイト名やリンクに 10px の padding をもたせたので差し引いてる */
  padding-block: 30px;
  padding-inline: 70px;
  background-color: ${CSS_COLOR.WHITE};
  ${({ isIndex }) =>
    !isIndex &&
    css`
      border-bottom: 1px solid ${CSS_COLOR.LIGHT_GREY_1};
    `}
  ${({ isIndex }) =>
    isIndex
      ? css`
          @media (max-width: ${CSS_SIZE.BREAKPOINT_PC_2}) {
            padding-inline: 48px;
          }

          @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_2}) {
            padding-inline: 24px;
          }
        `
      : css`
          @media (max-width: ${CSS_SIZE.BREAKPOINT_PC_2}) {
            padding-inline: 48px;
          }

          @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
            padding-inline: 24px;
          }
        `}
`

const Container = styled(Cluster).attrs({ gap: { row: 0.75, column: 1 }, align: 'center', justify: 'space-between' })``

const SiteNameLink = styled(Link)`
  padding: 6px 10px;

  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_2}) {
    padding: revert;
  }

  img {
    display: block;

    @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
      width: 204px;
      height: auto;
    }
  }
`

const StyledLinkMenu = styled(Cluster).attrs({ gap: { row: 0.75, column: 0.5 }, justify: 'flex-start', forwardedAs: 'nav' })`
  flex-direction: row-reverse;
  margin-inline-start: auto;

  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 6px;

    @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
      display: none;
    }
    &.-optional {
      @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
        display: none;
      }
    }
  }
  li {
    display: flex;
    align-items: center;
  }
`

const StyledSearchLink = styled(Link)`
  display: inline-flex;
  gap: 8px;
  align-items: center;
  padding: 10px;
  color: inherit;
  text-decoration: none;
  font-weight: bold;
  line-height: 1;
  white-space: nowrap;

  &:hover {
    color: ${CSS_COLOR.NAV_ACTIVE};
  }
`

const StyledLink = styled(Link)`
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 10px;
  text-decoration: none;
  font-weight: bold;
  line-height: 1;
  color: ${defaultColor.TEXT_BLACK};

  @media (max-width: ${CSS_SIZE.BREAKPOINT_PC_1}) {
    padding-inline: 6px;
  }

  &:hover {
    color: ${CSS_COLOR.NAV_ACTIVE};
  }

  &.-active {
    color: ${CSS_COLOR.NAV_ACTIVE};

    &::before {
      content: '';
      position: absolute;
      height: 8px;
      inset-inline: -4px;
      inset-block-end: -32px;
      background-color: ${CSS_COLOR.NAV_ACTIVE};
    }
  }
`

/* SmartHR UIのDialogコンポーネントをカスタマイズする */
const GlobalStyleForMenu = createGlobalStyle`
  /* Overlayコンポーネントに色を付けるため、元々の背景は透明に */
  #panel-menu .smarthr-ui-Dialog-background {
    background: transparent;
  }
  #panel-menu .smarthr-ui-Dialog {
    width: auto;
    max-width: 396px;
    border-radius: 8px;
    box-shadow: 0 4px 8px 2px rgba(0, 0, 0, 0.24);
    bottom: 16px;
    max-height: 678px;
  }
`

const MenuContainer = styled.div`
  display: none;
  align-items: center;

  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
    display: flex;
  }
`

const StyledOpenButton = styled.button`
  color: ${CSS_COLOR.BLACK};
  appearance: none;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  font-size: ${CSS_FONT_SIZE.PX_24};
`

const Dialog = styled(shrDialog)`
  position: absolute;
  inset: 15px;

  > div {
    height: 100%;
  }
`

const MenuContentsContainer = styled.div`
  position: relative;
  padding-inline: 28px;
  height: 100%;
`

const StyledCloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  appearance: none;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  svg {
    display: block;
  }
`

const MenuLinkContainer = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 100%;
  gap: 80px;
  height: 100%;
  padding: 64px 4px 72px;
  overflow: auto;
`

const MenuStyledCategoryUl = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
  a {
    font-weight: bold;
    line-height: 2.62;
    color: inherit;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`

const StyledMenuLink = styled(Link)`
  display: inline-block;
  width: 100%;
`

const MenuFootLinkContainer = styled.div`
  display: grid;
  grid-template-columns: 100%;
  gap: 24px;
  align-content: start;
  justify-items: start;
`

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background-color: ${CSS_COLOR.SMARTHR_BLUE};
  z-index: 10000;
  mix-blend-mode: multiply;
  transition-property: opacity, visibility;
  ${({ isOpen }) =>
    isOpen
      ? css`
          transition-duration: 0.2s, 0s;
          opacity: 1;
          visibility: visible;
        `
      : css`
          opacity: 0;
          visibility: hidden;
          transition-duration: 1s, 0s;
          transition-timing-function: cubic-bezier(0, 0.7, 0, 1);
        `}
`
