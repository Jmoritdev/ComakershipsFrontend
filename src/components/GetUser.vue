<template>
  <v-card ref="form">
    <v-card-text>
      <v-text-field
        v-model="id"
        type="number"
        label="Id of user to find"
      ></v-text-field>
      <v-select
        v-model="selectedType"
        :items="userTypes"
        label="User type"
      />
      <v-alert v-if="error" type="error">
        {{ error }}
      </v-alert>
      <v-alert v-if="success" type="success">
        {{ success }}
      </v-alert>
      <v-textarea 
        v-model="result"
        label="result"/>
      <v-btn color="primary" @click="getUser"> find </v-btn>
      <v-btn color="yellow" @click="editUser"> edit </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      userTypes: [
        "student",
        "company"
      ],
      selectedType: "",
      id: null,
      result: null,
      error: null,
      success: null
    };
  },
  methods: {
    // login() {
    //   this.$store.dispatch("login", this.authData);
    // },
    getUser() {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('bearer-token');
      if(this.selectedType == 'student'){
        axios
          .get("http://localhost:7071/api/Students/"+this.id)
          .then((res) =>
            this.result = JSON.stringify(res.data, null, 2),
            this.error = null
          )
          .catch((error) => (this.error = error));
      } else if(this.selectedType == 'company'){
          axios
          .get("http://localhost:7071/api/CompanyUser/"+this.id)
          .then((res) =>
            this.result = JSON.stringify(res.data, null, 2),
            this.error = null
          )
          .catch((error) => (this.error = error));
      }
    },
    editUser(){
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('bearer-token');
        if(this.selectedType == 'student'){
            axios
            .put("http://localhost:7071/api/Students", this.result)
            .then((result) =>
                this.success = result.data,
                this.error = null
            )
            .catch((error) => (this.error = error));
        } else if(this.selectedType == 'company'){
            axios
            .put("http://localhost:7071/api/CompanyUser", this.result)
            .then((result) =>
                this.success = result.data,
                this.error = null
            )
            .catch((error) => (this.error = error));
        }
    }
  }
};
</script>

<style>
</style>