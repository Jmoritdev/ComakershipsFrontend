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

      <v-btn color="primary" @click="toggleCompanyForm()"> {{ !companyFormOpen ? "Update company" : "Cancel" }}</v-btn>
      <v-btn color="primary" @click="toggleLogoForm()"> {{ !logoFormOpen ? "Update logo" : "Cancel" }}</v-btn>
    </v-container>
    <!-- Update company -->
    <v-card ref="form" class="my-4" v-show="companyFormOpen">
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
        <v-btn color="primary" @click="updateCompany()"> Confirm </v-btn>
      </v-card-text>
    </v-card>
    <!-- Update logo -->
    <v-container class="my-4" v-show="logoFormOpen">
      <p> sorry not implemented yet </p>
    </v-container>

    <!-- Reviews -->
    <v-container class="my-4">
      <h2> Reviews</h2>
      <v-data-table
          :headers="reviewHeaders"
          :items="$store.state.company.reviews"
          :items-per-page="15"
          class="elevation-1"
      ></v-data-table>
      <v-btn color="primary" @click="toggleReviewForm()"> {{ !reviewFormOpen ? "Write review" : "Cancel" }}</v-btn>
    </v-container>
    <!-- Write review -->
    <v-container class="my-4" v-show="reviewFormOpen">
      <v-text-field
          v-model="reviewToCreate.studentUserId"
          label="Student Id"
      ></v-text-field>
      <v-select
          v-model="reviewToCreate.rating"
          :items = [1,2,3,4,5,6,7,8,9,10]
          label="Rating"
      ></v-select>
      <v-textarea
          v-model="reviewToCreate.comment"
          label="Comment"
      ></v-textarea>

      <v-btn color="primary" @click="createReview()"> Confirm </v-btn>
    </v-container>
  </div>
</template>

<script>

export default {
  name: "Company",
  data() {
    return {
      reviewHeaders: [
        {text: "Reviewer", value: "reviewer"},
        {text: "Rating", value: "rating"},
        {text: "Comment", value: "comment"}
      ],
      logoFormOpen: false,
      companyFormOpen: false,
      reviewFormOpen: false,
      companyToEdit: {
        name: this.$store.state.company.name,
        street: this.$store.state.company.street,
        city: this.$store.state.company.city,
        zipcode: this.$store.state.company.zipcode,
        description: this.$store.state.company.description,
      },
      reviewToCreate: {
        studentUserId: null,
        rating: null,
        comment: "",
      },
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      await this.$store.dispatch('getUser', this.$store.state.user.userId);
    },
    async updateCompany() {
      this.toggleCompanyForm();
      await this.$store.dispatch('updateCompany', this.companyToEdit);
    },
    async createReview() {
      this.toggleReviewForm();
      await this.$store.dispatch('createReview', this.reviewToCreate);
    },
    toggleCompanyForm() {
      if (this.logoFormOpen) {
        this.logoFormOpen = false;
      }
      this.companyFormOpen ^= true;
    },
    toggleLogoForm() {
      if (this.companyFormOpen) {
        this.companyFormOpen = false;
      }
      this.logoFormOpen ^= true;
    },
    toggleReviewForm() {
      this.reviewFormOpen ^= true;
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
  },
}
</script>

<style scoped>

</style>