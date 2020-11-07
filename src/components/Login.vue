<template>
  <v-card ref="form">
    <v-card-text>
      <v-alert v-if="authData.error" type="error">
        {{ authData.error }}
      </v-alert>
      <v-alert v-if="authData.success" type="success">
        {{ authData.success }}
      </v-alert>
      <v-text-field
        v-model="authData.Email"
        label="Email"
      ></v-text-field>
      <v-text-field
        v-model="authData.password"
        type="Password"
        label="Password"
      ></v-text-field>
      <v-btn color="primary" @click="login"> Login </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      authData: {
        Email: "",
        password: "",
        error: "",
        success: ""
      },
    };
  },
  methods: {
    // login() {
    //   this.$store.dispatch("login", this.authData);
    // },
    login() {
      axios
        .post("http://localhost:7071/api/Login", {
          Email: this.authData.Email,
          Password: this.authData.password,
        })
        .then((res) =>
         localStorage.setItem('bearer-token', 'Bearer ' + res.data),
         this.authData.success = "Successfully logged in",
        )
        .catch((error) => (this.authData.error = error));
    },
  },
};
</script>

<style>
</style>