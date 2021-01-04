// eslint-disable-next-line no-unused-vars
const userStore = {
    state: () => ({
        token: null,
        name: null,
        email: null,
        companyId: null,
    }),
    mutations: {},
    actions: {},
    getters: {
        isAuthenticated(state) {
            return state.token != null;
        }
    },
}