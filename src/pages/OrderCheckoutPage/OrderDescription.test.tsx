import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import configureStore from 'redux-mock-store';

import theme from 'theme';
import OrderDescription from './OrderDescription';

const mockStore = configureStore();

describe('OrderDescription component', () => {
  it('renders correctly', () => {
    const PRICE = 400;
    const CHEDDAR_LABEL = 'Чеддер';
    const BACON_LABEL = 'Бекон';
    const SALAMI_LABEL = 'Салями';
    const store = mockStore({
      pizzaConstructor: {
        pizza: {
          size: '30',
          dough: 'thin',
          cheese: ['cheddar'],
          vegetables: [],
          meat: ['bacon', 'salami'],
        },
        ingredients: {
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
            {
              category: 'cheese',
              id: 'KJ1aL-Cn',
              image: 'mozarella.png',
              name: 'Моцарелла',
              price: '100',
              slug: 'mozarella',
              thumbnail: 'mozarella-thumb.png',
            },
          ],
          meat: [
            {
              category: 'meat',
              id: 'Odd5HuC4',
              image: 'bacon.png',
              name: BACON_LABEL,
              price: '100',
              slug: 'bacon',
              thumbnail: 'bacon-thumb.png',
            },
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
    const { getByText } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <OrderDescription price={PRICE} />
        </ThemeProvider>
      </Provider>,
    );

    expect(getByText(PRICE, { exact: false })).toBeInTheDocument();
    expect(getByText(CHEDDAR_LABEL)).toBeInTheDocument();
    expect(getByText(BACON_LABEL)).toBeInTheDocument();
    expect(getByText(SALAMI_LABEL)).toBeInTheDocument();
  });
  it('renders pizza without ingredients', () => {
    const PIZZA_SIZE = 35;
    const store = mockStore({
      pizzaConstructor: {
        pizza: {
          size: PIZZA_SIZE,
          dough: 'thin',
        },
        ingredients: {},
        isLoadingIngredients: false,
      },
    });
    const { getByText } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <OrderDescription price={400} />
        </ThemeProvider>
      </Provider>,
    );

    expect(getByText(PIZZA_SIZE, { exact: false })).toBeInTheDocument();
  });
});
