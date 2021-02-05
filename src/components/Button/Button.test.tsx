import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, fireEvent } from '@testing-library/react';

import theme from 'theme';
import Button from '.';

describe('Button component', () => {
  it('renders correctly', () => {
    const BUTTON_TEXT = 'Login';
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Button text={BUTTON_TEXT} />
      </ThemeProvider>,
    );
    const button = getByText(BUTTON_TEXT);

    expect(button).toHaveTextContent(BUTTON_TEXT);
    expect(button).not.toHaveAttribute('disabled');
    expect(button).toHaveStyleRule('background', theme.colors.primary.main);
  });
  it('renders disabled button', () => {
    const { getByRole } = render(
      <ThemeProvider theme={theme}>
        <Button text="Disabled" disabled />
      </ThemeProvider>,
    );
    const button = getByRole('button');

    expect(button).toBeDisabled();
    expect(button).toHaveStyleRule('background', theme.colors.gray[200], { modifier: ':disabled' });
  });
  it('handle click', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <ThemeProvider theme={theme}>
        <Button text="Disabled" onClick={onClick} />
      </ThemeProvider>,
    );
    const button = getByRole('button');

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalled();
  });
});
