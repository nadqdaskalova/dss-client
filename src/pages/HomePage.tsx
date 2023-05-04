import { useEffect, useState } from 'react'
import GenericText from 'src/components/GenericText'
import ArticleHome from '../components/ArticleHome'
import ProjectLayout from '../components/ProjectLayout'
import StyledBox from '../components/StyledBox'
import { getArticles } from '../helpers/ApiHandler'
import Spacings from '../tokens/Spacings'

const HomePage = () => {
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
      <StyledBox
        fullWidth
        fullPadding
        flexWrap="wrap"
        direction="row"
        justify="flex-start"
        align="flex-start"
        gap={Spacings.tiny}
      >
        {articles.map((articleData: any) => (
          <ArticleHome key={articleData.id} {...articleData} />
        ))}
        {!articles?.length && <GenericText>{`There are no articles yet!`}</GenericText>}
      </StyledBox>
    </ProjectLayout>
  )
}

export default HomePage
