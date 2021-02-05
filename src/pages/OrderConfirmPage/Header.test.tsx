import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import theme from 'theme';
import Header from './Header';

describe('Header component', () => {
  it('renders correctly', () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <Header />
        </Router>
      </ThemeProvider>,
    );

    expect(getByRole('heading')).toHaveTextContent('Оформление заказа');
    expect(getByRole('link')).toHaveAttribute('href', '/orders-history');
  });
});
