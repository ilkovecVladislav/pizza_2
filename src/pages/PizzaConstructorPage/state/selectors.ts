import { useSelector } from 'react-redux';

import type { RootState } from 'store';
import type { PizzaIngredients } from './types';
import type { FormValues } from '../types';
import Ingredient from 'services/types/Ingredient';
import flatten from 'lodash/flatten';

export const usePizzaData = (): FormValues =>
  useSelector((state: RootState) => state.pizzaConstructor.pizza);

export const useIngredients = (): PizzaIngredients =>
  useSelector((state: RootState) => state.pizzaConstructor.ingredients);

export const useIngredientsArray = (): Ingredient[] =>
  useSelector((state: RootState) => flatten(Object.values(state.pizzaConstructor.ingredients)));

export const useIsIngredientsLoading = (): boolean =>
  useSelector((state: RootState) => state.pizzaConstructor.isLoadingIngredients);
