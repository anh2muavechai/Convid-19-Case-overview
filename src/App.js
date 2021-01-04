import './App.css';
import React, { Component } from "react";
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import CaseItem from './components/CaseItem'

class App extends Component {
	constructor(props) {
		super(props);
	    this.state = { 
	    	website: "Freetuts.net",
	    	loading: false,
        	countryValue: '',
            country: [],
            status: {
            	Confirmed : 0,
				Deaths : 0,
				Recovered : 0
            },
	    };
	}

	componentDidMount() {
        this.getCountrys();
    }

	getCountrys () {
		const url = 'https://api.covid19api.com/countries';
		axios.get(url).then(response => {
			let country = _.orderBy(_.map(response.data, row => {
				return {
					value: row.Slug, 
					label: row.Country
				}
			}), 'id');
			this.setState({country: country});
		}).catch(error => console.log(error));
	}

	selectCountry ({id, text}){
		
	}

    onChange (e) {
      	let id = e.value;
      	const from = moment().subtract(10, 'days').format('YYYY-MM-DD');
		const url = `https://api.covid19api.com/total/country/${id}?from=${from}&to=${moment().format('YYYY-MM-DD')}`;
		this.setState({
			loading: true,
			countryValue: id
		});
		axios.get(url).then(response => {
			if (response.data.length > 0) {
				this.setState({status: _.last(response.data)});
			} else {
				this.resetStatus();
			}
			this.setState({loading: false});
		}).catch(error => {
			this.resetStatus()
			this.setState({loading: false});
		})
    }

	resetStatus () {
		this.setState({
			status: {
				Confirmed : 0,
				Deaths : 0,
				Recovered : 0
			}
		});
	}

	convertNumber (number) {
		return new Intl.NumberFormat().format(number)
	}

	render() {
		return (
			<div className="container mt-3">
			    <div className="card border border-success">
			    	<div className="card-header">
			    		<h4>Code Challenge</h4>
			    		<p><em>Convid-19 Case overview.</em></p>
			    	</div>
			    	<div className="card-body">
			    		<div className="d-flex flex-nowrap mb-4">
			    			<div className="pr-3">Select Country: </div>
			    			<div style={{width: '400px'}}>
			    				<div className="select2-wrap">
						    		<Select
								        autoFocus={true}
								        onChange={(e) => this.onChange(e)}
								        options={this.state.country}
								        style={{ marginBottom: "0px" }}
								    />
						    	</div>
			    			</div>
			    		</div>
			    		<CaseItem status={this.state.status}/>
			    	</div>
			    </div>
			  </div>
	    );
	}
}

export default App; 
