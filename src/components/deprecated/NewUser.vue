<template>
  <v-card ref="form">
    <v-card-text>
      <v-text-field
        v-model="userData.firstname"
        label="First Name"
      ></v-text-field>
      <v-text-field
        v-model="userData.lastname"
        label="Last Name"
      ></v-text-field>
      <v-text-field
        v-model="userData.nickname"
        label="Nickname"
      ></v-text-field>
      <v-text-field
        v-model="userData.email"
        label="Email"
      ></v-text-field>
      <v-text-field
        v-model="userData.password"
        type="Password"
        label="Password"
      ></v-text-field>
      <v-text-field
        v-model="userData.programid"
        type="number"
        label="Program id"
      ></v-text-field>
      <v-btn color="primary" @click="postNewUser"> Register </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      userData: {
        firstname: "",
        lastname: "",
        nickname: "",
        email: "",
        programid: 0,
        password: ""
      }
      // universities: []
    };
  },
  methods: {
    // login() {
    //   this.$store.dispatch("login", this.authData);
    // },
    postNewUser() {
      axios
        .post("http://localhost:7071/api/Students", {
          firstName: this.userData.firstname,
          lastName: this.userData.lastname,
          nickname: this.userData.nickname,
          email: this.userData.email,
          programId: parseInt(this.userData.programid),
          password: this.userData.password
        })
        .then((res) =>
          console.log(res)
        )
        .catch((error) => (this.error = error));
    },
  },
  created(){
    console.log("Created called");
    // axios
    //   .get("http://localhost:7071/api/universities/domains")
    //   .then((result) => 
    //     this.universities = result.data
    //   )
    //   .catch((error) => (this.error = error));
  }
};
</script>

<style>
</style>