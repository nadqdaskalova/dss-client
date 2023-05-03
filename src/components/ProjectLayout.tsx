import React from 'react'
import Spacings from 'src/tokens/Spacings'
import styled from 'styled-components'
import Colors from '../tokens/Colors'
import StyledBox from './StyledBox'
import Topbar from './Topbar'

interface ProjectLayoutProps {
  children: any
  topSpace?: boolean | string
  bottomSpace?: boolean | string
  childrenProps?: any
}

const ProjectLayout: React.FC<ProjectLayoutProps> = ({
  topSpace = Spacings.small,
  bottomSpace = Spacings.medium,
  children,
  childrenProps
}) => (
  <StyledSnowContainer fullWidth>
    <Topbar />
    <ContentContainer fullWidth direction="row">
      <StyledBox
        fullWidth
        direction="row"
        bottom={!!bottomSpace && bottomSpace}
        top={!!topSpace && topSpace}
        {...childrenProps}
      >
        {children}
      </StyledBox>
    </ContentContainer>
  </StyledSnowContainer>
)

export default React.memo(ProjectLayout)

const ContentContainer = styled(StyledBox)`
  min-height: calc(100vh - 50px);
`

const StyledSnowContainer = styled(StyledBox)`
  background-color: ${Colors.snow};
  overflow: hidden;
`
