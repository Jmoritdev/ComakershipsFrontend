<template>
<div>
<v-container class="my-4">
    <h2>List of Comakerships</h2>
    <v-data-table
      :headers="headers"
      :items="comakerships"
      :items-per-page="15"
      class="elevation-1"
    ></v-data-table>    
  </v-container>
</div>
</template>

<script>
export default {
name: "Comakerships"
}
</script>

<style scoped>

</style>