import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import { useLocation, useHistory } from 'react-router-dom';

import Content from './Content';

const Button = styled.button`
  display: block;
  margin: 15px auto;
  border: unset;
  background: #00a896;
  border-radius: 16px;
  font-weight: 800;
  font-size: 16px;
  line-height: 16px;
  padding: 0 15px;
  color: #ffffff;
  height: 40px;
  margin-bottom: 16px;
  cursor: pointer;
`;

const OrdersList = (): JSX.Element => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const x = useLocation();
  const y = useHistory();

  console.log(x, y);

  if (isAuthenticated) {
    return <Content />;
  }

  return (
    <div>
      <Button onClick={() => loginWithRedirect({ redirectUri: window.location.href })}>
        Авторизоваться
      </Button>
    </div>
  );
};

export default OrdersList;
