import { renderHook } from '@testing-library/react-hooks';

import useCalculatePizzaPrice from './useCalculatePizzaPrice';

describe('useCalculatePizzaPrice hook', () => {
  it('returns default pizza price', () => {
    const { result } = renderHook(
      () =>
        useCalculatePizzaPrice({
          size: '30',
          dough: 'thin',
          saucesValue: '',
          selectedIngredients: [],
          allIngredients: [],
        }),
      {},
    );

    // base pizza price - 200
    expect(result.current).toEqual(200);
  });
  it('calculate big pizza price without loaded ingredients', () => {
    const { result } = renderHook(
      () =>
        useCalculatePizzaPrice({
          size: '35',
          dough: 'thin',
          saucesValue: '',
          selectedIngredients: ['bacon', 'pepper'],
          allIngredients: [],
        }),
      {},
    );

    // big pizza size price - 50
    expect(result.current).toEqual(250);
  });
  it('calculate pizza price with loaded ingredients', () => {
    const { result } = renderHook(
      () =>
        useCalculatePizzaPrice({
          size: '35',
          dough: 'thin',
          saucesValue: 'white',
          selectedIngredients: ['bacon', 'pepper'],
          allIngredients: [
            {
              id: 'qhr84PaS',
              name: 'Белый',
              slug: 'white',
              price: '29',
              category: 'sauces',
              image: 'bacon.png',
              thumbnail: 'bacon-thumb.png',
            },
            {
              id: 'Odd5HuC4',
              name: 'Бекон',
              slug: 'bacon',
              price: '100',
              category: 'meat',
              image: 'bacon.png',
              thumbnail: 'bacon-thumb.png',
            },
            {
              id: 'RyzrCzfQ',
              name: 'Перец',
              slug: 'pepper',
              price: '100',
              category: 'vegetables',
              image: 'pepper.png',
              thumbnail: 'pepper-thumb.png',
            },
          ],
        }),
      {},
    );

    // base pizza price plus sum of prices of selected ingredients(200 + 29(sauce) + 100(pepper) + 100(bacon))
    expect(result.current).toEqual(479);
  });
  it('calculate pizza price with wrong params', () => {
    const { result } = renderHook(
      () =>
        useCalculatePizzaPrice({
          // @ts-ignore
          size: '40',
          // @ts-ignore
          dough: 'test',
          selectedIngredients: [],
          allIngredients: [],
        }),
      {},
    );

    expect(result.current).toEqual(200);
  });
});
