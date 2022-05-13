<template>
  <v-main>
    <v-container fill-height fluid>
      <v-layout class="mx-auto mt-16 ma-6" justify-center>
        <v-flex>
          <v-row class="white--text ma-3">
            <h2>{{ userTeam }}</h2>
          </v-row>
          <v-row class="white--text ma-3">
            <span>You've uploaded&nbsp;</span> <span class="font-weight-bold"> {{ fileList.length }} </span> <span>&nbsp;files.</span>
          </v-row>
          <!-- <v-sheet> -->
            <v-data-table
              :headers="headers"
              :items="fileList"
              :items-per-page="15"
              class="elevation-1"
              sort-by="timeDiffinMinutes"
            ></v-data-table>
          <!-- </v-sheet> -->
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
import { getStorage, ref, listAll, getMetadata } from 'firebase/storage'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore'
import { DateTime } from 'luxon'

export default ({
  name: 'Files',
  data () {
    return {
      userObj: {},
      userTeam: '',
      headers: [
        {
          text: 'Name',
          align: 'left',
          value: 'name'
        },
        {
          text: 'Size',
          align: 'left',
          value: 'size',
          sortable: false
        },
        {
          text: 'Uploaded',
          align: 'left',
          value: 'timeCreated'
        }
      ],
      fileList: []
    }
  },
  methods: {
    fileListing () {
      const storage = getStorage()
      // get the list of files in the userTeam bucket
      const logfileBucketRef = ref(storage, `${this.userTeam}/`)

      listAll(logfileBucketRef)
        .then((res) => {
          res.items.forEach((itemRef) => {
            // append the file name to the fileList array
            const fileRef = ref(itemRef)
            getMetadata(fileRef)
              .then((metadata) => {
                const fileObj = {
                  name: metadata.name,
                  size: this.niceBytes(metadata.size),
                  // get the time difference between the current time and the time the file was uploaded
                  timeDiffinMinutes: this.timeDiffinMinutes(metadata.timeCreated),
                  timeCreated: this.timeFromToday(this.timeDiffinMinutes(metadata.timeCreated))
                }
                this.fileList.push(fileObj)
              })
              .catch((err) => {
                console.log(err)
              })
          })
        }).catch((error) => {
          console.log('error: ', error)
        })
    },
    niceBytes (x) {
      const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      let l = 0; let n = parseInt(x, 10) || 0
      while (n >= 1024 && ++l) {
        n = n / 1024
      }
      return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l])
    },
    timeDiffinMinutes (time) {
      const currentTime = DateTime.now()
      const timeDiff = currentTime.diff(DateTime.fromISO(time), 'minutes').values.minutes
      return timeDiff
    },
    timeFromToday (timeDiff) {
      return timeDiff < 1 ? 'Just now' : timeDiff < 60 ? `${Math.round(timeDiff)} minutes ago` : timeDiff < 1440 ? `${Math.round(timeDiff / 60)} hours ago` : timeDiff < 43200 ? `${Math.round(timeDiff / 1440)} days ago` : timeDiff < 525600 ? `${Math.round(timeDiff / 43200)} months ago` : `${Math.round(timeDiff / 525600)} years ago`
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
              this.userTeam = this.userObj.team ? this.userObj.team : 'Verify Your Team'
              this.fileListing()
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
