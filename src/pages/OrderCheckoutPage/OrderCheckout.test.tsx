import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import configureStore from 'redux-mock-store';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import useCalculatePizzaPrice from 'utils/hooks/useCalculatePizzaPrice';
import { postOrder } from 'services/orders';
import theme from 'theme';
import OrderCheckout from '.';

jest.mock('utils/hooks/useCalculatePizzaPrice');

jest.mock('services/orders', () => ({
  postOrder: jest.fn(),
}));

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const mockStore = configureStore();
const getControlledPromise = () => {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { resolve, reject, promise };
};

describe('OrderCheckout component', () => {
  it('send order to the server', async () => {
    const history = createMemoryHistory();
    const ADDRESS_VALUE = 'Sample street, 44';
    const CARD_NUMBER_VALUE = '4444 1111 2222 3333';
    const CARD_NAME_VALUE = 'Simple Name';
    const PIZZA_SIZE = '30';
    const PIZZA_DOUGH = 'thin';
    const CHEDDAR_SLUG = 'cheddar';
    const BACON_SLUG = 'bacon';
    const SAUCE_VALUE = 'sauce';
    const PRICE = 300;
    const store = mockStore({
      pizzaConstructor: {
        pizza: {
          size: PIZZA_SIZE,
          dough: PIZZA_DOUGH,
          cheese: [CHEDDAR_SLUG],
          vegetables: [],
          meat: [BACON_SLUG],
          sauce: SAUCE_VALUE,
        },
        ingredients: {},
        isLoadingIngredients: false,
      },
    });
    const { promise } = getControlledPromise();
    postOrder.mockImplementation(() => promise);
    useCalculatePizzaPrice.mockReturnValue(PRICE);
    const { getByText, getAllByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <OrderCheckout />
          </Router>
        </ThemeProvider>
      </Provider>,
    );
    fireEvent.input(getByPlaceholderText('Введите адрес'), {
      target: {
        value: ADDRESS_VALUE,
      },
    });
    fireEvent.input(getByPlaceholderText('Номер карты'), {
      target: {
        value: CARD_NUMBER_VALUE,
      },
    });
    fireEvent.input(getByPlaceholderText('Номер телефона'), {
      target: {
        value: '77441122',
      },
    });
    fireEvent.input(getByPlaceholderText('Имя как на карте'), {
      target: {
        value: CARD_NAME_VALUE,
      },
    });

    await act(async () => {
      fireEvent.click(getByText('Заказать', { exact: false }));
    });

    expect(getAllByText(PRICE, { exact: false })).toHaveLength(2);
    expect(postOrder).toHaveBeenCalledWith({
      card_number: CARD_NUMBER_VALUE,
      address: ADDRESS_VALUE,
      name: CARD_NAME_VALUE,
      ingredients: expect.arrayContaining([BACON_SLUG, CHEDDAR_SLUG]),
      sauces: [SAUCE_VALUE],
      dough: PIZZA_DOUGH,
      size: +PIZZA_SIZE,
    });
  });
  it('successful sending of the order', async () => {
    const history = createMemoryHistory();
    const store = mockStore({
      pizzaConstructor: {
        pizza: {
          size: '30',
          dough: 'thin',
        },
        ingredients: {},
        isLoadingIngredients: false,
      },
    });
    postOrder.mockResolvedValue();
    useCalculatePizzaPrice.mockReturnValue(300);
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <OrderCheckout />
          </Router>
        </ThemeProvider>
      </Provider>,
    );
    fireEvent.input(getByPlaceholderText('Введите адрес'), {
      target: {
        value: 'Sample street, 44',
      },
    });
    fireEvent.input(getByPlaceholderText('Номер карты'), {
      target: {
        value: '4444 1111 2222 3333',
      },
    });
    fireEvent.input(getByPlaceholderText('Номер телефона'), {
      target: {
        value: '77441122',
      },
    });
    fireEvent.input(getByPlaceholderText('Имя как на карте'), {
      target: {
        value: 'Simple Name',
      },
    });

    await act(async () => {
      fireEvent.click(getByText('Заказать', { exact: false }));
    });

    expect(mockHistoryPush).toHaveBeenCalledWith('/order-confirm/success');
  });
  it('unsuccessful sending of the order', async () => {
    const history = createMemoryHistory();
    const PIZZA_SIZE = '30';
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
    postOrder.mockRejectedValue();
    useCalculatePizzaPrice.mockReturnValue(300);
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <OrderCheckout />
          </Router>
        </ThemeProvider>
      </Provider>,
    );
    fireEvent.input(getByPlaceholderText('Введите адрес'), {
      target: {
        value: 'Sample street, 44',
      },
    });
    fireEvent.input(getByPlaceholderText('Номер карты'), {
      target: {
        value: '4444 1111 2222 3333',
      },
    });
    fireEvent.input(getByPlaceholderText('Номер телефона'), {
      target: {
        value: '77441122',
      },
    });
    fireEvent.input(getByPlaceholderText('Имя как на карте'), {
      target: {
        value: 'Simple Name',
      },
    });

    await act(async () => {
      fireEvent.click(getByText('Заказать', { exact: false }));
    });

    expect(postOrder).toHaveBeenCalledWith(
      expect.objectContaining({
        size: +PIZZA_SIZE,
      }),
    );
    expect(mockHistoryPush).toHaveBeenCalledWith('/order-confirm/error');
  });
});
