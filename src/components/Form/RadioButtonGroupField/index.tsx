import React, { forwardRef } from 'react';
import map from 'lodash/map';
import styled from 'styled-components';

const Title = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #4b4b7c;
  margin-bottom: 4px;
`;

const RadioButtonContainer = styled.div`
  background: #f9f9fb;
  border-radius: 12px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow-y: auto;
`;

const Radio = styled.label`
  font-size: 14px;
  line-height: 20px;
  display: block;

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
      color: #1f1f33;
    }
  }

  .radio-btn {
    margin: 2px;
    color: #4b4b7c;
    padding: 4px 12px;
    display: block;
  }
`;

type Props = {
  label: string;
  name: string;
  options: {
    [key: string]: {
      label: string;
    };
  };
};

const RadioButtonGroupField = forwardRef<HTMLInputElement, Props>(
  ({ label, options, name }, ref): JSX.Element => (
    <div>
      <Title>{label}</Title>
      <RadioButtonContainer>
        {map(options, (option, key) => (
          <Radio key={key}>
            <input ref={ref} type="radio" name={name} value={key} />
            <span className="radio-btn">{option.label}</span>
          </Radio>
        ))}
      </RadioButtonContainer>
    </div>
  ),
);

export default RadioButtonGroupField;
