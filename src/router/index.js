import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/components/Login"
import Company from "@/components/Company"
import Comakerships from "@/components/Comakerships";
import Review from "@/components/Review";
import Account from "@/components/Account";

Vue.use(VueRouter)

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
