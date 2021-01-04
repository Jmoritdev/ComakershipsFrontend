<template>
  <div>
    <v-card v-if="!$store.state.user.isAuthenticated" ref="form">
      <v-card-text>
        <v-alert v-if="authData.error" type="error">
          {{ authData.error }}
        </v-alert>
        <v-alert v-if="authData.success" type="success">
          {{ authData.success }}
        </v-alert>
        <v-text-field
            v-model="authData.email"
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
    <v-card v-if="$store.state.user.isAuthenticated">
      <h1> You are already logged in, explore the app through the menu on the left. </h1>
    </v-card>
  </div>
</template>

<script>

import router from "@/router";

export default {
  name: "Login",
  data() {
    return {
      authData: {
        email: "",
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
      if(this.$store.dispatch("login", this.authData)) {
        router.push({ name: 'Company'})
      } else{
        alert("email or password was incorrect, or you are not a company admin")
      }
    },
  },
};
</script>

<style>
</style>