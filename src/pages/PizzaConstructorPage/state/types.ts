import type Ingredient from 'services/types/Ingredient';
import type { FormValues } from '../types';

export type PizzaIngredients = { [key: string]: Ingredient[] };

export type PizzaConstructorState = {
  pizza: FormValues;
  ingredients: PizzaIngredients;
};
