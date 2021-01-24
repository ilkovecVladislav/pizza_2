import React from 'react';
import reduce from 'lodash/reduce';
import map from 'lodash/map';
import compact from 'lodash/compact';

import type Ingredient from 'services/types/Ingredient';
import {
  Container,
  Content,
  Title,
  Price,
  DescriptionContainer,
  IngredientItem,
} from './OrderDescription.style';
import { PIZZA_SIZES } from '../PizzaConstructorPage/constants';
import { useIngredients, usePizzaData } from '../PizzaConstructorPage/state/selectors';

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
      <Content>
        <Title>Маргарита</Title>
        <DescriptionContainer>
          <IngredientItem>{pizzaParamsLabel}</IngredientItem>
          {map(selectedIngredients, (item) => (
            <IngredientItem key={item}>{item}</IngredientItem>
          ))}
        </DescriptionContainer>
        <Price>{price} руб</Price>
      </Content>
    </Container>
  );
};

export default OrderDescription;
