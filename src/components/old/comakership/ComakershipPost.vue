<template>
  <div class="my-4">
    <h2>Create Comakership</h2>
    <v-form ref="form">
      <v-text-field v-model="name" label="Name"></v-text-field>
      <v-text-field v-model="description" label="Description"></v-text-field>
      <v-checkbox
        v-model="credits"
        :label="`Credits: ${credits.toString()}`"
      ></v-checkbox>
      <v-checkbox
        v-model="bonus"
        :label="`Bonus: ${bonus.toString()}`"
      ></v-checkbox>
      <v-text-field v-model="purchaseKey" label="Purchase Key"></v-text-field>

      <div class="row">
        <div class="col-4">
          <v-text-field v-model="skill.name" label="Skill"></v-text-field>
          <v-btn color="primary" @click="addSkill"> Add Skill </v-btn>
          <p v-for="skill in this.skills" :key="skill.id">{{ skill.name }}</p>
        </div>
        <div class="col-4">
          <v-text-field
            v-model="deliverable.name"
            label="Deliverable"
          ></v-text-field>
          <v-btn color="primary" @click="addDeliverable">
            Add Deliverable
          </v-btn>
          <p v-for="deliverable in this.deliverables" :key="deliverable.id">
            {{ deliverable.name }}
          </p>
        </div>
        <div class="col-4">
          <v-select
            v-model="programs"
            :items="dbprograms"
            item-text="name"
            item-value="id"                   
            multiple
            label="Select program(s)"
          ></v-select>
          <!-- <v-btn color="primary" @click="addProgram"> Add Program </v-btn>
          <p v-for="program in this.programs" :key="program.id">
            {{ dbprograms[program - 1].name }}
          </p> -->
        </div>
      </div>

      <v-btn color="primary" @click="addComakership">
        Create Comakership
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from "../../axios-auth";

export default {
  data() {
    return {
      dbprograms: [],
      name: "",
      description: "",
      credits: false,
      bonus: false,
      purchaseKey: "",
      skills: [],
      deliverables: [],
      programs: [],
      skill: {
        name: "",
      },
      deliverable: {
        name: "",
      },
      program: {},
    };
  },
  methods: {
    addSkill() {
      this.skills.push({ name: this.skill.name });
      this.skill.name = "";
    },
    addDeliverable() {
      this.deliverables.push({ name: this.deliverable.name });
      this.deliverable.name = "";
    },
    addProgram() {
      this.programs.push(this.program.id);
    },
    addComakership() {
      axios.defaults.headers.common["Authorization"] = localStorage.getItem(
        "bearer-token"
      );
      const postData = {
        Name: this.name,
        Description: this.description,
        Credits: this.credits,
        Bonus: this.bonus,
        PurchaseKey: this.purchaseKey,
        Deliverables: this.deliverables,
        Skills: this.skills,
        ProgramIds: this.programs,
      };
      console.log(postData);
      axios
        .post("/api/Comakerships", postData)
        .then((res) => {
          console.log(res.data);
          this.$refs.form.reset();
          this.$emit("update");
        })
        .catch((error) => console.log(error.response.request._response));
    },
  },
  mounted() {
    axios
      .get("/api/programs")
      .then((response) => {
        this.dbprograms = response.data;
      })
      .catch((error) => console.log(error));
  },
};
</script>

<style>
</style>