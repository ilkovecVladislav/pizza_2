import React, { useState, useEffect, useRef, ReactElement } from 'react';

import logo from 'assets/images/logo.png';
import { Container, ImageButton, PopUp, StyledLink } from './Header.style';

const Header = (): ReactElement => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleOpenPopUp = () => setOpen(true);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (ref.current && !ref.current.contains(target)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Container ref={ref}>
      <img src={logo} alt="логотип" />
      <ImageButton type="button" onClick={handleOpenPopUp} />
      {open ? (
        <PopUp>
          <StyledLink to="/orders-history">История заказов</StyledLink>
        </PopUp>
      ) : null}
    </Container>
  );
};

export default Header;
