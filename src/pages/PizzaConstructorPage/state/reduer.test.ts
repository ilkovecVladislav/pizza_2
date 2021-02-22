import pizzaConstructorSlice, {
  setPizza,
  setIngredients,
  resetPizza,
  loadIngredients,
  PizzaConstructorState,
} from './reducer';
import type { PizzaIngredients } from './types';
import type { FormValues } from '../types';

describe('pizzaConstructorSlice reducer', () => {
  describe('action creators', () => {
    it('setPizza action creator', () => {
      const PIZZA = {
        size: '35',
        dough: 'thin',
        cheese: [],
        vegetables: [],
        meat: ['bacon'],
      } as FormValues;

      expect(setPizza(PIZZA)).toEqual({ type: 'pizzaConstructor/setPizza', payload: PIZZA });
    });
    it('setIngredients action creator', () => {
      const INGREDIENTS = {
        cheese: [
          {
            category: 'cheese',
            id: 'zPVQ1E4O',
            image: 'cheddar.png',
            name: 'Чеддер',
            price: '100',
            slug: 'cheddar',
            thumbnail: 'cheddar-thumb.png',
          },
        ],
        meat: [
          {
            category: 'meat',
            id: 'Odd5HuC4',
            image: 'bacon.png',
            name: 'Бекон',
            price: '100',
            slug: 'bacon',
            thumbnail: 'bacon-thumb.png',
          },
        ],
      } as PizzaIngredients;

      expect(setIngredients(INGREDIENTS)).toEqual({
        type: 'pizzaConstructor/setIngredients',
        payload: INGREDIENTS,
      });
    });
    it('resetPizza action creator', () => {
      expect(resetPizza()).toEqual({
        type: 'pizzaConstructor/resetPizza',
      });
    });
  });
  describe('action handlers', () => {
    it('set pizza', () => {
      const initialState = {
        pizza: {
          size: '30',
          dough: 'thin',
          cheese: [],
          vegetables: [],
          meat: [],
        },
        ingredients: {},
        isLoadingIngredients: false,
      } as PizzaConstructorState;
      const NEW_PIZZA = {
        size: '35',
        dough: 'lush',
        cheese: [],
        vegetables: [],
        meat: ['bacon'],
      } as FormValues;
      const action = { type: 'pizzaConstructor/setPizza', payload: NEW_PIZZA };

      expect(pizzaConstructorSlice(initialState, action)).toEqual({
        ...initialState,
        pizza: NEW_PIZZA,
      });
    });
    it('set ingredients', () => {
      const initialState = {
        pizza: {
          size: '30',
          dough: 'thin',
          cheese: [],
          vegetables: [],
          meat: [],
        },
        ingredients: {},
        isLoadingIngredients: false,
      } as PizzaConstructorState;
      const NEW_INGREDIENTS = {
        cheese: [
          {
            category: 'cheese',
            id: 'zPVQ1E4O',
            image: 'cheddar.png',
            name: 'Чеддер',
            price: '100',
            slug: 'cheddar',
            thumbnail: 'cheddar-thumb.png',
          },
        ],
        meat: [],
      } as PizzaIngredients;
      const action = { type: 'pizzaConstructor/setIngredients', payload: NEW_INGREDIENTS };

      expect(pizzaConstructorSlice(initialState, action)).toEqual({
        ...initialState,
        ingredients: NEW_INGREDIENTS,
      });
    });
    it('reset pizza', () => {
      const initialState = {
        pizza: {
          size: '35',
          dough: 'lush',
          cheese: [],
          vegetables: [],
          meat: ['bacon'],
        },
        ingredients: {},
        isLoadingIngredients: false,
      } as PizzaConstructorState;
      const BASE_PIZZA = {
        size: '30',
        dough: 'thin',
        cheese: [],
        vegetables: [],
        meat: [],
      } as FormValues;
      const action = { type: 'pizzaConstructor/resetPizza' };

      expect(pizzaConstructorSlice(initialState, action)).toEqual({
        ...initialState,
        pizza: BASE_PIZZA,
      });
    });
    describe('async action', () => {
      it('sets loading true when loadIngredients is pending', () => {
        const initialState = {
          pizza: {
            size: '30',
            dough: 'thin',
            cheese: [],
            vegetables: [],
            meat: [],
          },
          ingredients: {},
          isLoadingIngredients: false,
        } as PizzaConstructorState;
        const action = { type: loadIngredients.pending.type };
        const state = pizzaConstructorSlice(initialState, action);

        expect(state).toEqual({ ...initialState, isLoadingIngredients: true });
      });

      it('sets ingredients when loadIngredients is fulfilled', () => {
        const initialState = {
          pizza: {
            size: '30',
            dough: 'thin',
            cheese: [],
            vegetables: [],
            meat: [],
          },
          ingredients: {},
          isLoadingIngredients: false,
        } as PizzaConstructorState;
        const NEW_INGREDIENTS = {
          cheese: [
            {
              category: 'cheese',
              id: 'zPVQ1E4O',
              image: 'cheddar.png',
              name: 'Чеддер',
              price: '100',
              slug: 'cheddar',
              thumbnail: 'cheddar-thumb.png',
            },
          ],
          meat: [],
        } as PizzaIngredients;
        const action = { type: loadIngredients.fulfilled.type, payload: NEW_INGREDIENTS };
        const state = pizzaConstructorSlice(initialState, action);

        expect(state).toEqual({ ...initialState, ingredients: NEW_INGREDIENTS });
      });
    });
  });
});
