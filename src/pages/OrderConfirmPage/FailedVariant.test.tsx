import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import theme from 'theme';
import FailedVariant from './FailedVariant';

describe('FailedVariant component', () => {
  it('renders correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <FailedVariant />
        </BrowserRouter>
      </ThemeProvider>,
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Оплата не прошла');
    expect(screen.getByRole('link')).toHaveAttribute('href', '/order-checkout');
  });
});
