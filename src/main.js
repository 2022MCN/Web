import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { initializeApp } from 'firebase/app'
import firebaseConfig from './firebaseConfig'
import 'vue-tableau'
import { store } from './store'

//  eslint-disable-next-line
const firebase = initializeApp(firebaseConfig)
Vue.config.productionTip = false

new Vue({
  router,
  store: store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
