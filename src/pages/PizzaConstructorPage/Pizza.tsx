import React from 'react';
import styled from 'styled-components';
import map from 'lodash/map';

import type Ingredient from 'services/types/Ingredient';
import lushDough from 'assets/images/lush.png';
import thinDough from 'assets/images/thin.png';
import { useIngredients } from './state/selectors';
import type { FormValues } from './types';

const Container = styled.div`
  width: 246px;
  height: 246px;
  margin: 0 auto;
  margin-bottom: 16px;
  overflow: hidden;
  position: relative;
  flex: none;

  .dough {
    object-fit: cover;
    width: 100%;
    height: 100%;
    max-width: 246px;
    max-height: 246px;
  }
`;

const IngredientImg = styled.img<{ zIndex: number }>`
  position: absolute;
  width: 100%;
  height: 100%;
  max-width: 246px;
  max-height: 246px;
  top: 0;
  left: 0;
  z-index: ${({ zIndex }) => zIndex};
`;

let zIndex = 1;

type RenderIngredientProps = {
  data: string[];
  options: Ingredient[];
};

const RenderIngredient = ({ data, options }: RenderIngredientProps): JSX.Element => (
  <>
    {map(data, (value) => {
      const ingredient = options.find((element) => element.slug === value);

      if (ingredient) {
        zIndex += 1;

        return (
          <IngredientImg
            zIndex={zIndex}
            key={ingredient.id}
            src={`${process.env.REACT_APP_API_URL}/${ingredient.image}`}
            alt={ingredient.thumbnail}
          />
        );
      }

      return null;
    })}
  </>
);

const Pizza = ({ data }: { data: FormValues }): JSX.Element => {
  zIndex = 1;
  const { dough, cheese: cheeseValue, vegetables: vegetablesValue, meat: meatValue } = data;
  const allIngredients = useIngredients();
  const { cheese = [], vegetables = [], meat = [] } = allIngredients;

  return (
    <Container>
      <img className="dough" src={dough === 'thin' ? thinDough : lushDough} alt="тесто" />
      <RenderIngredient data={cheeseValue} options={cheese} />
      <RenderIngredient data={vegetablesValue} options={vegetables} />
      <RenderIngredient data={meatValue} options={meat} />
    </Container>
  );
};

export default Pizza;
