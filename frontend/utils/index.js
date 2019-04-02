import { isValid, isBefore, isAfter } from 'date-fns';

export function compareString(first, second, isAscOrder) {
  if (typeof first !== 'string') return 1;
  if (typeof second !== 'string') return -1;

  first = first.toLowerCase();
  second = second.toLowerCase();

  if (first < second) {
    if (isAscOrder) return -1;
    return 1;
  }
  if (first > second) {
    if (isAscOrder) return 1;
    return -1;
  }

  // string must be equal
  return 0;
}

export function compareNumber(first, second, isAscOrder) {
  if (typeof first !== 'number') return -1;
  if (typeof second !== 'number') return 1;

  first = Number(first);
  second = Number(second);

  if (isAscOrder) return second - first;
  return first - second;
}

export function compareDate(first, second, isAscOrder) {
  first = new Date(first);
  second = new Date(second);

  if (!isValid(first)) return 1;
  if (!isValid(second)) return -1;

  if (isBefore(first, second)) {
    if (isAscOrder) return -1;
    return 1;
  }
  if (isAfter(first, second)) {
    if (isAscOrder) return 1;
    return -1;
  }

  // date must be equal
  return 0;
}
