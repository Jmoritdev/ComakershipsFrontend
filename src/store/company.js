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
            if(companyData.reviews !== null) {
                state.reviews = companyData.reviews
            }
        },
        updateState(state, newData) {
            if (newData.name) {
                state.name = newData.name;
            }
            state.street = newData.street;
            state.city = newData.city;
            state.zipcode = newData.zipcode;
            state.description = newData.description;
        },
        resetCompanyState(state){
            state.companyId = null;
            state.name = "";
            state.description = "";
            state.registrationDate = null;
            state.street = "";
            state.city = "";
            state.zipcode = "";
            state.logo = "";
            state.reviews = [];
        }
    },
    actions: {
        getCompanyDetails({commit, dispatch}, id) {
            axios
                .get("api/CompanyUser/" + id)
                .then((response) => {
                    commit('setName', {
                        name: response.data.name,
                    });
                    commit('setCompanyDetails', response.data.company)
                    dispatch('getEmployees', response.data.company.id)
                })
                .catch((error) => {
                    this.error = error;
                    alert("something went wrong while getting userdata");
                });
        },
        updateCompany({commit}, companyData) {

            if(companyData.name === this.state.company.name) {
                delete companyData.name;
            }

            axios
                .put(`api/company/${this.state.company.companyId}`, companyData)
                .then((response) => {
                    console.log(response);
                    commit('updateState', companyData);
                    alert("Company successfully updated");
                })
                .catch((error) => {
                    this.error = error;
                    alert("Something went wrong, try again later");
                })

        },
        // eslint-disable-next-line no-empty-pattern
        createReview({}, reviewData) {
            axios
                .post('api/review', {
                    companyId: this.state.company.companyId,
                    studentUserId: reviewData.studentUserId,
                    rating: reviewData.rating,
                    comment: reviewData.comment,
                    forCompany: false,
                })
                .then((response) => {
                    console.log(response.data);
                    alert("New review created")
                })
                .catch((error) => {
                    this.error = error;
                    alert("Could not create new review");
                })
        }
    },
    getters: {}
}