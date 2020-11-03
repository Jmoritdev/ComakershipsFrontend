<template>

    <v-form ref="form">
      <v-text-field v-model="name" label="Name" ></v-text-field>
      <v-text-field v-model="description" label="Description"></v-text-field>
      <v-text-field v-model="price" label="Price"></v-text-field>
      <v-select
        v-model="categoryId"
        :items="categories"
        item-text="name"
        item-value="id"
        label="Category"
      ></v-select>
      <v-btn color="primary" @click="addProduct"> Add product </v-btn>
    </v-form>

</template>

<script>
import axios from "../axios-auth";

export default {
  data() {
    return {
      name: "Test",
      description: "",
      categoryId: 0,
      price: 0,
      categories: [],
    };
  },
  methods: {
    addProduct() {
      const postData = {
        Id: 0,
        Name: this.name,
        Description: this.description,
        CategoryId: this.categoryId,
        Price: parseFloat(this.price),
      };
      console.log(postData)
      axios
        .post("/api/Products", postData)
        .then((res) => {
          console.log(res.data);
          this.$refs.form.reset();
          this.$emit("update");
        })
        .catch((error) => console.log(error.response.request._response));
    },
  },
  mounted() {
    axios
      .get("/api/Categories")
      .then((response) => {
        console.log(response);
        this.categories = response.data;
      })
      .catch((error) => console.log(error));
  },
};
</script>

<style>
</style>