import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import configureStore from 'redux-mock-store';

import theme from 'theme';
import PizzaDescription from './PizzaDescription';
import { FormValues } from './types';

const mockStore = configureStore();

describe('PizzaDescription component', () => {
  it('renders empty pizza', () => {
    const store = mockStore({
      pizzaConstructor: {
        pizza: {},
        ingredients: {},
        isLoadingIngredients: false,
      },
    });
    const PIZZA = {
      size: '30',
      dough: 'thin',
      cheese: [],
      vegetables: [],
      meat: [],
    } as FormValues;
    const { getByText } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <PizzaDescription data={PIZZA} />
        </ThemeProvider>
      </Provider>,
    );

    expect(getByText('тонком', { exact: false })).toBeInTheDocument();
  });
  it('renders selected pizza ingredients', () => {
    const CHEDDAR_LABEL = 'Чеддер';
    const SAUCE_LABEL = 'Белый';
    const SALAMI_LABEL = 'Салями';
    const PEPPER_LABEL = 'Перец';
    const store = mockStore({
      pizzaConstructor: {
        pizza: {},
        ingredients: {
          sauces: [
            {
              id: 'qhr84PaS',
              name: SAUCE_LABEL,
              slug: 'white',
              price: '29',
              category: 'sauces',
              image: 'bacon.png',
              thumbnail: 'bacon-thumb.png',
            },
          ],
          vegetables: [
            {
              id: 'RyzrCzfQ',
              name: PEPPER_LABEL,
              slug: 'pepper',
              price: '100',
              category: 'vegetables',
              image: 'pepper.png',
              thumbnail: 'pepper-thumb.png',
            },
          ],
          cheese: [
            {
              category: 'cheese',
              id: 'zPVQ1E4O',
              image: 'cheddar.png',
              name: CHEDDAR_LABEL,
              price: '100',
              slug: 'cheddar',
              thumbnail: 'cheddar-thumb.png',
            },
          ],
          meat: [
            {
              category: 'meat',
              id: 'qLdDrMz4',
              image: 'salami.png',
              name: SALAMI_LABEL,
              price: '100',
              slug: 'salami',
              thumbnail: 'salami-thumb.png',
            },
          ],
        },
        isLoadingIngredients: false,
      },
    });
    const PIZZA = {
      size: '30',
      dough: 'lush',
      cheese: ['cheddar'],
      vegetables: ['pepper'],
      meat: ['bacon', 'salami'],
      sauce: 'white',
    } as FormValues;
    const { getByText } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <PizzaDescription data={PIZZA} />
        </ThemeProvider>
      </Provider>,
    );

    expect(getByText(CHEDDAR_LABEL)).toBeInTheDocument();
    expect(getByText(SALAMI_LABEL)).toBeInTheDocument();
    expect(getByText(PEPPER_LABEL)).toBeInTheDocument();
    expect(getByText(SAUCE_LABEL, { exact: false })).toBeInTheDocument();
    expect(getByText('толстом', { exact: false })).toBeInTheDocument();
  });
});
