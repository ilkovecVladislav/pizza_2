import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Route, MemoryRouter } from 'react-router-dom';

import theme from 'theme';
import OrderConfirm from '.';

jest.mock('./SuccessVariant', () => () => <div>Success</div>);
jest.mock('./FailedVariant', () => () => <div>Fail</div>);

describe('OrderConfirm component', () => {
  it('renders correctly success variant by default', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={['/order-confirm']}>
          <Route path="/order-confirm/:status?">
            <OrderConfirm />
          </Route>
        </MemoryRouter>
      </ThemeProvider>,
    );

    expect(getByText('Success')).toBeInTheDocument();
  });
  it('renders correctly success variant according to url parameter', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={['/order-confirm/success']}>
          <Route path="/order-confirm/:status?">
            <OrderConfirm />
          </Route>
        </MemoryRouter>
      </ThemeProvider>,
    );

    expect(getByText('Success')).toBeInTheDocument();
  });
  it('renders correctly failed variant according to url parameter', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={['/order-confirm/error']}>
          <Route path="/order-confirm/:status?">
            <OrderConfirm />
          </Route>
        </MemoryRouter>
      </ThemeProvider>,
    );

    expect(getByText('Fail')).toBeInTheDocument();
  });
});
