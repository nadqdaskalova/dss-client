// eslint-disable-next-line no-restricted-imports
import { Delete } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Colors from 'src/tokens/Colors'
import Shadows from 'src/tokens/Shadows'
import styled from 'styled-components'
import { useAppState } from '../components/AuthProvider'
import Comment from '../components/Comment'
import CommentEditor from '../components/CommentEditor'
import GenericText from '../components/GenericText'
import ProjectLayout from '../components/ProjectLayout'
import StyledBox from '../components/StyledBox'
import { deleteArticle, getArticleById } from '../helpers/ApiHandler'
import Spacings from '../tokens/Spacings'

const ArticlePage = () => {
  const { state, setState } = useAppState()
  const { id } = useParams()
  const [article, setArticle] = useState<any>(null)
  const [comments, setComments] = useState<any>(null)
  const { title, description, image, user, createdAt } = article || {}

  const { name } = user || {}

  useEffect(() => {
    getArticleById(id)
      .then((article) => {
        setArticle(article)
        setComments(article?.comments || [])
      })
      .catch((error) => console.log(error))
  }, [id])

  const handleDeleteArticle = () => {
    deleteArticle(id)
      .then((res) => {
        window.location.reload()
      })
      .catch((error) => console.log(error))
  }

  return (
    <ProjectLayout>
      <StyledBox fullWidth align="center">
        {article && (
          <Wrapper fullPadding spacing={Spacings.large}>
            <StyledBox>{name === state.user?.name && <Delete onClick={handleDeleteArticle} />}</StyledBox>
            <StyledBox fullWidth direction="row" gap={Spacings.small} align="center">
              <StyledBox gap={Spacings.small}>
                <GenericText bold>{title}</GenericText>
                <GenericText weight={'400'}>{description}</GenericText>
                <GenericText smallText weight={'300'}>
                  {createdAt}
                </GenericText>
              </StyledBox>
              <StyledBox style={{ width: '300px', maxHeight: '300px', borderRadius: 8, overflow: 'hidden' }}>
                <img src={image} alt={title} />
              </StyledBox>
            </StyledBox>
            <StyledBox gap={Spacings.tiny}>
              {comments &&
                comments?.length > 0 &&
                comments?.map((commentsData: any) => <Comment key={commentsData.id} comment={commentsData} />)}
            </StyledBox>
            {!!state.user?.name && (
              <StyledBox top={Spacings.large} bottom={Spacings.medium}>
                <CommentEditor articleId={id as string} setComments={setComments} />
              </StyledBox>
            )}
            {!!state.user?.name && (
              <Button
                alignText="center"
                spacing={Spacings.tiny}
                top
                bottom
                left={Spacings.medium}
                right={Spacings.medium}
                pointer
                onClick={handleDeleteArticle}
                align="center"
                justify="center"
              >
                <GenericText
                  uppercase
                  weight="500"
                  fontSize={Spacings.small}
                  color={Colors.baseWhite}
                  alignText="center"
                >
                  {'Delete Article'}
                </GenericText>
              </Button>
            )}
          </Wrapper>
        )}
      </StyledBox>
    </ProjectLayout>
  )
}

export default ArticlePage

const Wrapper = styled(StyledBox)`
  width: 90%;
  background-color: white;
  border-radius: 20px;
  box-shadow: ${Shadows.regular};
`
const Button = styled(StyledBox)`
  border: 2px solid transparent;
  background: ${Colors.linearHardRed} padding-box, ${Colors.linearHardRed} border-box;
  transition: all 0.3s ease-in-out;
  border-radius: 8px;
  &:hover {
    transform: scale(1.05);
  }
`
