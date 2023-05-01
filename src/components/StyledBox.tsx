import React from 'react'
import styled from 'styled-components'
import Spacings from '../tokens/Spacings'

export type StyledBoxProps = {
  left?: boolean | string
  right?: boolean | string
  top?: boolean | string
  bottom?: boolean | string
  spacing?: string
  fullWidth?: boolean
  fullPadding?: boolean
  link?: boolean
  align?: 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'normal' | 'stretch'
  justify?: 'center' | 'flex-end' | 'flex-start' | 'space-around' | 'space-between' | 'space-evenly' | 'stretch'
  alignText?: 'center' | 'left' | 'right'
  direction?: 'column-reverse' | 'column' | 'row-reverse' | 'row'
  flexWrap?: 'nowrap' | 'wrap-reverse' | 'wrap'
  onClick?: (event?: React.ChangeEvent<HTMLInputElement>) => void
  alignSelf?: 'center' | 'flex-end' | 'flex-start' | 'normal'
  position?: 'absolute' | 'relative' | 'static'
  flex?: number | string
  pointer?: boolean
  gap?: string
}

const FlexboxStyles = `
  display: flex;
  flex-direction: column;
  width: fit-content;
`
type DeterminePaddingPropsOverloads = {
  (padding?: boolean | string, spacing?: string, fullPadding?: boolean, fallback?: string): string
}

const determinePadding: DeterminePaddingPropsOverloads = (padding, spacing, fullPadding, fallback) => {
  const defaultValue = '0'
  if (typeof padding === 'string') {
    return padding || defaultValue
  }
  if (padding || fullPadding) {
    return spacing || fallback || defaultValue
  }
  return defaultValue
}

export default React.memo(styled.div<StyledBoxProps>`
  ${FlexboxStyles};
  flex-wrap: ${({ flexWrap }) => flexWrap || 'nowrap'};
  flex-direction: ${({ direction }) => direction || `column`};
  text-align: ${({ alignText }) => !!alignText && `${alignText}`};
  justify-content: ${({ justify }) => !!justify && `${justify}`};
  align-items: ${({ align }) => !!align && `${align}`};
  padding-left: ${({ left, spacing, fullPadding }) => determinePadding(left, spacing, fullPadding, Spacings.small)};
  padding-right: ${({ right, spacing, fullPadding }) => determinePadding(right, spacing, fullPadding, Spacings.small)};
  padding-top: ${({ top, spacing, fullPadding }) => determinePadding(top, spacing, fullPadding, Spacings.small)};
  padding-bottom: ${({ bottom, spacing, fullPadding }) =>
    determinePadding(bottom, spacing, fullPadding, Spacings.small)};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'fit-content')};
  ${({ link }) => (link ? LinkStyles : '')};
  align-self: ${({ alignSelf }) => !!alignSelf && `${alignSelf}`};
  position: ${({ position }) => !!position && `${position}`};
  flex: ${({ flex }) => !!flex && `${flex}`};
  gap: ${({ gap }) => !!gap && `${gap}`};
  cursor: ${({ pointer }) => !!pointer && `pointer`};
`)

export const LinkStyles = `
  cursor: pointer;

  :hover {
    div span {
      color: rgba(82, 130, 110, 1) !important;
    }
  }

  transition: transform ease 0.1s;

  &:active {
    transform: translateY(-2px);
  }

  &:focus {
    outline: 0;
  }
`
