<template>
  <v-main>
    <v-container class="pt-16 mt-16 mb-4" fill-height fluid>
      <v-layout justify-center align-center>
        <v-flex>
          <v-card class="settings-card mx-auto rounded-lg" max-width="800" style="background-color: rgba(2, 7, 21, 0.5);" outlined elevation="0" dark>
            <v-row class="mt-4 mb-4" align="center">
              <v-col align="center" cols="12">
                <h1 class="text-center">Account Settings</h1>
              </v-col>
            </v-row>
            <v-row class="mx-auto" align="center">
              <v-col align="right" cols="3">
                <h4> <v-icon>mdi-email</v-icon>&nbsp; E-mail </h4>
              </v-col>
              <v-col cols="8">
                <v-text-field :placeholder="userEmail" disabled ></v-text-field>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col align="right" cols="3">
                <h4> <v-icon>mdi-account-group</v-icon>&nbsp; Team</h4>
              </v-col>
              <v-col cols="8">
                <v-text-field :placeholder="selectedTeam" disabled></v-text-field>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col align="right" cols="3">
                <h4> <v-icon>mdi-account</v-icon>&nbsp; User Name</h4>
              </v-col>
              <v-col cols="8">
                <v-text-field :color="membershipColor" :placeholder="userName" v-model="userName"></v-text-field>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col align="right" cols="3">
                <h4><v-icon>mdi-badge-account-outline</v-icon>&nbsp;Position</h4>
              </v-col>
              <v-col cols="8">
                <v-text-field :placeholder="selectedPosition" disabled></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mb-3" align="center">
              <v-col align="center" justify="center" cols="12">
                <a style="color:white; text-decoration:none;" href="https://discord.gg/Bv4HPjw7Nw"><v-icon> mdi-discord </v-icon> Verify your team</a>
              </v-col>
            </v-row>
            <v-row class="mb-3" align="center">
              <v-col align="right" cols="3">
              </v-col>
            </v-row>
          </v-card>
          <v-row class="align-center mt-8">
            <v-col cols="12" sm="5">
            </v-col>
            <v-col cols="12" sm="1">
            <v-btn
              color="#FFBB00"
              width="94"
              class="align-center justify-center pa-4 mx-auto"
              dark
              @click="saveChanges"
            >
              <h4>Save</h4>
            </v-btn>
            </v-col>
            <v-col cols="12" sm="1">
            <v-btn
              color="#756E59"
              width="94"
              class="align-center justify-center pa-4 mx-auto"
              dark
              @click="cancel"
            >
              <h4>Cancel</h4>
            </v-btn>
            </v-col>
            <v-col cols="12" sm="5">
            </v-col>
          </v-row>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<!-- eslint-disable -->
