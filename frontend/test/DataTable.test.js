import React from 'react';
import { mount } from 'enzyme';
import DataTable from 'frontend/components/DataTable';

const mockColumns = [
  {
    heading: 'ID',
    keyName: 'id',
    sortable: false,
    width: '25%'
  },
  {
    heading: 'Name',
    keyName: 'name',
    type: 'string',
    width: '25%'
  },
  {
    heading: 'Score',
    keyName: 'score',
    type: 'number',
    width: '25%'
  },
  {
    heading: 'Date of birth',
    keyName: 'dob',
    type: 'date',
    width: '25%'
  }
];

const mockData = [
  {
    id: 1,
    name: 'Jack',
    dob: '1990-02-02',
    score: 200
  },
  {
    id: 2,
    name: 'Jack',
    dob: '1980-12-02',
    score: 200
  },
  {
    id: 3,
    name: 'Joe',
    dob: '1996-09-22',
    score: 100
  },
  {
    id: 4,
    name: 'Simon',
    dob: '1990-02-02',
    score: 400
  },
  {
    id: 5,
    name: 'Abraham',
    dob: '1988-05-11',
    score: 400
  }
];

const createDataTable = ({
  columns = mockColumns,
  source = mockData,
  loading = false,
  error = false
} = {}) => (
  <DataTable
    columns={columns}
    source={source}
    loading={loading}
    error={error}
  />
);

describe('Test DataTable component snapshots', () => {
  it('should match snapshot of loading', () => {
    const wrapper = mount(createDataTable({ loading: true }));
    expect(wrapper).toMatchSnapshot();
  });
  it('should match snapshot of error', () => {
    const wrapper = mount(createDataTable({ error: true }));
    expect(wrapper).toMatchSnapshot();
  });
  it('should match snapshot of data fetched', () => {
    const wrapper = mount(createDataTable());
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Test DataTable component features', () => {
  it('should show loading text', () => {
    const wrapper = mount(createDataTable({ loading: true }));
    const text = wrapper.find('h5').text();
    expect(text).toBe('Loading...');
  });
  it('should show error text', () => {
    const wrapper = mount(createDataTable({ error: true }));
    const text = wrapper.find('h5').text();
    expect(text).toContain('something went wrong');
  });
  it('should show no records found when data length is 0', () => {
    const wrapper = mount(createDataTable({ source: [] }));
    const text = wrapper.find('h5').text();
    expect(text).toContain('No records');
  });
  it('should show table with original order', () => {
    const wrapper = mount(createDataTable());
    mockData.forEach((row, index) => {
      const id = wrapper
        .find('div.d-flex')
        .at(index + 1)
        .find('span')
        .at(0)
        .text();
      expect(id).toBe(`${row.id}`);
    });
  });
  it('should sort with asc order after first click', () => {
    const wrapper = mount(createDataTable());
    // name sorter is clicked
    const sorter = wrapper.find('.flex-column').at(0);
    sorter.simulate('click');

    let ids = [];
    for (let i = 1; i <= mockData.length; i++) {
      const id = wrapper
        .find('div.d-flex')
        .at(i)
        .find('span')
        .at(0)
        .text();
      ids.push(id);
    }
    expect(ids[0]).toBe('5'); // Abraham
    expect(ids[1]).toBe('1'); // Jack
    expect(ids[2]).toBe('2'); // Jack
    expect(ids[3]).toBe('3'); // Joe
    expect(ids[4]).toBe('4'); // Simon
  });
  it('should sort with desc order after second click', () => {
    const wrapper = mount(createDataTable());
    // name sorter is clicked
    const sorter = wrapper.find('.flex-column').at(0);
    sorter.simulate('click');
    sorter.simulate('click');

    let ids = [];
    for (let i = 1; i <= mockData.length; i++) {
      const id = wrapper
        .find('div.d-flex')
        .at(i)
        .find('span')
        .at(0)
        .text();
      ids.push(id);
    }
    expect(ids[0]).toBe('4'); // Simon
    expect(ids[1]).toBe('3'); // Joe
    expect(ids[2]).toBe('1'); // Jack
    expect(ids[3]).toBe('2'); // Jack
    expect(ids[4]).toBe('5'); // Abraham
  });
  it('should show table with original order after third click', () => {
    const wrapper = mount(createDataTable());
    // name sorter is clicked
    const sorter = wrapper.find('.flex-column').at(0);
    sorter.simulate('click');
    sorter.simulate('click');
    sorter.simulate('click');

    mockData.forEach((row, index) => {
      const id = wrapper
        .find('div.d-flex')
        .at(index + 1)
        .find('span')
        .at(0)
        .text();
      expect(id).toBe(`${row.id}`);
    });
  });
  it('should sort with multiple criterias after ctrl + clicked multiple sorter', () => {
    const wrapper = mount(createDataTable());
    // name sorter is clicked
    const nameSorter = wrapper.find('.flex-column').at(0);
    const dobSorter = wrapper.find('.flex-column').at(1);
    const scoreSorter = wrapper.find('.flex-column').at(2);
    nameSorter.simulate('click', { ctrlKey: true });
    dobSorter.simulate('click', { ctrlKey: true });
    scoreSorter.simulate('click', { ctrlKey: true });

    let ids = [];
    for (let i = 1; i <= mockData.length; i++) {
      const id = wrapper
        .find('div.d-flex')
        .at(i)
        .find('span')
        .at(0)
        .text();
      ids.push(id);
    }
    expect(ids[0]).toBe('5'); // Abraham
    expect(ids[1]).toBe('2'); // Jack
    expect(ids[2]).toBe('1'); // Jack
    expect(ids[3]).toBe('3'); // Joe
    expect(ids[4]).toBe('4'); // Simon
  });
});
