import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDzsNHOL2aidNGWfVjksQe07Ipa4VArCVY',
  authDomain: 'revents-231618.firebaseapp.com',
  databaseURL: 'https://revents-231618.firebaseio.com',
  projectId: 'revents-231618',
  storageBucket: 'revents-231618.appspot.com',
  messagingSenderId: '18659857784'
}

firebase.initializeApp(firebaseConfig)
const firestore = firebase.firestore()
const settings = {
  timestampsInSnapshots: true
}
firestore.settings(settings)

export default firebase
