import axios from "../axios-auth"

export const companyStore = {
    state: () => ({
        companyId: null,
        name: "",
        description: "",
        registrationDate: null,
        street: "",
        city: "",
        zipcode: "",
        logo: ""
    }),
    mutations: {
        setCompanyId(state, companyId) {
            state.companyId = companyId;
        },
        setCompanyDetails(state, companyData) {
            state.name = companyData.Name;
            state.description = companyData.Description;
            state.registrationDate = companyData.RegistrationDate;
            state.street = companyData.Street;
            state.city = companyData.City;
            state.zipcode = companyData.Zipcode;
            state.logo = companyData.Logo;
        }
    },
    actions: {
        getCompany({commit}) {

            commit('setCompanyId', this.$store.state.user.companyId)

            axios
                .get('api/company/' + this.state.companyId)
                .then((response) => {
                    console.log(response.data);
                    commit('setCompanyDetails', response.data);
                }).catch((error) => {
                    this.error = error;
                    alert("Something went wrong while getting company data");
            })
        }
    },
    getters: {
        name(state) {
            return state.name;
        }
    }
}