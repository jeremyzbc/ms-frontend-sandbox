import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import DataTableHeader from './DataTableHeader';
import DataTableBody from './DataTableBody';
import { compareString, compareNumber, compareDate } from 'frontend/utils';

export default class DataTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			source: props.source || [],
			loading: true,
			error: false,
			sortCriterias: []
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if(nextProps.source && JSON.stringify(nextProps.source)!==JSON.stringify(prevState.source)){
	     return {
	     	source: nextProps.source
	     };
	  }
	  return null;
	}

	async componentDidMount(){
		try{
			// either provide source in parent component or fetch sourceUrl in Datatable component
			let { sourceUrl, source } = this.props;
			if(!source){
				const { data } = await axios.get(sourceUrl);
				source = data;
			}
			this.setState({
				source,
				loading: false
			})
		}
		catch(error) {
			console.warn(error);
			this.setState({
				loading: false,
				error: true
			})
		}
	}

	onChangeSorting = (event, keyName, dataType) => {
		let { sortCriterias } = this.state;
		let find = false;
		sortCriterias = sortCriterias.filter(sortCriteria => {
			if(sortCriteria.keyName === keyName) {
				find = true
				if(sortCriteria.isAscOrder) {
					// second click - change to desc order
					sortCriteria.isAscOrder = false;
					return true;
				}
				else {
					// third click - remove criteria from array
					return false;
				}
			}
			// if ctrl key is pressed, keep other sort criterias, or remove them
			if(event.ctrlKey) return true;
			return false;
		});

		// first click - unshift criteria to array
		if(!find){
			sortCriterias.unshift({keyName, dataType, isAscOrder: true});
		}

		console.log(sortCriterias)

		this.setState({sortCriterias})
	}

	getSortedSource = () => {
		const { sortCriterias, source } = this.state;

		const sorting = (data, criterias) => {
			criterias.forEach(criteria => {
				data = data.sort((firstElement, secondElement) => {
					switch(criteria.dataType) {
						case 'string':
							return compareString(firstElement[criteria.keyName], secondElement[criteria.keyName], criteria.isAscOrder);
						case 'number':
							return compareNumber(firstElement[criteria.keyName], secondElement[criteria.keyName], criteria.isAscOrder);
						case 'date':
							// return compareDate(firstElement[criteria.keyName], secondElement[criteria.keyName], criteria.isAscOrder);
						default:
							return compareString(firstElement[criteria.keyName], secondElement[criteria.keyName], criteria.isAscOrder);
					}
				});
			})
			return data;
		}

		return sorting(source, sortCriterias);
	}

	render() {
		const { columns } = this.props;
		const { loading, error } = this.state;
		console.log(loading)
		return (
			<>
				<DataTableHeader
					columns={columns}
					onChangeSorting={this.onChangeSorting}
				/>
				<DataTableBody
					columns={columns}
					loading={loading}
					error={error}
					source={this.getSortedSource()}
				/>
			</>
		)
	}
}

DataTable.propTypes = {
	sourceUrl: PropTypes.string,
	source: PropTypes.arrayOf(PropTypes.object),
	columns: PropTypes.arrayOf(PropTypes.shape({
		heading: PropTypes.string.isRequired,
		keyName: PropTypes.string.isRequired,
		width: PropTypes.string.isRequired,
		type: PropTypes.string,
		sortable: PropTypes.bool
	})).isRequired
}