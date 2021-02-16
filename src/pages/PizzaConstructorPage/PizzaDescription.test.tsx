import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { configureStore } from '@reduxjs/toolkit';

import theme from 'theme';
import pizzaConstructorReducer from './state/reducer';
import PizzaDescription from './PizzaDescription';
import { FormValues } from './types';

describe('PizzaDescription component', () => {
  it('renders empty pizza', () => {
    const store = configureStore({
      reducer: {
        pizzaConstructor: pizzaConstructorReducer,
      },
      preloadedState: {
        pizzaConstructor: {
          pizza: {},
          ingredients: {},
          isLoadingIngredients: false,
        },
      },
    });
    const PIZZA = {
      size: '30',
      dough: 'thin',
      cheese: [],
      vegetables: [],
      meat: [],
    } as FormValues;
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <PizzaDescription data={PIZZA} />
        </ThemeProvider>
      </Provider>,
    );

    expect(screen.getByText('тонком', { exact: false })).toBeInTheDocument();
  });
  it('renders selected pizza ingredients', () => {
    const CHEDDAR_LABEL = 'Чеддер';
    const SAUCE_LABEL = 'Белый';
    const SALAMI_LABEL = 'Салями';
    const PEPPER_LABEL = 'Перец';
    const store = configureStore({
      reducer: {
        pizzaConstructor: pizzaConstructorReducer,
      },
      preloadedState: {
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
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <PizzaDescription data={PIZZA} />
        </ThemeProvider>
      </Provider>,
    );

    expect(screen.getByText(CHEDDAR_LABEL)).toBeInTheDocument();
    expect(screen.getByText(SALAMI_LABEL)).toBeInTheDocument();
    expect(screen.getByText(PEPPER_LABEL)).toBeInTheDocument();
    expect(screen.getByText(SAUCE_LABEL, { exact: false })).toBeInTheDocument();
    expect(screen.getByText('толстом', { exact: false })).toBeInTheDocument();
  });
});
