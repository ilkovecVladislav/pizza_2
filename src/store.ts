import { configureStore, combineReducers } from "@reduxjs/toolkit";

import userReducer from "pages/Auth/state/reducer";
import pizzaConstructorReducer from "pages/PizzaConstructorPage/state/reducer";

const rootReducer = combineReducers({
  user: userReducer,
  pizzaConstructor: pizzaConstructorReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
