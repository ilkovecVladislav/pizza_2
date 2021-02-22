import React, { forwardRef, ReactElement } from 'react';
import map from 'lodash/map';

import { Title, RadioButtonContainer, Radio } from './RadioButtonGroupField.style';

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
  ({ label, options, name }, ref): ReactElement => (
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
