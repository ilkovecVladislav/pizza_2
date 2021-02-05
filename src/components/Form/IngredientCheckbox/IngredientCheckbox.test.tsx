import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, fireEvent } from '@testing-library/react';

import Categories from 'types/Categories';
import theme from 'theme';
import IngredientCheckbox from '.';

describe('IngredientCheckbox component', () => {
  it('renders correctly', () => {
    const CHECKBOX_NAME = 'meat';
    const INGREDIENT_SLUG = 'bacon';
    const INGREDIENT_PRICE = '100';
    const INGREDIENT_NAME = 'Бекон';
    const INGREDIENT_THUMBNAIL = 'bacon-thumb.png';
    const ingredient = {
      id: 'Odd5HuC4',
      name: INGREDIENT_NAME,
      slug: INGREDIENT_SLUG,
      price: INGREDIENT_PRICE,
      category: 'meat' as Categories,
      image: 'bacon.png',
      thumbnail: INGREDIENT_THUMBNAIL,
    };
    const { getByRole, getByText } = render(
      <ThemeProvider theme={theme}>
        <IngredientCheckbox
          name={CHECKBOX_NAME}
          option={ingredient}
          value={[]}
          setValue={() => undefined}
        />
      </ThemeProvider>,
    );

    expect(getByRole('img')).toHaveAttribute('alt', INGREDIENT_NAME);
    expect(getByRole('img')).toHaveAttribute(
      'src',
      `${process.env.REACT_APP_API_URL}${INGREDIENT_THUMBNAIL}`,
    );
    expect(getByRole('checkbox')).not.toBeChecked();
    expect(getByRole('checkbox')).toHaveAttribute('name', CHECKBOX_NAME);
    expect(getByRole('checkbox')).toHaveAttribute('value', INGREDIENT_SLUG);
    expect(getByText(INGREDIENT_PRICE, { exact: false })).toBeInTheDocument();
    expect(getByText(INGREDIENT_NAME)).toBeInTheDocument();
  });
  it('renders correctly checked input', () => {
    const INGREDIENT_SLUG = 'bacon';
    const ingredient = {
      id: 'Odd5HuC4',
      name: 'Бекон',
      slug: INGREDIENT_SLUG,
      price: '100',
      category: 'meat' as Categories,
      image: 'bacon.png',
      thumbnail: 'bacon-thumb.png',
    };
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <IngredientCheckbox
          name="meat"
          option={ingredient}
          value={[INGREDIENT_SLUG]}
          setValue={() => undefined}
        />
      </ThemeProvider>,
    );

    expect(getByTestId('checkbox-container')).toHaveStyleRule(
      'border-color',
      theme.colors.primary.main,
    );
  });
  it('handle default click', () => {
    const handleSetValue = jest.fn();
    const ingredient = {
      id: 'Odd5HuC4',
      name: 'Бекон',
      slug: 'bacon',
      price: '100',
      category: 'meat' as Categories,
      image: 'bacon.png',
      thumbnail: 'bacon-thumb.png',
    };
    const { getByRole } = render(
      <ThemeProvider theme={theme}>
        <IngredientCheckbox name="meat" option={ingredient} value={[]} setValue={handleSetValue} />
      </ThemeProvider>,
    );
    const checkbox = getByRole('checkbox');

    fireEvent.click(checkbox);

    expect(handleSetValue).not.toHaveBeenCalled();
  });
  it('handle setValue', () => {
    const handleSetValue = jest.fn();
    const CHECKBOX_NAME = 'meat';
    const INGREDIENT_SLUG = 'bacon';
    const INGREDIENT_NAME = 'Бекон';
    const ingredient = {
      id: 'Odd5HuC4',
      name: INGREDIENT_NAME,
      slug: INGREDIENT_SLUG,
      price: '100',
      category: 'meat' as Categories,
      image: 'bacon.png',
      thumbnail: 'bacon-thumb.png',
    };
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <IngredientCheckbox
          name={CHECKBOX_NAME}
          option={ingredient}
          value={[]}
          setValue={handleSetValue}
        />
      </ThemeProvider>,
    );
    const checkbox = getByText(INGREDIENT_NAME);

    fireEvent.click(checkbox);

    expect(handleSetValue).toHaveBeenCalledTimes(1);
    expect(handleSetValue).toHaveBeenCalledWith(CHECKBOX_NAME, [INGREDIENT_SLUG]);
  });
  it('handle unchecked input', () => {
    const handleSetValue = jest.fn();
    const CHECKBOX_NAME = 'meat';
    const INGREDIENT_SLUG = 'bacon';
    const INGREDIENT_NAME = 'Бекон';
    const PEPPER_SLUG = 'pepper';
    const ingredient = {
      id: 'Odd5HuC4',
      name: INGREDIENT_NAME,
      slug: INGREDIENT_SLUG,
      price: '100',
      category: 'meat' as Categories,
      image: 'bacon.png',
      thumbnail: 'bacon-thumb.png',
    };
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <IngredientCheckbox
          name={CHECKBOX_NAME}
          option={ingredient}
          value={[INGREDIENT_SLUG, PEPPER_SLUG]}
          setValue={handleSetValue}
        />
      </ThemeProvider>,
    );
    const checkbox = getByText(INGREDIENT_NAME);

    fireEvent.click(checkbox);

    expect(handleSetValue).toHaveBeenCalledTimes(1);
    expect(handleSetValue).toHaveBeenCalledWith(CHECKBOX_NAME, [PEPPER_SLUG]);
  });
});
