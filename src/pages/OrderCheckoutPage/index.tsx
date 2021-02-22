import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { postOrder } from 'services/orders';
import Header from 'components/Header';
import OrderDescription from './OrderDescription';
import Form from './Form';
import useCalculatePizzaPrice from 'utils/hooks/useCalculatePizzaPrice';
import { useIngredientsArray, usePizzaData } from '../PizzaConstructorPage/state/selectors';

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
    sauce,
    dough,
    size,
  } = pizzaData;

  const selectedIngredients = [...cheeseValue, ...meatValue, ...vegetablesValue];

  const onSubmit = ({
    card_number,
    cardName,
    address,
  }: {
    card_number: string;
    address: string;
    cardName: string;
  }) => {
    return postOrder({
      card_number,
      address,
      name: cardName,
      ingredients: selectedIngredients,
      sauces: sauce ? [sauce] : [],
      dough,
      size: +size,
    })
      .then(() => history.push('/order-confirm/success'))
      .catch(() => history.push('/order-confirm/error'));
  };

  const ingredientsArray = useIngredientsArray();

  const price = useCalculatePizzaPrice({
    allIngredients: ingredientsArray,
    size: size,
    dough: dough,
    saucesValue: sauce,
    selectedIngredients,
  });

  return (
    <Container>
      <Header title="Оформление заказа" link="/home" />
      <OrderDescription price={price} />
      <Form price={price} formSubmit={onSubmit} />
    </Container>
  );
};

export default OrderCheckout;
