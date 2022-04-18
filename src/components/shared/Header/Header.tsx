import { Dialog, FaBarsIcon, FaSearchIcon, SecondaryButtonAnchor, defaultColor } from 'smarthr-ui'
import React, { VFC, useContext, useState } from 'react'
import { useLocation } from '@reach/router'
import styled, { createGlobalStyle, css } from 'styled-components'
import { Link as LinkComponent } from 'gatsby'
import { CSS_COLOR, CSS_SIZE } from '../../../constants/style'

import { FootStaticLinks } from '../Footer/FootStaticLinks'
import headerContentJson from '../../../data/headerContent.json'

import { LoginContext } from '../../../context/LoginContext'

type HeaderContents = Array<{
  title: string
  key: string
  path: string
}>

const headerContents: HeaderContents = headerContentJson

type Props = {
  isIndex?: boolean
}
export const Header: VFC<Props> = ({ isIndex = false }) => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const { loginStatus, loginLabel } = useContext(LoginContext)

  const isCurrent = (url: string) => {
    const regexp = new RegExp(`${url}`)
    const pathname = location.pathname
    return regexp.test(pathname)
  }

  return (
    <>
      <Wrapper isIndex={isIndex}>
        <Container isIndex={isIndex}>
          <SiteName>
            <LinkComponent to="/">
              <img src="/images/logo_smarthr design_system.svg" alt="SmartHR Design System" width="264" height="24" />
            </LinkComponent>
          </SiteName>
          <StyledNav>
            <ul>
              {headerContents.map(({ title, key, path }) => (
                <li key={key}>
                  <StyledLink to={path} className={key && (isCurrent(key) ? '-active' : '')}>
                    {title}
                  </StyledLink>
                </li>
              ))}
            </ul>
            <ul className="-optional">
              <li>
                <StyledSecondaryButtonAnchor
                  className={loginStatus === 'pending' ? 'loginStatusPending' : ''}
                  size="s"
                  {...(loginStatus !== 'loggedIn' && { href: '/login/' })}
                >
                  {loginLabel}
                </StyledSecondaryButtonAnchor>
              </li>
              <li>
                <StyledSearchLink to="/search/">
                  <FaSearchIcon />
                  さがす
                </StyledSearchLink>
              </li>
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
                <FaBarsIcon size={24} />
              </StyledOpenButton>
              {typeof window !== 'undefined' ? (
                <Dialog
                  isOpen={isOpen}
                  top={0}
                  right={0}
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
                        {headerContents.map(({ title, key, path }) => (
                          <li key={key}>
                            <LinkComponent to={path} className={key && (isCurrent(key) ? '-active' : '')}>
                              {title}
                            </LinkComponent>
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
          </StyledNav>
        </Container>
      </Wrapper>
      <GlobalStyleForMenu />
      <Overlay isOpen={isOpen} />
    </>
  )
}

const Wrapper = styled.header<{ isIndex: boolean }>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  padding-inline: 40px;
  height: var(--header-height, 112px);
  background-color: ${CSS_COLOR.WHITE};
  ${({ isIndex }) =>
    !isIndex &&
    css`
      border: 1px solid ${CSS_COLOR.LIGHT_GREY_1};
    `}
  ${({ isIndex }) =>
    isIndex
      ? css`
          @media (max-width: ${CSS_SIZE.BREAKPOINT_PC_2}) {
            padding-inline: 80px;
          }
          @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
            padding-inline: 48px;
          }
          @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_2}) {
            padding-inline: 24px;
          }
        `
      : css`
          @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
            padding-inline: 24px;
          }
        `}
`

const Container = styled.div<{ isIndex: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  width: 100%;
  height: 100%;
  max-width: ${CSS_SIZE.CONTENT_WIDTH};
  margin-inline: auto;
  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_4}) {
    gap: 14px;
  }
  ${({ isIndex }) =>
    isIndex &&
    css`
      @media (max-width: ${CSS_SIZE.BREAKPOINT_PC_1}) {
        max-width: 921px;
      }
    `}
`

const SiteName = styled.div`
  img {
    display: block;
    @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
      width: 204px;
      height: auto;
    }
  }
`

const StyledNav = styled.nav`
  display: flex;
  gap: 28px;
  height: 100%;
  @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_4}) {
    gap: 14px;
  }
  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 28px;
    @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_4}) {
      gap: 14px;
    }
    @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
      display: none;
    }
    &.-optional {
      @media (max-width: ${CSS_SIZE.BREAKPOINT_PC_1}) {
        display: none;
      }
    }
  }
  li {
    display: flex;
    align-items: center;
    height: var(--header-height);
  }
`

/* SmartHR UIのSecondaryButtonAnchorコンポーネントをカスタマイズする */
const StyledSecondaryButtonAnchor = styled(SecondaryButtonAnchor)`
  min-width: 150px;
  &:not([href]) {
    border: 0;
    background-color: ${CSS_COLOR.LIGHT_GREY_2};
    color: ${CSS_COLOR.TEXT_GREY};
  }
  &.loginStatusPending {
    visibility: hidden;
  }
`

const StyledSearchLink = styled(LinkComponent)`
  display: inline-flex;
  gap: 8px;
  align-items: center;
  color: inherit;
  text-decoration: none;
  font-weight: bold;
  white-space: nowrap;

  &:hover {
    color: ${CSS_COLOR.NAV_ACTIVE};
  }
`

const StyledLink = styled(LinkComponent)`
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 100%;
  text-decoration: none;
  font-weight: bold;
  color: ${defaultColor.TEXT_BLACK};

  &:hover {
    color: ${CSS_COLOR.NAV_ACTIVE};
  }

  &.-active {
    color: ${CSS_COLOR.NAV_ACTIVE};

    &::before {
      content: '';
      position: absolute;
      width: 100%;
      padding-inline: 0.5rem;
      height: 7px;
      bottom: 0;
      left: -0.5rem;
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
    top: 30px;
    right: calc(5rem - 12px);
    width: 100%;
    max-width: 396px;
    border-radius: 8px;
    box-shadow: 0 4px 8px 2px rgba(0, 0, 0, 0.24);
    bottom: 16px;
    max-height: 678px;
    @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_3}) {
      top: 1rem;
      right: calc(3rem - 12px);
    }
    @media (max-width: ${CSS_SIZE.BREAKPOINT_MOBILE_2}) {
      width: auto;
      right: calc(1.5rem - 12px);
      left: calc(1.5rem - 12px);
    }
  }
`

const MenuContainer = styled.div`
  display: none;
  align-items: center;

  @media (max-width: ${CSS_SIZE.BREAKPOINT_PC_1}) {
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
