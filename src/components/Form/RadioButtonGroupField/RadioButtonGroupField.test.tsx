import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import RadioButtonGroupField from '.';

const options = [
  {
    id: 'medium',
    value: '30',
    label: '30 см',
  },
  {
    id: 'big',
    value: '35',
    label: '35 см',
  },
];

describe('RadioButtonGroupField', () => {
  it('renders RadioButtonGroupField', () => {
    const { getByText, getByLabelText } = render(
      <RadioButtonGroupField label="Size" name="size" options={options} />,
    );
    expect(getByText(/Size/i)).toBeTruthy();
    expect(getByLabelText('30 см')).toBeTruthy();
    expect(getByLabelText('35 см')).toBeTruthy();
  });
  it('input updates', () => {
    const mockOnChange = jest.fn();
    const { getByLabelText } = render(
      <RadioButtonGroupField
        label="Size"
        name="size"
        options={options}
        value={null}
        onChange={mockOnChange}
      />,
    );

    const radioButton = getByLabelText('35 см');

    fireEvent.click(radioButton);
    expect(mockOnChange).toHaveBeenCalled();
  });
});
