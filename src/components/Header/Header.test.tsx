import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import theme from 'theme';
import Header from '.';

describe('Header component', () => {
  it('renders correctly', () => {
    const TITLE = 'Home page';
    const LINK = '/home';
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header title={TITLE} link={LINK} />
        </BrowserRouter>
      </ThemeProvider>,
    );

    expect(screen.getByRole('heading')).toHaveTextContent(TITLE);
    expect(screen.getByRole('link')).toHaveAttribute('href', LINK);
  });
});
