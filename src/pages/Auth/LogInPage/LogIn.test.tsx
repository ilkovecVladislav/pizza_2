import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { createStore } from 'redux';

import userReducer from 'pages/Auth/state/reducer';
import theme from 'theme';
import LogIn from '.';

const store = createStore(userReducer, {
  isAuthorized: false,
});

describe('LogIn', () => {
  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <LogIn />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    );

    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Пароль')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(3);
    expect(screen.getByText(/войти/i)).toBeDisabled();
  });
  it('submit invalid form', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <LogIn />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    );
    userEvent.type(screen.getByLabelText('E-mail'), '123@m');

    await act(async () => {
      fireEvent.click(screen.getByText(/войти/i));
    });

    expect(screen.getByText('Неправильный email')).toBeInTheDocument();
    expect(screen.getByText('Пароль обязательное поле')).toBeInTheDocument();
  });
  it('submit valid form', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <LogIn />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    );
    userEvent.type(screen.getByLabelText('E-mail'), 'testmail@gmail.com');
    userEvent.type(screen.getByLabelText('Пароль'), '123123123');

    await act(async () => {
      fireEvent.click(screen.getByText(/войти/i));
    });

    expect(store.getState().isAuthorized).toBe(true);
  });
});
