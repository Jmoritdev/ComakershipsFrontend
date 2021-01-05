<template>
<div class="my-4">
	<h2>Create Comakership</h2>
	<v-form ref="form">
		<v-text-field v-model="name" label="Name"></v-text-field>
		<v-text-field v-model="description" label="Description"></v-text-field>

		<div class="row">
			<div class="col-2">
				<v-checkbox
				v-model="credits"
				label="Credits"
				></v-checkbox>
			</div>
			<div class="col-2">
				<v-checkbox
				v-model="bonus"
				label="Bonus"
				></v-checkbox>
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
			</div>
		</div>
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
				<v-text-field v-model="purchaseKey" label="Purchase Key"></v-text-field>
			</div>
		</div>
		<div class="row">
			<div class="col-12 text-right">
				<v-btn color="primary" @click="addComakership">
				Create Comakership
				</v-btn>
			</div>
		</div>

	</v-form>
</div>
</template>

<script>
export default {
	data() {
		return {			
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
	computed: {
		dbprograms(){
			return this.$store.state.comakerships.programs;
		}
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
			const postData = {
				name: this.name,
				description: this.description,
				credits: this.credits,
				bonus: this.bonus,
				purchaseKey: this.purchaseKey,
				deliverables: this.deliverables,
				skills: this.skills,
				programIds: this.programs,
			};
			this.$store.dispatch("postComakership", postData);
			this.$refs.form.reset();
			this.deliverables = [];
			this.skills = [];
		},
	},
	mounted() {
		this.$store.dispatch("getAllPrograms");
	},
};
</script>

<style>
</style>