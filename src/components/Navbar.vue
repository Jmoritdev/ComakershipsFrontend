<template>
  <v-card>
    <v-navigation-drawer
        app
        permanent
        expand-on-hover
    >
      <v-list>
        <v-list-item >
          <v-list-item-content>
            <v-list-item-title class="title">
              <!-- make username -->
              {{ $store.state.user.name || "Please login" }}
            </v-list-item-title>
            <!-- make companyName -->
            <v-list-item-subtitle>{{ $store.state.company.name || "to use this app"}}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ $store.state.user.email || "" }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list
          nav
          dense
      >
        <v-list-item
            v-for="(route, index) in $router.options.routes"
            :key="index"
            :disabled="$store.state.user.token === null && route.name !== 'Home'" >
          <router-link :to="{ name: route.name }"> {{ route.name }}</router-link>
        </v-list-item>
        <v-list-item
            v-if="$store.state.user.token !== null"
        >
          <a @click="logout()"> <u>Logout</u> </a>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>

export default {
  name: "NavBar",
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
}
</script>

<style scoped>
</style>