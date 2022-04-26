/* eslint-disable */
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import firebaseConfig from '../firebaseConfig'
import Vue from 'vue'

const firebase = initializeApp(firebaseConfig)
const provider = new GoogleAuthProvider()
const auth = getAuth()

provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
provider.setCustomParameters({
  login_hint: 'user@example.com'
})
auth.languageCode = 'kr'

