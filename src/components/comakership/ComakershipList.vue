<template>
  <v-container>
    <h2>List of Comakerships</h2>
    <v-data-table
      :headers="headers"
      :items="comakerships"
      :items-per-page="15"
      class="elevation-1"
      @update="loadData()"
    ></v-data-table>
    <comakership-post @update="loadData()" />
  </v-container>
</template>

<script>
import axios from "../../axios-auth";
import ComakershipPost from "./ComakershipPost.vue";

export default {
  components: { ComakershipPost },
  data() {
    return {
      comakerships: [],
    };
  },
  computed: {
    headers() {
      return [
        { text: "Id", value: "id" },
        { text: "Name", value: "name" },
        { text: "Description", value: "description" },
        { text: "Company Name", value: "company.name" },
        { text: "Company City", value: "company.city" },
        { text: "Credits", value: "credits" },
        { text: "Bonus", value: "bonus" },
      ];
    },
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      axios
        .get("/api/comakerships")
        .then((response) => {
          // console.log(response);
          this.comakerships = response.data;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style>
</style>