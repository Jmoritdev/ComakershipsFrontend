import axios from '../axios-auth'

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
        login({ commit }, authData) {
            // axios
            //     .post("http://127.0.0.1:7071/api/Login", {
            //         Email: this.authData.Email,
            //         Password: this.authData.password,
            //     })
            //     .then((res) =>
            //             localStorage.setItem('bearer-token', 'Bearer ' + res.data.Token),
            //         this.authData.success = "Successfully logged in",
            //     )
            //     .catch((error) => (this.authData.error = error));

            axios
                .post("api/login", {
                    Email: authData.email,
                    Password: authData.password,
                })
                .then((res) => {
                    if (res.data.UserType === "studentUser") {
                        return false;
                    }
                    console.log(res.data);
                    commit('authUser', res.data);
                    axios.defaults.headers.common['Authorization'] = "Bearer " + res.data.Token;
                    localStorage.token = res.data.Token;
                    localStorage.userId = res.data.userId;
                    localStorage.userType = res.data.UserType;
                    return true;
                })
                .catch((error) => {
                    this.error = error;
                    return false;
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