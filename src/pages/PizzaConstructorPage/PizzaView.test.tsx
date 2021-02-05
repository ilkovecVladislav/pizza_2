import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import configureStore from 'redux-mock-store';

import theme from 'theme';
import PizzaView from './PizzaView';
import { FormValues } from './types';

const mockStore = configureStore();

describe('PizzaView component', () => {
  it('renders empty small pizza', () => {
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
      meat: ['bacon'],
    } as FormValues;
    const { getByRole } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <PizzaView data={PIZZA} />
        </ThemeProvider>
      </Provider>,
    );

    expect(getByRole('img')).toBeInTheDocument();
    expect(getByRole('img')).toHaveAttribute('alt', 'тесто');
    expect(getByRole('img')).toHaveStyleRule('max-width', '221px');
    expect(getByRole('img')).toHaveStyleRule('max-height', '221px');
  });
  it('renders big pizza with selected ingredients', () => {
    const store = mockStore({
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
    });
    const PIZZA = {
      size: '35',
      dough: 'lush',
      cheese: ['cheddar'],
      vegetables: ['pepper'],
      meat: ['salami'],
    } as FormValues;
    const { getAllByRole } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <PizzaView data={PIZZA} />
        </ThemeProvider>
      </Provider>,
    );

    expect(getAllByRole('img')).toHaveLength(4);
    expect(getAllByRole('img')[1]).toHaveStyleRule('max-width', '220px');
    expect(getAllByRole('img')[1]).toHaveStyleRule('max-height', '220px');
  });
  it('renders small pizza with selected ingredients', () => {
    const store = mockStore({
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
    });
    const PIZZA = {
      size: '30',
      dough: 'lush',
      cheese: [],
      vegetables: [],
      meat: ['salami'],
    } as FormValues;
    const { getAllByRole } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <PizzaView data={PIZZA} />
        </ThemeProvider>
      </Provider>,
    );

    expect(getAllByRole('img')).toHaveLength(2);
    expect(getAllByRole('img')[1]).toHaveStyleRule('max-width', '200px');
    expect(getAllByRole('img')[1]).toHaveStyleRule('max-height', '200px');
  });
});
