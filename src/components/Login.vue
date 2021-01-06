<template>
  <div class="d-flex justify-space-around">
    <!-- Login form -->
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
    <!-- Register form -->
    <v-card v-if="$store.state.user.token === null" ref="form">
      <h4> Register </h4>
      <v-radio-group class="d-flex justify-space-around" v-model="registerStudent">
        <v-radio label="Company" :value="false"></v-radio>
        <v-radio label="Student" :value="true"></v-radio>
      </v-radio-group>
      <!-- Company form -->
      <v-card-text v-show="!registerStudent">
        <v-text-field
            v-model="registerCompanyData.name"
            label="CompanyName"
        ></v-text-field>
        <v-textarea
            v-model="registerCompanyData.description"
            label="Description"
        ></v-textarea>
        <v-text-field
            v-model="registerCompanyData.street"
            label="Street"
        ></v-text-field>
        <v-text-field
            v-model="registerCompanyData.city"
            label="City"
        ></v-text-field>
        <v-text-field
            v-model="registerCompanyData.zipcode"
            label="Zipcode"
        ></v-text-field>

        <v-text-field
            v-model="registerCompanyData.CompanyUser.name"
            label="Name"
        ></v-text-field>
        <v-text-field
            v-model="registerCompanyData.CompanyUser.email"
            label="Email"
        ></v-text-field>
        <v-text-field
            v-model="registerCompanyData.CompanyUser.password"
            label="Password"
            type="Password"
        ></v-text-field>
        <v-btn color="primary" @click="register"> Register</v-btn>
      </v-card-text>
      <!-- Student form -->
      <v-card-text v-show="registerStudent">
        <v-text-field
            v-model="registerStudentData.FirstName"
            label="First name"
        ></v-text-field>
        <v-text-field
            v-model="registerStudentData.LastName"
            label="Last name"
        ></v-text-field>
        <v-text-field
            v-model="registerStudentData.email"
            label="Email"
        ></v-text-field>
        <v-text-field
            v-model="registerStudentData.password"
            type="Password"
            label="Password"
        ></v-text-field>
        <v-select
            v-model="registerStudentData.ProgramId"
            :items="$store.state.user.programs"
            item-text="name"
            item-value="id"
            label="Select a program"
        ></v-select>
        <v-text-field
            v-model="registerStudentData.Nickname"
            label="Nickname"
        ></v-text-field>
      </v-card-text>
    </v-card>
    <!-- Edit user form -->
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
      registerCompanyData: {
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
      },
      registerStudentData: {
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
        ProgramId: null,
        Nickname: "",
      },
      registerStudent: false,
    }
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    async onLoad() {
      await this.$store.dispatch("getPrograms");
    },
    async login() {
      await this.$store.dispatch("login", this.authData);
    },
    async register() {
      if (this.registerStudent) {
        await this.$store.dispatch("registerStudent", this.registerCompanyData.CompanyUser)
      } else {
        await this.$store.dispatch("register", this.registerCompanyData)
      }
      Object.assign(this.$data, this.$options.data())
    }
  },
  computed: {}
};
</script>

<style>
</style>