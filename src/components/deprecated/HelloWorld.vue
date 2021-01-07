<template>
  <v-container>
    <v-row class="text-center">
      <v-btn @click="loadData">Load data</v-btn>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",

  data: () => ({}),
  mounted() {},
  methods: {
    loadData() {
      let config = {
        headers: {
          Authorization: "Bearer " + this.$store.state.token,
        },
      };

      axios
        .get("https://localhost:44365/api/Products", config)
        .then((result) => console.log(result))
        .catch((error) => console.log(error));
    },
  },
};
</script>
