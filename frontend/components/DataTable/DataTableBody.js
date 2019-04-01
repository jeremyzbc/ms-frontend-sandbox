import React from 'react';
import PropTypes from 'prop-types';

const DataTableBody = ({columns, source, error, loading}) => {
	if(error) return <h5>Oops, something went wrong...</h5>;
	if(loading) return <h5>Loading...</h5>;
	if(source.length === 0) return <h5>No records have been found.</h5>;
	return (
		<section>
			{source.map((row, index) => (
				<div style={{
						padding: '1rem 0'
					}}
					className="d-flex"
					key={index}
				>
					{columns.map(col => (
						<span
							style={{
								width: col.width,
								padding: '0 .5rem'
							}}
							key={col.keyName}
						>
							{row[col.keyName]}
						</span>
					))}
				</div>
			))}
		</section>
	);
}

DataTableBody.propTypes = {
	error: PropTypes.bool,
	source: PropTypes.arrayOf(PropTypes.object),
	columns: PropTypes.arrayOf(PropTypes.shape({
		heading: PropTypes.string.isRequired,
		keyName: PropTypes.string.isRequired,
		width: PropTypes.string.isRequired,
		type: PropTypes.string,
		sortable: PropTypes.bool
	})).isRequired
}

export default DataTableBody;