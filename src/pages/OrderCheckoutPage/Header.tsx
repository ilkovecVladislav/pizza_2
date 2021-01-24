import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Title, BackButton } from './Header.style';

const Header = (): JSX.Element => (
  <Container>
    <Link to="/home">
      <BackButton type="button" />
    </Link>
    <Title>Оформление заказа</Title>
  </Container>
);

export default Header;
