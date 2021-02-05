import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { rootReducer } from 'store';
import { getOrders } from 'services/orders';
import theme from 'theme';
import OrdersList from './OrdersList';

jest.mock('services/orders', () => ({
  getOrders: jest.fn(),
}));

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
    const history = createMemoryHistory();
    getOrders.mockImplementation(() => getControlledPromise().promise);
    const store = createStore(rootReducer);
    const { getByText } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <OrdersList />
          </Router>
        </ThemeProvider>
      </Provider>,
    );

    await waitFor(() => {
      expect(getByText('Загрузка', { exact: false })).toBeInTheDocument();
    });
  });
  it('renders orders list', async () => {
    const history = createMemoryHistory();
    getOrders.mockResolvedValue([
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
    const store = createStore(rootReducer);
    const { getAllByText } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <OrdersList />
          </Router>
        </ThemeProvider>
      </Provider>,
    );

    await waitFor(() => {
      expect(getAllByText('Order card')).toHaveLength(2);
    });
  });
  it('renders empty orders list', async () => {
    const history = createMemoryHistory();
    getOrders.mockResolvedValue([]);
    const store = createStore(rootReducer);
    const { queryByText } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <OrdersList />
          </Router>
        </ThemeProvider>
      </Provider>,
    );

    await waitFor(() => {
      expect(queryByText('Order card')).not.toBeInTheDocument();
    });
  });
  it('console error if getOrders request is failed', async () => {
    const history = createMemoryHistory();
    const ERROR_TEXT = 'error';
    getOrders.mockRejectedValue(ERROR_TEXT);
    window.console.log = jest.fn();
    const store = createStore(rootReducer);
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <OrdersList />
          </Router>
        </ThemeProvider>
      </Provider>,
    );

    await waitFor(() => {
      expect(window.console.log).toHaveBeenCalledWith(ERROR_TEXT);
    });
  });
});
