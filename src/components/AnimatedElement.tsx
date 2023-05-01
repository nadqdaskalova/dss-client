import { css, Keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import React, { ReactNode, useEffect, useState } from 'react'
import { getAnimationKeyframes } from '../helpers/AnimatedElementHelper'
import { fadeInRight } from '../helpers/Animations'
import StyledBox, { StyledBoxProps } from './StyledBox'

export interface AnimatedElementProps extends StyledBoxProps {
  className?: string
  animation: 'hideIn' | 'hideOut' | 'left' | 'right'
  customStyles?: { [name: string]: string }
  animate?: boolean
  ref?: any
  fullWidth?: boolean
  customAnimation?: Keyframes
  duration?: string
  infinite?: boolean
  children: ReactNode
}

const AnimatedElement: React.FC<AnimatedElementProps> = (
  {
    className,
    duration,
    animation,
    customAnimation,
    customStyles,
    children,
    animate,
    ref,
    fullWidth = true,
    infinite = false
  },
  props
) => {
  const [currentAnimation, setCurrentAnimation] = useState<Keyframes>(fadeInRight)

  useEffect(() => {
    if (customAnimation) return setCurrentAnimation(customAnimation)

    return setCurrentAnimation(getAnimationKeyframes(animation))
  }, [animation, customAnimation])

  return (
    <AnimatedElementWrapper
      fullWidth={fullWidth}
      ref={ref}
      animate={animate}
      currentAnimation={currentAnimation}
      customAnimation={customAnimation}
      duration={duration}
      infinite={infinite}
      {...props}
    >
      <Animate className={className} style={{ ...(!!customStyles && customStyles) }}>
        {children ? children : 'No children'}
      </Animate>
    </AnimatedElementWrapper>
  )
}
export default AnimatedElement

const Animate = styled.div`
  font-size: 0;
`

const AnimatedElementWrapper = styled(StyledBox)<{
  animate?: boolean
  duration?: string
  infinite?: boolean
  currentAnimation?: Keyframes
}>`
  .amazingAnimation {
    display: flex;
    justify-content: 'flex-start' !important;
    opacity: ${(props) => (props.animate ? 0 : 1)};

    ${(props) =>
      props.animate
        ? props.currentAnimation &&
          css`
            animation: ${props.currentAnimation} ${props.duration ? props.duration : `0.6s`} ease-in-out
              ${props.infinite ? 'infinite' : '1'} forwards;
          `
        : ''};
  }

  .hiddenElement {
    opacity: 0;
    visibility: hidden;
  }
`
