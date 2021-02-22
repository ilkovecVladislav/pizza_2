import styled from 'styled-components';

export const Title = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.gray[600]};
  margin-bottom: 4px;
`;

export const RadioButtonContainer = styled.div`
  background: ${({ theme }) => theme.colors.gray[100]};
  border-radius: 12px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow-y: auto;
`;

export const Radio = styled.label`
  font-size: 14px;
  line-height: 20px;
  display: block;
  cursor: pointer;

  input {
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    position: absolute;

    &:checked + .radio-btn {
      background: #ffffff;
      box-shadow: 0px 3px 4px rgba(75, 75, 124, 0.05), 0px 0px 2px rgba(75, 75, 124, 0.2);
      border-radius: 10px;
      color: ${({ theme }) => theme.colors.primary.text};
    }
  }

  .radio-btn {
    margin: 2px;
    color: ${({ theme }) => theme.colors.gray[600]};
    padding: 4px 12px;
    display: block;
  }
`;
