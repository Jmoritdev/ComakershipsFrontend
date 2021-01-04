import Vue from 'vue'
import Vuex from 'vuex'
import userStore from './user'
import companyStore from './company'
import comakershipStore from './comakership'
import employeeStore from './employees'
// import axios from '../axios-auth';

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        user: userStore,
        company: companyStore,
        comakerships: comakershipStore,
        employees: employeeStore
    }
    // state: {
    //     token: null,
    //     userType: null,
    //     userId: null
    // },
    // getters: {
    //     isAuthenticated(state) {
    //         return state.token != null;
    //     }
    // },
    // mutations: {
    //     authUser(state, userData) {
    //         state.token = userData.Token
    //         state.userId = userData.UserId
    //         state.userType = userData.UserType
    //     }
    // },
    // actions: {
    //     login({ commit }, authData) {
    //         axios
    //             .post("api/login", {
    //                 email: authData.email,
    //                 password: authData.password,
    //             })
    //             .then((res) => {
    //                 console.log(res.data);
    //                 commit('authUser', res.data);
    //                 axios.defaults.headers.common['Authorization'] = "Bearer "  + res.data.Token;
    //                 localStorage.token = res.data.Token;
    //                 localStorage.userId = res.data.userId;
    //                 localStorage.userType = res.data.UserType;
    //             })
    //             .catch((error) => (this.error = error));
    //     }
    // }

});