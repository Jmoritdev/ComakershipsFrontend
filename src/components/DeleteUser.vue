<template>
  <v-card ref="form">
    <v-card-text>
        <v-text-field
            v-model="id"
            type="number"
            label="Id of user to delete"
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
      <v-btn color="error" @click="deleteUser"> Delete user? </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
        id: null,
        success: null,
        error: null,
        userTypes: [
            "student",
            "company"
        ],
        selectedType: "",
    };
  },
  methods: {
    // login() {
    //   this.$store.dispatch("login", this.authData);
    // },
    deleteUser() {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('bearer-token');
      if(this.selectedType == 'student'){
        axios
          .delete("http://localhost:7071/api/Students/"+this.id)
          .then((result) =>
            this.success = result.data,
            this.error = null
          )
          .catch((error) => (this.error = error));
      } else if(this.selectedType == 'company'){
          axios
            .delete("http://localhost:7071/api/CompanyUser/"+this.id)
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