import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import theme from 'theme';
import FailedVariant from './FailedVariant';

describe('FailedVariant component', () => {
  it('renders correctly', () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <FailedVariant />
        </Router>
      </ThemeProvider>,
    );

    expect(getByRole('heading')).toHaveTextContent('Оплата не прошла');
    expect(getByRole('link')).toHaveAttribute('href', '/order-checkout');
  });
});
