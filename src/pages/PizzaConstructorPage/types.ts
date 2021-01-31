import { PizzaSizesKeys, DoughKeys } from 'constants/common';
export type FormValues = {
  size: PizzaSizesKeys;
  dough: DoughKeys;
  sauce?: string;
  cheese: string[];
  vegetables: string[];
  meat: string[];
};
