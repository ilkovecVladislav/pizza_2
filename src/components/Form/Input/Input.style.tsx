import styled from 'styled-components';

export const Container = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

export const StyledInput = styled.input<{ error: boolean }>`
  color: ${({ error, theme }) =>
    error ? theme.colors.primary.errorText : theme.colors.primary.text};
  border: 2px solid;
  border-color: ${({ error, theme }) =>
    error ? theme.colors.primary.errorText : theme.colors.gray[200]};
  border-radius: 6px;
  padding: 12px;
  height: 40px;
  margin-top: 8px;
  font-size: 16px;
  line-height: 16px;

  &::placeholder {
    font-size: 16px;
    line-height: 16px;
    color: ${({ theme }) => theme.colors.gray[400]};
    opacity: 0.5;
  }
`;

export const Error = styled.p`
  padding-top: 4px;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.primary.errorText};
`;
