import { SubmissionError } from 'redux-form'
import { closeModal } from '../modals/modalActions'

export const startLogin = credentials => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()
    try {
      await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      dispatch(closeModal())
    } catch (error) {
      throw new SubmissionError({
        _error: 'Login failed'
      })
    }
  }
}

export const startRegisterUser = user => async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase()
    const firestore = getFirestore()

    try {
      let createdUser = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      await createdUser.user.updateProfile({
        displayName: user.displayName
      })
      let newUser = {
        displayName: user.displayName,
        createdAt: firestore.FieldValue.serverTimestamp()
      }
      await firestore.set(`users/${createdUser.user.uid}`, {...newUser})
      dispatch(closeModal())
    } catch (error) {
      throw new SubmissionError({
        _error: error.message
      })
    }
  }

export const socialLogin = selectedProvider => async (dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase()
  const firestore = getFirestore()

  try {
    dispatch(closeModal())
    let user = await firebase.login({
      provider: selectedProvider,
      type: 'popup'
    })
    if (user.additionalUserInfo.isNewUser) {
      await firestore.set(`users/${user.user.uid}`, {
        displayName: user.profile.displayName,
        photoURL: user.profile.avatarUrl,
        createdAt: firestore.FieldValue.serverTimestamp()
      })
    }
  } catch (error) {
    console.log(error)
  }
}
