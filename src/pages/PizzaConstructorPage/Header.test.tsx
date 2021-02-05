import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { createStore } from 'redux';

import userReducer from 'pages/Auth/state/reducer';
import theme from 'theme';
import Header from './Header';

const store = createStore(userReducer, {
  isAuthorized: false,
});

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

    expect(getByRole('button')).toBeInTheDocument();
    expect(getByRole('img')).toHaveAttribute('alt', 'логотип');
  });
  it('open popup', () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <Header />
        </Router>
      </ThemeProvider>,
    );

    fireEvent.click(getByRole('button'));

    expect(getByRole('link')).toHaveAttribute('href', '/orders-history');
  });
  it('close popup', async () => {
    const map: any = {};
    document.addEventListener = jest.fn((event, callback) => {
      map[event] = callback;
    });
    const history = createMemoryHistory();
    const { getByRole, queryByRole } = render(
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <Header />
        </Router>
      </ThemeProvider>,
    );
    fireEvent.click(getByRole('button'));

    act(() => {
      map.mousedown({ target: document.createElement('img') });
    });

    expect(queryByRole('link')).not.toBeInTheDocument();
    expect(document.addEventListener).toBeCalledTimes(1);
  });
});
