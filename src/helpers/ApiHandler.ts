import axios, { AxiosInstance } from 'axios'

export const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const register = (user: any) => api.post('/auth/signup', user).then(({ data }) => data)
export const login = (data: any) => api.post('/auth/signin', data).then(({ data }) => data)
export const refreshToken = (data: any) => api.post('/auth/refreshtoken', data).then(({ data }) => data)
export const getArticles = () => api.get('/news/article').then(({ data }) => data)
export const getArticleById = (articleId) => api.get(`/news/article/${articleId}`).then(({ data }) => data)
export const createArticle = (article) => api.post('/news/article', article).then(({ data }) => data)
export const deleteArticle = (articleId) => api.delete(`/news/article/${articleId}`).then(({ data }) => data)
export const createComment = (articleId, comment) =>
  api.post(`/news/article/${articleId}/comment`, comment).then(({ data }) => data)
export const deleteComment = (commentId) => api.delete(`/news/article/comment/${commentId}`).then(({ data }) => data)
