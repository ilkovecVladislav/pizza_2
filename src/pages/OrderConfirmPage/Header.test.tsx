import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import theme from 'theme';
import Header from './Header';

describe('Header component', () => {
  it('renders correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </ThemeProvider>,
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Оформление заказа');
    expect(screen.getByRole('link')).toHaveAttribute('href', '/orders-history');
  });
});
