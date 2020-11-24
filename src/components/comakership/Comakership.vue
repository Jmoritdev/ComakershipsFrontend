<template>
  <v-container class="my-4">
    <h2>Get a Comakership by ID</h2>
    <div class="row" v-if="comakership">
      <div class="col-6">
        <p>Id: {{ comakership.id }}</p>
        <p>Name: {{ comakership.name }}</p>
        <p>Description: {{ comakership.description }}</p>
        <p>Company: {{ comakership.company.name }}</p>
        <p>Company location: {{ comakership.company.city }}</p>
        <p>Credits: {{ comakership.credits }}</p>
        <p>Bonus: {{ comakership.bonus }}</p>
      </div>
      <div class="col-6">
        <div class="mb-4">
          Skills:
          <ul>
            <li v-for="skill in comakership.skills" :key="skill.id">
              {{ skill.name }}
            </li>
          </ul>
        </div>
        <div>
          Programs:
          <ul>
            <li v-for="program in comakership.programs" :key="program.id">
              {{ program.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row my-4">
      <v-text-field
        v-model="id"
        label="Comakership Id"
        class="col-3"
      ></v-text-field>

      <v-btn color="primary" @click="loadData()">Fetch</v-btn>
    </div>
  </v-container>
</template>

<script>
import axios from "../../axios-auth";

export default {
  components: {},
  data() {
    return {
      id: null,
      comakership: null,
    };
  },
  computed: {},
  mounted() {},
  methods: {
    loadData() {
      axios
        .get("/api/comakerships/" + this.id)
        .then((response) => {
          // console.log(response);
          this.comakership = response.data;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style>
</style>