import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import theme from 'theme';
import Header from './Header';

describe('Header component', () => {
  it('renders correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </ThemeProvider>,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'логотип');
  });
  it('open popup', () => {
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </ThemeProvider>,
    );

    userEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('link')).toHaveAttribute('href', '/orders-history');
  });
  it('close popup', async () => {
    const map: any = {};
    document.addEventListener = jest.fn((event, callback) => {
      map[event] = callback;
    });
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </ThemeProvider>,
    );
    userEvent.click(screen.getByRole('button'));

    act(() => {
      map.mousedown({ target: document.createElement('img') });
    });

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(document.addEventListener).toBeCalledTimes(1);
  });
});
