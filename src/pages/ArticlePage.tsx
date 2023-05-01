import { Delete } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
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
        setComments(article.comments)
      })
      .catch((error) => console.log(error))
  }, [id])

  const handleDeleteArticle = () => {
    deleteArticle(id)
      .then((res) => {
        console.log(res)
      })
      .catch((error) => console.log(error))
  }

  return (
    <ProjectLayout>
      <Wrapper justify="flex-start" align="flex-start" gap={Spacings.tiny}>
        {article && (
          <>
            {name === state.user?.name && <Delete onClick={handleDeleteArticle} />}
            <StyledBox flex="0.5">
              <img src={image} alt={title} />
              <GenericText bold>{title}</GenericText>
              <GenericText smallText weight={'300'}>
                {createdAt}
              </GenericText>
              <GenericText weight={'400'}>{description}</GenericText>
              {state.user?.name && (
                <StyledBox top={Spacings.large} bottom={Spacings.medium}>
                  <CommentEditor articleId={id as string} setComments={setComments} />
                </StyledBox>
              )}
              <StyledBox gap={Spacings.tiny}>
                {comments.map((commentsData: any) => (
                  <Comment key={commentsData.id} comment={commentsData} />
                ))}
              </StyledBox>
            </StyledBox>
          </>
        )}
      </Wrapper>
    </ProjectLayout>
  )
}

export default ArticlePage

const Wrapper = styled(StyledBox)`
  width: 800px;
`
