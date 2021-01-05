import axios from '../axios-auth'
import router from "@/router";

export const userStore = {
    state: () => ({
        token: null,
        userId: null,
        userType: null,
        name: "",
        email: "",
    }),
    mutations: {
        authUser(state, userData) {
            state.token = userData.Token;
            state.userId = userData.UserId;
            state.userType = userData.UserType;
        },
        setUser(state, userData) {
            state.name = userData.name;
            state.email = userData.email;
        },
        resetState(state) {
            state.token = null;
            state.userId = null;
            state.userType = null;
            state.name = "";
            state.email = "";
        }
    },
    actions: {
        login({commit}, authData) {

            axios
                .post("api/login", {
                    email: authData.email,
                    password: authData.password,
                })
                .then((res) => {
                    if (res.data.UserType === "StudentUser") {
                        return false;
                    }
                    commit('authUser', res.data);
                    axios.defaults.headers.common['Authorization'] = "Bearer " + res.data.Token;
                    return true;
                })
                .then((response) => {
                    if (response === true) {
                        router.push({name: 'Company'});
                    }
                })
                .catch((error) => {
                    this.error = error;
                    alert("email or password was incorrect, or you are not a company admin");
                });

        },

        logout({commit}) {
            commit('resetState');
            router.push({ name: 'Home'});
        },

        getUser({commit}, id) {
            axios
                .get("api/CompanyUser/" + id)
                .then((response) => {
                    console.log(response.data);
                    commit('setUser', {
                        name: response.data.name,
                        email: response.data.email
                    });
                    commit('setCompanyDetails', response.data.company)
                })
                .catch((error) => {
                    this.error = error;
                    alert("something went wrong while getting userdata");
                });
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.token !== null;
        },
        userId(state) {
            return state.userId;
        },
        name(state) {
            return state.name;
        },
        email(state) {
            return state.email;
        },
    },
}