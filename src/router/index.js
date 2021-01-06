import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/components/Login"
import Company from "@/components/Company"
import Comakerships from "@/components/Comakerships";
import Employees from "@/components/Employees";

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
    path: '/employees/',
    name: 'Employees',
    component: Employees
  },
  {
    path: '/comakerships/',
    name: 'Comakerships',
    component: Comakerships
  }
]

const router = new VueRouter({
  mode: 'history',
  routes : routes,
})

export default router
