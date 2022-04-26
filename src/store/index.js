
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    tableauViz: '',
    isReloaded: 0,
    isSignin: 0,
    fireUser: null,
    fireUserToken: null,
    sb: {
      act: false,
      msg: '',
      color: 'error'
    }
  },
  mutations: {
    setFireUser (state, fireU) {
      state.fireUser = fireU
    },
    setFireUserToken (state, fireUToken) {
      state.fireUserToken = fireUToken
    },
    initFireUser (state) {
      state.fireUser = null
    },
    initFireUserToken (state) {
      state.fireUserToken = null
    },
    setLogin (state) {
      state.isSignin = 1
    },
    setLogout (state) {
      state.isSignin = 0
    },
    setUserTableauViz (state, tableauViz) {
      state.tableauViz = tableauViz
    },
    setOffUserTableauViz (state) {
      state.tableauViz = ''
    },
    getTableauViz (state) {
      return state.tableauViz
    },
    pop (state, d) {
      state.sb.msg = d.msg
      state.sb.color = d.color
      state.sb.act = false
      if (d.act === undefined) state.sb.act = true
    }
  },
  plugins: [
    createPersistedState()
  ]
})
