import { useSelector } from 'react-redux';

import type { RootState } from 'store';
import type { PizzaIngredients } from './types';
import type { FormValues } from '../types';

export const usePizzaData = (): FormValues =>
  useSelector((state: RootState) => state.pizzaConstructor.pizza);

export const useIngredients = (): PizzaIngredients =>
  useSelector((state: RootState) => state.pizzaConstructor.ingredients);

export const useIsIngredientsLoading = (): boolean =>
  useSelector((state: RootState) => state.pizzaConstructor.isLoadingIngredients);
