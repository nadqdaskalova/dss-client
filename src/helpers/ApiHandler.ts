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
export const getArticles = () => api.get('/article').then(({ data }) => data)
export const getArticleById = (articleId) => api.get(`/article/${articleId}`).then(({ data }) => data)
export const createArticle = (article) => api.post('/article', article).then(({ data }) => data)
export const deleteArticle = (articleId) => api.delete(`/article/${articleId}`).then(({ data }) => data)
export const createComment = (articleId, comment) =>
  api.post(`/article/${articleId}/comment`, comment).then(({ data }) => data)
export const deleteComment = (commentId) => api.delete(`/article/comment/${commentId}`).then(({ data }) => data)
