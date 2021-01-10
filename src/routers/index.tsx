import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import RegistrationPage from 'pages/Auth/RegistrationPage';
import LogInPage from 'pages/Auth/LogInPage';
import PizzaConstructorPage from 'pages/PizzaConstructorPage';
import OrderCheckoutPage from 'pages/OrderCheckoutPage';
import OrderConfirmPage from 'pages/OrderConfirmPage';
import OrdersListPage from 'pages/OrdersListPage';
import ProtectedRoute from './ProtectedRoute';

const AppRouter = (): JSX.Element => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={LogInPage} exact />
      <ProtectedRoute path="/registration">
        <RegistrationPage />
      </ProtectedRoute>
      <ProtectedRoute path="/home">
        <PizzaConstructorPage />
      </ProtectedRoute>
      <ProtectedRoute path="/order-checkout">
        <OrderCheckoutPage />
      </ProtectedRoute>
      <ProtectedRoute path="/order-confirm/:status?">
        <OrderConfirmPage />
      </ProtectedRoute>
      <ProtectedRoute path="/orders-history">
        <OrdersListPage />
      </ProtectedRoute>
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
