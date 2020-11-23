<template>
  <v-app>
    <v-main>
      <!-- {{token}}
      <Login v-if="!this.$store.getters.isAuthenticated" />
      <product-list v-if="this.$store.getters.isAuthenticated" />
      <HelloWorld/> -->
      <NewUser />
      <Login v-if="!this.$store.getters.isAuthenticated" />
      <GetUser />
      <DeleteUser />

      <Comakership-list />
      <Comakership />
      <ComakershipPost />
    </v-main>
  </v-app>
</template>

<script>
import Login from "./components/Login";
import NewUser from "./components/NewUser";
import GetUser from "./components/GetUser";
import DeleteUser from "./components/DeleteUser";
//import ProductList from './components/ProductList'
// import HelloWorld from './components/HelloWorld';

import ComakershipList from "./components/comakership/ComakershipList";
import Comakership from "./components/comakership/Comakership";
import ComakershipPost from "./components/comakership/ComakershipPost";

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
    Comakership,
    ComakershipPost,
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
