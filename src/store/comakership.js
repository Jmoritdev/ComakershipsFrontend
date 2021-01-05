import axios from '../axios-auth'

export const comakershipStore = {
    state: () => ({
        comakerships: [],
        comakership: { },
        comakershipToEdit: { },        
    }),
    mutations: {
        setComakership(state, comakerships){
            state.comakerships = comakerships
        }
    },
    actions: {
        getAllComakerships({commit}){
            axios
                .get("/api/comakerships")
                .then((response) => {
                    commit('setComakership', response.data);
                })
                .catch((error) => {
                    this.error = error;
                });
        },
        // eslint-disable-next-line no-empty-pattern
        getComakershipCompleteById({}, id){
            axios
                .get('/api/comakerships/'+id+'/complete')
                .then((response) => {
                    this.comakership = response.data;
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
        loadComakershipToEdit(id){
            axios
                .get("/api/comakerships/" + id)
                .then((response) => {
                    this.comakershipToEdit = response.data;
                })
                .catch((error) => {
                    this.error = error;
                });
        },
        // eslint-disable-next-line no-empty-pattern
        putComakership({}, id, putData){
            axios
                .put("/api/Comakerships/"+id, putData)
                .then((response) => {
                    console.log(response.data);
                    this.id = "";
                    this.$refs.form.reset();
                    this.$emit("update");
                })
                .catch((error) => {
                    this.error = error;
                });
        }
    },
    getters: {
        comakerships(state){
            return state.comakerships;
        }
    }
}