<template>
  <div class="d-flex justify-start">
    <v-container class="my-4">
      <h2> My details </h2>
      <!-- Detail data -->
      <div class="d-flex justify-start">
        <ul>
          <v-list-item v-for="(value, name, index) in user" :key="index"> {{ name }}</v-list-item>
        </ul>
        <ul>
          <v-list-item v-for="(value, name, index) in user" :key="index"> {{ value.toString() }}</v-list-item>
        </ul>
      </div>
      <!-- Edit buttons -->
      <v-btn v-show="!passwordFormOpen" @click="toggleUserForm()" class="my-4 mx-5" color="primary">
        {{ !userFormOpen ? "Edit details" : "Cancel" }}
      </v-btn>
      <v-btn v-show="!userFormOpen" @click="togglePasswordForm()" class="my-4 mx-5" color="primary">
        {{ !passwordFormOpen ? "Edit password" : "Cancel" }}
      </v-btn>
      <!-- Edit user form -->
      <v-card v-show="userFormOpen" class="pa-5">
        <v-card-text>
          <v-text-field
              v-model="personalData.name"
              label="Name"
          ></v-text-field>
          <v-text-field
              v-model="personalData.email"
              label="Email"
          ></v-text-field>
        </v-card-text>
        <v-btn @click="updateUserData()" class="my-4 mx-5" color="primary" :disabled="!validUserEdit"> Confirm</v-btn>
      </v-card>
      <!-- Edit password form -->
      <v-card v-show="passwordFormOpen" class="pa-5">
        <v-card-text>
          <v-text-field
              v-model="passData.OldPassword"
              label="Current password"
              type="password"
          ></v-text-field>
          <v-text-field
              v-model="passData.NewPassword"
              label="New password"
              type="password"
          ></v-text-field>
          <v-text-field
              v-model="passData.ConfirmNewPassword"
              label="Confirm new password"
              type="password"
          ></v-text-field>
        </v-card-text>

        <v-btn @click="updatePassword()" class="my-4 mx-5" color="primary" :disabled="!validPasswordChange"> Confirm
        </v-btn>
      </v-card>
    </v-container>
  </div>
</template>

<script>
const PASSWRDRGX = /(?!.(.)\\1{2})(?!.?\\d{3}).{12,64}/;
// eslint-disable-next-line no-control-regex
const EMAILRGX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+))/;
export default {
  name: "Account",
  data() {
    return {
      personalData: {
        name: this.$store.state.user.name,
        email: this.$store.state.user.email,
        type: this.$store.state.user.userType,
      },
      passData: {
        OldPassword: null,
        NewPassword: null,
        ConfirmNewPassword: null,
      },
      userFormOpen: false,
      passwordFormOpen: false,
    }
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    async onLoad() {
      await this.$store.dispatch('getUser');
    },
    loadPersonalData() {
      this.personalData = {
        name: this.user.name,
        email: this.user.email,
        type: this.user.type,
      }
    },
    async updateUserData() {
      this.toggleUserForm();
      await this.$store.dispatch('putUser', this.personalData)
    },
    async updatePassword() {
      this.togglePasswordForm();
      await this.$store.dispatch('changePassword', this.passData)
    },
    toggleUserForm() {
      if (!this.userFormOpen) {
        this.loadPersonalData();
      }
      this.userFormOpen ^= true;
    },
    togglePasswordForm() {
      this.passwordFormOpen ^= true;
    }
  },
  computed: {
    user: function () {
      return {
        name: this.$store.state.user.name,
        email: this.$store.state.user.email,
        type: this.$store.state.user.userType,
      }
    },
    validPasswordChange() {
      return this.passData.NewPassword === this.passData.ConfirmNewPassword &&
              PASSWRDRGX.test(this.passData.NewPassword);
    },
    validUserEdit() {
      return (this.personalData.email !== this.user.email ||
              this.personalData.name !== this.user.name) &&
              EMAILRGX.test(this.personalData.email);
    }
  }
}
</script>

<style scoped>

</style>