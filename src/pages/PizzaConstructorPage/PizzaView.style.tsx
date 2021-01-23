import styled from 'styled-components';

import plateImg from 'assets/images/plate.png';

export const Container = styled.div`
  width: 288px;
  height: 275px;
  margin: 0 16px 16px;
  overflow: hidden;
  position: relative;
  flex: none;
  background-image: url(${plateImg});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export const Dough = styled.img<{ size: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  max-width: ${({ size }) => (size === 'big' ? '240px' : '221px')};
  max-height: ${({ size }) => (size === 'big' ? '240px' : '221px')};
  top: ${({ size }) => (size === 'big' ? '18px' : '27px')};
  left: ${({ size }) => (size === 'big' ? '10px' : '20px')};
  transition: all 0.3s ease;
`;

export const IngredientImg = styled.img<{ zIndex: number; size: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  max-width: ${({ size }) => (size === 'big' ? '220px' : '200px')};
  max-height: ${({ size }) => (size === 'big' ? '220px' : '200px')};
  top: ${({ size }) => (size === 'big' ? '24px' : '35px')};
  left: ${({ size }) => (size === 'big' ? '19px' : '30px')};
  transition: all 0.3s ease;
  z-index: ${({ zIndex }) => zIndex};
`;
