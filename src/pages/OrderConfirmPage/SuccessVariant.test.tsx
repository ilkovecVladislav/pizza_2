import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { rootReducer } from 'store';
import { getOrders } from 'services/orders';
import theme from 'theme';
import SuccessVariant from './SuccessVariant';

jest.mock('services/orders', () => ({
  getOrders: jest.fn(),
}));

const mockGetOrders = getOrders as jest.Mock;

jest.mock('components/OrderCard', () => () => <div>Order card</div>);

describe('SuccessVariant component', () => {
  it('renders correctly', async () => {
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
    ]);
    const store = createStore(rootReducer);
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <SuccessVariant />
        </ThemeProvider>
      </Provider>,
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Спасибо за заказ!');
    await waitFor(() => {
      expect(screen.getByText('Order card')).toBeInTheDocument();
    });
  });
  it('console error if getOrders request is failed', async () => {
    const ERROR_TEXT = 'error';
    mockGetOrders.mockRejectedValue(ERROR_TEXT);
    window.console.log = jest.fn();
    const store = createStore(rootReducer);
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <SuccessVariant />
        </ThemeProvider>
      </Provider>,
    );

    await waitFor(() => {
      expect(window.console.log).toHaveBeenCalledWith(ERROR_TEXT);
    });
  });
  it('reset pizza after component unmounted', async () => {
    mockGetOrders.mockResolvedValue([]);
    const store = createStore(rootReducer);
    store.dispatch({ type: 'pizzaConstructor/setPizza', payload: { size: '35', dough: 'lush' } });
    const { unmount } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <SuccessVariant />
        </ThemeProvider>
      </Provider>,
    );

    unmount();

    expect(store.getState().pizzaConstructor.pizza).toEqual({
      size: '30',
      dough: 'thin',
      cheese: [],
      vegetables: [],
      meat: [],
    });
  });
});
