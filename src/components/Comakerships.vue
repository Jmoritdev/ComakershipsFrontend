<template>
	<div>
		<v-container class="my-4">
			<h2>List of Comakerships</h2>
			<v-data-table
			:headers="headers"
			:items="$store.state.comakerships.comakerships"
			:items-per-page="15"
			class="elevation-1"
			></v-data-table>
		</v-container>

		<v-container class="my-4">
			<comakership />
		</v-container>
		
		<v-container class="my-4">
			<comakership-put />
		</v-container>

		<v-container class="my-4">
			<comakership-post />
		</v-container>
	</div>
</template>

<script>
import Comakership from "./comakerships/Comakership.vue";
import ComakershipPut from "./comakerships/ComakershipPut.vue";
import ComakershipPost from "./comakerships/ComakershipPost.vue";

export default {
components: { Comakership, ComakershipPut, ComakershipPost },
name: "Comakerships",
data() {
	return {};
},
computed: {
	comakerships(){
		return this.$store.state.comakerships.comakerships;
	},
	headers() {
		return [
			{ text: "Id", value: "id" },
			{ text: "Name", value: "name" },
			{ text: "Description", value: "description" },
			{ text: "Company", value: "company.name" },
			{ text: "Credits", value: "credits" },
			{ text: "Bonus", value: "bonus" },
			{ text: "Status", value: "status.name" },
		];
	},
},
methods:{
	loadData(){
		this.$store.dispatch("getAllComakerships");
	}
},
mounted() {
	this.loadData();
  },
}
</script>

<style scoped>

</style>