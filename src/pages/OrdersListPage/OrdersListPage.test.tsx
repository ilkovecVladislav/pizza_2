import React from 'react';
import { fireEvent, render } from '@testing-library/react';
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
    const { getByRole } = render(
      <ThemeProvider theme={theme}>
        <OrdersListPage />
      </ThemeProvider>,
    );

    expect(getByRole('button')).toHaveTextContent('Авторизоваться');
  });
  it('handle authorization button click', async () => {
    const { getByRole } = render(
      <ThemeProvider theme={theme}>
        <OrdersListPage />
      </ThemeProvider>,
    );

    fireEvent.click(getByRole('button'));

    expect(mockAuthFunction).toHaveBeenCalled();
  });
  it('render orders list', async () => {
    mockIsAuthenticated = true;
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <OrdersListPage />
      </ThemeProvider>,
    );

    expect(getByText('Orders list')).toBeInTheDocument();
  });
});
