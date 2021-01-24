import React, { ReactElement } from 'react';
import random from 'lodash/random';
import map from 'lodash/map';
import compact from 'lodash/compact';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import type Order from 'services/types/Order';
import type Ingredient from 'services/types/Ingredient';
import {
  Container,
  Top,
  OrderNumber,
  OrderDateBox,
  OrderDate,
  PizzaName,
  IngredientsList,
  IngredientsListItem,
  Footer,
  FooterBox,
  PizzaPrice,
  InProcessStatus,
  RepeatButton,
} from './OrderCard.style';

type Props = {
  order: Order;
  ingredients: Ingredient[];
  date: Date;
  status: 'completed' | 'not-completed';
};

const OrderCard = ({ order, ingredients, date, status }: Props): ReactElement => {
  const pizzaParams = compact(
    map(order.ingredients, (element) => {
      const ingredient = ingredients.find((item) => item.slug === element);

      if (ingredient) {
        return {
          price: ingredient.price,
          name: ingredient.name,
        };
      }

      return null;
    }),
  );

  const pizzaPrice = pizzaParams
    .map((item) => item.price)
    .reduce((acc, cur) => acc + Number.parseInt(cur), 200);
  const selectedIngredients = pizzaParams.map((item) => item.name);

  return (
    <Container>
      <Top>
        <OrderNumber>Заказ {random(1100, 3000)}</OrderNumber>
        <OrderDateBox>
          <OrderDate>{format(date, 'd MMMM yyyy, H:m', { locale: ru })}</OrderDate>
          <span>В работе</span>
        </OrderDateBox>
      </Top>
      <div>
        <PizzaName>Маргарита</PizzaName>
        <IngredientsList>
          <IngredientsListItem>30 см на томнком тесте</IngredientsListItem>
          {map(selectedIngredients, (item) => (
            <IngredientsListItem key={item}>{item}</IngredientsListItem>
          ))}
        </IngredientsList>
      </div>
      <Footer>
        <FooterBox>
          <PizzaPrice>{pizzaPrice} руб</PizzaPrice>
          <span>оплата MC *{order.card_number.slice(order.card_number.length - 4)}</span>
        </FooterBox>
        {status === 'completed' ? (
          <RepeatButton type="button">Повторить заказ</RepeatButton>
        ) : (
          <InProcessStatus>Доставляется</InProcessStatus>
        )}
      </Footer>
    </Container>
  );
};

export default OrderCard;
