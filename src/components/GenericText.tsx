import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import BorderRadius from 'src/tokens/BorderRadius'
import Colors from 'src/tokens/Colors'
import Shadows from 'src/tokens/Shadows'
import Spacings from 'src/tokens/Spacings'

type DeterminePaddingPropsOverloads = {
  (padding?: string | boolean, spacing?: string, fullPadding?: boolean, fallback?: string): string
}

export const determinePadding: DeterminePaddingPropsOverloads = (padding, spacing, fullPadding, fallback) => {
  const defaultValue = '0'

  if (typeof padding === 'string') {
    return padding || defaultValue
  }

  if (padding || fullPadding) {
    return spacing || fallback || defaultValue
  }

  return defaultValue
}

type GenericTextProps = {
  left?: boolean | string
  right?: boolean | string
  top?: boolean | string
  bottom?: boolean | string
  spacing?: string
  fullWidth?: boolean
  fullPadding?: boolean
  link?: boolean
  alignText?: 'center' | 'left' | 'right' | 'justify'
  direction?: 'row' | 'column' | 'column-reverse' | 'row-reverse'
  onClick?: (event?: any) => void
  position?: 'relative' | 'absolute' | 'static' | 'sticky' | 'fixed'
  flex?: number | string
  radius?: 'hard' | 'rounded' | 'soft' | 'verySoft' | 'circle'
  shadow?: 'regular' | 'regularMin' | 'regularMed' | 'regularMax'
  transition?: boolean
  pointer?: boolean
  fontSize?: string
  smallText?: boolean
  letterSpacing?: string
  disableSelect?: boolean
  weight?: string
  color?: string
  uppercase?: boolean
  truncate?: boolean | number
  bold?: boolean
}

const TextStyles = `
  display: flex;
  font-weight: 500;
  letter-spacing: 0.5%;
  flex-direction: column;
  text-decoration: none;
  color: ${Colors.hardGray};
`

export default React.memo(styled.span<GenericTextProps>`
  ${TextStyles}
  flex-direction: ${({ direction }) => direction || `column`};
  text-align: ${({ alignText }) => !!alignText && `${alignText}`};
  padding-left: ${({ left, spacing, fullPadding }) => determinePadding(left, spacing, fullPadding, Spacings.small)};
  padding-right: ${({ right, spacing, fullPadding }) => determinePadding(right, spacing, fullPadding, Spacings.small)};
  padding-top: ${({ top, spacing, fullPadding }) => determinePadding(top, spacing, fullPadding, Spacings.small)};
  padding-bottom: ${({ bottom, spacing, fullPadding }) =>
    determinePadding(bottom, spacing, fullPadding, Spacings.small)};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'fit-content')};
  ${({ link }) => (link ? LinkStyles : '')};
  position: ${({ position }) => !!position && `${position}`};
  flex: ${({ flex }) => !!flex && `${flex}`};
  border-radius: ${({ radius }) => !!radius && `${BorderRadius[radius]}`};
  box-shadow: ${({ shadow }) => !!shadow && `${Shadows[shadow]}`};
  transition: ${({ transition }) => !!transition && `all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)`};
  cursor: ${({ pointer }) => !!pointer && `pointer`};
  font-size: ${({ fontSize }) => !!fontSize && `${fontSize}`};
  letter-spacing: ${({ letterSpacing }) => !!letterSpacing && `${letterSpacing}`};
  font-weight: ${({ weight }) => !!weight && `${weight}`};
  color: ${({ color }) => !!color && `${color}`};
  user-select: ${({ disableSelect }) => !!disableSelect && 'none'};
  text-transform: ${({ uppercase }) => !!uppercase && 'uppercase'};
  font-weight: ${({ bold }) => !!bold && 'bold'};
  ${({ smallText }) =>
    smallText &&
    css`
      font-size: 14px;
      letter-spacing: 0.25%;
    `};
  ${({ truncate }) =>
    truncate &&
    css`
      display: -webkit-box !important;
      -webkit-line-clamp: ${typeof truncate === 'boolean' ? '1' : truncate};
      -webkit-box-orient: vertical;
      overflow: hidden;
    `}
`)

const LinkStyles = `
  cursor: pointer;
  :hover {
    color: ${Colors.baseGreen} !important;
    text-decoration: underline;
  }
`
