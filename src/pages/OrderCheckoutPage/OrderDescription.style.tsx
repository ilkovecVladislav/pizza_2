import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 16px;
`;

export const Content = styled.div`
  padding: 12px 16px;
  background: #ffffff;
  box-shadow: 0px 8px 16px rgba(75, 75, 124, 0.05);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

export const Title = styled.h5`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.primary.text};
  margin-bottom: 8px;
`;

export const Price = styled.span`
  margin-top: 13px;
  font-weight: 800;
  font-size: 16px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.gray[600]};
`;

export const DescriptionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 8px;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.gray[200]};
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
