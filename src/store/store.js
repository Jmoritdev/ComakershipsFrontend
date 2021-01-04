import Vue from 'vue'
import Vuex from 'vuex'
import userStore from './user'
import companyStore from './company'
import comakershipStore from './comakership'
import employeesStore from './employees'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        user: userStore,
        company: companyStore,
        comakerships: comakershipStore,
        employees: employeesStore
    }
});