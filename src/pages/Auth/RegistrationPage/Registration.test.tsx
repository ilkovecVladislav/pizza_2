import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { createStore } from 'redux';

import userReducer from 'pages/Auth/state/reducer';
import theme from 'theme';
import Registration from '.';

const store = createStore(userReducer, {
  isAuthorized: false,
});

describe('Registration', () => {
  it('renders correctly', () => {
    const history = createMemoryHistory();
    const { getByText, getByLabelText, getAllByRole } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <Registration />
          </Router>
        </ThemeProvider>
      </Provider>,
    );

    expect(getByLabelText('E-mail')).toBeInTheDocument();
    expect(getByLabelText('Пароль')).toBeInTheDocument();
    expect(getAllByRole('button')).toHaveLength(3);
    expect(getByText('Войти')).not.toBeDisabled();
  });
  it('submit invalid form', async () => {
    const history = createMemoryHistory();
    const { getByText, getByLabelText } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <Registration />
          </Router>
        </ThemeProvider>
      </Provider>,
    );
    fireEvent.input(getByLabelText('E-mail'), {
      target: {
        value: '123@m',
      },
    });

    await act(async () => {
      fireEvent.click(getByText(/Зарегистрироваться/i));
    });

    expect(getByText('Неправильный email')).toBeInTheDocument();
    expect(getByText('Пароль обязательное поле')).toBeInTheDocument();
  });
  it('submit valid form', async () => {
    const history = createMemoryHistory();
    const { getByText, getByLabelText } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <Registration />
          </Router>
        </ThemeProvider>
      </Provider>,
    );
    fireEvent.input(getByLabelText('E-mail'), {
      target: {
        value: 'testmail@gmail.com',
      },
    });
    fireEvent.input(getByLabelText('Пароль'), {
      target: {
        value: '123123123',
      },
    });

    await act(async () => {
      fireEvent.click(getByText(/Зарегистрироваться/i));
    });

    expect(store.getState().isAuthorized).toBe(true);
  });
});
