<template>
  <div class="my-4">
    <h2>Update Comakership</h2>
    <div class="row">
      <v-text-field
        v-model="id"
        label="Comakership Id"
        class="col-3"
      ></v-text-field>
      <v-btn color="primary" @click="loadData()">Fetch</v-btn>
    </div>

    <v-form ref="form">
      <v-text-field
       v-model="comakership.name" 
      label="Name"
      ></v-text-field>
      <v-text-field
        v-model="comakership.description"
        label="Description"
      ></v-text-field>
      <v-checkbox
        v-model="comakership.credits"
        label="Credits"
      ></v-checkbox>
      <v-checkbox        
        v-model="comakership.bonus"
        label="Bonus"
      ></v-checkbox>

      <v-select
          v-model="comakership.status"          
          :items="statusoptions"
          item-text="name"
          item-value="id"                   
          return-object
          label="Status"
        ></v-select>

      <v-btn color="primary" @click="updateComakership">
        Update Comakership
      </v-btn>
    </v-form>
  </div>
</template>

<script>
//import axios from "../../axios-auth";

export default {
  data() {
    return {
        id: null,        
        statusoptions: [
            { id: 1, name: 'Not started'},
            { id: 2, name: 'Started'},
            { id: 3, name: 'Completed'},
        ],       
    };
  },
  computed: {
    comakership(){
        return this.$store.state.comakerships.comakershipToEdit;
    },      
  },
  methods: {
    loadData() {
        this.$store.dispatch("loadComakershipToEdit", this.id);
    },
    updateComakership() {
        const putData = {
            id: this.comakership.id,
            name: this.comakership.name,
            description: this.comakership.description,
            credits: this.comakership.credits,
            bonus: this.comakership.bonus,
            comakershipStatusId: this.comakership.status.id
        };
        this.$store.dispatch("putComakership", this.id, putData);
    },
    // updateComakership() {
    //   const putData = {
    //     Id: this.comakership.id,
    //     Name: this.comakership.name,
    //     Description: this.comakership.description,
    //     Credits: this.comakership.credits,
    //     Bonus: this.comakership.bonus,
    //     ComakershipStatusId: this.comakership.status.id
    //   };
    //   console.log(putData);
    //   axios
    //     .put("/api/Comakerships/" + this.id, putData)
    //     .then((res) => {
    //       console.log(res.data);
    //       this.id = "";
    //       this.$refs.form.reset();
    //       this.$emit("update");
    //     })
    //     .catch((error) => console.log(error.response.request._response));
    // },
  },
  mounted() {

  },
};
</script>

<style>
</style>