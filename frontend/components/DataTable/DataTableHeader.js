import React from 'react';
import PropTypes from 'prop-types';

const ArrowUpIcon = ({ opacity }) => (
  <svg
    style={{
      opacity
    }}
    width="16"
    height="16"
    viewBox="0 0 1792 1792"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1395 1184q0 13-10 23l-50 50q-10 10-23 10t-23-10l-393-393-393 393q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l466 466q10 10 10 23z" />
  </svg>
);

const ArrowDownIcon = ({ opacity }) => (
  <svg
    style={{
      opacity
    }}
    width="16"
    height="16"
    viewBox="0 0 1792 1792"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1395 736q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z" />
  </svg>
);

const DataTableHeader = ({ columns, sortCriterias, onChangeSorting }) => {
  const changeSorting = (event, keyName, dataType) =>
    onChangeSorting(event, keyName, dataType);

  const getSortPriority = keyName => {
    // only show priority when it has more than one criteria
    if (sortCriterias.length < 2) return null;
    const index = sortCriterias.findIndex(
      sortCriteria => sortCriteria.keyName === keyName
    );
    if (index > -1)
      return (
        <small
          style={{
            color: 'orange',
            marginLeft: 'auto',
            marginRight: '1rem'
          }}
        >
          {sortCriterias.length - index}
        </small>
      );
    return null;
  };

  const getOpacity = (keyName, isAsc) => {
    const criteria = sortCriterias.find(
      sortCriteria => sortCriteria.keyName === keyName
    );
    if (criteria) {
      if (criteria.isAscOrder === isAsc) return 1;
      return 0;
    }
    return 0.5;
  };

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
              <>
                {getSortPriority(col.keyName)}
                <span
                  style={{
                    cursor: 'pointer'
                  }}
                  className="d-inline-flex flex-column"
                  onClick={event => changeSorting(event, col.keyName, col.type)}
                >
                  <ArrowUpIcon opacity={getOpacity(col.keyName, true)} />
                  <ArrowDownIcon opacity={getOpacity(col.keyName, false)} />
                </span>
              </>
            ) : null}
          </span>
        ))}
      </div>
    </section>
  );
};

DataTableHeader.defaultProps = {
  sortCriterias: []
};

DataTableHeader.propTypes = {
  onChangeSorting: PropTypes.func.isRequired,
  sortCriterias: PropTypes.arrayOf(PropTypes.object).isRequired,
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
