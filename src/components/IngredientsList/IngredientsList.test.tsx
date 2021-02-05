import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';

import Categories from 'types/Categories';
import theme from 'theme';
import IngredientsList from '.';

describe('IngredientsList component', () => {
  it('renders correctly empty pizza', () => {
    const PIZZA_SIZE = '30';
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <IngredientsList
          size={PIZZA_SIZE}
          dough="thin"
          selectedIngredients={[]}
          allIngredients={[]}
        />
      </ThemeProvider>,
    );

    expect(getByText(PIZZA_SIZE, { exact: false })).toHaveTextContent(
      `${PIZZA_SIZE} см на тонком тесте`,
    );
  });
  it('renders correctly empty pizza with wrong ingredients', () => {
    const PIZZA_SIZE = '30';
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <IngredientsList
          size={PIZZA_SIZE}
          dough="thin"
          selectedIngredients={['bacon']}
          allIngredients={[
            {
              id: 'qhr84PaS',
              name: 'Белый',
              slug: 'white',
              price: '29',
              category: 'sauces' as Categories,
              image: 'bacon.png',
              thumbnail: 'bacon-thumb.png',
            },
          ]}
        />
      </ThemeProvider>,
    );

    expect(getByText(PIZZA_SIZE, { exact: false })).toHaveTextContent(
      `${PIZZA_SIZE} см на тонком тесте`,
    );
  });
  it('renders correct pizza with ingredients', () => {
    const PIZZA_SIZE = '35';
    const SAUCE_LABEL = 'Белый';
    const BACON_LABEL = 'Бекон';
    const PEPPER_LABEL = 'Перец';
    const INGREDIENTS = [
      {
        id: 'qhr84PaS',
        name: SAUCE_LABEL,
        slug: 'white',
        price: '29',
        category: 'sauces' as Categories,
        image: 'bacon.png',
        thumbnail: 'bacon-thumb.png',
      },
      {
        id: 'Odd5HuC4',
        name: BACON_LABEL,
        slug: 'bacon',
        price: '100',
        category: 'meat' as Categories,
        image: 'bacon.png',
        thumbnail: 'bacon-thumb.png',
      },
      {
        id: 'RyzrCzfQ',
        name: PEPPER_LABEL,
        slug: 'pepper',
        price: '100',
        category: 'vegetables' as Categories,
        image: 'pepper.png',
        thumbnail: 'pepper-thumb.png',
      },
    ];
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <IngredientsList
          size={PIZZA_SIZE}
          dough="lush"
          saucesValue="white"
          selectedIngredients={['bacon', 'pepper']}
          allIngredients={INGREDIENTS}
        />
      </ThemeProvider>,
    );

    expect(getByText(PIZZA_SIZE, { exact: false })).toHaveTextContent(
      `${PIZZA_SIZE} см на толстом тесте`,
    );
    expect(getByText(BACON_LABEL)).toHaveTextContent(BACON_LABEL);
    expect(getByText(PEPPER_LABEL)).toHaveTextContent(PEPPER_LABEL);
  });
});
