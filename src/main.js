import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/index'
import { store }  from  './store/store'
import axios from "axios";

Vue.config.productionTip = false
Vue.config.devtools = false

// keep Axios header after refresh
const token = localStorage.getItem('user-token');
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
