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
      <v-btn color="primary" class="my-4 mx-5" @click="toggleReviewForm()">
        {{ !reviewFormOpen ? "Write review" : "Cancel" }}
      </v-btn>
    </v-container>
    <!-- Write review -->
    <v-container class="my-4" v-show="reviewFormOpen">
      <v-card class="col-10 mx-auto">
        <v-card-text>
          <v-text-field
              v-model="reviewToCreate.studentUserId"
              label="Student Id"
              type="number"
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
        </v-card-text>

        <v-btn color="primary" class="my-4 mx-5" @click="createReview()" :disabled="!validReviewInput"> Confirm</v-btn>
      </v-card>
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
      if (this.reviewToCreate.studentUserId === "") {
        alert("Student Id has to be a number")
        return
      }
      try {
        this.reviewToCreate.studentUserId = parseInt(this.reviewToCreate.studentUserId)
      } catch(e) {
        alert("Student Id has to be a number");
      }
      this.toggleReviewForm();
      await this.$store.dispatch('createReview', this.reviewToCreate);
    },
    toggleReviewForm() {
      this.reviewFormOpen ^= true;
    },
  },
  computed: {
    validReviewInput() {
      return this.reviewToCreate.studentUserId !== null && this.reviewToCreate.rating !== null
    }
  }
}
</script>

<style scoped>

</style>