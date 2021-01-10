import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';

import PizzaConstructor from '.';

describe('PizzaConstructor', () => {
  it('renders PizzaConstructor', () => {
    const { getByText } = render(
      <BrowserRouter>
        <PizzaConstructor />
      </BrowserRouter>,
    );
    expect(getByText(/30 см, на тонкое тесте/i)).toBeTruthy();
    expect(getByText(/229/i)).toBeTruthy();
  });
  it('change pizza size', () => {
    const { getByText, getByLabelText } = render(
      <BrowserRouter>
        <PizzaConstructor />
      </BrowserRouter>,
    );
    const bigPizzaSizeRadioButton = getByLabelText('35 см');
    expect(bigPizzaSizeRadioButton).toBeTruthy();
    expect(bigPizzaSizeRadioButton.checked).toBeFalsy();
    fireEvent.click(bigPizzaSizeRadioButton);
    expect(bigPizzaSizeRadioButton.checked).toBeTruthy();
    expect(getByText(/279/i)).toBeTruthy();
  });
  it('change pizza dough', () => {
    const { getByText, getByLabelText } = render(
      <BrowserRouter>
        <PizzaConstructor />
      </BrowserRouter>,
    );
    const lushDoughPizzaRadioButton = getByLabelText('Пышное');
    expect(lushDoughPizzaRadioButton).toBeTruthy();
    expect(lushDoughPizzaRadioButton.checked).toBeFalsy();
    fireEvent.click(lushDoughPizzaRadioButton);
    expect(lushDoughPizzaRadioButton.checked).toBeTruthy();
    expect(getByText(/229/i)).toBeTruthy();
  });
  it('change pizza sauce', () => {
    const { getByText, getByLabelText } = render(
      <BrowserRouter>
        <PizzaConstructor />
      </BrowserRouter>,
    );
    const tomatoSauceRadioButton = getByLabelText('Томатный');
    const whiteSauceRadioButton = getByLabelText('Белый');
    const spicySauceRadioButton = getByLabelText('Острый');

    expect(tomatoSauceRadioButton.checked).toBeFalsy();
    expect(whiteSauceRadioButton.checked).toBeFalsy();
    expect(spicySauceRadioButton.checked).toBeFalsy();

    fireEvent.click(spicySauceRadioButton);
    expect(spicySauceRadioButton.checked).toBeTruthy();
    expect(getByText(/258/i)).toBeTruthy();
  });
  it('change pizza cheese', () => {
    const { getByText, getByLabelText } = render(
      <BrowserRouter>
        <PizzaConstructor />
      </BrowserRouter>,
    );
    const mozzarellaCheeseRadioButton = getByLabelText('Моцарелла');
    const cheddarCheeseRadioButton = getByLabelText('Чеддер');
    const dorBlueCheeseRadioButton = getByLabelText('Дор блю');

    expect(mozzarellaCheeseRadioButton.checked).toBeFalsy();
    expect(cheddarCheeseRadioButton.checked).toBeFalsy();
    expect(dorBlueCheeseRadioButton.checked).toBeFalsy();

    fireEvent.click(cheddarCheeseRadioButton);
    expect(cheddarCheeseRadioButton.checked).toBeTruthy();
    expect(getByText(/258/i)).toBeTruthy();
  });
  it('change pizza vegetables', () => {
    const { getByText, getByLabelText } = render(
      <BrowserRouter>
        <PizzaConstructor />
      </BrowserRouter>,
    );
    const tomatoRadioButton = getByLabelText('Помидор');
    const mushroomsRadioButton = getByLabelText('Грибы');
    const pepperRadioButton = getByLabelText('Перец');

    expect(tomatoRadioButton.checked).toBeFalsy();
    expect(mushroomsRadioButton.checked).toBeFalsy();
    expect(pepperRadioButton.checked).toBeFalsy();

    fireEvent.click(mushroomsRadioButton);
    expect(mushroomsRadioButton.checked).toBeTruthy();
    expect(getByText(/258/i)).toBeTruthy();
  });
  it('change pizza meat', () => {
    const { getByText, getByLabelText } = render(
      <BrowserRouter>
        <PizzaConstructor />
      </BrowserRouter>,
    );
    const baconRadioButton = getByText('Бекон');
    const pepperoniRadioButton = getByLabelText('Пепперони');
    const hamRadioButton = getByLabelText('Ветчина');

    expect(baconRadioButton.checked).toBeFalsy();
    expect(pepperoniRadioButton.checked).toBeFalsy();
    expect(hamRadioButton.checked).toBeFalsy();

    fireEvent.click(pepperoniRadioButton);
    expect(pepperoniRadioButton.checked).toBeTruthy();
    expect(getByText(/258/i)).toBeTruthy();
  });
  xit('submit form', () => {
    global.alert = jest.fn();
    const { getByText } = render(
      <BrowserRouter>
        <PizzaConstructor />
      </BrowserRouter>,
    );
    const submitBtn = getByText(/заказать/i);

    fireEvent.click(submitBtn);
    expect(global.alert).toHaveBeenCalled();
  });
});
