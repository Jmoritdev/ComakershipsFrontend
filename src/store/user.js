import axios from '../axios-auth'
import router from "@/router";

export const userStore = {
    state: () => ({
        token: localStorage.getItem('user-token') || null,
        userId: null,
        userType: localStorage.getItem('user-type') || null,
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
            state.reviews = userData.reviews;
        },
        setName(state, data) {
            state.name = data.name;
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
                    localStorage.setItem('user-token', res.data.Token);
                    localStorage.setItem('user-type', res.data.UserType);
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
            localStorage.removeItem('user-type');
            localStorage.removeItem('user-token');
            delete axios.defaults.headers.common['Authorization'];
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

        getUser({commit}) {
            axios
                .get("api/Myself")
                .then((response) => {
                    commit('setUser', {
                        name: response.data.name,
                        email: response.data.email,
                        reviews: [],
                    });
                })
                .catch((error) => {
                    this.error = error;
                    alert("something went wrong while getting userdata");
                });
        },

        // eslint-disable-next-line no-empty-pattern
        changePassword({}, passwordData) {
            axios
                .post('api/User/ChangePassword', passwordData)
                .then(() => {
                    alert("password has been changed")
                })
                .catch((error) => {
                    this.error = error;
                    alert("Something went wrong, please try again later");
                })
        }

    },
    getters: {
        // !! = convert object to boolean, if 0/null/undefined. etc it is false
        isAuthenticated: state => state.token !== null,
        userType(state) {
            return state.userType;
        }
    },
}