import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import configureStore from 'redux-mock-store';

import theme from 'theme';
import Form from './Form';

const mockStore = configureStore();
const store = mockStore({});
describe('Form component', () => {
  it('renders correctly', () => {
    const { getByText, getByLabelText, getByPlaceholderText } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Form price={400} formSubmit={() => undefined} />
        </ThemeProvider>
      </Provider>,
    );

    expect(getByPlaceholderText('Введите адрес')).toBeInTheDocument();
    expect(getByLabelText('подъезд')).toBeInTheDocument();
    expect(getByLabelText('этаж')).toBeInTheDocument();
    expect(getByLabelText('квартира')).toBeInTheDocument();
    expect(getByPlaceholderText('Номер карты')).toBeInTheDocument();
    expect(getByPlaceholderText('MM/YYYY')).toBeInTheDocument();
    expect(getByPlaceholderText('CVV')).toBeInTheDocument();
    expect(getByPlaceholderText('Имя как на карте')).toBeInTheDocument();
    expect(getByPlaceholderText('Номер телефона')).toBeInTheDocument();
    expect(getByText('Заказать', { exact: false })).toBeDisabled();
  });
  it('submit invalid form', async () => {
    const onSubmit = jest.fn();
    const { getByText, getByLabelText } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Form price={400} formSubmit={onSubmit} />
        </ThemeProvider>
      </Provider>,
    );
    fireEvent.input(getByLabelText('этаж'), {
      target: {
        value: 3,
      },
    });

    await act(async () => {
      fireEvent.click(getByText('Заказать', { exact: false }));
    });

    expect(onSubmit).not.toHaveBeenCalled();
    expect(getByText('Адресс обязателен к заполнению')).toBeInTheDocument();
    expect(getByText('Номер карты обязательное поле')).toBeInTheDocument();
    expect(getByText('Телефон обязательное поле')).toBeInTheDocument();
    expect(getByText('Имя обязательное поле')).toBeInTheDocument();
  });
  it('submit  form', async () => {
    const ADDRESS_VALUE = 'Sample street, 44';
    const CARD_NUMBER_VALUE = '4444 1111 2222 3333';
    const CARD_NAME_VALUE = 'Simple Name';
    const onSubmit = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Form price={400} formSubmit={onSubmit} />
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

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        card_number: CARD_NUMBER_VALUE,
        cardName: CARD_NAME_VALUE,
        address: ADDRESS_VALUE,
      }),
    );
  });
});
