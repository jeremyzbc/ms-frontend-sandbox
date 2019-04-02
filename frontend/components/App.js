import React, { Component } from 'react';
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

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      source: [],
      loading: true,
      error: false
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch('data/data.json');
      const source = await response.json();
      this.setState({
        source,
        loading: false
      });
    } catch (error) {
      console.warn(error);
      this.setState({
        loading: false,
        error: true
      });
    }
  }

  render() {
    const { source, loading, error } = this.state;
    return (
      <div className="container">
        <h4
          style={{
            margin: '2rem 0'
          }}
        >
          ReactJS Table Sorting task
        </h4>
        <DataTable
          columns={columns}
          source={source}
          loading={loading}
          error={error}
        />
      </div>
    );
  }
}
