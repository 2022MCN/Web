import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "about" */ '../views/Auth.vue')
  },
  {
    path: '/league',
    name: 'League',
    component: () => import(/* webpackChunkName: "about" */ '../views/League.vue')
  },
  {
    path: '/stats',
    name: 'Stats',
    component: () => import(/* webpackChunkName: "about" */ '../views/Stats.vue')
  },
  {
    path: '/manual',
    name: 'Manual',
    component: () => import(/* webpackChunkName: "about" */ '../views/Manual.vue')
  },
  {
    path: '/mypage',
    name: 'Mypage',
    component: () => import(/* webpackChunkName: "about" */ '../views/Mypage.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import(/* webpackChunkName: "about" */ '../views/Contact.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/files',
    name: 'Files',
    component: () => import(/* webpackChunkName: "about" */ '../views/Files.vue')
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "about" */ '../views/e404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
