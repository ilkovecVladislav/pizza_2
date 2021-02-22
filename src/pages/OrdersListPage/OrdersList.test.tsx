import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';

import { rootReducer } from 'store';
import { getOrders } from 'services/orders';
import theme from 'theme';
import OrdersList from './OrdersList';

jest.mock('services/orders', () => ({
  getOrders: jest.fn(),
}));

const mockGetOrders = getOrders as jest.Mock;

jest.mock('components/OrderCard', () => () => <div>Order card</div>);

const getControlledPromise = () => {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { resolve, reject, promise };
};

describe('OrdersList component', () => {
  it('renders loading message', async () => {
    mockGetOrders.mockImplementation(() => getControlledPromise().promise);
    const store = configureStore({ reducer: rootReducer });
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <OrdersList />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Загрузка', { exact: false })).toBeInTheDocument();
    });
  });
  it('renders orders list', async () => {
    mockGetOrders.mockResolvedValue([
      {
        id: 'd5fE_asz',
        ingredients: [],
        sauces: [],
        size: 30,
        dough: 'thick',
        name: 'Ivan Ivanov',
        card_number: '0000 0000 0000 0000',
        address: 'Sesame Street',
      },
      {
        id: 'd5fE_3ss1',
        ingredients: ['bacon'],
        sauces: [],
        size: 35,
        dough: 'lush',
        name: 'Ivan Ivanov',
        card_number: '0000 0000 0000 0000',
        address: 'Sesame Street',
      },
    ]);
    const store = configureStore({ reducer: rootReducer });
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <OrdersList />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getAllByText('Order card')).toHaveLength(2);
    });
  });
  it('renders empty orders list', async () => {
    mockGetOrders.mockResolvedValue([]);
    const store = configureStore({ reducer: rootReducer });
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <OrdersList />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.queryByText('Order card')).not.toBeInTheDocument();
    });
  });
  it('console error if getOrders request is failed', async () => {
    const ERROR_TEXT = 'error';
    mockGetOrders.mockRejectedValue(ERROR_TEXT);
    window.console.log = jest.fn();
    const store = configureStore({ reducer: rootReducer });
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <OrdersList />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    );

    await waitFor(() => {
      expect(window.console.log).toHaveBeenCalledWith(ERROR_TEXT);
    });
  });
});
