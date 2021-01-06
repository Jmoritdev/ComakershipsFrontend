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
        <v-btn @click="updateUserData()" class="my-4 mx-5" color="primary"> Confirm</v-btn>
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

        <v-btn @click="updatePassword()" class="my-4 mx-5" color="primary"> Confirm</v-btn>
      </v-card>
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
  mounted() {
    this.onLoad();
  },
  methods: {
    async onLoad() {
      if (this.$store.state.user.userType === "StudentUser") {
        await this.$store.dispatch('getStudentUser', this.$store.state.user.userId);
      }
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
      if (this.userFormOpen) {
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
    }
  }
}
</script>

<style scoped>

</style>