import { flatten, sortASC, sortDESC } from './array.helper';

describe('Helpers: array', () => {
  describe('sortASC', () => {
    it('array of numbers', () => {
      const input: number[] = [0, 2, 4, 3, 1];
      const expected: number[] = [0, 1, 2, 3, 4];

      expect<number[]>(input.sort(sortASC)).toEqual(expected);
    });

    it('array of strings', () => {
      const input: string[] = ['0', '2', '4', '3', '1', '10'];
      const expected: string[] = ['0', '1', '10', '2', '3', '4'];

      expect<string[]>(input.sort(sortASC)).toEqual(expected);
    });
  });

  describe('sortDESC', () => {
    it('array of numbers', () => {
      const input: number[] = [0, 2, 4, 3, 1];
      const expected: number[] = [4, 3, 2, 1, 0];

      expect<number[]>(input.sort(sortDESC)).toEqual(expected);
    });

    it('array of strings', () => {
      const input: string[] = ['0', '2', '4', '3', '1', '10'];
      const expected: string[] = ['4', '3', '2', '10', '1', '0'];

      expect<string[]>(input.sort(sortDESC)).toEqual(expected);
    });
  });

  describe('flatten', () => {
    it('Test #1', async () => {
      const result = flatten([
        [
          [1, 2, 3],
          [3, 4, 5],
        ],
        [12, 13],
      ]);
      const expected = [1, 2, 3, 3, 4, 5, 12, 13];

      expect(result).toEqual(expected);
    });
  });
});
