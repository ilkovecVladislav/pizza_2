import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import theme from 'theme';
import { DoughKeys } from 'constants/common';
import OrderCard from '.';

import useCalculatePizzaPrice from 'utils/hooks/useCalculatePizzaPrice';
jest.mock('utils/hooks/useCalculatePizzaPrice');

describe('OrderCard component', () => {
  it('renders correctly', () => {
    const PIZZA_PRICE = 300;
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
    useCalculatePizzaPrice.mockReturnValue(PIZZA_PRICE);
    const { getByText, getByRole } = render(
      <ThemeProvider theme={theme}>
        <OrderCard date={DATE} ingredients={[]} order={ORDER} status="completed" />
      </ThemeProvider>,
    );

    expect(getByText(PIZZA_PRICE, { exact: false })).toBeInTheDocument();
    expect(getByText(format(DATE, 'd MMMM yyyy, H:m', { locale: ru }))).toBeInTheDocument();
    expect(getByText(SHORT_CARD_NUMBER)).toBeInTheDocument();
    expect(getByRole('button')).toHaveTextContent('Повторить заказ');
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
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <OrderCard date={new Date()} ingredients={[]} order={ORDER} status="not-completed" />
      </ThemeProvider>,
    );

    expect(getByText('Доставляется')).toBeInTheDocument();
  });
});
