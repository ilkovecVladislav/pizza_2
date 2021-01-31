import { useMemo } from 'react';
import toNumber from 'lodash/toNumber';

import { PIZZA_SIZES, DOUGH, DoughKeys, PizzaSizesKeys } from 'constants/common';
import Ingredient from 'services/types/Ingredient';

const BASE_PIZZA_PRICE = 200;

type Params = {
  size: PizzaSizesKeys;
  dough: DoughKeys;
  saucesValue?: string;
  selectedIngredients: string[];
  allIngredients: Ingredient[];
};

const useCalculatePizzaPrice = ({
  size,
  dough,
  saucesValue,
  selectedIngredients,
  allIngredients,
}: Params): number =>
  useMemo(() => {
    const sizePrice = PIZZA_SIZES[size] ? PIZZA_SIZES[size].price : 0;
    const doughPrice = DOUGH[dough] ? DOUGH[dough].price : 0;

    const selectedSauce = allIngredients.find((item) => item.slug === saucesValue);
    const saucesPrice = selectedSauce ? toNumber(selectedSauce.price) : 0;

    const ingredientsPrice = selectedIngredients
      .map((selectedIngredient) => {
        const temp = allIngredients.find((ingredient) => ingredient.slug === selectedIngredient);

        return temp ? Number.parseInt(temp.price) : 0;
      })
      .reduce((acc, cur) => acc + cur, BASE_PIZZA_PRICE);

    return ingredientsPrice + sizePrice + saucesPrice + doughPrice;
  }, [size, dough, saucesValue, selectedIngredients, allIngredients]);

export default useCalculatePizzaPrice;
