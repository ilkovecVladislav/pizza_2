import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { Container, Title, LinkButton } from './Header.style';

type Props = {
  title: string;
  link: string;
};

const Header = ({ title, link }: Props): ReactElement => (
  <Container>
    <Link to={link}>
      <LinkButton type="button" />
    </Link>
    <Title>{title}</Title>
  </Container>
);

export default Header;
