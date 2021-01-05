import axios from '../axios-auth'

export const comakershipStore = {
    state: () => ({
        comakerships: [],
        comakership: {},
        comakershipComplete: {},
        comakershipToEdit: {},
        programs: [],
    }),
    mutations: {
        setComakerships(state, comakerships){
            state.comakerships = comakerships
        },
        setComakership(state, comakership){
            state.comakership = comakership
        },
        setComakershipComplete(state, comakershipComplete){
            state.comakershipComplete = comakershipComplete
        },
        setComakershipToEdit(state, comakershipToEdit){
            state.comakershipToEdit = comakershipToEdit
        },
        setPrograms(state, programs){
            state.programs = programs
        }
    },
    actions: {
        getAllComakerships({commit}){
            axios
                .get("/api/comakerships")
                .then((response) => {
                    commit('setComakerships', response.data);
                })
                .catch((error) => {
                    this.error = error;
                });
        },
        getComakershipComplete({commit}, id){
            axios
                .get('/api/comakerships/'+id+'/complete')
                .then((response) => {
                    commit('setComakershipComplete', response.data);
                })
                .catch((error) => {
                    this.error = error;
                });
        },
        postComakership({dispatch}, postData){
            axios
                .post("/api/comakerships", postData)
                .then((response) => {
                    console.log(response.data);
                    dispatch('getAllComakerships');
                })
                .catch((error) => {
                    this.error = error;
                });
        },
        loadComakershipToEdit({commit}, id){
            axios
                .get("/api/comakerships/" + id)
                .then((response) => {
                    commit('setComakershipToEdit', response.data);                    
                })
                .catch((error) => {
                    this.error = error;
                });
        },
        putComakership({dispatch},putData){
            axios               
                .put(`/api/comakerships/${putData.urlId}`, {
                    id: putData.id,
                    name: putData.name,
                    description: putData.description,
                    credits: putData.credits,
                    bonus: putData.bonus,
                    comakershipStatusId: putData.comakershipStatusId
                })
                .then((response) => {
                    console.log(response.data);
                    dispatch('getAllComakerships');
                })
                .catch((error) => {
                    this.error = error;
                });
        },
        getAllPrograms({commit}){
            axios
                .get("/api/programs")
                .then((response) => {
                    commit('setPrograms', response.data);
                })
                .catch((error) => {
                    this.error = error;
                });
        }        
    },
    getters: {
        comakerships(state){
            return state.comakerships;
        },
        comakership(state){
            return state.comakership;
        },
        comakershipComplete(state){
            return state.comakershipComplete;
        },
        comakershipToEdit(state){
            return state.comakershipToEdit;
        },
        programs(state){
            return state.programs;
        }
    }
}