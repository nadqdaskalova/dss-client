import routePaths from './config/RoutePaths'
import ArticlePage from './pages/ArticlePage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

const RouterPublicRoutes = [
  { path: routePaths.entry, component: HomePage },
  { path: routePaths.login, component: LoginPage },
  { path: routePaths.register, component: RegisterPage },
  { path: `${routePaths.article}/:id`, component: ArticlePage }
]

export default RouterPublicRoutes
