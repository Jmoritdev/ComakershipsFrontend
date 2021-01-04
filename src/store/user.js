import axios from '../axios-auth';
// eslint-disable-next-line no-unused-vars
const userStore = {
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
            axios
                .post("api/login", {
                    email: authData.email,
                    password: authData.password,
                })
                .then((res) => {
                    console.log(res.data);
                    commit('authUser', res.data);
                    axios.defaults.headers.common['Authorization'] = "Bearer " + res.data.Token;
                    localStorage.token = res.data.Token;
                    localStorage.userId = res.data.userId;
                    localStorage.userType = res.data.UserType;
                })
                .catch((error) => (this.error = error));
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