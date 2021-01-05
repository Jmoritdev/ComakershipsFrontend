import axios from '../axios-auth'

export const comakershipStore = {
    state: () => ({
        comakerships: [],
        comakership: { },
        comakershipComplete: { },
        comakershipToEdit: { },        
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
        getComakershipCompleteById({commit}, id){
            axios
                .get('/api/comakerships/'+id+'/complete')
                .then((response) => {
                    commit('setComakershipComplete', response.data);
                })
                .catch((error) => {
                    this.error = error;
                });
        },
        postComakership(postData){
            axios
                .post("/api/Comakerships", postData)
                .then((response) => {
                    console.log(response.data);
                    this.$refs.form.reset();
                    this.$emit("update");
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
        // eslint-disable-next-line no-empty-pattern
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
        }
    }
}