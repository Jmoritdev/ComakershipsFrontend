<template>
  <div>
    <!-- Company data -->
    <v-container class="my-4">
      <h2> Company overview </h2>

      <div class="d-flex justify-space-around">
        <ul>
          <v-list-item v-for="(value, name, index) in company" :key="index"> {{ name }}</v-list-item>
        </ul>
        <ul>
          <v-list-item v-for="(value, name, index) in company" :key="index"> {{ value.toString() }}</v-list-item>
        </ul>
        <div>
          <img :src="companyLogo" alt="You do not have a companylogo or it could not be retrieved">
        </div>
      </div>

      <v-btn color="primary" class="my-4 mx-5" @click="toggleCompanyForm()"> {{ !companyFormOpen ? "Update company" : "Cancel" }}</v-btn>
      <v-btn color="primary" :disabled=true class="my-4 mx-5" @click="toggleLogoForm()"> {{ !logoFormOpen ? "Update logo" : "Cancel" }}</v-btn>
    </v-container>
    <!-- Update company -->
    <v-card ref="form" class="col-10 mx-auto" v-show="companyFormOpen">
      <v-card-text>
        <v-text-field
            v-model="companyToEdit.name"
            label="Name"
        ></v-text-field>
        <v-text-field
            v-model="companyToEdit.street"
            label="Street"
        ></v-text-field>
        <v-text-field
            v-model="companyToEdit.city"
            label="City"
        ></v-text-field>
        <v-text-field
            v-model="companyToEdit.zipcode"
            label="Zipcode"
        ></v-text-field>
        <v-textarea
            v-model="companyToEdit.description"
            label="Description"
        ></v-textarea>
        <v-btn color="primary" class="my-4 mx-5" @click="updateCompany()" :disabled="!isValidEdit"> Confirm</v-btn>
      </v-card-text>
    </v-card>
    <!-- Update logo -->
    <v-card class="col-10 mx-auto" v-show="logoFormOpen">
      <p> sorry not implemented yet </p>
    </v-card>
    <!-- Employees -->
    <v-container class="my-4">
      <h2>List of employees</h2>
      <v-data-table
          :headers="headers"
          :items="$store.state.employees.employees"
          :items-per-page="15"
          class="elevation-1"
      ></v-data-table>
    </v-container>
  </div>
</template>

<script>

export default {
  name: "Company",
  data() {
    return {
      logoFormOpen: false,
      companyFormOpen: false,
      companyToEdit: {},
      headers: [
        {text: "Id", value: "id"},
        {text: "Name", value: "name"},
        {text: "Email", value: "email"},
      ],
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      await this.$store.dispatch('getCompanyDetails', this.$store.state.user.userId);
    },
    loadCompanyToEdit() {
      this.companyToEdit = {
        name: this.company.name,
        street: this.company.street,
        city: this.company.city,
        zipcode: this.company.zipcode,
        description: this.company.description,
      }
    },
    async updateCompany() {
      await this.$store.dispatch('updateCompany', this.companyToEdit);
      this.toggleCompanyForm();
    },
    toggleCompanyForm() {
      if (this.logoFormOpen) {
        this.logoFormOpen = false;
      }
      if (!this.companyFormOpen) {
        this.loadCompanyToEdit()
      }
      this.companyFormOpen ^= true;
    },
    toggleLogoForm() {
      if (this.companyFormOpen) {
        this.companyFormOpen = false;
      }
      this.logoFormOpen ^= true;
    },
  },
  computed: {
    company: function () {
      return {
        companyId: this.$store.state.company.companyId,
        name: this.$store.state.company.name,
        registrationDate: this.$store.state.company.registrationDate,
        street: this.$store.state.company.street,
        city: this.$store.state.company.city,
        zipcode: this.$store.state.company.zipcode,
        description: this.$store.state.company.description,
      }
    },
    companyLogo: function () {
      return this.$store.state.company.logo;
    },
    isValidEdit() {
      return this.companyToEdit.name !== this.company.name ||
          this.companyToEdit.street !== this.company.street ||
          this.companyToEdit.city !== this.company.city ||
          this.companyToEdit.zipcode !== this.company.zipcode ||
          this.companyToEdit.description !== this.company.description
    }
  },
}
</script>

<style scoped>

</style>