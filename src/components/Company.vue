<template>
  <div>
    <p> here is company {{ $store.state.user.companyId || "oopsie"}}</p>
    <p></p>
  </div>
</template>

<script>

export default {
  name: "Company",
  data() {
    return {};
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData(){
      await this.$store.dispatch('getUser', this.$store.state.user.userId);
    }
  },
  computed: {
  }
}
</script>

<style scoped>

</style>