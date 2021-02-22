import React, { ReactElement } from 'react';
import random from 'lodash/random';
import toString from 'lodash/toString';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import type Order from 'services/types/Order';
import type Ingredient from 'services/types/Ingredient';
import useCalculatePizzaPrice from 'utils/hooks/useCalculatePizzaPrice';
import IngredientsList from 'components/IngredientsList';
import {
  Container,
  Top,
  OrderNumber,
  OrderDateBox,
  OrderDate,
  PizzaName,
  Footer,
  FooterBox,
  CardNumber,
  PizzaPrice,
  InProcessStatus,
  RepeatButton,
} from './OrderCard.style';
import { PizzaSizesKeys } from 'constants/common';

type Props = {
  order: Order;
  ingredients: Ingredient[];
  date: Date;
  status: 'completed' | 'not-completed';
};

const OrderCard = ({ order, ingredients, date, status }: Props): ReactElement => {
  const { dough, size, sauces, ingredients: selectedIngredients } = order;

  const price = useCalculatePizzaPrice({
    allIngredients: ingredients,
    size: toString(size) as PizzaSizesKeys,
    dough: dough,
    saucesValue: sauces[0],
    selectedIngredients,
  });

  return (
    <Container>
      <Top>
        <OrderNumber>Заказ {random(1100, 3000)}</OrderNumber>
        <OrderDateBox>
          <OrderDate>{format(date, 'd MMMM yyyy, H:m', { locale: ru })}</OrderDate>
        </OrderDateBox>
      </Top>
      <div>
        <PizzaName>Маргарита</PizzaName>
        <IngredientsList
          size={toString(size) as PizzaSizesKeys}
          dough={dough}
          saucesValue={sauces[0]}
          allIngredients={ingredients}
          selectedIngredients={selectedIngredients}
        />
      </div>
      <Footer>
        <FooterBox>
          <PizzaPrice>{price} руб</PizzaPrice>
          <CardNumber>{order.card_number.slice(order.card_number.length - 4)}</CardNumber>
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
