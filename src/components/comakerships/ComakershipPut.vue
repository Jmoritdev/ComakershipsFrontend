<template>
	<div class="my-4">
	<h2>Update Comakership</h2>
	<div class="row">
		<div class="col-3">
			<v-text-field
			v-model="id"
			label="Comakership Id"
			></v-text-field>
		</div>
		<div class="col-3">
			<v-btn color="primary" @click="fetchComakershipToEdit()">Fetch</v-btn>
		</div>
		<div class="col-3">
			
		</div>
	</div>

	<v-form ref="form">
		<v-text-field
		v-model="comakership.name"
		label="Name"
		></v-text-field>
		<v-text-field
		v-model="comakership.description"
		label="Description"
		></v-text-field>
		<div class="row">
			<div class="col-2">
				<v-checkbox
				v-model="comakership.credits"
				label="Credits"
				></v-checkbox>
			</div>
			<div class="col-2">
				<v-checkbox
				v-model="comakership.bonus"
				label="Bonus"
				></v-checkbox>
			</div>
			<div class="col-4">
				<v-select
				v-model="comakership.status"
				:items="statusoptions"
				item-text="name"
				item-value="id"
				return-object
				label="Status"
				></v-select>
			</div>

		</div>
        <div class="row">
            <div class="col-12 text-right">
                <v-btn color="primary" @click="updateComakership">
                Update Comakership
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
		id: null,        
		statusoptions: [
			{ id: 1, name: 'Not started'},
			{ id: 2, name: 'Started'},
			{ id: 3, name: 'Completed'},
		],       
	};
  },
  computed: {
	comakership(){
		return this.$store.state.comakerships.comakershipToEdit;
	},      
  },
  methods: {
	fetchComakershipToEdit() {
		this.$store.dispatch("loadComakershipToEdit", this.id);
	},
	updateComakership() {
		const putData = {
			urlId: this.id,
			id: this.comakership.id,
			name: this.comakership.name,
			description: this.comakership.description,
			credits: this.comakership.credits,
			bonus: this.comakership.bonus,
			comakershipStatusId: this.comakership.status.id
		};
		this.$store.dispatch("putComakership", putData);
		this.id = "";
		this.$refs.form.reset();        
	},    
  },
  mounted() {

  },
};
</script>

<style>
</style>