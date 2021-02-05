import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import theme from 'theme';
import Header from '.';

describe('Header component', () => {
  it('renders correctly', () => {
    const TITLE = 'Home page';
    const LINK = '/home';
    const { getByText, getByRole } = render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header title={TITLE} link={LINK} />
        </BrowserRouter>
      </ThemeProvider>,
    );

    expect(getByText(TITLE)).toBeInTheDocument();
    expect(getByRole('link')).toHaveAttribute('href', LINK);
  });
});
