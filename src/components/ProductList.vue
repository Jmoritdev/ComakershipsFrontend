<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="products"
      :items-per-page="15"
      class="elevation-1"
    ></v-data-table>
      <product-form v-if="this.$store.getters.isAuthenticated" @update="loadData()" />
  </v-container>

</template>

<script>
import ProductForm from './ProductForm'
import axios from "../axios-auth";

export default {
      components: {
        ProductForm
  },
  data() {
    return {
      products: [],
    };
  },
  computed: {
    headers() {
      return [
        { text: "Id", value: "id" },
        { text: "Name", value: "name" },
        { text: "Category", value: "category.name" },
        { text: "Description", value: "description" },
        { text: "Price", value: "price" },
      ];
    },
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      axios
        .get("/api/Products")
        .then((response) => {
          // console.log(response);
          this.products = response.data;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style>
</style>