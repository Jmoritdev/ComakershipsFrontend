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
        logo: "",
        reviews: [],
    }),
    mutations: {
        setCompanyDetails(state, companyData) {
            state.companyId = companyData.id;
            state.name = companyData.name;
            state.description = companyData.description;
            state.registrationDate = companyData.registrationDate;
            state.street = companyData.street;
            state.city = companyData.city;
            state.zipcode = companyData.zipcode;
            state.logo = companyData.logo;
        }
    },
    actions: {
        getCompany({commit}) {
            axios
                .get('api/company/' + this.state.company.companyId)
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
    }
}