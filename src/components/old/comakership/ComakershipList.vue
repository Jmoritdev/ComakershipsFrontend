<template>
  <v-container class="my-4">
    <h2>List of Comakerships</h2>
    <v-data-table
      :headers="headers"
      :items="comakerships"
      :items-per-page="15"
      class="elevation-1"
      @update="loadData()"
    ></v-data-table>
    <comakership-post @update="loadData()" />
    <comakership-put @update="loadData()" />
  </v-container>
</template>

<script>
import axios from "../../axios-auth";
import ComakershipPost from "./ComakershipPost.vue";
import ComakershipPut from "./ComakershipPut.vue";

export default {
  components: { ComakershipPost, ComakershipPut },
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
        { text: "Company", value: "company.name" },
        { text: "Credits", value: "credits" },
        { text: "Bonus", value: "bonus" },
        { text: "Status", value: "status.name" },
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
          this.comakerships = response.data;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style>
</style>