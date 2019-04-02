import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DataTableHeader from './DataTableHeader';
import DataTableBody from './DataTableBody';
import { compareString, compareNumber, compareDate } from 'frontend/utils';

export default class DataTable extends Component {
  constructor(props) {
    super(props);
    const { source, loading, error } = props;
    this.state = {
      source: source || [],
      loading: loading,
      error: error,
      sortCriterias: []
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let newState = {};
    if (
      nextProps.source &&
      JSON.stringify(nextProps.source) !== JSON.stringify(prevState.source)
    ) {
      newState.source = nextProps.source;
    }
    if (nextProps.loading !== prevState.loading) {
      newState.loading = nextProps.loading;
    }
    if (nextProps.error !== prevState.error) {
      newState.error = nextProps.error;
    }
    if (Object.keys(newState).length) return newState;
    return null;
  }

  onChangeSorting = (event, keyName, dataType) => {
    let { sortCriterias } = this.state;
    let find = false;
    sortCriterias = sortCriterias.filter(sortCriteria => {
      if (sortCriteria.keyName === keyName) {
        find = true;
        if (sortCriteria.isAscOrder) {
          // second click - change to desc order
          sortCriteria.isAscOrder = false;
          return true;
        } else {
          // third click - remove criteria from array
          return false;
        }
      }
      // if ctrl key is pressed while clicking, keep other sort criterias, or remove them
      if (event.ctrlKey) return true;
      return false;
    });

    // first click - add new criteria to array
    if (!find) {
      sortCriterias.unshift({ keyName, dataType, isAscOrder: true });
    }

    this.setState({ sortCriterias });
  };

  getSortedSource = () => {
    const { sortCriterias, source } = this.state;

    const sorting = (source, criterias) => {
      // deep clone
      let data = JSON.parse(JSON.stringify(source));
      criterias.forEach(criteria => {
        data = data.sort((firstRow, secondRow) => {
          switch (criteria.dataType) {
            case 'string':
              return compareString(
                firstRow[criteria.keyName],
                secondRow[criteria.keyName],
                criteria.isAscOrder
              );
            case 'number':
              return compareNumber(
                firstRow[criteria.keyName],
                secondRow[criteria.keyName],
                criteria.isAscOrder
              );
            case 'date':
              return compareDate(
                firstRow[criteria.keyName],
                secondRow[criteria.keyName],
                criteria.isAscOrder
              );
            default:
              return compareString(
                firstRow[criteria.keyName],
                secondRow[criteria.keyName],
                criteria.isAscOrder
              );
          }
        });
      });
      return data;
    };
    return sorting(source, sortCriterias);
  };

  render() {
    const { columns } = this.props;
    const { loading, error, sortCriterias } = this.state;
    return (
      <>
        <DataTableHeader
          columns={columns}
          sortCriterias={sortCriterias}
          onChangeSorting={this.onChangeSorting}
        />
        <DataTableBody
          columns={columns}
          loading={loading}
          error={error}
          source={this.getSortedSource()}
        />
      </>
    );
  }
}

DataTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  source: PropTypes.arrayOf(PropTypes.object),
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
