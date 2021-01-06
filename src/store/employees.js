import axios from "../axios-auth";

export const employeesStore = {
    state: () => ({
        employees: [],
        employeeToEdit: {},
        employeeToDelete: {},
    }),
    mutations: {
        setEmployees(state, employees) {
            state.employees = employees;
        },
        resetEmployeeState(state){
            state.employees = [];
            state.employeeToEdit = {};
            state.employeeToDelete = {};
        }
    },
    actions: {
        getEmployees({commit}, companyId) {
            axios
                .get(`api/company/${companyId}/employees`)
                .then((resp) => {
                    console.log(resp.data);
                    commit('setEmployees', resp.data);
                })
                .catch((error) => {
                    this.error = error;
                })
        }        
    },
    getters: {}
}