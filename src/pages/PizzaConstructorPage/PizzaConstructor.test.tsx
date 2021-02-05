import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { createStore } from 'redux';

import { rootReducer } from 'store';
import theme from 'theme';
import { loadIngredients } from './state/reducer';
import OrderCheckout from '.';
import getIngredientsResponse, { groupedIngredients } from '__fixtures__/getIngredientsResponse';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('OrderCheckout component', () => {
  it('send order to the server', () => {
    const history = createMemoryHistory();
    const store = createStore(rootReducer);
    store.dispatch({ type: loadIngredients.pending.type });
    const { getByText } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <OrderCheckout />
          </Router>
        </ThemeProvider>
      </Provider>,
    );

    expect(getByText('Загрузка')).toBeInTheDocument();
  });
  it('renders correctly', () => {
    const BASE_RADIO_INPUTS = 4; // pizza sizes(2) + pizza dough(2)
    const history = createMemoryHistory();
    const store = createStore(rootReducer);
    store.dispatch({ type: loadIngredients.fulfilled.type, payload: groupedIngredients });
    const { getAllByRole } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <OrderCheckout />
          </Router>
        </ThemeProvider>
      </Provider>,
    );
    const { sauces } = store.getState().pizzaConstructor.ingredients;

    expect(getAllByRole('radio')).toHaveLength(BASE_RADIO_INPUTS + sauces.length);
    expect(getAllByRole('checkbox')).toHaveLength(getIngredientsResponse.length - sauces.length);
  });
  it('renders correctly when ingredients are not loaded', async () => {
    const BASE_RADIO_INPUTS = 4;
    const history = createMemoryHistory();
    const store = createStore(rootReducer);
    const { getAllByRole, queryAllByRole } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <OrderCheckout />
          </Router>
        </ThemeProvider>
      </Provider>,
    );

    expect(getAllByRole('radio')).toHaveLength(BASE_RADIO_INPUTS);
    expect(queryAllByRole('checkbox')).toHaveLength(0);
  });
  it('change pizza data', async () => {
    const history = createMemoryHistory();
    const store = createStore(rootReducer);
    store.dispatch({ type: loadIngredients.fulfilled.type, payload: groupedIngredients });
    const { getAllByText, getByLabelText, getByText } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <OrderCheckout />
          </Router>
        </ThemeProvider>
      </Provider>,
    );

    fireEvent.click(getByLabelText('35 см'));
    fireEvent.click(getByLabelText('Пышное'));
    fireEvent.click(getByText('Чеддер'));
    fireEvent.click(getByText('Оливки'));
    fireEvent.click(getByText('Бекон'));

    expect(getByLabelText('35 см')).toBeChecked();
    expect(getByLabelText('Пышное')).toBeChecked();
    expect(getAllByText('Оливки')).toHaveLength(2);
    expect(getAllByText('Чеддер')).toHaveLength(2);
    expect(getAllByText('Бекон')).toHaveLength(2);
  });
  it('submit pizza', async () => {
    const history = createMemoryHistory();
    const store = createStore(rootReducer);
    store.dispatch({ type: loadIngredients.fulfilled.type, payload: groupedIngredients });
    const spy = jest.spyOn(store, 'dispatch');
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <OrderCheckout />
          </Router>
        </ThemeProvider>
      </Provider>,
    );
    fireEvent.click(getByLabelText('35 см'));
    fireEvent.click(getByLabelText('Пышное'));

    await act(async () => {
      fireEvent.click(getByText('Заказать за', { exact: false }));
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
