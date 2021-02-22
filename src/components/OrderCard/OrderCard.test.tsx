import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, screen } from '@testing-library/react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import theme from 'theme';
import { DoughKeys } from 'constants/common';
import OrderCard from '.';

const PIZZA_PRICE = 300;
jest.mock('utils/hooks/useCalculatePizzaPrice', () => () => PIZZA_PRICE);

describe('OrderCard component', () => {
  it('renders correctly', () => {
    const DATE = new Date();
    const SHORT_CARD_NUMBER = '4444';
    const ORDER = {
      id: 'd5fE_asz',
      ingredients: [],
      sauces: [],
      size: 30,
      dough: 'thick' as DoughKeys,
      name: 'Ivan Ivanov',
      card_number: `0000 0000 0000 ${SHORT_CARD_NUMBER}`,
      address: 'Sesame Street',
    };
    render(
      <ThemeProvider theme={theme}>
        <OrderCard date={DATE} ingredients={[]} order={ORDER} status="completed" />
      </ThemeProvider>,
    );

    expect(screen.getByText(PIZZA_PRICE, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(format(DATE, 'd MMMM yyyy, H:m', { locale: ru }))).toBeInTheDocument();
    expect(screen.getByText(SHORT_CARD_NUMBER)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Повторить заказ');
  });
  it('renders component with not completed status', () => {
    const ORDER = {
      id: 'd5fE_asz',
      ingredients: [],
      sauces: [],
      size: 30,
      dough: 'thick' as DoughKeys,
      name: 'Ivan Ivanov',
      card_number: `0000 0000 0000 0000`,
      address: 'Sesame Street',
    };
    render(
      <ThemeProvider theme={theme}>
        <OrderCard date={new Date()} ingredients={[]} order={ORDER} status="not-completed" />
      </ThemeProvider>,
    );

    expect(screen.getByText('Доставляется')).toBeInTheDocument();
  });
});
