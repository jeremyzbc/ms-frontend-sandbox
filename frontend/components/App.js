import React from 'react';
import DataTable from './DataTable';

const columns = [
	{
		heading: 'ID',
		keyName: 'id',
		type: 'number',
		sortable: false,
		width: '15%'
	},
	{
		heading: 'Name',
		keyName: 'name',
		type: 'string',
		width: '20%'
	},
	{
		heading: 'Family',
		keyName: 'family',
		type: 'string',
		width: '20%'
	},
	{
		heading: 'City',
		keyName: 'city',
		type: 'string',
		width: '25%'
	},
	{
		heading: 'Score',
		keyName: 'score',
		type: 'number',
		width: '20%'
	}
];

export default () => (
	<div className="container">
		<h4 style={{
			margin: '2rem 0'
		}}>
			ReactJS Table Sorting task
		</h4>
		<DataTable
			columns={columns}
			sourceUrl='data/data.json'
		/>
	</div>
);