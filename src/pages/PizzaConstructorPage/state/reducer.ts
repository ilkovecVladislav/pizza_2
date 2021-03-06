import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import groupBy from 'lodash/groupBy';

import { getIngredients } from 'services/ingredients';
import type { PizzaIngredients } from './types';
import type { FormValues } from '../types';

export type PizzaConstructorState = {
  pizza: FormValues;
  ingredients: PizzaIngredients;
  isLoadingIngredients: boolean;
};

const initialState: PizzaConstructorState = {
  pizza: {
    size: '30',
    dough: 'thin',
    cheese: [],
    vegetables: [],
    meat: [],
  },
  ingredients: {},
  isLoadingIngredients: false,
};

export const loadIngredients = createAsyncThunk('pizzaConstructor/loadIngredients', async () => {
  const result = await getIngredients();

  return groupBy(result, 'category');
});

const pizzaConstructorSlice = createSlice({
  name: 'pizzaConstructor',
  initialState,
  reducers: {
    setPizza(state, action: PayloadAction<FormValues>) {
      state.pizza = action.payload;
    },
    setIngredients(state, action: PayloadAction<PizzaIngredients>) {
      state.ingredients = action.payload;
    },
    resetPizza(state) {
      state.pizza = {
        size: '30',
        dough: 'thin',
        cheese: [],
        vegetables: [],
        meat: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredients.pending, (state) => {
        state.isLoadingIngredients = true;
      })
      .addCase(loadIngredients.fulfilled, (state, action: PayloadAction<PizzaIngredients>) => {
        state.isLoadingIngredients = false;
        state.ingredients = action.payload;
      });
  },
});

export const { setPizza, setIngredients, resetPizza } = pizzaConstructorSlice.actions;

export default pizzaConstructorSlice.reducer;
