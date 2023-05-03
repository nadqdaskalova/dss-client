const getLocalStorageUser = () => {
  const userStr = localStorage.getItem('user')
  if (userStr) return JSON.parse(userStr)
  return null
}

const getLocalRefreshToken = () => {
  const user = getLocalStorageUser()
  return user?.refreshToken
}

const getLocalAccessToken = () => {
  const user = getLocalStorageUser()
  return user?.accessToken
}

const updateLocalAccessToken = (token: any) => {
  const user = getLocalStorageUser()
  user.accessToken = token
  localStorage.setItem('user', JSON.stringify(user))
}

const setUser = (user: any) => {
  localStorage.setItem('user', JSON.stringify(user))
}

const removeUser = () => {
  localStorage.removeItem('user')
}

const TokenService = {
  getLocalStorageUser,
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  setUser,
  removeUser
}

export default TokenService
