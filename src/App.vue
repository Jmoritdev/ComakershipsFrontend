<template>
  <v-app>
    <v-main>
      <!-- {{token}}
      <Login v-if="!this.$store.getters.isAuthenticated" />
      <product-list v-if="this.$store.getters.isAuthenticated" />
      <HelloWorld/> -->
      <comakership-list />
    </v-main>
  </v-app>
</template>

<script>
//import Login from './components/Login';
//import ProductList from './components/ProductList'
// import HelloWorld from './components/HelloWorld';

import ComakershipList from "./components/ComakershipList";

export default {
  name: "App",

  components: {
    // Login,
    // ProductList,
    // HelloWorld
    ComakershipList,
  },

  data: () => ({
    //
  }),
  computed: {
    token() {
      return this.$store.state.token;
    },
  },
};
</script>
