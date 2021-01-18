<template>
  <div class="d-flex justify-space-around">
    <!-- Login form -->
    <v-card v-if="$store.state.user.token === null" class="col-5" ref="form">
      <v-card-text>
        <h2> Login </h2>
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
      </v-card-text>
      <v-btn color="primary" class="my-4 mx-5" @click="login"> Login</v-btn>
    </v-card>
    <!-- Register form -->
    <v-card v-if="$store.state.user.token === null" class="col-5" ref="form">
      <v-card-text>
        <h2> Register </h2>
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
              v-model="registerStudentData.Email"
              label="Email"
          ></v-text-field>
          <v-text-field
              v-model="registerStudentData.Password"
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
      </v-card-text>
      <v-btn color="primary" class="my-4 mx-5" @click="register" :disabled="!correctInput"> Register</v-btn>
    </v-card>
    <!-- Edit user form -->
    <v-card v-if="$store.state.user.token !== null">
      <h2> You are already logged in, explore the app through the menu on the left. </h2>
    </v-card>
  </div>
</template>

<script>
const PASSWRDRGX= /(?!.(.)\\1{2})(?!.?\\d{3}).{12,64}/;
// eslint-disable-next-line no-control-regex
const EMAILRGX= /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+))/;
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
        await this.$store.dispatch("registerStudent", this.registerStudentData)
      } else {
        await this.$store.dispatch("register", this.registerCompanyData)
      }
      Object.assign(this.$data, this.$options.data())
    }
  },
  computed: {
    correctInput() {
      if (this.registerStudent) {
        return !(this.registerStudentData.FirstName === "" ||
            this.registerStudentData.LastName === "" ||
            !EMAILRGX.test(this.registerStudentData.Email) ||
            !PASSWRDRGX.test(this.registerStudentData.Password) ||
            this.registerStudentData.ProgramId === null ||
            this.registerStudentData.Nickname === "");
      } else {
        return !(this.registerCompanyData.name === "" ||
            this.registerCompanyData.description === "" ||
            this.registerCompanyData.street === "" ||
            this.registerCompanyData.city === "" ||
            this.registerCompanyData.zipcode === "" ||
            this.registerCompanyData.CompanyUser.name === "" ||
            !EMAILRGX.test(this.registerCompanyData.CompanyUser.email) ||
            !PASSWRDRGX.test(this.registerCompanyData.CompanyUser.password));
      }
    }
  }
};
</script>

<style>
</style>