import React, { ReactElement } from 'react';
import map from 'lodash/map';

import type Ingredient from 'services/types/Ingredient';
import lushDough from 'assets/images/lush.png';
import thinDough from 'assets/images/thin.png';
import { THIN_DOUGH } from 'constants/common';
import { Container, Dough, IngredientImg } from './PizzaView.style';
import { useIngredients } from './state/selectors';
import type { FormValues } from './types';

let zIndex = 1;

type RenderIngredientProps = {
  data: string[];
  size: string;
  options: Ingredient[];
};

const RenderIngredient = ({ data, options, size }: RenderIngredientProps): ReactElement => (
  <>
    {map(data, (value) => {
      const ingredient = options.find((element) => element.slug === value);

      if (ingredient) {
        zIndex += 1;

        return (
          <IngredientImg
            zIndex={zIndex}
            key={ingredient.id}
            size={size}
            src={`${process.env.REACT_APP_API_URL}/${ingredient.image}`}
            alt={ingredient.thumbnail}
          />
        );
      }

      return null;
    })}
  </>
);

const PizzaView = ({ data }: { data: FormValues }): ReactElement => {
  zIndex = 1;
  const { dough, cheese: cheeseValue, vegetables: vegetablesValue, meat: meatValue, size } = data;
  const allIngredients = useIngredients();
  const { cheese = [], vegetables = [], meat = [] } = allIngredients;

  return (
    <Container>
      <Dough src={dough === THIN_DOUGH ? thinDough : lushDough} size={size} alt="тесто" />
      <RenderIngredient data={cheeseValue} size={size} options={cheese} />
      <RenderIngredient data={vegetablesValue} size={size} options={vegetables} />
      <RenderIngredient data={meatValue} size={size} options={meat} />
    </Container>
  );
};

export default PizzaView;
