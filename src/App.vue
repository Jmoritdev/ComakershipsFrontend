<template>
  <v-app>
    <NavBar/>
    <v-app-bar app>
      <b> xXCloudEnMobileProjectXx presents: Comakerships dashboard</b>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer app>
    </v-footer>
  </v-app>
</template>

<script>
import NavBar from "./components/Navbar"
import axios from "axios";
import router from "@/router";

export default {
  name: "App",
  created: function () {
    axios.interceptors.response.use(undefined, function (err) {
      return new Promise(function () {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          // if you ever get an unauthorized, logout the user
          this.$store.dispatch('logout');
          router.push({name: 'Home'});
          // you can also redirect to /login if needed !
        }
        throw err;
      });
    });
  },
  components: {
    NavBar,
  },
  data: () => ({}),
  computed: {},
};
</script>
