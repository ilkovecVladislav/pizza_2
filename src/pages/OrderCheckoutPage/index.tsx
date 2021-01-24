import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { postOrder } from 'services/orders';
import Header from './Header';
import OrderDescription from './OrderDescription';
import Form from './Form';
import useCalculatePizzaPrice from '../PizzaConstructorPage/priceCalcHooks';
import { useIngredients, usePizzaData } from '../PizzaConstructorPage/state/selectors';

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.gray[100]};
`;

const OrderCheckout = (): ReactElement => {
  const history = useHistory();

  const pizzaData = usePizzaData();

  const {
    cheese: cheeseValue = [],
    meat: meatValue = [],
    vegetables: vegetablesValue = [],
    sauce: sauceValue = '',
    dough,
    size,
  } = pizzaData;
  const { cheese = [], vegetables = [], sauces = [], meat = [] } = useIngredients();

  const onSubmit = ({
    card_number,
    cardName,
    address,
  }: {
    card_number: string;
    address: string;
    cardName: string;
  }) => {
    const ingredients = [...cheeseValue, ...meatValue, ...vegetablesValue];

    return postOrder({
      card_number,
      address,
      name: cardName,
      ingredients,
      sauces: [sauceValue],
      dough,
      size: +size,
    })
      .then(() => history.push('/order-confirm/success'))
      .catch(() => history.push('/order-confirm/error'));
  };

  const price = useCalculatePizzaPrice({
    selectedIngredients: pizzaData,
    sauces,
    meat,
    cheese,
    vegetables,
  });

  return (
    <Container>
      <Header />
      <OrderDescription price={price} />
      <Form price={price} formSubmit={onSubmit} />
    </Container>
  );
};

export default OrderCheckout;
