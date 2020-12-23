<template>
    <div class="container mt-3">
	    <div class="card border border-success">
	    	<div class="card-header">
	    		<h4>Code Challenge</h4>
	    		<p><em>Convid-19 Case overview.</em></p>
	    	</div>
	    	<div class="card-body">
	    		<div class="d-flex flex-nowrap mb-4">
	    			<div class="pr-3">Select Country: </div>
	    			<div>
	    				<div class="select2-wrap">
				    		<Select2 v-model="countryValue" :options="country" @select="selectCountry ($event)"/>
				    	</div>
	    			</div>
	    		</div>
	    		<case-item :status="status" v-if="!loading" />
	    		<vue-content-loading :width="300" :height="20" v-else>
	    			<rect x="0" y="0" rx="3" ry="3" width="70" height="5" /> 
					<rect x="80" y="0" rx="3" ry="3" width="80" height="5" /> 
					<rect x="170" y="0" rx="3" ry="3" width="40" height="5" /> 
					<rect x="218" y="0" rx="3" ry="3" width="60" height="5" /> 
					<rect x="15" y="10" rx="3" ry="3" width="130" height="5" /> 
					<rect x="160" y="10" rx="3" ry="3" width="130" height="5" /> 
	    		</vue-content-loading>
	    	</div>
	    </div>
	  </div>
</template>

<script>
	import Select2 from 'v-select2-component'
	import CaseItem from './components/CaseItem.vue'
	import VueContentLoading from 'vue-content-loading'

    export default {
    	components: {
    		Select2,
    		CaseItem,
    		VueContentLoading,
    	},
        data () {
            return {
            	loading: false,
            	countryValue: '',
	            country: [],
	            status: {
	            	Confirmed : 0,
					Deaths : 0,
					Recovered : 0
	            }
            }
        },
        created () {
        	this.getCountrys()
        },
        methods: {
        	getCountrys () {
        		const url = 'https://api.covid19api.com/countries'
        		this.axios.get(url).then(response => {
        			this.country = _.orderBy(_.map(response.data, row => {
        				return {
        					id: row.Slug, 
        					text: row.Country
        				}
        			}), 'id')
        		}).catch(error => console.log(error))
        	},
        	
        	selectCountry ({id, text}){
        		const yesterday = this.moment().subtract(10, 'days').format('YYYY-MM-DD')
        		const url = `https://api.covid19api.com/total/country/${id}?from=${yesterday}&to=${this.moment().format('YYYY-MM-DD')}`
        		this.loading = true
        		this.axios.get(url).then(response => {
        			if (response.data.length > 0) {
        				this.status = _.last(response.data)
        			} else {
        				this.resetStatus()
        			}
        			this.loading = false
        		}).catch(error => {
        			this.resetStatus()
        			this.loading = false
        		})
        	},

        	resetStatus () {
        		this.status = {
        			Confirmed : 0,
					Deaths : 0,
					Recovered : 0
        		}
        	},
        }
    }
</script>

<style lang="scss">
	@import 'node_modules/bootstrap/scss/bootstrap';
	div, span{
		outline: none
	}
	.select2-wrap {
		width: 20rem;
	}
	.select2-container, .select2-container--focus, input {
		outline: none;
	}
	.item + .item {
		border-left: 1px solid #ddd;
	}
</style>