import styled from 'styled-components';

import arrowIcon from 'assets/icons/left-arrow.svg';

export const Container = styled.div`
  height: 56px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  background: #fff;
  margin-bottom: 16px;
`;

export const Title = styled.h3`
  margin-left: 5px;
  font-weight: 800;
  font-size: 20px;
  line-height: 28px;
  color: ${({ theme }) => theme.colors.primary.text};
`;

export const BackButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  position: relative;
  margin-right: 4px;
  cursor: pointer;

  &:before {
    content: '';
    position: absolute;
    width: 15px;
    height: 10px;
    background: url(${arrowIcon});
    background-position: center;
    background-repeat: no-repeat;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
