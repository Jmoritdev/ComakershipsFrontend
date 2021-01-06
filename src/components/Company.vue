<template>
  <div>
    <!-- Company data -->
    <v-container class="my-4">
      <h2> {{ company.name || "company name not found" }}</h2>
      <h4> overview </h4>

      <div class="d-flex justify-space-around">
        <ul>
          <v-list-item v-for="(value, name, index) in company" :key="index"> {{ name }}</v-list-item>
        </ul>
        <ul>
          <v-list-item v-for="(value, name, index) in company" :key="index"> {{ value }}</v-list-item>
        </ul>
        <div>
          <img :src="companyLogo" alt="You do not have a companylogo or it could not be retrieved">
        </div>
      </div>

      <v-btn @click="toggleCompanyForm()"> {{ !companyFormOpen ? "Update company" : "Cancel"}} </v-btn>
      <v-btn @click="toggleLogoForm()"> {{ !logoFormOpen ? "Update logo" : "Cancel"}} </v-btn>
    </v-container>
    <!-- Update company -->
    <v-container class="my-4" v-show="companyFormOpen">
      <p> company </p>
    </v-container>
    <!-- Update logo -->
    <v-container class="my-4" v-show="logoFormOpen">
      <p> logo </p>
    </v-container>

    <!-- Reviews -->
    <v-container class="my-4">
      <h4> Reviews</h4>
      <v-data-table
          :headers="reviewHeaders"
          :items="$store.state.company.reviews"
          :items-per-page="15"
          class="elevation-1"
      ></v-data-table>
      <v-btn @click="toggleReviewForm()"> {{ !reviewFormOpen ? "Write review" : "Cancel"}} </v-btn>
    </v-container>
    <!-- Write review -->
    <v-container class="my-4" v-show="reviewFormOpen">
    </v-container>
  </div>
</template>

<script>

export default {
  name: "Company",
  data() {
    return {
      reviewHeaders: [
        { text: "Reviewer", value: "reviewer" },
        { text: "Rating", value: "rating" },
        { text: "Comment", value: "comment"}
      ],
      logoFormOpen: false,
      companyFormOpen: false,
      reviewFormOpen: false,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      await this.$store.dispatch('getUser', this.$store.state.user.userId);
    },
    toggleCompanyForm() {
      if(this.logoFormOpen){
        this.logoFormOpen = false;
      }
      this.companyFormOpen ^= true;
    },
    toggleLogoForm() {
      if(this.companyFormOpen){
        this.companyFormOpen = false;
      }
      this.logoFormOpen ^= true;
    },
    toggleReviewForm() {
      this.reviewFormOpen ^= true;
    }
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