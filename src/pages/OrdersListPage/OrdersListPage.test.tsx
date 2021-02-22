import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';

import theme from 'theme';
import OrdersListPage from '.';

const mockAuthFunction = jest.fn();
let mockIsAuthenticated = false;

jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    loginWithRedirect: mockAuthFunction,
    isAuthenticated: mockIsAuthenticated,
  }),
}));
jest.mock('./OrdersList.tsx', () => () => <div>Orders list</div>);

describe('OrdersListPage component', () => {
  it('renders authorization button', async () => {
    render(
      <ThemeProvider theme={theme}>
        <OrdersListPage />
      </ThemeProvider>,
    );

    expect(screen.getByRole('button')).toHaveTextContent('Авторизоваться');
  });
  it('handle authorization button click', async () => {
    render(
      <ThemeProvider theme={theme}>
        <OrdersListPage />
      </ThemeProvider>,
    );

    userEvent.click(screen.getByRole('button'));

    expect(mockAuthFunction).toHaveBeenCalled();
  });
  it('render orders list', async () => {
    mockIsAuthenticated = true;
    render(
      <ThemeProvider theme={theme}>
        <OrdersListPage />
      </ThemeProvider>,
    );

    expect(screen.getByText('Orders list')).toBeInTheDocument();
  });
});
