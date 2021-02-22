import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 16px;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.gray[200]};
  margin-bottom: 20px;
`;

export const IngredientItem = styled.span`
  position: relative;
  margin-right: 10px;
  font-size: 12px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.gray[600]};

  &::after {
    content: '';
    position: absolute;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    top: 8px;
    right: -6px;
    background: ${({ theme }) => theme.colors.gray[600]};
  }

  &:last-child {
    margin-right: 0;
  }

  &:last-child::after {
    background: none;
  }
`;
