<template>
	<div>
		<v-container class="my-4">
			<h2>List of Comakerships</h2>
			<v-data-table
			:headers="headers"
			:items="comakerships"
			:items-per-page="15"
			class="elevation-1"
			></v-data-table>
		</v-container>
		
		<v-container class="my-4" v-if="userType === 'CompanyUser'">
			<comakership-put />
		</v-container>

		<v-container class="my-4" v-if="userType === 'CompanyUser'">
			<comakership-post />
		</v-container>
	</div>
</template>

<script>
import ComakershipPut from "./comakerships/ComakershipPut.vue";
import ComakershipPost from "./comakerships/ComakershipPost.vue";

export default {
components: { ComakershipPut, ComakershipPost },
name: "Comakerships",
data() {
	return {};
},
computed: {
    userType(){
        return this.$store.state.user.userType;
    },
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
        if(this.userType === 'StudentUser'){
            this.$store.dispatch("getAllComakerships");
        }
        if(this.userType === 'CompanyUser'){
            this.$store.dispatch("getComakershipsForUser");
        }		
	}
},
mounted() {
	this.loadData();
  },
}
</script>

<style scoped>

</style>