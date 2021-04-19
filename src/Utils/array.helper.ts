export const sortASC = (a: number | string, b: number | string): number =>
  a < b ? -1 : a > b ? 1 : 0;

export const sortDESC = (a: number | string, b: number | string): number =>
  a < b ? 1 : a > b ? -1 : 0;

export const sortByKeyASC = <T>(a: T, b: T, key: keyof T) =>
  a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;

export const sortByKeyDESC = <T>(a: T, b: T, key: keyof T) =>
  a[key] < b[key] ? 1 : a[key] > b[key] ? -1 : 0;

/**
 * Shuffles array in place by Fisher–Yates algorithm. ES6 version
 */
export const shuffle = <T>(arr: T[]): T[] => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const flatten = (arr: any[]): number[] => {
  let flatArray = [];
  arr.forEach((item) => {
    if (item.constructor === Array) {
      flatArray = flatArray.concat(flatten(item));
    } else {
      flatArray.push(item);
    }
  });

  return flatArray;
};
