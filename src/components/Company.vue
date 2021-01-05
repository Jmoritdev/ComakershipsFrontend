<template>
  <div>
    <p> here is company {{ $store.state.user.companyId || "oopsie"}}</p>
    <p></p>
  </div>
</template>

<script>
export default {
  name: "Company",
  mounted() {
    this.$store.dispatch('getUser', this.$store.state.user.userId);
    console.log(this.$store.state.user.name);
    this.$store.dispatch('getCompany');
    console.log(this.$store.state.company.name())
  }
}
</script>

<style scoped>

</style>