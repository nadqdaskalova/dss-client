import { Delete } from '@mui/icons-material'
import { deleteArticle } from '../helpers/ApiHandler'
import { useAppState } from './AuthProvider'
import GenericText from './GenericText'
import StyledBox from './StyledBox'

const ArticleHome = ({ id, title, description, image, user, createdAt }) => {
  const { state, setState } = useAppState()
  const { name } = user || {}
  const handleDeleteArticle = () => {
    deleteArticle(id)
      .then((res) => {
        console.log(res)
      })
      .catch((error) => console.log(error))
  }
  return (
    <StyledBox flex="0.5">
      {name === state.user?.name && <Delete onClick={handleDeleteArticle} />}
      <img src={image} alt={title} />
      <GenericText bold>{title}</GenericText>
      <GenericText smallText weight={'300'}>
        {createdAt}
      </GenericText>
      <GenericText weight={'400'}>{description}</GenericText>
    </StyledBox>
  )
}

export default ArticleHome
