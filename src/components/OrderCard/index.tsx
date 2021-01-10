import React from 'react';
import styled from 'styled-components';
import random from 'lodash/random';
import map from 'lodash/map';
import compact from 'lodash/compact';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import deliveryIcon from 'assets/icons/delivery.svg';
import type Order from 'services/types/Order';
import type Ingredient from 'services/types/Ingredient';

const Container = styled.div`
  padding: 12px 16px;
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 8px 16px rgba(75, 75, 124, 0.05);
  border-radius: 16px;
`;

const Top = styled.div`
  display: flex;
  margin-bottom: 8px;

  .order-number {
    font-size: 12px;
    line-height: 18px;
    color: #4b4b7c;
    margin-right: 16px;
  }

  .order-date-box {
    font-size: 12px;
    line-height: 18px;
    color: #8181b1;
  }

  .order-date {
    margin-right: 10px;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 2px;
      height: 2px;
      border-radius: 50%;
      top: 6px;
      right: -6px;
      background: #4b4b7c;
    }
  }
`;

const PizzaDescription = styled.div`
  .pizza-name {
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #1F1F33;
    margin-bottom: 8px;
  }

  .ingredients {
    margin-bottom: 13px;
    padding-bottom: 8px;
    border-bottom: 1px dashed #E1E1ED;
  }

  .ingredient {
    position: relative;
    margin-right: 10px;
    font-size: 12px;
    line-height: 18px;
    color: #4B4B7C;

    &::after {
      content: '';
      position: absolute;
      width: 2px;
      height: 2px;
      border-radius: 50%;
      top: 8px;
      right: -6px;
      background: #4b4b7c;
    }

    &:last-child {
      margin-right: 0;
    }

    &:last-child::after {
      background: none;
    }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

  .box {
    font-size: 12px;
    line-height: 18px;
    color: #4b4b7c;
    display: flex;
  }

  .price {
    position: relative;
    margin-right: 10px;
    font-size: 12px;
    line-height: 18px;
    color: #4b4b7c;

    &::after {
      content: '';
      position: absolute;
      width: 2px;
      height: 2px;
      border-radius: 50%;
      top: 8px;
      right: -6px;
      background: #4b4b7c;
    }
  }

  .in-process {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #f3752b;
    position: relative;
    padding-left: 20px;

    &:before {
      content: '';
      position: absolute;
      top: 3px;
      left: 0;
      width: 16px;
      height: 13px;
      background: url(${deliveryIcon});
      background-position: center;
      background-repeat: no-repeat;
    }
  }

  .repeat {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #009485;
    border: none;
    background: transparent;
    cursor: pointer;
  }
`;

type Props = {
  order: Order;
  ingredients: Ingredient[];
  date: Date;
  status: 'completed' | 'not-completed';
};

const OrderCard = ({ order, ingredients, date, status }: Props): JSX.Element => {
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
        <span className="order-number">Заказ {random(1100, 3000)}</span>
        <div className="order-date-box">
          <span className="order-date">{format(date, 'd MMMM yyyy, H:m', { locale: ru })}</span>
          <span>В работе</span>
        </div>
      </Top>
      <PizzaDescription>
        <h5 className="pizza-name">Маргарита</h5>
        <div className="ingredients">
          <span className="ingredient">30 см на томнком тесте</span>
          {map(selectedIngredients, (item) => (
            <span key={item} className="ingredient">
              {item}
            </span>
          ))}
        </div>
      </PizzaDescription>
      <Bottom>
        <div className="box">
          <span className="price">{pizzaPrice} руб</span>
          <span>оплата MC *{order.card_number.slice(order.card_number.length - 4)}</span>
        </div>
        {status === 'completed' ? (
          <button className="repeat" type="button">
            Повторить заказ
          </button>
        ) : (
          <span className="in-process">Доставляется</span>
        )}
      </Bottom>
    </Container>
  );
};

export default OrderCard;
