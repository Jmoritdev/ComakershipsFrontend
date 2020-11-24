<template>
  <v-container>
    <h2>Create Comakership</h2>
    <v-form ref="form">
      <v-text-field v-model="name" label="Name"></v-text-field>
      <v-text-field v-model="description" label="Description"></v-text-field>
      <v-text-field v-model="companyId" label="Company Id"></v-text-field>
      <v-text-field v-model="purchaseKey" label="Purchase Key"></v-text-field>

      <div class="row">
        <div class="col-4">
          <p v-for="skill in this.skills" :key="skill.id">{{ skill.name }}</p>
          <v-text-field v-model="skill.name" label="Skill"></v-text-field>
          <v-btn color="primary" @click="addSkill"> Add Skill </v-btn>
        </div>
        <div class="col-4">
          <p v-for="deliverable in this.deliverables" :key="deliverable.id">
            {{ deliverable.name }}
          </p>
          <v-text-field
            v-model="deliverable.name"
            label="Deliverable"
          ></v-text-field>
          <v-btn color="primary" @click="addDeliverable">
            Add Deliverable
          </v-btn>
        </div>
        <div class="col-4">
          <p v-for="program in this.programs" :key="program.id">
            {{ program.name }}
          </p>
          <v-text-field v-model="program.name" label="Program"></v-text-field>
          <v-btn color="primary" @click="addProgram"> Add Program </v-btn>
        </div>
      </div>
      <v-checkbox
        v-model="credits"
        :label="`Credits: ${credits.toString()}`"
      ></v-checkbox>
      <v-checkbox
        v-model="bonus"
        :label="`Bonus: ${bonus.toString()}`"
      ></v-checkbox>

      <v-btn color="primary" @click="addComakership">
        Create Comakership
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import axios from "../../axios-auth";

export default {
  data() {
    return {
      name: "",
      description: "",
      credits: false,
      bonus: false,
      companyId: "",
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
      program: {
        name: "",
      },
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
      this.programs.push({ name: this.program.name });
      this.program.name = "";
    },
    addComakership() {
      const postData = {
        Name: this.name,
        Description: this.description,
        Credits: this.credits,
        Bonus: this.bonus,
        CompanyId: parseInt(this.companyId),
        PurchaseKey: this.purchaseKey,
        Deliverables: this.deliverables,
        Skills: this.skills,
        Programs: this.programs,
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
    // axios
    //   .get("/api/Categories")
    //   .then((response) => {
    //     console.log(response);
    //     this.categories = response.data;
    //   })
    //   .catch((error) => console.log(error));
  },
};
</script>

<style>
</style>