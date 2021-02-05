import React, { ReactElement } from 'react';
import map from 'lodash/map';
import compact from 'lodash/compact';

import type Ingredient from 'services/types/Ingredient';
import { Container, IngredientItem } from './IngredientsList.style';
import { DoughKeys, PizzaSizesKeys, PIZZA_SIZES, THIN_DOUGH } from 'constants/common';

type Props = {
  size: PizzaSizesKeys;
  dough: DoughKeys;
  saucesValue?: string;
  selectedIngredients: string[];
  allIngredients: Ingredient[];
};

const IngredientsList = ({
  size,
  dough,
  saucesValue,
  allIngredients,
  selectedIngredients,
}: Props): ReactElement => {
  const pizzaParamsLabel = `${PIZZA_SIZES[size].label} на ${
    dough === THIN_DOUGH ? 'тонком' : 'толстом'
  } тесте`;

  const selectedSauce = allIngredients.find((item) => item.slug === saucesValue);
  const sauceLabel = selectedSauce ? `${selectedSauce.name} соус` : null;

  const ingredientsLabels = compact(
    selectedIngredients.map((selectedIngredient) => {
      const temp = allIngredients.find((ingredient) => ingredient.slug === selectedIngredient);

      return temp ? temp.name : null;
    }),
  );

  return (
    <Container>
      <IngredientItem>{pizzaParamsLabel}</IngredientItem>
      {sauceLabel && <IngredientItem>{sauceLabel}</IngredientItem>}
      {map(ingredientsLabels, (item) => (
        <IngredientItem key={item}>{item}</IngredientItem>
      ))}
    </Container>
  );
};

export default IngredientsList;
