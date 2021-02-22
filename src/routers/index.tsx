import { ReactElement } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import App from 'containers/App';

import RegistrationPage from 'pages/Auth/RegistrationPage';
import LogInPage from 'pages/Auth/LogInPage';
import PizzaConstructorPage from 'pages/PizzaConstructorPage';
import OrderCheckoutPage from 'pages/OrderCheckoutPage';
import OrderConfirmPage from 'pages/OrderConfirmPage';
import OrdersListPage from 'pages/OrdersListPage';

const AppRouter = (): ReactElement => (
  <Switch>
    <Route path="/" component={LogInPage} exact />
    <Route path="/registration" component={RegistrationPage} exact />
    <App>
      <Route path="/home" component={PizzaConstructorPage} exact />
      <Route path="/order-checkout" component={OrderCheckoutPage} exact />
      <Route path="/order-confirm/:status?" component={OrderConfirmPage} exact />
      <Route path="/orders-history" component={OrdersListPage} exact />
    </App>
    <Redirect to="/" />
  </Switch>
);

export default AppRouter;
