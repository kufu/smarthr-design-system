import { CSS_COLOR, CSS_FONT_SIZE } from '@Constants/style'
import { Link } from 'gatsby'
import React, { FC } from 'react'
import styled from 'styled-components'

type Props = {
  path: string
  label: string
  title: string
  align?: 'left' | 'center' | 'right'
  caretPosition?: 'left' | 'right'
}

export const RoundedBoxLink: FC<Props> = ({ path, label, title, align = 'left', caretPosition = 'right' }) => {
  return (
    <BoxLink to={path} data-align={align} data-caret={caretPosition}>
      <p className="labelText">{label}</p>
      <div className="linkText">
        <span>{title}</span>
      </div>
    </BoxLink>
  )
}

const BoxLink = styled(Link)<{ 'data-align': 'left' | 'center' | 'right'; 'data-caret': 'left' | 'right' }>`
  display: block;
  padding: 24px;
  border: solid 1px ${CSS_COLOR.LIGHT_GREY_1};
  border-radius: 12px;
  font-size: ${CSS_FONT_SIZE.PX_14};
  font-weight: bold;
  line-height: 1.4;
  text-decoration: none;
  text-align: ${(props) => props['data-align']};
  transition: background-color 1.5s cubic-bezier(0, 0.7, 0, 1);
  > .labelText {
    margin: 0 0 8px;
    letter-spacing: 0.1rem;
    color: ${CSS_COLOR.TEXT_BLACK};
  }
  .linkText {
    display: inline-block;
    color: ${CSS_COLOR.MAIN_DARKEN};
    position: relative;
    padding-left: ${(props) => (props['data-caret'] === 'left' ? '1.8em' : 0)};
    padding-right: ${(props) => (props['data-caret'] === 'left' ? 0 : '1.8em')};
    border-bottom: solid 1px currentColor;
    &::after {
      content: '';
      display: block;
      position: absolute;
      width: 0.8em;
      height: 0.8em;
      top: 50%;
      right: ${(props) => (props['data-caret'] === 'left' ? 'auto' : 0)};
      left: ${(props) => (props['data-caret'] === 'left' ? 0 : 'auto')};
      transform: ${(props) => (props['data-caret'] === 'left' ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)')};
      background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1Ljg3MiA3LjMzNzAzTDAgMC42MDMwMjdWMi4wODUwM0wxNC4yNiA4LjAxMzAzTDAgMTMuOTE1VjE1LjM5N0wxNS44NzIgOC42NjMwM1Y3LjMzNzAzWiIgZmlsbD0iIzAwNjVBOSIvPgo8L3N2Zz4K');
      background-size: contain;
      background-repeat: no-repeat;
      transition: transform 1.5s cubic-bezier(0, 0.7, 0, 1);
    }
  }
  &:hover {
    transition: background-color 0.2s;
    background-color: ${CSS_COLOR.LIGHT_GREY_2};
    border-color: ${CSS_COLOR.TEXT_GREY};
    .linkText {
      border-bottom-color: transparent;
      &::after {
        transition: transform 0.2s;
        transform: ${(props) =>
          props['data-caret'] === 'left'
            ? 'translateY(-50%) rotate(180deg) translateX(4px)'
            : 'translateY(-50%) translateX(4px)'};
      }
    }
  }
`
