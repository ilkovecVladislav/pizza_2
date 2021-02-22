import React from 'react';
import { render, screen } from '@testing-library/react';
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
    render(
      <ThemeProvider theme={theme}>
        <RadioButtonGroupField name={INPUT_NAME} label={LABEL} options={OPTIONS} />
      </ThemeProvider>,
    );

    expect(screen.getByText(LABEL)).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(2);
    expect(screen.getByLabelText(BASE_PIZZA_SIZE_LABEL)).toBeInTheDocument();
    expect(screen.getByLabelText(BASE_PIZZA_SIZE_LABEL)).toHaveAttribute('name', INPUT_NAME);
    expect(screen.getByLabelText(BIG_PIZZA_SIZE_LABEL)).toBeInTheDocument();
    expect(screen.getByLabelText(BIG_PIZZA_SIZE_LABEL)).toHaveAttribute('name', INPUT_NAME);
  });
});
