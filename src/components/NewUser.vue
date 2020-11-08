<template>
  <v-card ref="form">
    <v-card-text>
      <v-text-field
        v-model="userData.name"
        label="Full Name"
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
        v-model="userData.studentNumber"
        type="number"
        label="Student Number"
      ></v-text-field>
      <v-select
        v-model="userData.UniversityId"
        item-text="name"
        item-value="id"
        :items="universities"
      />
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
        name: "",
        email: "",
        password: "",
        studentNumber: 0,
        UniversityId: 0
      },
      universities: []
    };
  },
  methods: {
    // login() {
    //   this.$store.dispatch("login", this.authData);
    // },
    postNewUser() {
      axios
        .post("http://localhost:7071/api/Students", {
          name: this.userData.name,
          email: this.userData.email,
          password: this.userData.password,
          studentNumber: parseInt(this.userData.studentNumber), //why is this necessary for studentnumber but not for universityid 🤔
          UniversityId: this.userData.UniversityId,
        })
        .then((res) =>
          console.log(res)
        )
        .catch((error) => (this.error = error));
    },
  },
  created(){
    console.log("Created called");
    axios
      .get("http://localhost:7071/api/universities/domains")
      .then((result) => 
        this.universities = result.data
      )
      .catch((error) => (this.error = error));
  }
};
</script>

<style>
</style>