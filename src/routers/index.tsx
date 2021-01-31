import { ReactElement } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import App from 'containers/App';

import RegistrationPage from 'pages/Auth/RegistrationPage';
import LogInPage from 'pages/Auth/LogInPage';
import PizzaConstructorPage from 'pages/PizzaConstructorPage';
import OrderCheckoutPage from 'pages/OrderCheckoutPage';
import OrderConfirmPage from 'pages/OrderConfirmPage';
import OrdersListPage from 'pages/OrdersListPage';

const AppRouter = (): ReactElement => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={LogInPage} exact />
      <App>
        <Route path="/registration" component={RegistrationPage} />
        <Route path="/home" component={PizzaConstructorPage} />
        <Route path="/order-checkout" component={OrderCheckoutPage} />
        <Route path="/order-confirm/:status?" component={OrderConfirmPage} />
        <Route path="/orders-history" component={OrdersListPage} />
      </App>
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
