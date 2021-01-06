<template>
  <div>
    <!-- Reviews -->
    <v-container class="my-4">
      <h2> Reviews</h2>
      <v-data-table
          :headers="reviewHeaders"
          :items="$store.state.company.reviews || $store.state.user.reviews"
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
          :items=[1,2,3,4,5,6,7,8,9,10]
          label="Rating"
      ></v-select>
      <v-textarea
          v-model="reviewToCreate.comment"
          label="Comment"
      ></v-textarea>

      <v-btn color="primary" @click="createReview()"> Confirm</v-btn>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Review",
  data: () => {
    return {
      reviewHeaders: [
        {text: "Reviewer", value: "reviewer"},
        {text: "Rating", value: "rating"},
        {text: "Comment", value: "comment"}
      ],
      reviewToCreate: {
        studentUserId: null,
        rating: null,
        comment: "",
      },
      reviewFormOpen: false,
    }
  },
  methods: {
    async createReview() {
      this.toggleReviewForm();
      await this.$store.dispatch('createReview', this.reviewToCreate);
    },
    toggleReviewForm() {
      this.reviewFormOpen ^= true;
    },
  },
}
</script>

<style scoped>

</style>