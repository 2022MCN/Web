<template>
  <v-main>
    <v-container class="pt-16 mt-16 pb-4">
      <v-layout class="pt-16 mt-12" >
          <v-row>
            <v-col cols="12" justify="center" align="center" class="text-h2 font-weight-bold">
              <p class="white--text">BE A  <span style="color:#FFBB00"> TRUSTFUL </span> COACH <br></p>
              <p class="white--text"> BY <span style="color:#FFBB00"> SOMBRA </span></p>
            </v-col>
          </v-row>
      </v-layout>
      <v-layout class="mt-12 mb-16" >
          <v-row>
            <v-col cols="12" justify="center" align="center">
                <p class="text-h4 transition-swing font-weight-bold" style="color:#FFFFFF">No.1 Overwatch Data Lab</p>
            </v-col>
          </v-row>
      </v-layout>
      <v-layout>
        <v-row>
          <v-col cols="12" justify="center" align="center">
            <DragAndDrop v-if="isSignin === 1"></DragAndDrop>
            <!-- <v-btn rounded x-large v-else-if="isSignin === 0" color="#FFBB00" class="text-h4 font-weight-bold" @click="google" dark> GET STARTED</v-btn> -->
            <v-btn rounded x-large v-else-if="isSignin === 0" color="#FFBB00" class="text-h4 font-weight-bold" :href="this.$store.state.contactDiscordUrl" dark> GET STARTED</v-btn>
          </v-col>
        </v-row>
      </v-layout>
    </v-container>
  </v-main>
</template>

<!-- eslint-disable -->

<script>
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { getFirestore, getDoc, doc, collection, setDoc } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import firebaseConfig from '../firebaseConfig'
import DragAndDrop from '../components/vDragAndDrop.vue'

const firebase = initializeApp(firebaseConfig)
const db = getFirestore()

export default ({
  components: {
    DragAndDrop,
  },
  data(){
    return {
      initObj: {
        init: true,
        class: [
          {
            className: "premium",
            startDate: new Date()
          }
        ],
        nickname: "",
        team: "Verify Your Team",
        mail: "",
        position: "Coaching Staff",
        tableau: ""
      },
      loading: false,
      isSignin: this.$store.state.isSignin,
      yelloText: 'GET INSPIRED',
      whiteText: 'BY SOMBRA',
      userTeam: '',
    }
  },
  methods: {
    async google () {
      this.$store.commit('setLogin')
      const auth = getAuth()
      const _this = this
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({
        login_hint: 'user@example.com'
      })
      await signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user
          // user info save
          const uuid = user.uid
          const db = getFirestore()
          const usersRef = collection(db, "users")
          const docRef = doc(usersRef, uuid)
          const userId = result.user.email.split('@')[0]
          const userMail = result.user.email
          _this.initObj['mail'] = userMail
          _this.initObj['nickname'] = userId
          getDoc(docRef)
            .then(docSnap => {
              if (docSnap.exists()) {
                if (!docSnap.data()['init']) {
                    setDoc(doc(usersRef, uuid), _this.initObj)
                      .then(()=>{
                        _this.isSignin = 1
                        _this.reload()
                      })
                }
                else {
                  _this.isSignin = 1
                  _this.reload()
                }
              } else {
                setDoc(doc(usersRef, uuid), _this.initObj)
                  .then(()=>{
                    _this.isSignin = 1
                    _this.reload()
                  })
              }
              })
            .catch((err) => {
                console.log(err)
            })
        }).catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          const email = error.email
          const credential = GoogleAuthProvider.credentialFromError(error)
        })
    },
    reload() {
      location.reload()
    },
  }
})
</script>
