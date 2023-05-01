import { useEffect, useState } from 'react'
import styled from 'styled-components'
import ArticleHome from '../components/ArticleHome'
import { useAppState } from '../components/AuthProvider'
import ProjectLayout from '../components/ProjectLayout'
import StyledBox from '../components/StyledBox'
import { getArticles } from '../helpers/ApiHandler'
import Spacings from '../tokens/Spacings'

const HomePage = () => {
  const { state, setState } = useAppState()
  const [articles, setArticles] = useState([])

  useEffect(() => {
    getArticles()
      .then((articles) => {
        setArticles(articles)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <ProjectLayout childrenProps={{ alignItems: 'flex-start', justifyContent: 'center' }}>
      <Wrapper flexWrap="wrap" direction="row" justify="flex-start" align="flex-start" gap={Spacings.tiny}>
        {articles.map((articleData: any) => (
          <ArticleHome key={articleData.id} {...articleData} />
        ))}
      </Wrapper>
    </ProjectLayout>
  )
}

export default HomePage

const Wrapper = styled(StyledBox)`
  width: 800px;
`
