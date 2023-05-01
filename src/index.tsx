import { ThemeProvider } from '@mui/material/styles'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from './components/AuthProvider'
import DefaultMaterialTheme from './helpers/DefaultMaterialTheme'

const root = document.getElementById('root')

if (!!root) {
  ReactDOM.createRoot(root).render(
    <AuthProvider>
      <ThemeProvider theme={DefaultMaterialTheme}>
        <App />
      </ThemeProvider>
    </AuthProvider>
  )
}
