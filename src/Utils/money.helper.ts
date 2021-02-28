export const wrapMoney = (money: number): number => Math.round(money * 100) / 100;

export const arraySum = (arr: number[]): number =>
  wrapMoney(arr.reduce((prev, curr) => prev + wrapMoney(curr), 0.00));
