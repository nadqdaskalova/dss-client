import React, { useContext, useState } from 'react'
import AxiosInterceptorsWrapper from '../helpers/AxiosInterceptorsWrapper'
import TokenService from '../helpers/TokenHelper'

const user = TokenService.getLocalStorageUser()

export const defaultUser = {
  name: '',
  email: ''
}

export const DEFAULT_STATE: State = {
  user: user ? user : defaultUser
}

type AuthContextType = {
  isAuthenticated: boolean
  state: State
  setState: (state: State) => void
}

export const AuthContext = React.createContext<AuthContextType>({
  state: DEFAULT_STATE,
  setState: () => ({}),
  isAuthenticated: user ? true : false
})

export const useUser = () => useAppState().state.user

export function useAppState() {
  return useContext(AuthContext)
}

export type User = {
  name: string
  email: string
}

export type State = {
  user: User
}

export function AuthProvider({ children }: any) {
  const [state, setState] = useState(DEFAULT_STATE)

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!state.user?.name, state, setState }}>
      <AxiosInterceptorsWrapper>{children}</AxiosInterceptorsWrapper>
    </AuthContext.Provider>
  )
}
