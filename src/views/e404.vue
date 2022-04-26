<template>
  <div class="errno-404">
    <h1>404 not found</h1>
  </div>
</template>

<!-- eslint-disable -->
<!--
<script>
import { getFirestore, collection, getDoc, doc, setDoc, Timestamp, updateDoc } from 'firebase/firestore'
import { getAuth, signInWithPopup, GoogleAuthProvider,onAuthStateChanged } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import firebaseConfig from '../firebaseConfig'

const firebase = initializeApp(firebaseConfig)
const db = getFirestore()

export default ({
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
        profilePhotoUrl: "",
        team: "",
        position: "",
      },
      loading: false,
      isSignin: this.$store.state.isSignin,
      classes: [
        [0, 'h1', 'Get Insight', 0],
        [1, 'h1', 'Be Outwit', 0]
      ],
      userTeam: '',
      team1OffenseFlag: false,
      initialTimestamp: 0,
      files: [],
      regexDictionary: {
        'dupstart': /(\[(.*?)\])\s(\d*\.?\d+),(DuplicatingStart),(\w*),(\w*)/,
        'dupend': /(\[(.*?)\])\s(\d*\.?\d+),(DuplicatingEnd),(\w*)/,
        'resurrect': /(\[(.*?)\])\s(\d*\.?\d+),(Resurrected),(\w*)/,
        'finalblows': /(\[(.*?)\])\s(\d*\.?\d+),(FinalBlow),(\w*),(\w*),(\w*\s*\w*)/,
        'suicide': /(\[(.*?)\])\s(\d*\.?\d+),(Suicide),(\w*)/,
        'matchInfo': /(\[(.*?)\])\s(\w*\s*\w*\s*\w*|Watchpoint: Gibraltar|King\'s Row),(\w*\s*\w*),(\w*\s*\w*),(\d)/,
        'playerInfo': /(\[(.*?)\])\s(\w*|Soldier: 76),(\w*|Soldier: 76),(\w*|Soldier: 76),(\w*|Soldier: 76),(\w*|Soldier: 76),(\w*|Soldier: 76),(\w*|Soldier: 76),(\w*|Soldier: 76),(\w*|Soldier: 76),(\w*|Soldier: 76),(\w*|Soldier: 76),(\w*|Soldier: 76)/,
        'typeControl': /(\[(.*?)\])\s(\d*\.?\d+),(\d*\.?\d+),(\d*\.?\d+)/,
        'typeOthers': /(\[(.*?)\])\s(\d*\.?\d+),(True|False),(\d*\.?\d+)/,
        'playerData': /(\[(.*?)\])\s(\d*\.?\d+),(\w*),(\w*\s*\w*|Soldier: 76|D.Va),(\d*\.?\d+),(\d*\.?\d+),(\d*\.?\d+),(\d*\.?\d+),(\d*\.?\d+),(\d*\.?\d+),(\d*\.?\d+),(\d*\.?\d+),(\d*\.?\d+),(\d*\.?\d+),(\d*\.?\d+),(\d*\.?\d+),(\d*\.?\d+),(\d*\.?\d+),(\d*\.?\d+),(\d*\.?\d+),(\W[-]?(\d*\.?\d+), [-]?(\d*\.?\d+), [-]?(\d*\.?\d+)\W),(\w*\s*\w*),(\d*\.?\d+),(\d*\.?\d+),(\d*\.?\d+),(\d*\.?\d+),(True|False),(\d*\.?\d+),(\d*\.?\d+),(\d*\.?\d+),(\d*\.?\d+),(\d*\.?\d+),(\d*\.?\d+),(\d*\.?\d+),(\d*\.?\d+),(\d*\.?\d+),(\d*\.?\d+),(True|False),(\d*\.?\d+),(\d*\.?\d+),(\d*\.?\d+)/,//(\W[-]?(\d*\.?\d+), [-]?(\d*\.?\d+), [-]?(\d*\.?\d+)\W),(True|False),(True|False),(True|False),(True|False),(True|False),(True|False),(True|False),(True|False),(True|False),(True|False)/,
      },
      metaDataObj: {},
      globalDataObj: {},
      documentDataObj: {},
      maps: {
        'control': ['Busan', 'Oasis', 'Ilios', 'Lijiang Tower', 'Nepal'],
        'assault': ['Horizon Lunar Colony', 'Temple of Anubis', 'Volskaya Industries', 'Paris', 'Hanamura'],
        'hybrid': ['King\'s Row', 'Eichenwalde', 'Numbani', 'Hollywood', 'Blizzard World'],
        'escort': ['Route 66', 'Watchpoint: Gibraltar', 'Dorado', 'Rialto', 'Havana', 'Junkertown']
      },
      controls: {
        'Ilios': ['Lighthouse','Well','Ruins'],
        'Lijiang tower': ['Night Market','Garden','Control Tower'],
        'Nepal': ['Village', 'Shrine', 'Sanctum'],
        'Oasis': ['City Center', 'Gardens', 'University'],
        'Busan': ['Downtown', 'Sanctuary', 'Meka Base']
      },
      playerDataDict: {}
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
          _this.isSignin = 1
          const user = result.user
          // user info save
          const uuid = user.uid
          const db = getFirestore()
          const usersRef = collection(db, "users")
          const docRef = doc(usersRef, uuid)
          const userId = result.user.email.split('@')[0]
          _this.initObj['nickname'] = userId
          getDoc(docRef)
            .then(docSnap => {
              if (docSnap.exists()) {
                console.log("exists")
                if (!docSnap.data()['init']) {
                    setDoc(doc(usersRef, uuid), _this.initObj)
                    console.log("user initiated.")
                } else {
                    console.log("user already initiated.")
                }
              } else {
                setDoc(doc(usersRef, uuid), _this.initObj)
                console.log("user initiated.")
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
      location.reload()
    },
    async getsnapshot () {
      const docRef = doc(db, "teams", "NYE", "matches", "20210815_02_SEO_BUSAN", "matchdata", "yakpung", "playerstat", "18.14")
      const matchesSnapshot = await getDoc(docRef)
      if (matchesSnapshot.exists()) {
        console.log("Document data:", matchesSnapshot.data());
      } else {
        console.log("No Data")
      }
    },
    store () {
      console.log(this.loading)
      this.initValues()
      if(this.files.length != 0) {
        this.loading = true
      }
      let _this = this
      return new Promise((resolve, reject) => {
        let fd = new FormData()
        fd.append('files', this.files)
        let file = this.files
        let filename = file.name.split(/\.txt/)[0]
        let reader = new FileReader()
        reader.readAsText(file)
        reader.onload = function(e) {
          let fileContentArray = this.result.split(/\r\n|\n/)
          for (let line = 0 ; line < fileContentArray.length; line++){
            //logconvert algorithm
            if (fileContentArray[line].match(_this.regexDictionary['playerData'])){
              _this.setMatchData(fileContentArray[line].substring(11,fileContentArray[line].length).split(','), filename)
              _this.initFinalBlows(fileContentArray[line].substring(11,fileContentArray[line].length).split(',')[1])
              _this.initResurrect(fileContentArray[line].substring(11,fileContentArray[line].length).split(',')[1])
            } else if (fileContentArray[line].match(_this.regexDictionary['matchInfo'])){
              _this.setMatchInfo(fileContentArray[line].substring(11,fileContentArray[line].length).split(','))
            } else if (fileContentArray[line].match(_this.regexDictionary['playerInfo'])){
              if (Object.keys(_this.playerDataDict).length === 0){
                _this.setPlayerDataDict(fileContentArray[line].substring(11,fileContentArray[line].length).split(','), filename)
              }
            } else if (fileContentArray[line].match(_this.regexDictionary['typeControl'])){
              _this.setTypeControl(fileContentArray[line].substring(11,fileContentArray[line].length).split(','))
            } else if (fileContentArray[line].match(_this.regexDictionary['typeOthers'])){
              _this.setTypeOthers(fileContentArray[line].substring(11,fileContentArray[line].length).split(','))
            } else if (fileContentArray[line].match(_this.regexDictionary['finalblows'])){
              _this.setFinalBlows(fileContentArray[line].substring(11,fileContentArray[line].length).split(','))
            } else if (fileContentArray[line].match(_this.regexDictionary['resurrect'])){
              _this.setResurrect(fileContentArray[line].substring(11,fileContentArray[line].length).split(','))
            } else if (fileContentArray[line].match(_this.regexDictionary['dupstart'])){
              _this.setDupStart(fileContentArray[line].substring(11,fileContentArray[line].length).split(','))
            } else if (fileContentArray[line].match(_this.regexDictionary['dupend'])){
              _this.setDupEnd(fileContentArray[line].substring(11,fileContentArray[line].length).split(','))
            }
          }
          _this.saveMetaData(filename)
          _this.saveMatchData(filename)
          resolve(fileContentArray)
        }
        reader.onerror = function(e) {
          reject(e)
        }
      })
    },
    async saveMetaData (filename) {
      const team = this.userTeam
      const metadatadocRef = doc(db, team, filename, 'metadata', 'metadata')

      await setDoc(metadatadocRef, {
        'metadata': this.metaDataObj
      })
    },
    async saveMatchData (filename) {
      const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay)) 
      const team = this.userTeam
      
      for(let i = 0 ; i < this.metaDataObj['team1player'].length ; i++) {
        const playerdatadocRef = doc(db, team, filename, this.metaDataObj['team1player'][i], 'data')
        await setDoc(playerdatadocRef, {
          'matchData' : this.documentDataObj[this.metaDataObj['team1player'][i]]
        })
      }
      
      for(let i = 0 ; i < this.metaDataObj['team2player'].length ; i++) {
        const playerdatadocRef = doc(db, team, filename, this.metaDataObj['team2player'][i], 'data')
        await setDoc(playerdatadocRef, {
          'matchData' : this.documentDataObj[this.metaDataObj['team2player'][i]]
        })
        if (i == this.metaDataObj['team2player'].length - 1)
        this.updateStatus(filename)
      }
      await wait(60000)
      this.loading = false
    },
    async updateStatus (filename) {
      const team = this.userTeam      
      const collectionMetadataDocRef = doc(db, team, 'metadata')
      const docSnap = await getDoc(collectionMetadataDocRef)
      const toupdate_list = docSnap.data()['toupdate']
      toupdate_list.push(filename)
      console.log(toupdate_list)
      if (docSnap.exists()) {
        await updateDoc(collectionMetadataDocRef, {
          'updatestatus': filename,
          'toupdate': toupdate_list
        })
      } else {
        const filelist = [filename]
        await setDoc(collectionMetadataDocRef, {
          'updatestatus': filename,
          'toupdate': filelist
        })
      }
    },
    setFinalBlows (line){
      if (line[3] in this.playerDataDict){
        this.playerDataDict[line[3]]['deathbyplayer'] = line[2]
        this.playerDataDict[line[3]]['deathbyability'] = line[4]
        this.playerDataDict[line[3]]['deathbyhero'] = this.playerDataDict[line[2]]['hero']
      }
    },
    initFinalBlows (player) {
      this.playerDataDict[player]['deathbyplayer'] = ''
      this.playerDataDict[player]['deathbyhero'] = ''
      this.playerDataDict[player]['deathbyability'] = ''
    },
    setDupStart (line) {
      this.playerDataDict[line[2]]['duplicatestatus'] = 'DUPLICATING'
      this.playerDataDict[line[2]]['duplicatedhero'] = line[3]
    },
    setDupEnd (line) {
      this.playerDataDict[line[2]]['duplicatestatus'] = ''
      this.playerDataDict[line[2]]['duplicatedhero'] = ''
    },
    setResurrect (line) {
      this.playerDataDict[line[2]]['resurrected'] = 'RESURRECTED'
    },
    initResurrect (player) {
      this.playerDataDict[player]['resurrected'] = ''
    },
    setTypeOthers (line) {
      if (line[1] == 'False' && line[2] != '0') {
        this.globalDataObj['team2point'] = Number(line[2])
        this.metaDataObj['team2point'] = Number(line[2])
      } else if (line[1] == 'True' && line[2] != '0') {
        this.globalDataObj['team1point'] = Number(line[2])
        this.metaDataObj['team1point'] = Number(line[2])
      }
    },
    setTypeControl (line) {
      if (line[1] == '100') {
        this.metaDataObj['team1point'] = this.metaDataObj['team1point'] + 1
      }
      if (line[2] == '100') {
        this.metaDataObj['team2point'] = this.metaDataObj['team2point'] + 1
      }
      this.globalDataObj['team1point'] = line[1]
      this.globalDataObj['team2point'] = line[2]
    },
    setMatchInfo (line) {
      this.metaDataObj['map'] = line[0]
      if  (this.maps['control'].includes(this.metaDataObj['map'])) {
        this.metaDataObj['type'] = 'control'
      } else if  (this.maps['assault'].includes(this.metaDataObj['map'])) {
        this.metaDataObj['type'] = 'assault'
      } else if  (this.maps['hybrid'].includes(this.metaDataObj['map'])) {
        this.metaDataObj['type'] = 'hybrid'
      } else if  (this.maps['escort'].includes(this.metaDataObj['map'])) {
        this.metaDataObj['type'] = 'escort'
      }
      this.metaDataObj['team1'] = line[1]
      this.metaDataObj['team2'] = line[2]
      this.globalDataObj['round'] = line[3]
      this.globalDataObj['section'] = this.globalDataObj['section'] + 1
      if (this.metaDataObj['type'] == 'control') {
        this.globalDataObj['roundname'] = this.controls[this.metaDataObj['map']][0]
      } else {
        if (this.globalDataObj['offense'] == ''){
          this.globalDataObj['offense'] = line[2]
          this.globalDataObj['defense'] = line[1]
        } else if (this.globalDataObj['offense'] == line[2]) {
          this.globalDataObj['offense'] = line[2]
          this.globalDataObj['defense'] = line[1]
        } else {
          this.globalDataObj['offense'] = line[1]
          this.globalDataObj['defense'] = line[2]
        } 
      }
    },
    setMatchData (line, filename) {
      let userProfile = line[1]
      if (this.initialTimestamp == 0) {
        this.initialTimestamp = Number(line[0])
      }
      this.playerDataDict[userProfile]['map'] = this.metaDataObj['map']
      this.playerDataDict[userProfile]['player'] = line[1]
      this.playerDataDict[userProfile]['hero'] = line[2]
      this.playerDataDict[userProfile]['section'] = this.globalDataObj['section']
      this.playerDataDict[userProfile]['timestamp'] = line[0] - this.initialTimestamp
      //team1 team2에 따른 point 설정
      if (this.metaDataObj['team1'] == line[22]){
        this.playerDataDict[userProfile]['point'] = this.globalDataObj['team1point']
      } else {
        this.playerDataDict[userProfile]['point'] = this.globalDataObj['team2point']
      }
      //roundname 설정
      if (this.metaDataObj['type'] == 'control') {
        this.playerDataDict[userProfile]['roundname'] = this.globalDataObj['roundname']
      } else {
        if (this.globalDataObj['offense'] == line[22]) {
          this.playerDataDict[userProfile]['roundname'] = 'offense'
        } else {
          this.playerDataDict[userProfile]['roundname'] = 'defense'
        }
      }
      this.playerDataDict[userProfile]['herodamagedealt'] = line[3]
      this.playerDataDict[userProfile]['barrierdamagedealt'] = line[4]
      this.playerDataDict[userProfile]['damageblocked']= line[5]
      this.playerDataDict[userProfile]['damagetaken']= line[6]
      this.playerDataDict[userProfile]['deaths'] = line[7]
      this.playerDataDict[userProfile]['eliminations'] = line[8]
      this.playerDataDict[userProfile]['finalblows']= String(Number(line[9]) +Number(line[11]))
      this.playerDataDict[userProfile]['environmentaldeaths'] = line[10]
      this.playerDataDict[userProfile]['environmentalkills']= line[11]
      this.playerDataDict[userProfile]['healingdealt']= line[12]
      this.playerDataDict[userProfile]['objectivekills'] = line[13]
      this.playerDataDict[userProfile]['solokills']= line[14]
      this.playerDataDict[userProfile]['ultimatesearned'] = line[15]
      this.playerDataDict[userProfile]['ultimatesused']= line[16]
      this.playerDataDict[userProfile]['healingreceived'] = line[17]
      this.playerDataDict[userProfile]['ultimatecharge']= line[18]
      this.playerDataDict[userProfile]['position'] = line[19] + ',' + line[20] + ',' + line[21]
      this.playerDataDict[userProfile]['team'] = line[22]
      this.playerDataDict[userProfile]['cooldown1'] = line[23]
      this.playerDataDict[userProfile]['cooldown2']= line[24]
      this.playerDataDict[userProfile]['cooldownsecondaryfire'] = line[25]
      this.playerDataDict[userProfile]['cooldowncrouching']= line[26]
      if(line[27] == 'True') {
        this.playerDataDict[userProfile]['isalive'] = '1'
      } else {
        this.playerDataDict[userProfile]['isalive'] = '0'
      }
      this.playerDataDict[userProfile]['maxhealth']= line[29]
      this.playerDataDict[userProfile]['health']= line[30]
      this.playerDataDict[userProfile]['defensiveassists'] = line[31]
      this.playerDataDict[userProfile]['offensiveassists'] = line[32]
      this.playerDataDict[userProfile]['isburning']= line[33]
      this.playerDataDict[userProfile]['isknockeddown'] = line[34]
      this.playerDataDict[userProfile]['isasleep']= line[35]
      this.playerDataDict[userProfile]['isfrozen']= line[36]
      this.playerDataDict[userProfile]['isunkillable'] = line[37]
      if(line[38] == 'True') {
        this.playerDataDict[userProfile]['isinvincible'] = '1'
      } else {
        this.playerDataDict[userProfile]['isinvincible'] = '0'
      }
      this.playerDataDict[userProfile]['ishacked']= line[39]
      this.playerDataDict[userProfile]['isrooted'] = line[40]
      this.playerDataDict[userProfile]['isstunned']= line[41]
      /*
      this.playerDataDict[userProfile]['facingdirection'] = line[42] + ',' + line[43] + ',' + line[44]
      this.playerDataDict[userProfile]['team1player1inviewangle'] = line[45]
      this.playerDataDict[userProfile]['team1player2inviewangle'] = line[46]
      this.playerDataDict[userProfile]['team1player3inviewangle'] = line[47]
      this.playerDataDict[userProfile]['team1player4inviewangle'] = line[48]
      this.playerDataDict[userProfile]['team1player5inviewangle'] = line[49]
      this.playerDataDict[userProfile]['team2player1inviewangle'] = line[50]
      this.playerDataDict[userProfile]['team2player2inviewangle'] = line[51]
      this.playerDataDict[userProfile]['team2player3inviewangle'] = line[52]
      this.playerDataDict[userProfile]['team2player4inviewangle'] = line[53]
      this.playerDataDict[userProfile]['team2player5inviewangle'] = line[54]
      */
      
      this.documentDataObj[userProfile].push(this.clone(this.playerDataDict[userProfile]))
    },
    clone (obj) {
      if (obj === null || typeof(obj) !== 'object')
      return obj;

      let copy = obj.constructor();

      for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) {
          copy[attr] = this.clone(obj[attr]);
        }
      }

      return copy;
    },
    initValues () {
      let metaDataObj = {
        'map': '',
        'team1point': 0,
        'team2point': 0,
        'team1': '',
        'team2': '',
        'team1player': [],
        'team2player': [],
        'type': ''
      }
      let globalDataObj = {
        'round': 0,
        'section': -1,
        'roundname': '',
        'team1point': 0,
        'team2point': 0,
        'offense' : '',
        'defense' : ''
      }
      this.initialTimestamp = 0,
      this.metaDataObj = this.clone(metaDataObj)
      this.globalDataObj = this.clone(globalDataObj)
      this.playerDataDict = {}
      this.team1OffenseFlag = false
    },
    setPlayerDataDict (line, filename) {
      let matchDataObj = {
        'map': '',
        'section': 0,
        'point': 0,
        'roundname': '',
        'timestamp': 0,
        'team': '',
        'player': '',
        'hero': '',
        'herodamagedealt': '0',
        'barrierdamagedealt': '0',
        'damabeblocked': '0',
        'damagetaken': '0',
        'deaths': '0',
        'eliminations': '0',
        'finalblows': '0',
        'environmentaldeaths': '0',
        'environmentalkills': '0',
        'healingdealt': '0',
        'objectivekills': '0',
        'solokills': '0',
        'ultimatesearned': '0',
        'ultimatesused': '0',
        'healingreveiced': '0',
        'ultimatecharge': '0',
        'cooldown1': '0',
        'cooldown2': '0',
        'cooldownsecondaryfire': '0',
        'cooldowncrouching': '0',
        'isalive': '',
        'position': '',
        'maxhealth': '0',
        'deathbyhero': '',
        'deathbyability': '',
        'deathbyplayer': '',
        'resurrected': '',
        'duplicatedhero': '',
        'duplicatestatus': '',
        'health': '0',
        'defensiveassists': '0',
        'offensiveassists': '0',
        'isburning': '0',
        'isknockeddown': '0',
        'isinvincible': '0',
        'isasleep': '0',
        'isfrozen': '0',
        'isunkillable': '0',
        'isrooted': '0',
        'isstunned': '0',
        'ishacked': '0',
        'facingdirection': '(0,0,0)',
        'team1player1inviewangle':false,
        'team1player2inviewangle':false,
        'team1player3inviewangle':false,
        'team1player4inviewangle':false,
        'team1player5inviewangle':false,
        'team2player1inviewangle':false,
        'team2player2inviewangle':false,
        'team2player3inviewangle':false,
        'team2player4inviewangle':false,
        'team2player5inviewangle':false,
      }
      const team = this.userTeam
      const matchdatacollRef = collection(db, team)
      const matchdatadocRef = doc(db, team, filename)
      setDoc(doc(matchdatacollRef, filename), {
        'startdate': Timestamp.fromDate(new Date())
      })

      for (let i = 0; i < line.length; i++) {
        if (line[i] === '0') {
          continue
        } else {
          this.playerDataDict[line[i]] = this.clone(matchDataObj)
          this.playerDataDict[line[i]]['player'] = line[i]
          this.documentDataObj[line[i]] = []
          if (i <= 5) {
            this.metaDataObj['team1player'].push(line[i])
          } else {
            this.metaDataObj['team2player'].push(line[i])
          }            
        }
      }
    }
  },
  mounted() {
    const auth = getAuth()
    const db = getFirestore()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uuid = user.uid
        const usersRef = collection(db, 'users')
        const docRef = doc(usersRef, uuid)
        getDoc(docRef)
          .then(docSnap => {
            if (docSnap.exists()) {
              this.userTeam = docSnap.data()['team']
            }
          })
      }
    })
    
  }
})
</script>
-->