import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

import theme from 'theme';
import pizzaConstructorReducer, { loadIngredients } from './state/reducer';
import OrderCheckout from '.';
import getIngredientsResponse, { groupedIngredients } from '__fixtures__/getIngredientsResponse';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as {}),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('OrderCheckout component', () => {
  it('send order to the server', () => {
    const store = configureStore({
      reducer: {
        pizzaConstructor: pizzaConstructorReducer,
      },
    });
    store.dispatch({ type: loadIngredients.pending.type });
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <OrderCheckout />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    );

    expect(screen.getByText(/загрузка/i)).toBeInTheDocument();
  });
  it('renders correctly', () => {
    const BASE_RADIO_INPUTS = 4; // pizza sizes(2) + pizza dough(2)
    const store = configureStore({
      reducer: {
        pizzaConstructor: pizzaConstructorReducer,
      },
    });
    store.dispatch({ type: loadIngredients.fulfilled.type, payload: groupedIngredients });
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <OrderCheckout />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    );
    const { sauces } = store.getState().pizzaConstructor.ingredients;

    expect(screen.getAllByRole('radio')).toHaveLength(BASE_RADIO_INPUTS + sauces.length);
    expect(screen.getAllByRole('checkbox')).toHaveLength(
      getIngredientsResponse.length - sauces.length,
    );
  });
  it('renders correctly when ingredients are not loaded', async () => {
    const BASE_RADIO_INPUTS = 4;
    const store = configureStore({
      reducer: {
        pizzaConstructor: pizzaConstructorReducer,
      },
    });
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <OrderCheckout />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    );

    expect(screen.getAllByRole('radio')).toHaveLength(BASE_RADIO_INPUTS);
    expect(screen.queryAllByRole('checkbox')).toHaveLength(0);
  });
  it('change pizza data', async () => {
    const store = configureStore({
      reducer: {
        pizzaConstructor: pizzaConstructorReducer,
      },
    });
    store.dispatch({ type: loadIngredients.fulfilled.type, payload: groupedIngredients });
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <OrderCheckout />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    );

    userEvent.click(screen.getByLabelText('35 см'));
    userEvent.click(screen.getByLabelText('Пышное'));
    userEvent.click(screen.getByText('Чеддер'));
    userEvent.click(screen.getByText('Оливки'));
    userEvent.click(screen.getByText('Бекон'));

    expect(screen.getByLabelText('35 см')).toBeChecked();
    expect(screen.getByLabelText('Пышное')).toBeChecked();
    expect(screen.getAllByText('Оливки')).toHaveLength(2);
    expect(screen.getAllByText('Чеддер')).toHaveLength(2);
    expect(screen.getAllByText('Бекон')).toHaveLength(2);
  });
  it('submit pizza', async () => {
    const store = configureStore({
      reducer: {
        pizzaConstructor: pizzaConstructorReducer,
      },
    });
    store.dispatch({ type: loadIngredients.fulfilled.type, payload: groupedIngredients });
    const spy = jest.spyOn(store, 'dispatch');
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <OrderCheckout />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    );
    userEvent.click(screen.getByLabelText('35 см'));
    userEvent.click(screen.getByLabelText('Пышное'));

    await act(async () => {
      userEvent.click(screen.getByText(/заказать/i));
    });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'pizzaConstructor/setPizza',
        payload: expect.objectContaining({
          size: '35',
          dough: 'lush',
        }),
      }),
    );
    expect(mockHistoryPush).toHaveBeenCalledWith('/order-checkout');
  });
});
