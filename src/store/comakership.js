import axios from "axios"

export const comakershipStore = {
    state: () => ({
        comakerships: [ ],
        comakership: { },
        comakershipToEdit: { },        
    }),
    mutations: {

    },
    actions: {
        getAllComakerhips(){
            axios
                .get("/api/comakerships")
                .then((response) => {
                    this.comakerships = response.data;
                })
                .catch((error) => {
                    this.error = error;
                });
        },
        getComakershipCompleteById(id){
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
        putComakership(id, putData){
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

    }
}