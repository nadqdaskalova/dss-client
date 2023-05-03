import { useContext, useEffect } from 'react'
import { AuthContext, defaultUser, State } from '../components/AuthProvider'
import { api } from './ApiHandler'
import TokenService from './TokenHelper'

const AxiosInterceptorsWrapper = ({ children }: any) => {
  const { state, setState } = useContext(AuthContext)

  useEffect(() => {
    api.interceptors.request.use(
      (config: any) => {
        const token = TokenService.getLocalAccessToken()
        if (token) {
          config.headers['x-access-token'] = token
        }
        return config
      },
      (error: any) => Promise.reject(error)
    )

    api.interceptors.response.use(
      (res: any) => res,
      async (err: any) => {
        const originalConfig = err.config
        if (originalConfig?.url !== '/auth/signin' && err.response) {
          // Access Token was expired
          if (err.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true

            try {
              const rs = await api.post('/auth/refreshtoken', {
                refreshToken: TokenService.getLocalRefreshToken()
              })

              const { accessToken, refreshToken } = rs.data
              const successUserState = { ...state, user: { ...state.user, accessToken, refreshToken } } as State
              setState(successUserState)
              TokenService.updateLocalAccessToken(accessToken)

              return api(originalConfig)
            } catch (_error) {
              TokenService.removeUser()
              const failureUserState = { ...state, user: defaultUser }
              setState(failureUserState)
              return console.error(_error)
            }
          }
        }

        return Promise.reject(err)
      }
    )
  }, [setState, state])

  return children
}

export default AxiosInterceptorsWrapper
