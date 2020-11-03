<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="comakerships"
      :items-per-page="15"
      class="elevation-1"
    ></v-data-table>
  </v-container>
</template>

<script>
import axios from "../axios-auth";

export default {
  components: {},
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
        { text: "Company Name", value: "companyName" },
        { text: "Company City", value: "companyCity" },
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