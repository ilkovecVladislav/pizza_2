import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { configureStore } from '@reduxjs/toolkit';

import theme from 'theme';
import pizzaConstructorReducer from './state/reducer';
import PizzaView from './PizzaView';
import { FormValues } from './types';

describe('PizzaView component', () => {
  it('renders empty small pizza', () => {
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
      meat: ['bacon'],
    } as FormValues;
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <PizzaView data={PIZZA} />
        </ThemeProvider>
      </Provider>,
    );

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'тесто');
    expect(screen.getByRole('img')).toHaveStyleRule('max-width', '221px');
    expect(screen.getByRole('img')).toHaveStyleRule('max-height', '221px');
  });
  it('renders big pizza with selected ingredients', () => {
    const store = configureStore({
      reducer: {
        pizzaConstructor: pizzaConstructorReducer,
      },
      preloadedState: {
        pizzaConstructor: {
          pizza: {},
          ingredients: {
            vegetables: [
              {
                id: 'RyzrCzfQ',
                name: 'Перец',
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
                name: 'Чеддер',
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
                name: 'Салями',
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
      size: '35',
      dough: 'lush',
      cheese: ['cheddar'],
      vegetables: ['pepper'],
      meat: ['salami'],
    } as FormValues;
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <PizzaView data={PIZZA} />
        </ThemeProvider>
      </Provider>,
    );

    expect(screen.getAllByRole('img')).toHaveLength(4);
    expect(screen.getAllByRole('img')[1]).toHaveStyleRule('max-width', '220px');
    expect(screen.getAllByRole('img')[1]).toHaveStyleRule('max-height', '220px');
  });
  it('renders small pizza with selected ingredients', () => {
    const store = configureStore({
      reducer: {
        pizzaConstructor: pizzaConstructorReducer,
      },
      preloadedState: {
        pizzaConstructor: {
          pizza: {},
          ingredients: {
            meat: [
              {
                category: 'meat',
                id: 'qLdDrMz4',
                image: 'salami.png',
                name: 'Салями',
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
      cheese: [],
      vegetables: [],
      meat: ['salami'],
    } as FormValues;
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <PizzaView data={PIZZA} />
        </ThemeProvider>
      </Provider>,
    );

    expect(screen.getAllByRole('img')).toHaveLength(2);
    expect(screen.getAllByRole('img')[1]).toHaveStyleRule('max-width', '200px');
    expect(screen.getAllByRole('img')[1]).toHaveStyleRule('max-height', '200px');
  });
});
