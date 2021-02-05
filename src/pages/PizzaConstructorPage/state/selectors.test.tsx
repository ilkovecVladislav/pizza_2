import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import {
  usePizzaData,
  useIngredients,
  useIngredientsArray,
  useIsIngredientsLoading,
} from './selectors';

const mockStore = configureStore();

describe('useIsAuthorized hook', () => {
  it('returns pizza data', () => {
    const PIZZA = {
      size: '35',
      dough: 'thin',
      cheese: [],
      vegetables: [],
      meat: ['bacon'],
    };
    const initialState = {
      pizzaConstructor: {
        pizza: PIZZA,
        ingredients: {},
        isLoadingIngredients: false,
      },
    };
    const store = mockStore(initialState);
    const { result } = renderHook(() => usePizzaData(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current).toEqual(PIZZA);
  });
  it('returns ingredients', () => {
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
    };
    const initialState = {
      pizzaConstructor: {
        pizza: { size: '35', dough: 'thin', cheese: [], vegetables: [], meat: ['bacon'] },
        ingredients: INGREDIENTS,
        isLoadingIngredients: false,
      },
    };
    const store = mockStore(initialState);
    const { result } = renderHook(() => useIngredients(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current).toEqual(INGREDIENTS);
  });
  it('returns ingredients array', () => {
    const INGREDIENT = {
      category: 'cheese',
      id: 'zPVQ1E4O',
      image: 'cheddar.png',
      name: 'Чеддер',
      price: '100',
      slug: 'cheddar',
      thumbnail: 'cheddar-thumb.png',
    };
    const INGREDIENTS = {
      cheese: [INGREDIENT],
    };
    const initialState = {
      pizzaConstructor: {
        pizza: { size: '35', dough: 'thin', cheese: [], vegetables: [], meat: ['bacon'] },
        ingredients: INGREDIENTS,
        isLoadingIngredients: false,
      },
    };
    const store = mockStore(initialState);
    const { result } = renderHook(() => useIngredientsArray(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current).toEqual([INGREDIENT]);
  });
  it('returns ingredients loading status', () => {
    const initialState = {
      pizzaConstructor: {
        pizza: { size: '35', dough: 'thin', cheese: [], vegetables: [], meat: ['bacon'] },
        ingredients: {},
        isLoadingIngredients: false,
      },
    };
    const store = mockStore(initialState);
    const { result } = renderHook(() => useIsIngredientsLoading(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current).toEqual(false);
  });
});
