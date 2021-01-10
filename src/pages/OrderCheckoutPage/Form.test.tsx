import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import Form from './Form';

describe('Form', () => {
  it('renders correctly', () => {
    const { getByText, getByLabelText } = render(<Form formSubmit={() => undefined} />);

    expect(getByText('Адрес доставки')).toBeInTheDocument();
    expect(getByLabelText('подъезд')).toBeInTheDocument();
    expect(getByLabelText('этаж')).toBeInTheDocument();
    expect(getByText('квартира')).toBeInTheDocument();
    expect(getByText('Данные для оплаты')).toBeInTheDocument();
  });

  describe('on submit', () => {
    it('validates that address is filled in', async () => {
      const { getByText } = render(<Form formSubmit={() => undefined} />);

      await act(async () => {
        fireEvent.click(getByText(/Оплатить/i));
      });

      expect(getByText('Адресс обязателен к заполнению')).toBeInTheDocument();
    });
    it('validates that address is too long ', async () => {
      const { getByText, getByTestId } = render(<Form formSubmit={() => undefined} />);

      fireEvent.input(getByTestId('address'), {
        target: {
          value:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, expedita? Eveniet cumque sapiente dolorem voluptates, culpa vitae nesciunt praesentium aperiam at in ut, molestias iure velit provident dicta voluptatum dignissimos?',
        },
      });

      await act(async () => {
        fireEvent.click(getByText(/Оплатить/i));
      });

      expect(getByText('Слишком длинный адресс')).toBeInTheDocument();
    });
    it('validates that address is too short ', async () => {
      const { getByText, getByTestId } = render(<Form formSubmit={() => undefined} />);

      fireEvent.input(getByTestId('address'), {
        target: {
          value: 'Lorem ipsum ',
        },
      });

      await act(async () => {
        fireEvent.click(getByText(/Оплатить/i));
      });

      expect(getByText('Слишком короткий адресс')).toBeInTheDocument();
    });
    it('validates that entrance is positive', async () => {
      const { getByText, getByLabelText } = render(<Form formSubmit={() => undefined} />);

      fireEvent.input(getByLabelText('подъезд'), {
        target: {
          value: -2,
        },
      });

      await act(async () => {
        fireEvent.click(getByText(/Оплатить/i));
      });

      expect(getByText('Значение подъезда должно позитивным')).toBeInTheDocument();
    });
    it('validates that entrance is integer', async () => {
      const { getByText, getByLabelText } = render(<Form formSubmit={() => undefined} />);

      fireEvent.input(getByLabelText('подъезд'), {
        target: {
          value: 2.2,
        },
      });

      await act(async () => {
        fireEvent.click(getByText(/Оплатить/i));
      });

      expect(getByText('Значение подъезда должно целым')).toBeInTheDocument();
    });
    it('validates that floor is positive', async () => {
      const { getByText, getByLabelText } = render(<Form formSubmit={() => undefined} />);

      fireEvent.input(getByLabelText('этаж'), {
        target: {
          value: -2,
        },
      });

      await act(async () => {
        fireEvent.click(getByText(/Оплатить/i));
      });

      expect(getByText('Значение этажа должно позитивным')).toBeInTheDocument();
    });
    it('validates that floor is integer', async () => {
      const { getByText, getByLabelText } = render(<Form formSubmit={() => undefined} />);

      fireEvent.input(getByLabelText('этаж'), {
        target: {
          value: 2.2,
        },
      });

      await act(async () => {
        fireEvent.click(getByText(/Оплатить/i));
      });

      expect(getByText('Значение этажа должно целым')).toBeInTheDocument();
    });
    it('validates that door is positive', async () => {
      const { getByText, getByLabelText } = render(<Form formSubmit={() => undefined} />);

      fireEvent.input(getByLabelText('квартира'), {
        target: {
          value: -2,
        },
      });

      await act(async () => {
        fireEvent.click(getByText(/Оплатить/i));
      });

      expect(getByText('Значение квартира должно позитивным')).toBeInTheDocument();
    });
    it('validates that door is integer', async () => {
      const { getByText, getByLabelText } = render(<Form formSubmit={() => undefined} />);

      fireEvent.input(getByLabelText('квартира'), {
        target: {
          value: 2.2,
        },
      });

      await act(async () => {
        fireEvent.click(getByText(/Оплатить/i));
      });

      expect(getByText('Значение квартира должно целым')).toBeInTheDocument();
    });
    it('breaks the card number into groups of four digits', async () => {
      const { getByTestId } = render(<Form formSubmit={() => undefined} />);

      const ccInput = getByTestId('card-number');
      fireEvent.input(ccInput, { target: { value: '1234123412341234' } });

      expect(ccInput.value).toEqual('1234 1234 1234 1234');
    });

    it('limits the card number by 19 digits', async () => {
      const { getByTestId } = render(<Form formSubmit={() => undefined} />);

      const ccInput = getByTestId('card-number');
      fireEvent.input(ccInput, { target: { value: '12341234123412341234' } });

      expect(ccInput.value).toEqual('1234 1234 1234 1234');
    });
    it('validates that card is filled in', async () => {
      const { getByText } = render(<Form formSubmit={() => undefined} />);

      await act(async () => {
        fireEvent.click(getByText(/Оплатить/i));
      });

      expect(getByText('Номер карты обязательное поле')).toBeInTheDocument();
    });
    it('validates that card value length is correct', async () => {
      const { getByText, getByTestId } = render(<Form formSubmit={() => undefined} />);

      const ccInput = getByTestId('card-number');
      fireEvent.input(ccInput, { target: { value: '123123' } });

      await act(async () => {
        fireEvent.click(getByText(/Оплатить/i));
      });

      expect(getByText('Не верный формат')).toBeInTheDocument();
    });
    it('validates that cvv is valid', async () => {
      const { getByText, getByTestId } = render(<Form formSubmit={() => undefined} />);

      fireEvent.input(getByTestId('card-code'), {
        target: {
          value: 22222,
        },
      });

      await act(async () => {
        fireEvent.click(getByText(/Оплатить/i));
      });

      expect(getByText('Неверное значение CVV')).toBeInTheDocument();
    });
    it('validates that CVV is positive', async () => {
      const { getByText, getByTestId } = render(<Form formSubmit={() => undefined} />);

      fireEvent.input(getByTestId('card-code'), {
        target: {
          value: -2,
        },
      });

      await act(async () => {
        fireEvent.click(getByText(/Оплатить/i));
      });

      expect(getByText('Значение CVV должно позитивным')).toBeInTheDocument();
    });
    it('validates that CVV is integer', async () => {
      const { getByText, getByTestId } = render(<Form formSubmit={() => undefined} />);

      fireEvent.input(getByTestId('card-code'), {
        target: {
          value: 2.2,
        },
      });

      await act(async () => {
        fireEvent.click(getByText(/Оплатить/i));
      });

      expect(getByText('Значение CVV должно целым')).toBeInTheDocument();
    });
    it('collects form values', async () => {
      const formSubmit = jest.fn();

      const { getByText, getByLabelText, getByTestId } = render(<Form formSubmit={formSubmit} />);

      fireEvent.input(getByTestId('address'), { target: { value: 'some address 44' } });
      fireEvent.input(getByLabelText('подъезд'), { target: { value: 4 } });
      fireEvent.input(getByLabelText('этаж'), { target: { value: 12 } });
      fireEvent.input(getByLabelText('квартира'), { target: { value: 52 } });
      fireEvent.input(getByTestId('card-number'), { target: { value: '9999999999999999' } });
      fireEvent.input(getByTestId('card-month'), { target: { value: '03' } });
      fireEvent.input(getByTestId('card-year'), { target: { value: '2021' } });
      fireEvent.input(getByTestId('card-code'), { target: { value: 333 } });

      await act(async () => {
        fireEvent.click(getByText(/Оплатить/i));
      });

      expect(formSubmit).toBeCalledWith({
        address: 'some address 44',
        entrance: 4,
        floor: 12,
        door: 52,
        cardNumber: '9999 9999 9999 9999',
        cardMonth: '03',
        cardYear: '2021',
        cardCode: 333,
      });
    });
  });
});
