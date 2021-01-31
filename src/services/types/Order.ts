import { DoughKeys } from 'constants/common';

type Order = {
  id: string;
  ingredients: string[];
  sauces: string[];
  size: number;
  dough: DoughKeys;
  name: string;
  address: string;
  card_number: string;
};

export default Order;
