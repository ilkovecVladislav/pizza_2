import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { PizzaSizesKeys, DoughKeys } from 'constants/common';
import type Categories from 'types/Categories';
import pizzaConstructorReducer from './reducer';
import {
  usePizzaData,
  useIngredients,
  useIngredientsArray,
  useIsIngredientsLoading,
} from './selectors';

describe('useIsAuthorized hook', () => {
  it('returns pizza data', () => {
    const PIZZA = {
      size: '35' as PizzaSizesKeys,
      dough: 'thin' as DoughKeys,
      cheese: [],
      vegetables: [],
      meat: ['bacon'],
    };
    const store = configureStore({
      reducer: {
        pizzaConstructor: pizzaConstructorReducer,
      },
      preloadedState: {
        pizzaConstructor: {
          pizza: PIZZA,
          ingredients: {},
          isLoadingIngredients: false,
        },
      },
    });
    const { result } = renderHook(() => usePizzaData(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current).toEqual(PIZZA);
  });
  it('returns ingredients', () => {
    const INGREDIENTS = {
      cheese: [
        {
          category: 'cheese' as Categories,
          id: 'zPVQ1E4O',
          image: 'cheddar.png',
          name: 'Чеддер',
          price: '100',
          slug: 'cheddar',
          thumbnail: 'cheddar-thumb.png',
        },
      ],
    };
    const store = configureStore({
      reducer: {
        pizzaConstructor: pizzaConstructorReducer,
      },
      preloadedState: {
        pizzaConstructor: {
          pizza: { size: '35', dough: 'thin', cheese: [], vegetables: [], meat: ['bacon'] },
          ingredients: INGREDIENTS,
          isLoadingIngredients: false,
        },
      },
    });
    const { result } = renderHook(() => useIngredients(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current).toEqual(INGREDIENTS);
  });
  it('returns ingredients array', () => {
    const INGREDIENT = {
      category: 'cheese' as Categories,
      id: 'zPVQ1E4O',
      image: 'cheddar.png',
      name: 'Чеддер',
      price: '100',
      slug: 'cheddar',
      thumbnail: 'cheddar-thumb.png',
    };
    const store = configureStore({
      reducer: {
        pizzaConstructor: pizzaConstructorReducer,
      },
      preloadedState: {
        pizzaConstructor: {
          pizza: { size: '35', dough: 'thin', cheese: [], vegetables: [], meat: ['bacon'] },
          ingredients: {
            cheese: [INGREDIENT],
          },
          isLoadingIngredients: false,
        },
      },
    });
    const { result } = renderHook(() => useIngredientsArray(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current).toEqual([INGREDIENT]);
  });
  it('returns ingredients loading status', () => {
    const store = configureStore({
      reducer: {
        pizzaConstructor: pizzaConstructorReducer,
      },
      preloadedState: {
        pizzaConstructor: {
          pizza: { size: '35', dough: 'thin', cheese: [], vegetables: [], meat: ['bacon'] },
          ingredients: {},
          isLoadingIngredients: false,
        },
      },
    });
    const { result } = renderHook(() => useIsIngredientsLoading(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current).toEqual(false);
  });
});
