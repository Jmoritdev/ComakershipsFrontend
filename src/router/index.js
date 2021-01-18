import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/components/Login"
import Company from "@/components/Company"
import Comakerships from "@/components/Comakerships";
import Review from "@/components/Review";
import Account from "@/components/Account";
// import store from '@/store/store'

Vue.use(VueRouter)
//
// const ifNotAuthenticated = (to, from, next) => {
//   if (!store.getters.isAuthenticated()) {
//     next()
//     return
//   }
//   next('/')
// }
//
// const ifAuthenticated = (to, from, next) => {
//   if (store.getters.isAuthenticated) {
//     next()
//     return
//   }
//   next('/login')
// }

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Login
  },
  {
    path: '/company/',
    name: 'Company',
    component: Company
  },
  {
    path: '/reviews/',
    name: 'Reviews',
    component: Review
  },
  {
    path: '/comakerships/',
    name: 'Comakerships',
    component: Comakerships
  },
  {
    path: '/account/',
    name: 'My account',
    component: Account
  }
]

const router = new VueRouter({
  mode: 'history',
  routes : routes,
})

export default router
