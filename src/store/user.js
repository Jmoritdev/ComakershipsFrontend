import axios from '../axios-auth'
import router from "@/router";

export const userStore = {
    state: () => ({
        token: "",
        userId: null,
        userType: null,
        name: "",
        email: "null",
        companyId: null,
    }),
    mutations: {
        authUser(state, userData) {
            state.token = userData.Token
            state.userId = userData.UserId
            state.userType = userData.UserType
        }
    },
    actions: {
        async login({commit}, authData) {

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
                    } else {
                        alert("email or password was incorrect, or you are not a company admin")
                    }
                })
                .catch((error) => {
                    this.error = error;
                    alert("email or password was incorrect, or you are not a company admin")
                });

        }
    },
    getters: {
        isAuthenticated(state) {
            return state.token != null;
        },
        name(state) {
            return state.name;
        },
        email(state) {
            return state.email;
        },
        companyId(state) {
            return state.companyId;
        }
    },
}