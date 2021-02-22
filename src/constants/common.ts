export const BIG_PIZZA_SIZE = '35';

interface Option {
  label: string;
  price: number;
}

interface PizzaSizesOptions {
  '30': Option;
  [BIG_PIZZA_SIZE]: Option;
}

export type PizzaSizesKeys = keyof PizzaSizesOptions;

export const PIZZA_SIZES = {
  '30': { label: '30 см', price: 0 },
  [BIG_PIZZA_SIZE]: { label: '35 см', price: 50 },
};

interface DoughOptions {
  thin: Option;
  lush: Option;
}

export type DoughKeys = keyof DoughOptions;

export const DOUGH = {
  thin: { label: 'Тонкое', price: 0 },
  lush: { label: 'Пышное', price: 0 },
};
