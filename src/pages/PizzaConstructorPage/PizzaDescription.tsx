import React from 'react';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import compact from 'lodash/compact';

import type Ingredient from 'services/types/Ingredient';
import { useIngredients } from './state/selectors';
import { Container, IngredientsList, IngredientsListItem } from './PizzaDescription.style';
import { PIZZA_SIZES } from './constants';
import type { FormValues } from './types';

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
      <IngredientsList>
        {map(selectedIngredients, (item) => (
          <IngredientsListItem key={item}>{item}</IngredientsListItem>
        ))}
      </IngredientsList>
    </Container>
  );
};

export default PizzaDescription;
