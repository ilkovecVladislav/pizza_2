import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { Container, Title, CloseButton } from './Header.style';

const Header = (): ReactElement => (
  <Container>
    <Title>Оформление заказа</Title>
    <Link to="/orders-history">
      <CloseButton type="button" />
    </Link>
  </Container>
);

export default Header;
