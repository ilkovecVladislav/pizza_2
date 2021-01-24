import styled from 'styled-components';

export const FormContent = styled.div`
  padding: 0 16px 170px;
`;

export const AddressSection = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  margin-bottom: 16px;
`;

export const AddressLabel = styled.span`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.primary.text};
  margin-bottom: 16px;
`;

export const AddressRow = styled.div`
  display: flex;

  & > * {
    flex-grow: 0;
    flex-shrink: 0;
    width: 100%;
    max-width: 90px;
    margin-right: 8px;
  }

  & > *:last-child {
    margin-right: 0;
  }
`;

export const CardSection = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  margin-bottom: 16px;
`;

export const CardLabel = styled.span`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.primary.text};
  margin-bottom: 16px;
`;

export const CardRow = styled.div`
  display: flex;
  justify-content: space-between;

  & > label {
    flex-grow: 0;
    flex-shrink: 0;
    width: 100%;
    max-width: 110px;
    margin-right: 8px;
  }

  & > label:last-child {
    max-width: 84px;
    margin-right: 0;
  }
`;

export const HelpInfo = styled.p`
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.gray[600]};
  margin-bottom: 16px;
`;

export const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px 16px;
  background: #ffffff;
  box-shadow: 0px -16px 32px rgba(75, 75, 124, 0.05), 0px 0px 4px rgba(75, 75, 124, 0.1);
  display: flex;
  justify-content: center;
`;

export const FooterWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
`;

export const FooterInner = styled.div`
  border-bottom: 1px dashed ${({ theme }) => theme.colors.gray[200]};
  margin-bottom: 8px;
`;

export const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.gray[600]};
  padding-bottom: 4px;
`;

export const FooterResult = styled(FooterRow)`
  font-weight: 500;
  margin-bottom: 12px;
`;

export const SubmitButton = styled.button`
  border: unset;
  background: ${({ theme }) => theme.colors.primary.main};
  border-radius: 16px;
  font-weight: 800;
  font-size: 16px;
  line-height: 16px;
  color: #ffffff;
  height: 40px;
  cursor: pointer;

  &:disabled {
    background: #f9f9fb;
    color: ${({ theme }) => theme.colors.gray[600]};
    cursor: not-allowed;
  }
`;
