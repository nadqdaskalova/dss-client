// eslint-disable-next-line no-restricted-imports
import GenericText from './GenericText'
import StyledBox from './StyledBox'
import styled from 'styled-components'
import Spacings from 'src/tokens/Spacings'
import routePaths from 'src/config/RoutePaths'
import { useNavigate } from 'react-router-dom'

const ArticleHome = ({ id, title, description, image, user, createdAt }) => {
  const navigate = useNavigate()

  return (
    <Wrapper onClick={() => navigate(`${routePaths.article}/${id}`)} pointer>
      <Image>
        <img src={image} alt={title} />
      </Image>
      <StyledBox gap={Spacings.min}>
        <GenericText bold>{title}</GenericText>
        <GenericText truncate={3} weight={'400'}>
          {description}
        </GenericText>
        <GenericText smallText weight={'300'}>
          {createdAt}
        </GenericText>
      </StyledBox>
    </Wrapper>
  )
}

export default ArticleHome

const Wrapper = styled(StyledBox)`
  width: 250px;
  height: 250px;
  border-radius: 8px;
`

const Image = styled(StyledBox)`
  width: 100%;
  height: 200px;
  border-radius: 8px;
`
