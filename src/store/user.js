import axios from '../axios-auth'
import router from "@/router";

export const userStore = {
    state: () => ({
        token: null,
        userId: null,
        userType: null,
        name: "",
        email: "null",
        companyId: null,
    }),
    mutations: {
        authUser(state, userData) {
            state.token = userData.Token;
            state.userId = userData.UserId;
            state.userType = userData.UserType;
        },
        setUser(state, userData) {
            state.name = userData.Name;
            state.email = userData.Email;
            state.companyId = userData.CompanyId;
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
                    // console.log(this.state.user.name)
                    if (response === true) {
                        router.push({name: 'Company'});
                    }
                })
                .catch((error) => {
                    this.error = error;
                    alert("email or password was incorrect, or you are not a company admin");
                });

        },

        getUser({commit}, id) {
            if (id.isInteger) {
                axios
                    .get("api/CompanyUser/" + id)
                    .then((response) => {
                        console.log(response.data);
                        commit('setUser', response.data);
                    })
                    .catch((error) => {
                        this.error = error;
                        alert("something went wrong while getting userdata");
                    });
            }
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.token != null;
        },
        userId(state) {
            return state.userId;
        },
        userType(state) {
            return state.userType;
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