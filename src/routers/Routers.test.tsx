import React, { FC, ReactElement } from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { getIngredients } from 'services/ingredients';
import getIngredientsResponse from '__fixtures__/getIngredientsResponse';
import { rootReducer } from 'store';
import theme from 'theme';
import App from '.';

jest.mock('services/ingredients', () => ({
  getIngredients: jest.fn(),
}));
jest.mock('containers/App', () => ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
));

const mockGetIngredients = getIngredients as jest.Mock;

const renderWithRouter = (component: ReactElement, route = '/') => {
  const history = createMemoryHistory({ initialEntries: [route] });
  const store = configureStore({
    reducer: rootReducer,
  });
  const Wrapper: FC = (props) => (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router history={history} {...props} />
      </ThemeProvider>
    </Provider>
  );

  return {
    ...render(component, { wrapper: Wrapper }),
    history,
  };
};

describe('Routers', () => {
  it('navigates to registration page', () => {
    const { container, getByText, getByRole } = renderWithRouter(<App />);
    expect(container.innerHTML).toMatch('Авторизация');
    expect(getByText(/зарегистрироваться/i)).toBeInTheDocument();

    userEvent.click(getByText(/зарегистрироваться/i));

    waitFor(() => {
      expect(getByRole('heading')).toHaveTextContent('Регистрация');
    });
  });
  it('navigates to home page', async () => {
    const { container, getByText, getByRole } = renderWithRouter(<App />, '/registration');
    expect(getByRole('heading')).toHaveTextContent('Регистрация');

    userEvent.click(getByText(/зарегистрироваться/i));

    waitFor(() => {
      expect(container.innerHTML).toMatch('Загрузка');
    });
  });

  it('navigates to order checkout page', () => {
    const history = createMemoryHistory({ initialEntries: ['/home'] });
    const store = configureStore({
      reducer: rootReducer,
    });
    mockGetIngredients.mockResolvedValue(getIngredientsResponse);
    const { container, getByText } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <App />
          </Router>
        </ThemeProvider>
      </Provider>,
    );
    expect(getByText(/собери свою пиццу/i, { exact: false })).toBeInTheDocument();

    userEvent.click(getByText(/заказать/i));

    waitFor(() => {
      expect(container.innerHTML).toMatch('Оформление заказа');
    });
  });
});
