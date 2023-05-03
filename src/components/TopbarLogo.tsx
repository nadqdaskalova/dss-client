import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Colors from 'src/tokens/Colors'
import Spacings from 'src/tokens/Spacings'
import routePaths from '../config/RoutePaths'
import StyledBox from './StyledBox'
import styled from 'styled-components'

const LogoNames = ['Elephant Mama', 'Elephant Mama']

const MAX_NUM_OF_NAMES = LogoNames.length - 1

const TopbarLogo: React.FC = () => {
  const [nameNum, setNameNum] = useState<number>(0)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setNameNum((nameNum) => (nameNum === MAX_NUM_OF_NAMES ? 0 : nameNum + 1))
    }, 12000)

    return () => clearInterval(interval)
  }, [])

  return (
    <StyledBox
      fullWidth
      direction="row"
      justify="flex-start"
      align="center"
      gap={Spacings.min}
      onClick={() => navigate(routePaths.entry)}
      pointer
    >
      <LogoName pointer fontSize={Spacings.medium}>
        {LogoNames[nameNum]}
      </LogoName>
    </StyledBox>
  )
}

export default React.memo(TopbarLogo)

const LogoName = styled(StyledBox)`
  color: ${Colors.baseWhite};
`
