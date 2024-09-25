export const add = (a: number, b: number): number => a + b;

export const multiply = (a: number, b: number): number => a * b;

export const percentage = (value: number, total: number): string => {
  if (total === 0) return '-';
  return ((value / total) * 100).toFixed(2) + '%';
};