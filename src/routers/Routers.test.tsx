import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';
import App from '.';

const renderWithRouter = (component, route = '/') => {
  const history = createMemoryHistory({ initialEntries: [route] });
  const Wrapper = ({ children }) => <Router history={history}>{children}</Router>;

  return {
    ...render(component, { wrapper: Wrapper }),
    history,
  };
};

describe('App', () => {
  it('navigates to registration page', () => {
    const { container, getByText } = renderWithRouter(<App />);

    expect(container.innerHTML).toMatch('Авторизация');

    fireEvent.click(getByText(/зарегистрироваться/i));

    expect(container.innerHTML).toMatch('Регистрация');
  });

  it('navigates to home page', () => {
    const { container } = renderWithRouter(<App />, '/registration');

    expect(container.innerHTML).toMatch('Регистрация');
  });

  it('navigates to order checkout page', () => {
    const { container, getByText } = renderWithRouter(<App />, '/home');

    expect(getByText(/История заказов/i)).toBeInTheDocument();

    fireEvent.click(getByText(/заказать/i));

    expect(container.innerHTML).toMatch('Оформление заказа');
  });

  it('navigates to orders list page', () => {
    const { container, getByText } = renderWithRouter(<App />, '/home');

    expect(container.innerHTML).toMatch('Заказать');

    fireEvent.click(getByText(/история заказов/i));

    expect(container.innerHTML).toMatch('Список заказов');
  });
});
