<template>
	<v-container class="my-4">
	<h2>Get a Comakership by ID</h2>

	<div class="row my-4">
		<v-text-field
		v-model="id"
		label="Comakership Id"
		class="col-3"
		></v-text-field>
		<v-btn color="primary" @click="fetchComakership()">Fetch</v-btn>
	</div>

	<div class="row" v-if="show">
		<div class="col-6">
			<p>Id: {{ comakership.id }}</p>
			<p>Name: {{ comakership.name }}</p>
			<p>Description: {{ comakership.description }}</p>
			<p>Company: {{ comakership.company.name }}</p>
			<p>Company location: {{ comakership.company.city }}</p>
			<p>Credits: {{ comakership.credits }}</p>
			<p>Bonus: {{ comakership.bonus }}</p>
			<p>Status: {{ comakership.status.name }}</p>
		</div>
		<div class="col-6">
		<div class="mb-4">
			Programs:
			<ul>
			<li v-for="program in comakership.programs" :key="program.id">
				{{ program.name }}
			</li>
			</ul>
		</div>
		<div class="mb-4">
			Skills:
			<ul>
			<li v-for="skill in comakership.skills" :key="skill.id">
				{{ skill.name }}
			</li>
			</ul>
		</div>
		<div class="mb-4">
			Deliverables:
			<ul>
			<li v-for="deliverable in comakership.deliverables" :key="deliverable.id">
				{{ deliverable.name }}
			</li>
			</ul>
		</div>
		</div>
	</div>

	</v-container>
</template>

<script>

export default {
components: {},
data() {
return {
	id: null,
	show: false
};
},
computed: {
	comakership(){
		return this.$store.state.comakerships.comakershipComplete
	},
},
mounted() {},
methods: {
fetchComakership() {
	this.$store.dispatch("getComakershipComplete", this.id);
	this.show = true;
},
},
};
</script>

<style>
</style>