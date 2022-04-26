<template>
  <div class="container">
    <div class="file-upload-container"
    @dragenter="onDragenter"
    @dragover="onDragover"
    @dragleave="onDragleave"
    @drop="onDrop"
    @click="onClick"
    >
    <v-sheet color="rgba(2, 7, 21, 0.5)" class="file-upload" :class="isDragged ? 'dragged' : ''">
        <v-row>
            <v-col sm="12" cols="12">
                <v-icon x-large dark>mdi-cloud-upload</v-icon>
                <p>&nbsp;&nbsp; Drag & Drop Your Scrim log </p>
            </v-col>
        </v-row>
    </v-sheet>
    </div>
    <!-- 파일 업로드 -->
    <input type="file" ref="fileInput" class="file-upload-input" @change="onFileChange" multiple>
    <!-- 업로드된 리스트 -->
    <v-sheet class="file-upload-list" max-height="272" rounded="lg" color="rgba(2, 7, 21, 0.5)" dark>
      <v-progress-circular v-if="loading === true & currentFileCount >= 1" indeterminate color="#FFBB00"></v-progress-circular>
      <v-btn v-else-if="loading === false & currentFileCount >= 1" style="color:#FFBB00" depressed color="transparent" class="file-upload-list__item__btn-submit" @click="handleStore()">
          Submit
      </v-btn>
      <div class="file-upload-list__item" v-for="(file, index) in fileList" :key="index">
        <div class="file-upload-list__item__data">
          <v-icon class="ma-3">mdi-file</v-icon>
          <div class="file-upload-list__item__data-name">
              {{ file.name }}
          </div>
        </div>
        <v-spacer></v-spacer>
        <v-btn depressed color="transparent" class="file-upload-list__item__btn-remove" @click="handleRemove(index)">
            Delete
        </v-btn>
      </div>
    </v-sheet>
  </div>
</template>
<!-- eslint-disable -->
<script>
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { getFirestore, getDoc, collection, doc} from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import axios from 'axios'

export default ({
  name: 'DragAndDrop',
  data () {
    return {
      errSnackbar: false,
      finSnackbar: false,
      loading: false,
      currentFileCount: 0,
      isDragged: false,
      isFileOnBox: false,
      userTeam: '',
      fileList: [],
    }
  },
  methods: {
    onClick () {
      this.$refs.fileInput.click()
    },
    onDragenter (event) {
      // class 넣기
      this.isDragged = true
    },
    onDragleave (event) {
      // class 삭제
      this.isDragged = false
    },
    onDragover (event) {
      // 드롭을 허용하도록 prevetDefault() 호출
      event.preventDefault()
    },
    onDrop (event) {
      // 기본 액션을 막음 (링크 열기같은 것들)
      event.preventDefault()
      this.isDragged = false
      const files = event.dataTransfer.files
      this.addFiles(files)
    },
    onFileChange (event) {
      const files = event.target.files
      this.addFiles(files)
    },
    async addFiles (files) {
      this.currentFileCount += files.length
      if(this.currentFileCount > 0) {
          this.isFileOnBox = true
      }
      for(let i = 0; i < files.length; i++) {
        const src = await this.readFiles(files[i])
        files[i].src = src
        this.fileList.push(files[i])
      }
    },
    // FileReader를 통해 파일을 읽어 thumbnail 영역의 src 값으로 셋팅
    async readFiles (files) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = async (e) => {
          resolve(e.target.result) 
        }
        reader.readAsDataURL(files)
      })
    },
    handleRemove (index) {
      this.currentFileCount -= 1
      if(this.currentFileCount == 0) {
          this.isFileOnBox = false
      }
      this.fileList.splice(index, 1)
      this.loading = false
    },
    handleStore (index) {
      const userTeam = this.userTeam
      const fileList = this.fileList
      let fileLen = fileList.length
      for (const file of fileList)
      {
        const date = new Date(file.lastModified)
        console.log(date)
        const refPath = userTeam + '/' + file.name
        this.loading = true
        const _this = this

        const storage = getStorage()
        const scrimlogRef = ref(storage, refPath)
        const AWS_LAMBDA_API_GATEWAY = process.env.VUE_APP_AWS_LAMBDA_API_GATEWAY
          
        const uploadTask = uploadBytesResumable(scrimlogRef, file)
        uploadTask.on('state_changed', 
          (snapshot) => {
            const progress =  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            if (progress == 100)
            {
              console.log('Upload is ' + progress + '% done')
            }
          },
          (error) => {
            this.loading = false
            switch (error.code) {
              case 'storage/unauthorized':
                alert('Permission Error')
                break
              case 'storage/canceled':
                alert('Cancled by user')
                break
              case 'storage/unknown':
                console.log('error-serverResponse')
                break
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            axios.get(AWS_LAMBDA_API_GATEWAY, 
                {
                  params:{
                    teamName: userTeam,
                    fileName: file.name,
                    date: date
                  }
                }
            )
            .then(function (response){
              console.log("Complete")
            })
            .catch(function (error){
              this.$store.commit('pop', { msg: 'Error on upload', color: 'red'})
            })
            .then(function (){
              _this.handleRemove(index)
              _this.loading = false
              fileLen = fileLen - 1
              if (fileLen == 0)
              {
                _this.$store.commit('pop', { msg: 'Files Uploaded. Check data on Scrim tab few minutes later.', color: 'green'})
              }
            })
          }
        )
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
      } else {
        console.log('no user')
      }
    })
  }
})
</script>

<style scoped lang="scss">
.v-progress-circular {
  margin: 1rem;
}
.container {
  height: 15vh;
  width: 65vh;
  margin: 0 auto;
}
.file-upload {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 15vh;
  border: transparent;
  border-radius: 20px;
  cursor: pointer;
  color: white;
  &.dragged {
    border: 1px dashed powderblue;
    opacity: .6;
  }
  &-container {
    height: 15vh;
    margin: 0 auto;
    box-shadow: 0 0.625rem 1.25rem #0000001a;
    background-color: rgba(2, 7, 21, 0.5);
    border-radius: 20px;
  }
  &-input {
    display: none;
  }
  &-list {
    overflow-y:auto;
    background-color: rgba(2, 7, 21, 0.5);
    margin-top: 10px;
    width: 100%;
    &__item {
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &__data {
        display: flex;
        align-items: center;
        &-thumbnail {
          margin-right: 10px;
          border-radius: 20px;
          width: 120px;
          height: 120px;
        }
      }
    }
  }
}
</style>