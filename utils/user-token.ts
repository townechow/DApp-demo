export const setUserToken = (token: string) => {
  sessionStorage.setItem('userToken', token)
}

export const getUserToken = () => {
  return sessionStorage.getItem('userToken')
}
