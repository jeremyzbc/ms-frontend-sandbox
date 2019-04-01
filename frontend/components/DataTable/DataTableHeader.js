import React from 'react';
import PropTypes from 'prop-types';

const ArrowUpIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 1792 1792"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1395 1184q0 13-10 23l-50 50q-10 10-23 10t-23-10l-393-393-393 393q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l466 466q10 10 10 23z" />
  </svg>
);

const ArrowDownIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 1792 1792"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1395 736q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z" />
  </svg>
);

const DataTableHeader = ({ columns, onChangeSorting }) => {
  const changeSorting = (event, keyName, dataType) =>
    onChangeSorting(event, keyName, dataType);

  return (
    <section
      style={{
        padding: '1rem 0',
        fontWeight: 500
      }}
    >
      <div className="d-flex">
        {columns.map(col => (
          <span
            className="d-flex justify-content-between align-items-center"
            style={{
              width: col.width,
              padding: '0 .5rem'
            }}
            key={col.keyName}
          >
            <span>{col.heading}</span>
            {col.sortable !== false ? (
              <span
                style={{
                  cursor: 'pointer'
                }}
                className="d-inline-flex flex-column"
                onClick={event => changeSorting(event, col.keyName, col.type)}
              >
                <ArrowUpIcon />
                <ArrowDownIcon />
              </span>
            ) : null}
          </span>
        ))}
      </div>
    </section>
  );
};

DataTableHeader.propTypes = {
  onChangeSorting: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string.isRequired,
      keyName: PropTypes.string.isRequired,
      width: PropTypes.string.isRequired,
      type: PropTypes.string,
      sortable: PropTypes.bool
    })
  ).isRequired
};

export default DataTableHeader;
