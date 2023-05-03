import { Keyframes } from '@emotion/react'
import { fadeIn, fadeInLeft, fadeInRight, fadeOut } from './Animations'

export enum AnimationTypes {
  RIGHT = 'right',
  LEFT = 'left',
  HIDE_IN = 'hideIn',
  HIDE_OUT = 'hideOut'
}

export const getAnimationKeyframes = (animation: string): Keyframes => {
  if (animation === AnimationTypes.LEFT) return fadeInLeft
  if (animation === AnimationTypes.HIDE_IN) return fadeIn
  if (animation === AnimationTypes.HIDE_OUT) return fadeOut
  return fadeInRight
}
