<template>
  <v-app>
    <Header/>
    <v-main>
      <router-view/>
    </v-main>
     <v-snackbar
       v-model="$store.state.sb.act"
       :color="$store.state.sb.color"
       timeout=3000
       top
     >
       {{ $store.state.sb.msg }}
       <v-btn
         text
         @click="$store.commit('pop', { act: false })"
       >
         Close
       </v-btn>
     </v-snackbar>
    <Footer/>
  </v-app>
</template>

<!-- eslint-disable -->
<script>
import Header from './components/vHeader.vue'
import Footer from './components/vFooter.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  methods: {
  }
}
</script>

<style>
  #app {
    background: url('./assets/Background.jpeg');
    background-position: center;
    background-repeat: repeat;
    background-size: cover;
    position: relative;
  }
</style>
