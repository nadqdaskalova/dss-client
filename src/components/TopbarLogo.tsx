import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Colors from 'src/tokens/Colors'
import Spacings from 'src/tokens/Spacings'
import routePaths from '../config/RoutePaths'
import StyledBox from './StyledBox'

const LogoNames = ['Project', 'University', 'Varna']

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
      <StyledBox pointer color={Colors.baseWhite} fontSize={Spacings.medium} bold uppercase transition>
        {LogoNames[nameNum]}
      </StyledBox>
    </StyledBox>
  )
}

export default React.memo(TopbarLogo)
