<template>
  <v-main>
    <v-container fill-height fluid>
      <v-layout class="mx-auto mt-16 ma-6" justify-center>
        <v-flex>
          <v-sheet color="white">
          </v-sheet>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
import { getStorage, ref, listAll } from 'firebase/storage'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore'
// import Vue from 'vue'

export default ({
  data () {
    return {
      userObj: {},
      userTeam: ''
    }
  },
  method: {
    fileListing () {
      const storage = getStorage()
      const listRef = ref(storage, 'files/uid')

      listAll(listRef)
        .then((res) => {
          res.prefixes.forEach((folderRef) => {
            // All the prefixes under listRef.
            // You may call listAll() recursively on them.
          })
          res.items.forEach((itemRef) => {
            // All the items under listRef.
          })
        }).catch((error) => {
          console.log(error)
        })
    }
  },
  mounted () {
    const auth = getAuth()

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uuid = user.uid
        const db = getFirestore()
        const usersRef = collection(db, 'users')
        const docRef = doc(usersRef, uuid)
        getDoc(docRef)
          .then(docSnap => {
            if (docSnap.exists()) {
              this.userObj = docSnap.data()
              this.userTeam = this.userObj.team ? this.userObj.team : 'selected'
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
  }
})
</script>
