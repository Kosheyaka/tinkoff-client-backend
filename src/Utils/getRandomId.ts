export const getRandomId = (max: number, min = 0): number =>
  Math.floor(min + Math.random() * (max + 1 - min));
