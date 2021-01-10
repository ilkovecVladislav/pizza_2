import { useMemo } from 'react';
import reduce from 'lodash/reduce';
import toNumber from 'lodash/toNumber';

import type Ingredient from 'services/types/Ingredient';
import type { FormValues } from './types';
import { PIZZA_SIZES, DOUGH } from './constants';

const BASE_PIZZA_PRICE = 200;

type Params = {
  selectedIngredients: FormValues;
  sauces: Ingredient[];
  meat: Ingredient[];
  cheese: Ingredient[];
  vegetables: Ingredient[];
};

const useCalculatePizzaPrice = ({
  selectedIngredients,
  sauces,
  meat,
  cheese,
  vegetables,
}: Params): number =>
  useMemo(() => {
    const {
      size,
      dough,
      sauce = '',
      cheese: cheeseValue,
      vegetables: vegetablesValue,
      meat: meatValue,
    } = selectedIngredients;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const sizePrice: number = PIZZA_SIZES[size] ? PIZZA_SIZES[size].price : 0;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const doughPrice: number = DOUGH[dough] ? DOUGH[dough].price : 0;
    const selectedSauce = sauces.find((item) => item.slug === sauce);
    const saucesPrice = selectedSauce ? toNumber(selectedSauce.price) : 0;
    const cheesesPrice = reduce(
      cheeseValue,
      (price, value) => {
        const cheeseItem = cheese.find((item) => item.slug === value);
        const tempPrice = cheeseItem ? toNumber(cheeseItem.price) : 0;

        return price + tempPrice;
      },
      0,
    );
    const vegetablesPrice = reduce(
      vegetablesValue,
      (price, value) => {
        const vegetablesItem = vegetables.find((item) => item.slug === value);
        const tempPrice = vegetablesItem ? toNumber(vegetablesItem.price) : 0;

        return price + tempPrice;
      },
      0,
    );
    const meatPrice = reduce(
      meatValue,
      (price, value) => {
        const meatItem = meat.find((item) => item.slug === value);
        const tempPrice = meatItem ? toNumber(meatItem.price) : 0;

        return price + tempPrice;
      },
      0,
    );

    return (
      BASE_PIZZA_PRICE +
      sizePrice +
      doughPrice +
      saucesPrice +
      cheesesPrice +
      vegetablesPrice +
      meatPrice
    );
  }, [selectedIngredients, sauces, meat, cheese, vegetables]);

export default useCalculatePizzaPrice;
