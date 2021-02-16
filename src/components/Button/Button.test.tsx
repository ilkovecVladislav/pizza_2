import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import theme from 'theme';
import Button from '.';

describe('Button component', () => {
  it('renders correctly', () => {
    const BUTTON_TEXT = 'Login';
    render(
      <ThemeProvider theme={theme}>
        <Button text={BUTTON_TEXT} />
      </ThemeProvider>,
    );
    const button = screen.getByText(BUTTON_TEXT);

    expect(button).toHaveTextContent(BUTTON_TEXT);
    expect(button).not.toHaveAttribute('disabled');
    expect(button).toHaveStyleRule('background', theme.colors.primary.main);
  });
  it('renders disabled button', () => {
    render(
      <ThemeProvider theme={theme}>
        <Button text="Disabled" disabled />
      </ThemeProvider>,
    );
    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
    expect(button).toHaveStyleRule('background', theme.colors.gray[200], { modifier: ':disabled' });
  });
  it('handle click', () => {
    const onClick = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <Button text="Disabled" onClick={onClick} />
      </ThemeProvider>,
    );
    const button = screen.getByRole('button');

    userEvent.click(button);

    expect(onClick).toHaveBeenCalled();
  });
});
