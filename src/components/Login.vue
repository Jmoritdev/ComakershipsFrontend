<template>
  <div>
    <div v-if="$store.state.isAuthenticated === false">
      <v-card ref="form">
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
          <v-btn color="primary" @click="login"> Login</v-btn>
        </v-card-text>
      </v-card>
    </div>
    <div v-if="$store.state.isAuthenticated === true">
      <v-card>
        <h1> You are already logged in, explore the app through the menu on the left. </h1>
      </v-card>
    </div>
  </div>
</template>

<script>

export default {
  name: "Login",
  data() {
    return {
      authData: {
        email: "",
        password: "",
      },
    }
  },
  methods: {
    async login() {
      await this.$store.dispatch("login", this.authData);
    },
  },
};
</script>

<style>
</style>