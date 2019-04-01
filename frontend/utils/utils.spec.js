import { compareString, compareNumber, compareDate } from './index';

const ASC_ORDER = true;
const DESC_ORDER = false;

describe('Test compareString function', () => {
	const first = 'Jeremy';
	const second = 'jeremy';
	const third = 'Ann';
	it('Should return 0 if 2 strings are the same', () => {
		expect(compareString(first, second, ASC_ORDER)).toBe(0);
		expect(compareString(first, second, DESC_ORDER)).toBe(0);
	});

	it('Should return 1 if second element is not a string', () => {
		expect(compareString(first, null, ASC_ORDER)).toBe(1);
		expect(compareString(first, null, DESC_ORDER)).toBe(1);
	});

	it('Should return -1 if first element is not a string', () => {
		expect(compareString(null, second, ASC_ORDER)).toBe(-1);
		expect(compareString(null, second, DESC_ORDER)).toBe(-1);
	});

	it('Should return correct value', () => {
		expect(compareString(first, third, ASC_ORDER)).toBe(-1);
		expect(compareString(third, first, ASC_ORDER)).toBe(1);
		expect(compareString(first, third, DESC_ORDER)).toBe(1);
		expect(compareString(third, first, DESC_ORDER)).toBe(-1);
	});
})

describe('Test compareNumber function', () => {
	const first = 1;
	const second = 1;
	const third = -1;
	it('Should return 0 if 2 numbers are the same', () => {
		expect(compareNumber(first, second, ASC_ORDER)).toBe(0);
		expect(compareNumber(first, second, DESC_ORDER)).toBe(0);
	});

	it('Should return positive number if second element is not a number', () => {
		expect(compareNumber(first, null, ASC_ORDER)).toBeGreaterThan(0);
		expect(compareNumber(first, null, DESC_ORDER)).toBeGreaterThan(0);
	});

	it('Should return negative number if first element is not a number', () => {
		expect(compareNumber(null, second, ASC_ORDER)).toBeLessThan(0);
		expect(compareNumber(null, second, DESC_ORDER)).toBeLessThan(0);
	});

	it('Should return correct value', () => {
		expect(compareNumber(first, third, ASC_ORDER)).toBeLessThan(0);
		expect(compareNumber(third, first, ASC_ORDER)).toBeGreaterThan(0);
		expect(compareNumber(first, third, DESC_ORDER)).toBeGreaterThan(0);
		expect(compareNumber(third, first, DESC_ORDER)).toBeLessThan(0);
	});
});

describe('Test compareDate function', () => {
	const first = '2018-12-30';
	const second = '2018-12-30';
	const third = '2019-03-03 13:23:23';
	it('Should return 0 if 2 dates are the same', () => {
		expect(compareDate(first, second, ASC_ORDER)).toBe(0);
		expect(compareDate(first, second, DESC_ORDER)).toBe(0);
	});

	it('Should return 1 if second element is not a date', () => {
		expect(compareDate(first, '', ASC_ORDER)).toBe(1);
		expect(compareDate(first, '', DESC_ORDER)).toBe(1);
	});

	it('Should return -1 if first element is not a date', () => {
		expect(compareDate('', second, ASC_ORDER)).toBe(-1);
		expect(compareDate('', second, DESC_ORDER)).toBe(-1);
	});

	it('Should return correct value', () => {
		expect(compareDate(first, third, ASC_ORDER)).toBe(1);
		expect(compareDate(third, first, ASC_ORDER)).toBe(-1);
		expect(compareDate(first, third, DESC_ORDER)).toBe(-1);
		expect(compareDate(third, first, DESC_ORDER)).toBe(1);
	});
})