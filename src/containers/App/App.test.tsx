import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import pizzaConstructorReducer from 'pages/PizzaConstructorPage/state/reducer';
import App from '.';

jest.mock('services/ingredients', () => ({
  getIngredients: jest.fn(),
}));

describe('App component', () => {
  it('renders correctly', () => {
    const TEXT = 'Hello world';
    const store = configureStore({
      reducer: pizzaConstructorReducer,
    });
    const spy = jest.spyOn(store, 'dispatch');
    const { getByText } = render(
      <Provider store={store}>
        <App>
          <div>
            <h1>{TEXT}</h1>
          </div>
        </App>
      </Provider>,
    );

    expect(getByText(TEXT)).toBeInTheDocument();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
