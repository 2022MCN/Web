<template>
    <v-app-bar color="rgba(2, 7, 21, 0.5)" max-height="70" dark fixed>
        <v-col sm="2" cols="12">
        </v-col>
        <v-col sm="1" cols="12">
          <v-btn depressed color="transparent" @click="movePage('/')" :style="{color: currentRouteName==='Home' ? '#FFBB00' : '#FFFFFF'}">
            <v-img src="../assets/Title.svg" style="width:150px;"></v-img>
          </v-btn>
        </v-col>
        <v-col sm="1" cols="12">
        </v-col>
        <v-col sm="4" cols="12" align="center">
            <v-btn v-if="isSignin === 1" depressed color="transparent" @click="movePage('/stats')" :style="{color: currentRouteName==='Stats' ? '#FFBB00' : '#FFFFFF'}">
              Scrim
            </v-btn>
            <v-btn v-if="isSignin === 0" depressed color="transparent" @click="movePage('/auth')" :style="{color: currentRouteName==='Auth' ? '#FFBB00' : '#FFFFFF'}">
              Scrim
            </v-btn>
            <v-btn depressed color="transparent" @click="movePage('/league')" :style="{color: currentRouteName==='League' ? '#FFBB00' : '#FFFFFF'}">
              League
            </v-btn>
            <v-btn depressed color="transparent" @click="movePage('/manual')" :style="{color: currentRouteName==='Manual' ? '#FFBB00' : '#FFFFFF'}">
              manual
            </v-btn>
            <!--
            <v-btn depressed color="transparent" @click="movePage('/about')" :style="{color: currentRouteName==='About' ? '#FFBB00' : '#FFFFFF'}">
              About
            </v-btn>
            <v-btn depressed color="transparent" @click="movePage('/contact')" :style="{color: currentRouteName==='Contact' ? '#FFBB00' : '#FFFFFF'}">
              Contact
            </v-btn>
            <v-btn depressed color="transparent" @click="movePage('/files')" :style="{color: currentRouteName==='Files' ? '#FFBB00' : '#FFFFFF'}">
              Files
            </v-btn>
            -->
        </v-col>
        <v-col sm="1" cols="12"></v-col>
          <v-toolbar-items>
            <v-btn v-if="isSignin === 1" depressed color="transparent" @click="movePage('/mypage')" :style="{color: currentRouteName==='Mypage' ? '#FFBB00' : '#FFFFFF'}">
              My page
            </v-btn>
            <v-btn v-if="isSignin === 0" depressed color="transparent" @click="google">
              <v-icon> mdi-google </v-icon> &nbsp; login
            </v-btn>
            <v-btn v-if="isSignin === 1" depressed color="transparent" @click="signout">
              <v-icon> mdi-logout </v-icon> &nbsp; logout
            </v-btn>
          </v-toolbar-items>
        <v-col sm="3" cols="12"></v-col>
    </v-app-bar>
</template>

<!-- eslint-disable -->
<script>
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { getFirestore, getDoc, doc, collection, setDoc } from 'firebase/firestore'

export default {
  name: 'Header',
  data() {
    return {
      currentPage: this.$route.path,
      changeBackgroundColor: false,
      isSignin: this.$store.state.isSignin,
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
        position: "Verify Your Team",
        tableau: ""
      }
    }
  },
  methods: {
    movePage (target) {
      this.$router.push({ path: target }).catch(err => {
        if (
          err.name !== 'NavigationDuplicated' &&
          !err.message.includes('Avoided redundant navigation to current location')
        ) {
          console.log(err)
        }
      })
    },
    reload() {
      location.reload()
    },
    async signout () {
      this.$store.commit('setLogout')
      this.$store.commit('setOffUserTableauViz')
      const auth = getAuth()
      let _this = this
      await signOut(auth).then(function () {
        _this.isSignin = 0
        _this.$router.push({ path: '/' }).catch(err => {
          if (
            err.name !== 'NavigationDuplicated' &&
            !err.message.includes('Avoided redundant navigation to current location')
          ) {
            console.log(err)
          }
        })
      }).catch(function (error) {
        // An error happened.
        console.log(error)
      })
      this.reload()
    },
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
          const username = result.user.email.split('@')[0]
          const userMail = result.user.email
          _this.initObj['mail'] = userMail
          _this.initObj['nickname'] = username
          getDoc(docRef)
            .then(docSnap => {
              if (docSnap.exists()) {
                if (!docSnap.data()['init']) {
                    setDoc(doc(usersRef, uuid), _this.initObj)
                      .then(()=>{_
                        _this.isSignin = 1
                        this.reload()
                      })
                }
                else {
                  _this.isSignin = 1
                  this.reload()
                }
                _this.$store.commit('setUserTableauViz',docSnap.data()['tableau'])
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
              .then(()=>{
                _this.movepage('/mypage')
              })
        }).catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          const email = error.email
          const credential = GoogleAuthProvider.credentialFromError(error)
        })
    }
    
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    }
}
}
</script>
