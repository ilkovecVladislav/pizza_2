import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Route, BrowserRouter } from 'react-router-dom';

import theme from 'theme';
import OrderConfirm from '.';

jest.mock('./SuccessVariant', () => () => <div>Success</div>);
jest.mock('./FailedVariant', () => () => <div>Fail</div>);

describe('OrderConfirm component', () => {
  it('renders correctly success variant by default', () => {
    window.history.pushState({}, '', '/order-confirm');
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <OrderConfirm />
        </BrowserRouter>
      </ThemeProvider>,
    );

    expect(screen.getByText('Success')).toBeInTheDocument();
  });
  it('renders correctly success variant according to url parameter', () => {
    window.history.pushState({}, '', '/order-confirm/success');
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <OrderConfirm />
        </BrowserRouter>
      </ThemeProvider>,
    );

    expect(screen.getByText('Success')).toBeInTheDocument();
  });
  it('renders correctly failed variant according to url parameter', () => {
    window.history.pushState({}, '', '/order-confirm/error');
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Route path="/order-confirm/:status?">
            <OrderConfirm />
          </Route>
        </BrowserRouter>
      </ThemeProvider>,
    );

    expect(screen.getByText('Fail')).toBeInTheDocument();
  });
});
