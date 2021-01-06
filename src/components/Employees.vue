<template>
  <div>
    <v-container class="my-4">
      <h2>List of employees</h2>
      <v-data-table
          :headers="headers"
          :items="$store.state.employees.employees"
          :items-per-page="15"
          class="elevation-1"
      ></v-data-table>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Employees",
  data() {
    return {
      headers: [
        { text: "Id", value: "id" },
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
      ]
    }},
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData(){
      await this.$store.dispatch('getEmployees', this.$store.state.company.companyId);
    }
  }
}
</script>

<style scoped>

</style>