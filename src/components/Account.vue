<template>
  <div class="d-flex justify-start">
    <v-container class="my-4">
      <h2> My details </h2>
      <!-- Detail data -->
      <div class="d-flex justify-start">
        <ul>
          <v-list-item v-for="(value, name, index) in personalData" :key="index"> {{ name }}</v-list-item>
        </ul>
        <ul>
          <v-list-item v-for="(value, name, index) in personalData" :key="index"> {{ value.toString() }}</v-list-item>
        </ul>
      </div>
      <!-- Edit buttons -->
      <v-btn v-show="!passwordFormOpen" @click="toggleUserForm()" color="primary">
        {{ !userFormOpen ? "Edit details" : "Cancel" }}
      </v-btn>
      <v-btn v-show="!userFormOpen" @click="togglePasswordForm()" color="primary">
        {{ !passwordFormOpen ? "Edit password" : "Cancel" }}
      </v-btn>
      <!-- Edit user form -->
      <v-card v-show="userFormOpen" class="pa-5">
        <v-text-field
            v-model="personalData.name"
            label="Name"
        ></v-text-field>
        <v-text-field
            v-model="personalData.email"
            label="Email"
        ></v-text-field>
      </v-card>
      <!-- Edit password form -->
      <v-card v-show="passwordFormOpen" class="pa-5">
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
      </v-card>
      <!-- Confirm buttons -->
      <v-btn v-show="userFormOpen" @click="updateUserData()" color="primary"> Confirm</v-btn>
      <v-btn v-show="passwordFormOpen" @click="updatePassword()" color="primary"> Confirm</v-btn>
    </v-container>
  </div>
</template>

<script>
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
  methods: {
    async updateUserData() {
      await this.$store.dispatch('putUser', this.personalData)
    },
    async updatePassword() {
      await this.$store.dispatch('changePassword', this.passData)
    },
    toggleUserForm() {
      this.userFormOpen ^= true;
    },
    togglePasswordForm() {
      this.passwordFormOpen ^= true;
    }
  }
}
</script>

<style scoped>

</style>