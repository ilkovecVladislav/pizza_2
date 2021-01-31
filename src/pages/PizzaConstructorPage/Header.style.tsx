import styled from 'styled-components';
import { Link } from 'react-router-dom';

import userIcon from 'assets/icons/user.svg';

export const Container = styled.div`
  height: 56px;
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 3px 4px rgba(46, 49, 55, 0.05), 0px 0px 2px rgba(46, 49, 55, 0.15);
  margin-bottom: 16px;
  position: relative;
`;

export const ImageButton = styled.button`
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  background: transparent;
  position: relative;
  cursor: pointer;

  &::before {
    position: absolute;
    content: '';
    width: 14px;
    height: 14px;
    background-image: url(${userIcon});
    background-repeat: no-repeat;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const PopUp = styled.div`
  width: 100px;
  height: 60px;
  text-align: center;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.gray[100]};
  position: absolute;
  padding: 8px;
  bottom: -50px;
  right: 13px;
  box-shadow: 0px 4px 15px 11px rgba(173, 173, 173, 0.46);
`;

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary.text};
  font-size: 14px;
  line-height: 18px;
`;
