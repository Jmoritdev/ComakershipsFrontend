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
              {{ $store.state.user.username || "Please login" }}
            </v-list-item-title>
            <!-- make companyName -->
            <v-list-item-subtitle>{{ $store.state.company.name || "to use this app"}}</v-list-item-subtitle>
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
            :key="index" >
            <!-- :disabled="!$store.state.user.isAuthenticated" -->
          <router-link :to="{ name: route.name }"> {{ route.name }}</router-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>

export default {
  name: "NavBar",
}
</script>

<style scoped>
</style>