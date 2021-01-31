import styled from 'styled-components';

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.gray[100]};
  height: 100%;
`;

export const Label = styled.h3`
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: ${({ theme }) => theme.colors.primary.text};
  margin-bottom: 8px;
`;

export const Description = styled.p`
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.gray[600]};
  margin-bottom: 32px;
  text-align: center;
`;
