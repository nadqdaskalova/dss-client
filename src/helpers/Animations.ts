import { keyframes } from '@emotion/react'

export const fadeInRight = keyframes`
    from {
        transform: translateX(-40px);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
`

export const fadeInLeft = keyframes`
    from {
        transform: translateX(40px);
        opacity:0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
`

export const fadeIn = keyframes`
  from {
    transform: translateY(1rem);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

export const fadeOut = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }

  to {
    transform: scale(0.5);
    opacity: 0;
  }
`

export const swing = keyframes`
 15% { -webkit-transform: translateX(5px); transform: translateX(5px);}
 30% { -webkit-transform: translateX(-5px); transform: translateX(-5px);}
 50% { -webkit-transform: translateX(3px); transform: translateX(3px);}
 65% { -webkit-transform: translateX(-3px); transform: translateX(-3px);}
 80% { -webkit-transform: translateX(2px); transform: translateX(2px);}
 100% { -webkit-transform: translateX(0); transform: translateX(0);}
`
