import React from 'react';
import { useHistory } from 'react-router-dom';

import { postOrder } from 'services/orders';
import Header from './Header';
import OrderDescription from './OrderDescription';
import Form from './Form';
import useCalculatePizzaPrice from '../PizzaConstructorPage/priceCalcHooks';
import { useIngredients, usePizzaData } from '../PizzaConstructorPage/state/selectors';

const OrderCheckout = (): JSX.Element => {
  const history = useHistory();

  const pizzaData = usePizzaData();

  const {
    cheese: cheeseValue = [],
    meat: meatValue = [],
    vegetables: vegetablesValue = [],
    sauce: sauceValue = '',
  } = pizzaData;
  const { cheese = [], vegetables = [], sauces = [], meat = [] } = useIngredients();

  const onSubmit = ({ card_number, address }: { card_number: string; address: string }) => {
    const ingredients = [sauceValue, ...cheeseValue, ...meatValue, ...vegetablesValue];

    return postOrder({
      card_number,
      address,
      name: Math.random().toString(36).slice(2),
      ingredients,
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
    <div>
      <Header />
      <OrderDescription price={price} />
      <Form price={price} formSubmit={onSubmit} />
    </div>
  );
};

export default OrderCheckout;
