import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

import pizzaConstructorReducer from 'pages/PizzaConstructorPage/state/reducer';
import { postOrder } from 'services/orders';
import theme from 'theme';
import OrderCheckout from '.';

const PRICE = 300;
jest.mock('utils/hooks/useCalculatePizzaPrice', () => () => PRICE);

jest.mock('services/orders', () => ({
  postOrder: jest.fn(),
}));

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as {}),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const getControlledPromise = () => {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { resolve, reject, promise };
};

const mockPostOrder = postOrder as jest.Mock;

describe('OrderCheckout component', () => {
  it('send order to the server', async () => {
    const ADDRESS_VALUE = 'Sample street, 44';
    const CARD_NUMBER_VALUE = '4444 1111 2222 3333';
    const CARD_NAME_VALUE = 'Simple Name';
    const PIZZA_SIZE = '30';
    const PIZZA_DOUGH = 'thin';
    const CHEDDAR_SLUG = 'cheddar';
    const BACON_SLUG = 'bacon';
    const SAUCE_VALUE = 'sauce';
    const store = configureStore({
      reducer: {
        pizzaConstructor: pizzaConstructorReducer,
      },
      preloadedState: {
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
      },
    });
    const { promise } = getControlledPromise();
    mockPostOrder.mockImplementation(() => promise);
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <OrderCheckout />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    );
    userEvent.type(screen.getByPlaceholderText('Введите адрес'), ADDRESS_VALUE);
    userEvent.type(screen.getByPlaceholderText('Номер карты'), CARD_NUMBER_VALUE);
    userEvent.type(screen.getByPlaceholderText('Номер телефона'), '77441122');
    userEvent.type(screen.getByPlaceholderText('Имя как на карте'), CARD_NAME_VALUE);

    await act(async () => {
      userEvent.click(screen.getByText(/заказать/i));
    });

    expect(screen.getAllByText(PRICE, { exact: false })).toHaveLength(2);
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
    const store = configureStore({
      reducer: {
        pizzaConstructor: pizzaConstructorReducer,
      },
      preloadedState: {
        pizzaConstructor: {
          pizza: {
            size: '30',
            dough: 'thin',
          },
          ingredients: {},
          isLoadingIngredients: false,
        },
      },
    });
    mockPostOrder.mockResolvedValue('');
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <OrderCheckout />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    );
    userEvent.type(screen.getByPlaceholderText('Введите адрес'), 'Sample street, 44');
    userEvent.type(screen.getByPlaceholderText('Номер карты'), '4444 1111 2222 3333');
    userEvent.type(screen.getByPlaceholderText('Номер телефона'), '77441122');
    userEvent.type(screen.getByPlaceholderText('Имя как на карте'), 'Simple Name');

    await act(async () => {
      userEvent.click(screen.getByText(/заказать/i));
    });

    expect(postOrder).toHaveBeenCalled();
    expect(mockHistoryPush).toHaveBeenCalledWith('/order-confirm/success');
  });
  it('unsuccessful sending of the order', async () => {
    const PIZZA_SIZE = '30';
    const store = configureStore({
      reducer: {
        pizzaConstructor: pizzaConstructorReducer,
      },
      preloadedState: {
        pizzaConstructor: {
          pizza: {
            size: PIZZA_SIZE,
            dough: 'thin',
          },
          ingredients: {},
          isLoadingIngredients: false,
        },
      },
    });
    mockPostOrder.mockRejectedValue('');
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <OrderCheckout />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    );
    userEvent.type(screen.getByPlaceholderText('Введите адрес'), 'Sample street, 44');
    userEvent.type(screen.getByPlaceholderText('Номер карты'), '4444 1111 2222 3333');
    userEvent.type(screen.getByPlaceholderText('Номер телефона'), '77441122');
    userEvent.type(screen.getByPlaceholderText('Имя как на карте'), 'Simple Name');

    await act(async () => {
      userEvent.click(screen.getByText(/заказать/i));
    });

    expect(postOrder).toHaveBeenCalledWith(
      expect.objectContaining({
        size: +PIZZA_SIZE,
      }),
    );
    expect(mockHistoryPush).toHaveBeenCalledWith('/order-confirm/error');
  });
});
