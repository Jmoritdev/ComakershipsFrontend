<template>
  <v-app>
    <v-main>
      <!-- {{token}}
      <Login v-if="!this.$store.getters.isAuthenticated" />
      <product-list v-if="this.$store.getters.isAuthenticated" />
      <HelloWorld/> -->
      <NewUser/>
      <Login v-if="!this.$store.getters.isAuthenticated" />
      <comakership-list />
      <GetUser/>
      <DeleteUser/>
    </v-main>
  </v-app>
</template>

<script>
import Login from './components/Login';
import NewUser from './components/NewUser';
import GetUser from './components/GetUser';
import DeleteUser from './components/DeleteUser';
//import ProductList from './components/ProductList'
// import HelloWorld from './components/HelloWorld';

import ComakershipList from "./components/ComakershipList";

export default {
  name: "App",

  components: {
    Login,
    // ProductList,
    // HelloWorld
    NewUser,
    GetUser,
    DeleteUser,
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
