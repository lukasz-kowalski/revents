import { closeModal } from '../modals/modalActions'

export const login = credentials => ({
  type: 'LOGIN_USER',
  payload: {
    credentials
  }
})

export const startLogin = credentials => {
  return dispatch => {
    dispatch(login(credentials))
    dispatch(closeModal())
  }
}

export const logout = () => ({
  type: 'SIGN_OUT_USER'
})