<script>
import { 
  getAuth, 
  onAuthStateChanged, 
} from "firebase/auth";
import {
  getFirestore, 
  collection,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

export default {
  name: 'MyPage',
  data() {
    return {
      positionStates: [
        'Select Position',
        'Coaching Staff',
      ],
      teamStates: [
        'Select Team',
        'Atlanta Reign',
        'Boston Uprising',
        'Chengdu Hunters',
        'Dallas Fuel',
        'Florida Mayhem',
        'Guangzhou Charge',
        'Hangzhou Spark',
        'Houston Outlaws',
        'London Spitfire',
        'Los Angeles Gladiators',
        'Los Angeles Valiant',
        'New York Excelsior',
        'Paris Eternal',
        'Philadelphia Fusion',
        'San Francisco Shock',
        'Seoul Dynasty',
        'Shanghai Dragons',
        'Torondo Defiant',
        'Vancouver Titans',
        'Washington Justice'
      ],
      userObj: {},
      userEmail: '',
      userName: '',

      selectedPosition: '',
      selectedTeam: '',

      userClassName: '',
      userClassStartdate: '',
      planList: {
        basic: {
          planName: '',
          planPrice: 0,
        },
        standard: {
          planName: '',
          planPrice: 0,
        },
        premium: {
          planName: '',
          planPrice: 0,
        }
      },
      membershipColor: ''
    }
  },
  methods: {
    upgradeToPremium() {
      const auth = getAuth()
      const premiumClassObj = {
        className: "premium",
        startDate: new Date()
      }
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uuid = user.uid
          const db = getFirestore()
          const usersRef = collection(db, "users")
          const docRef = doc(usersRef, uuid)
          getDoc(docRef)
            .then(docSnap => {
              if (docSnap.exists()) {
                const classList = docSnap.data()['class']
                if (classList) {
                  const currentClassObj = classList[classList.length - 1]
                  const currentClassName = currentClassObj['className']
                  if (currentClassName !== 'premium') {
                    classList.push(premiumClassObj)
                    setDoc(doc(usersRef, uuid), {class: classList}, { merge: true })
                    this.userClassName = 'premium'
                    this.membershipColor = 'red'
                    alert('Upgrade to premium Completed')
                  } else {
                    alert('you don\'t need premium You\'re already Premium.')
                  }
                }
              }
            })
        }
      })
    },
    
    saveChanges() {
      this.userName = this.userName
      this.selectedPosition = this.selectedPosition
      this.selectedTeam = this.selectedTeam
      const auth = getAuth()
      const user = auth.currentUser
      const uuid = user.uid
      const db = getFirestore()
      const usersRef = collection(db, "users")
      const docRef = doc(usersRef, uuid)
      getDoc(docRef)
        .then(docSnap => {
          if (docSnap.exists()) {
            this.userObj = docSnap.data()
            const userNickname = this.userName
            console.log(userNickname)
            setDoc(doc(usersRef, uuid), {nickname: userNickname}, { merge: true })
            const selectedPosition = this.selectedPosition
            setDoc(doc(usersRef, uuid), {position: selectedPosition}, { merge: true })
            const selectedTeam = this.selectedTeam
            setDoc(doc(usersRef, uuid), {team: selectedTeam}, { merge: true })
          }
        })
      alert("Saved all changes.")
    },

    cancel() {
      location.reload()
    },

    upgradeToStandard() {
      const auth = getAuth()
      const standardClassObj = {
        className: "standard",
        startDate: new Date()
      }
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uuid = user.uid
          const db = getFirestore()
          const usersRef = collection(db, "users")
          const docRef = doc(usersRef, uuid)
          getDoc(docRef)
            .then(docSnap => {
              if (docSnap.exists()) {
                const classList = docSnap.data()['class']
                if (classList) {
                  const currentClassObj = classList[classList.length - 1]
                  const currentClassName = currentClassObj['className']
                  if (currentClassName === 'basic') {
                    classList.push(standardClassObj)
                    setDoc(doc(usersRef, uuid), {class: classList}, { merge: true })
                    this.userClassName = 'standard'
                    this.membershipColor = 'yellow'
                    alert("Upgrade to standard Completed.")
                  } else if (currentClassName === 'standard') {
                    alert("You're already Standard.")
                  } else if (currentClassName === 'premium') {
                    alert("you don\'t need standard You're already Premium.")
                  } 
                }
              }
            })
        }
      })
    }
  },

  mounted() {
    const auth = getAuth()

    onAuthStateChanged(auth, (user) => {
      this.userName = user.displayName
      this.userEmail = user.email
      const uuid = user.uid
      const db = getFirestore()
      const usersRef = collection(db, "users")
      const docRef = doc(usersRef, uuid)
      getDoc(docRef)
        .then(docSnap => {
          if (docSnap.exists()) {
            this.userObj = docSnap.data()
            this.selectedPosition = this.userObj['position'] ? this.userObj['position'] : 'selected'
            this.selectedTeam = this.userObj['team'] ? this.userObj['team'] : 'selected'
            const classList = this.userObj['class']
            if (classList) {
              const currentClassObj = classList[classList.length - 1]
              this.userClassName = currentClassObj['className']
              this.userClassStartdate = currentClassObj['startDate']
              // define membershipColor
              if (this.userClassName === 'basic') {
                this.membershipColor = 'is-info'
                this.membershipTextColor = 'has-text-info'
              } else if (this.userClassName === 'standard') {
                this.membershipColor = 'yellow'
                this.membershipTextColor = 'has-text-warning-dark'
              } else if (this.userClassName === 'premium') {
                this.membershipColor = 'red'
                this.membershipTextColor = 'has-text-danger'
              }
            }
            const userNickname = this.userObj['nickname']
            if (userNickname) {
              this.userName = userNickname // nickname 설정 돼 있으면 userName 대체
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
      
      // plan list
      const paymentPlan = collection(db, "paymentPlan")
      const planRef = doc(paymentPlan, "i0n63amqxAf6pzKqrvsD") // firebase plans 문서이름
      getDoc(planRef)
        .then(docSnap => {
          if (docSnap.exists()) {
            const planList = docSnap.data()['plans']
            if (planList) {
              this.planList = planList
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
    })

  },
}
</script>
