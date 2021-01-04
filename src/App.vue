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

export default {
  name: "App",

  components: {
    NavBar,
  },
  data: () => ({
  }),
  computed: {
  },
};
</script>
