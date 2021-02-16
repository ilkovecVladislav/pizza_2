import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { configureStore } from '@reduxjs/toolkit';

import pizzaConstructorReducer from 'pages/PizzaConstructorPage/state/reducer';
import theme from 'theme';
import Form from './Form';

const store = configureStore({
  reducer: {
    pizzaConstructor: pizzaConstructorReducer,
  },
});

describe('Form component', () => {
  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Form price={400} formSubmit={() => undefined} />
        </ThemeProvider>
      </Provider>,
    );

    expect(screen.getByPlaceholderText('Введите адрес')).toBeInTheDocument();
    expect(screen.getByLabelText('подъезд')).toBeInTheDocument();
    expect(screen.getByLabelText('этаж')).toBeInTheDocument();
    expect(screen.getByLabelText('квартира')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Номер карты')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('MM/YYYY')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('CVV')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Имя как на карте')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Номер телефона')).toBeInTheDocument();
    expect(screen.getByText(/заказать/i)).toBeDisabled();
  });
  it('submit invalid form', async () => {
    const onSubmit = jest.fn();
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Form price={400} formSubmit={onSubmit} />
        </ThemeProvider>
      </Provider>,
    );
    userEvent.type(screen.getByLabelText('этаж'), '3');

    await act(async () => {
      userEvent.click(screen.getByText(/заказать/i));
    });

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText('Адресс обязателен к заполнению')).toBeInTheDocument();
    expect(screen.getByText('Номер карты обязательное поле')).toBeInTheDocument();
    expect(screen.getByText('Телефон обязательное поле')).toBeInTheDocument();
    expect(screen.getByText('Имя обязательное поле')).toBeInTheDocument();
  });
  it('submit  form', async () => {
    const ADDRESS_VALUE = 'Sample street, 44';
    const CARD_NUMBER_VALUE = '4444 1111 2222 3333';
    const CARD_NAME_VALUE = 'Simple Name';
    const onSubmit = jest.fn();
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Form price={400} formSubmit={onSubmit} />
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

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        card_number: CARD_NUMBER_VALUE,
        cardName: CARD_NAME_VALUE,
        address: ADDRESS_VALUE,
      }),
    );
  });
});
