import React, { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import Colors from 'src/tokens/Colors'
import Shadows from 'src/tokens/Shadows'
import styled from 'styled-components'
import routePaths from '../config/RoutePaths'
import { TOPBAR_FIXED_HEIGHT } from '../Constants'
import Spacings from '../tokens/Spacings'
import { useAppState } from './AuthProvider'
import GenericModal from './GenericModal'
import ModalCreateArticle from './ModalCreateArticle'
import StyledBox from './StyledBox'
import TopbarLogo from './TopbarLogo'

export const getCurrentTab = (location: any, link: string) => {
  const locationName = location.pathname.split('/')[1]
  const trimmedLink = link.split('/')[1]
  return locationName === trimmedLink
}

export const getNavItems = (isAuthenticated: boolean) =>
  [
    {
      label: 'Home',
      link: routePaths.entry
    },
    !isAuthenticated && {
      label: 'Login',
      link: routePaths.login
    },
    !isAuthenticated && {
      label: 'Register',
      link: routePaths.register
    }
  ].filter((item) => !!item) as any

const Topbar: React.FC = () => {
  const { state, setState } = useAppState()
  const [showCreateArticle, setShowCreateArticle] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const navItems = useMemo(() => getNavItems(!!state.user?.name), [])
  console.log(state)
  return (
    <Container fullWidth direction="row" position="sticky" className="guide-topbar" justify={'center'} align="center">
      <PublicTopBarWrapper direction="row" align="center" justify="center" alignSelf="center" fullWidth>
        <TopbarLogo />
        <StyledBox fullWidth direction="row" justify="flex-end" align="center">
          {!!navItems &&
            navItems?.length > 0 &&
            navItems.map(({ label, link }, idx) => (
              <NavItem
                spacing={Spacings.small}
                pointer
                fullPadding
                align="center"
                justify="center"
                isSelected={getCurrentTab(location, link)}
                key={`navItem${idx}`}
                onClick={() => navigate(link)}
              >
                {label}
              </NavItem>
            ))}
          {state.user?.name && (
            <NavItem
              spacing={Spacings.small}
              fullPadding
              align="center"
              justify="center"
              isSelected={showCreateArticle}
              onClick={() => setShowCreateArticle(true)}
            >
              {'Create Article'}
            </NavItem>
          )}
        </StyledBox>
      </PublicTopBarWrapper>
      <GenericModal open={showCreateArticle} onClose={() => setShowCreateArticle(false)}>
        <ModalCreateArticle closeModal={() => setShowCreateArticle(false)} />
      </GenericModal>
    </Container>
  )
}

export default React.memo(Topbar)

const Container = styled(StyledBox)`
  background: ${Colors.linearMainColor};
  box-sizing: border-box;
  max-height: ${TOPBAR_FIXED_HEIGHT};
  box-shadow: ${Shadows.bottom};
  top: 0;
  z-index: 9999;
`

const PublicTopBarWrapper = styled(StyledBox)`
  max-width: 1440px;
`

const NavItem = styled(StyledBox)<{ isSelected?: boolean }>`
  box-sizing: border-box;
  height: ${TOPBAR_FIXED_HEIGHT};
  color: ${Colors.baseWhite};
  border-bottom: ${(props) =>
    props.isSelected ? `2px solid ${Colors.baseWhite}` : `2px solid rgba(255, 255, 255, 0.6)`};
  background-color: ${(props) => props.isSelected && `rgba(255, 255, 255, 0.2)`};
  text-transform: uppercase;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-bottom: 2px solid ${Colors.baseWhite};
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
`
