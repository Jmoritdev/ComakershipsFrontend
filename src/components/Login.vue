<template>
  <div class="d-flex justify-space-around">
      <v-card v-if="$store.state.user.token === null" ref="form">
        <h4> Login </h4>
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

    <v-card v-if="$store.state.user.token === null" ref="form">
      <h4> Register </h4>
          <v-card-text>
            <v-text-field
                v-model="registerData.name"
                label="CompanyName"
            ></v-text-field>
            <v-textarea
                v-model="registerData.description"
                label="Description"
            ></v-textarea>
            <v-text-field
                v-model="registerData.street"
                label="Street"
            ></v-text-field>
            <v-text-field
                v-model="registerData.city"
                label="City"
            ></v-text-field>
            <v-text-field
                v-model="registerData.zipcode"
                label="Zipcode"
            ></v-text-field>

            <v-text-field
                v-model="registerData.CompanyUser.name"
                label="Name"
            ></v-text-field>
            <v-text-field
                v-model="registerData.CompanyUser.email"
                label="Email"
            ></v-text-field>
            <v-text-field
                v-model="registerData.CompanyUser.password"
                type="Password"
                label="Password"
            ></v-text-field>
            <v-btn color="primary" @click="register"> Register </v-btn>
          </v-card-text>
      </v-card>

      <v-card v-if="$store.state.user.token !== null">
        <h2> You are already logged in, explore the app through the menu on the left. </h2>
      </v-card>
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
      registerData: {
        name: "",
        description: "",
        street: "",
        city: "",
        zipcode: "",
        CompanyUser: {
            name: "",
            email: "",
            password: ""
        }
      }
    }
  },
  methods: {
    async login() {
      await this.$store.dispatch("login", this.authData);
    },
    async register() {
      await this.$store.dispatch("register", this.registerData)
      Object.assign(this.$data, this.$options.data())
    }
  },
  computed: {
  }
};
</script>

<style>
</style>