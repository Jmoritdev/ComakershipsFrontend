import axios from '../axios-auth'
import router from "@/router";

export const userStore = {
    state: () => ({
        token: null,
        userId: null,
        userType: null,
        name: "",
        email: "",
        reviews: [],
        programs: [],
    }),
    mutations: {
        setPrograms(state, programs) {
            state.programs = programs;
        },
        authUser(state, userData) {
            state.token = userData.Token;
            state.userId = userData.UserId;
            state.userType = userData.UserType;
        },
        setUser(state, userData) {
            state.name = userData.name;
            state.email = userData.email;
            if (userData.reviews !== null) {
                state.reviews = userData.reviews;
            }
        },
        resetUserState(state) {
            state.token = null;
            state.userId = null;
            state.userType = null;
            state.name = "";
            state.email = "";
        }
    },
    actions: {
        getPrograms({commit}) {
            axios
                .get('api/programs')
                .then((resp) => {
                    commit('setPrograms', resp.data);
                })
                .catch((error) => {
                    this.error = error;
                })
        },

        login({commit}, authData) {
            axios
                .post("api/login", {
                    email: authData.email,
                    password: authData.password,
                })
                .then((res) => {
                    commit('authUser', res.data);
                    axios.defaults.headers.common['Authorization'] = "Bearer " + res.data.Token;
                    if (res.data.UserType === "CompanyUser") {
                        router.push({name: 'Company'});
                    }
                    if (res.data.UserType === "StudentUser") {
                        router.push({name: 'Comakerships'});
                    }
                })
                .catch((error) => {
                    this.error = error;
                    alert("email or password was incorrect, or you are not a company admin");
                });

        },

        // eslint-disable-next-line no-empty-pattern
        register({}, newUserData) {
            axios
                .post('api/company', newUserData)
                .then((response) => {
                    alert(response.data);
                }).catch((error) => {
                this.error = error;
            })
        },

        // eslint-disable-next-line no-empty-pattern
        registerStudent({}, studentData) {
            axios
                .post('api/Students', studentData)
                .then(() => {
                    alert("successfully registered");
                })
                .catch((error) => {
                    this.error = error;
                    alert("Something went wrong, try again later");
                })
        },

        logout({commit}) {
            commit('resetUserState');
            commit('resetCompanyState');
            commit('resetEmployeeState');
            commit('resetComakershipState');
            router.push({name: 'Home'});
        },

        putUser({commit}, userData) {
            axios
                .put(`api/CompanyUser`, userData)
                .then(() => {
                    commit('setUser', userData);
                    alert("Your details have been updated");
                })
                .catch((error) => {
                    this.error = error;
                    alert("Something went wrong, try again later");
                })
        },

        getStudentUser({commit}, id) {
            axios
                .get("api/Students/" + id)
                .then((response) => {
                    commit('setUser', {
                        name: response.data.name,
                        email: response.data.email,
                        reviews: response.data.reviews,
                    });
                })
                .catch((error) => {
                    this.error = error;
                    alert("something went wrong while getting userdata");
                });
        },

        getCompanyUser({commit}, id) {
            axios
                .get("api/CompanyUser/" + id)
                .then((response) => {
                    commit('setUser', {
                        name: response.data.name,
                        email: response.data.email,
                        reviews: null,
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
        userType(state) {
            return state.userType;
        }
    },
}