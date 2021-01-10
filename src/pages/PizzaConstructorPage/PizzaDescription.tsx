import React from 'react';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import compact from 'lodash/compact';
import styled from 'styled-components';

import type Ingredient from 'services/types/Ingredient';
import { useIngredients } from './state/selectors';
import { PIZZA_SIZES } from './constants';
import type { FormValues } from './types';

const Container = styled.div`
  font-size: 12px;
  line-height: 18px;
  color: #4b4b7c;
  margin-bottom: 24px;

  .ingredients {
    display: flex;
    flex-wrap: wrap;
  }

  .ingredient {
    position: relative;
    margin-right: 10px;
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

const PizzaDescription = ({ data }: { data: FormValues }): JSX.Element => {
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
      <p>{pizzaParamsLabel}</p>
      <div className="ingredients">
        {map(selectedIngredients, (item) => (
          <span key={item} className="ingredient">
            {item}
          </span>
        ))}
      </div>
    </Container>
  );
};

export default PizzaDescription;
