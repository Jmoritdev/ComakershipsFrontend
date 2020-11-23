<template>
  <v-container>
    <div class="row" v-if="Comakership">
      <div class="col-6">
        <p>Id: {{ Comakership.id }}</p>
        <p>Name: {{ Comakership.name }}</p>
        <p>Description: {{ Comakership.description }}</p>
        <p>Company: {{ Comakership.company.name }}</p>
        <p>Company location: {{ Comakership.company.city }}</p>
        <p>Credits: {{ Comakership.credits }}</p>
        <p>Bonus: {{ Comakership.bonus }}</p>
      </div>
      <div class="col-6">
        <div class="mb-4">
          Skills:
          <ul>
            <li v-for="skill in Comakership.skills" :key="skill.id">
              {{ skill.name }}
            </li>
          </ul>
        </div>
        <div>
          Programs:
          <ul>
            <li v-for="program in Comakership.programs" :key="program.id">
              {{ program.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row my-4">
      <v-text-field
        v-model="Id"
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
      Id: null,
      Comakership: null,
    };
  },
  computed: {},
  mounted() {},
  methods: {
    loadData() {
      axios
        .get("/api/comakerships/" + this.Id)
        .then((response) => {
          // console.log(response);
          this.Comakership = response.data;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style>
</style>