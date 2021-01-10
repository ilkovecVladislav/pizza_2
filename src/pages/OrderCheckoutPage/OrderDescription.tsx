import React from 'react';
import reduce from 'lodash/reduce';
import map from 'lodash/map';
import compact from 'lodash/compact';
import styled from 'styled-components';

import type Ingredient from 'services/types/Ingredient';
import { PIZZA_SIZES } from '../PizzaConstructorPage/constants';
import { useIngredients, usePizzaData } from '../PizzaConstructorPage/state/selectors';

const Container = styled.div`
  padding: 0 16px;

  .content {
    padding: 12px 16px;
    background: #ffffff;
    box-shadow: 0px 8px 16px rgba(75, 75, 124, 0.05);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
  }

  .title {
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #1f1f33;
    margin-bottom: 8px;
  }

  .price {
    margin-top: 13px;
    font-weight: 800;
    font-size: 16px;
    line-height: 16px;
    color: #4b4b7c;
  }
`;

const PizzaDescriptionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 8px;
  border-bottom: 1px dashed #e1e1ed;

  .ingredient {
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

    &:last-child {
      margin-right: 0;
    }

    &:last-child::after {
      background: none;
    }
  }
`;

const normalizeIngredient = (data: Ingredient[]): { [key: string]: Ingredient } =>
  reduce(data, (acc, cur) => ({ ...acc, [cur.slug]: { ...cur, label: cur.name } }), {});

type Props = {
  price: number;
};

const OrderDescription = ({ price }: Props): JSX.Element => {
  const data = usePizzaData();
  const allIngredients = useIngredients();
  const { cheese = [], vegetables = [], sauces = [], meat = [] } = allIngredients;
  const normalizedSauces = normalizeIngredient(sauces);
  const normalizedCheese = normalizeIngredient(cheese);
  const normalizedVegetables = normalizeIngredient(vegetables);
  const normalizedMeat = normalizeIngredient(meat);

  const pizzaParamsLabel = data.size
    ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      `${PIZZA_SIZES[data.size].label} на ${data.dough === 'thin' ? 'тонком' : 'толстом'} тесте`
    : '';

  const sauceLabel =
    data.sauce && normalizedSauces[data.sauce]
      ? [`${normalizedSauces[data.sauce]?.name} соус`]
      : [];

  const cheeseLabel = compact(map(data.cheese, (item) => normalizedCheese[item]?.name));
  const vegetablesLabel = compact(map(data.vegetables, (item) => normalizedVegetables[item]?.name));
  const meatLabel = compact(map(data.meat, (item) => normalizedMeat[item]?.name));

  const selectedIngredients = [...sauceLabel, ...cheeseLabel, ...vegetablesLabel, ...meatLabel];

  return (
    <Container>
      <div className="content">
        <h5 className="title">Маргарита</h5>
        <PizzaDescriptionContainer>
          <span className="ingredient">{pizzaParamsLabel}</span>
          {map(selectedIngredients, (item) => (
            <span key={item} className="ingredient">
              {item}
            </span>
          ))}
        </PizzaDescriptionContainer>
        <span className="price">{price} руб</span>
      </div>
    </Container>
  );
};

export default OrderDescription;
