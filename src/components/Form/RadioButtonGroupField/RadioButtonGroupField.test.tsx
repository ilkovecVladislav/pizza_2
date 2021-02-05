import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import theme from 'theme';
import RadioButtonGroupField from '.';

describe('RadioButtonGroupField', () => {
  it('renders correctly', () => {
    const INPUT_NAME = 'size';
    const LABEL = 'Размер пиццы';
    const BASE_PIZZA_SIZE_LABEL = '30 см';
    const BIG_PIZZA_SIZE_LABEL = '35 см';
    const OPTIONS = {
      '30': { label: BASE_PIZZA_SIZE_LABEL },
      '35': { label: BIG_PIZZA_SIZE_LABEL },
    };
    const { getByText, getByLabelText, getAllByRole } = render(
      <ThemeProvider theme={theme}>
        <RadioButtonGroupField name={INPUT_NAME} label={LABEL} options={OPTIONS} />
      </ThemeProvider>,
    );

    expect(getByText(LABEL)).toBeInTheDocument();
    expect(getAllByRole('radio')).toHaveLength(2);
    expect(getByLabelText(BASE_PIZZA_SIZE_LABEL)).toBeInTheDocument();
    expect(getByLabelText(BASE_PIZZA_SIZE_LABEL)).toHaveAttribute('name', INPUT_NAME);
    expect(getByLabelText(BIG_PIZZA_SIZE_LABEL)).toBeInTheDocument();
    expect(getByLabelText(BIG_PIZZA_SIZE_LABEL)).toHaveAttribute('name', INPUT_NAME);
  });
});
