import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';
import InputMask from 'react-input-mask';

import Input from 'components/Form/Input';

const FormContent = styled.div`
  padding: 0 16px;
`;

const AddressSection = styled.div`
  border-bottom: 1px solid #e1e1ed;
  margin-bottom: 16px;

  .title {
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #1f1f33;
    margin-bottom: 16px;
  }

  .row {
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
  }
`;

const CardSection = styled.div`
  border-bottom: 1px solid #e1e1ed;
  margin-bottom: 16px;

  .title {
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #1f1f33;
    margin-bottom: 16px;
  }

  .row {
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
      max-width: 64px;
      margin-right: 0;
    }
  }
`;

const HelpInfo = styled.p`
  font-size: 14px;
  line-height: 20px;
  color: #4b4b7c;
  margin-bottom: 16px;
`;

const Footer = styled.div`
  padding: 12px 16px;
  background: #ffffff;
  box-shadow: 0px -16px 32px rgba(75, 75, 124, 0.05), 0px 0px 4px rgba(75, 75, 124, 0.1);
  display: flex;
  flex-direction: column;

  .inner {
    border-bottom: 1px dashed #e1e1ed;
    margin-bottom: 8px;
  }

  .row {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    line-height: 18px;
    color: #4b4b7c;
    padding-bottom: 4px;
  }

  .result {
    font-weight: 500;
    margin-bottom: 12px;
  }

  button {
    border: unset;
    background: #00a896;
    border-radius: 16px;
    font-weight: 800;
    font-size: 16px;
    line-height: 16px;
    color: #ffffff;
    height: 40px;
    cursor: pointer;
    &:disabled {
      background: #f9f9fb;
      color: #8181b1;
      cursor: not-allowed;
    }
  }
`;

const schema = yup.object().shape({
  address: yup
    .string()
    .required('Адресс обязателен к заполнению')
    .min(5, 'Слишком короткий адресс')
    .max(70, 'Слишком длинный адресс'),
  entrance: yup
    .number()
    .positive('Значение подъезда должно позитивным')
    .integer('Значение подъезда должно целым'),
  floor: yup
    .number()
    .positive('Значение этажа должно позитивным')
    .integer('Значение этажа должно целым'),
  door: yup
    .number()
    .positive('Значение квартира должно позитивным')
    .integer('Значение квартира должно целым'),
  card_number: yup
    .string()
    .required('Номер карты обязательное поле')
    .length(19, 'Не верный формат'),
  cardCode: yup
    .number()
    .positive('Значение CVV должно позитивным')
    .integer('Значение CVV должно целым')
    .max(9999, 'Неверное значение CVV'),
});

const normalizeCardNumber = (value: string): string =>
  value
    .replace(/\s/g, '')
    .match(/.{1,4}/g)
    ?.join(' ')
    .substr(0, 19) || '';

const DELIVERY_COST = 180;

type Props = {
  price?: number;
  formSubmit: (data: FormValues) => void;
};

type FormValues = {
  address: string;
  entrance?: number;
  floor?: number;
  door?: number;
  card_number: string;
  cardDate: string;
  cardCode: number;
  cardName?: number;
};

const Form = ({ price = 0, formSubmit }: Props): JSX.Element => {
  const { register, control, errors, formState, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (values: FormValues) => {
    formSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormContent>
        <AddressSection>
          <span className="title">Адрес доставки</span>
          <Input
            ref={register}
            type="text"
            name="address"
            error={errors?.address?.message}
            placeholder="Введите адрес"
          />
          <div className="row">
            <Input
              ref={register}
              label="подъезд"
              type="number"
              name="entrance"
              error={errors?.entrance?.message}
            />
            <Input
              ref={register}
              label="этаж"
              type="number"
              name="floor"
              error={errors?.floor?.message}
            />
            <Input
              ref={register}
              label="квартира"
              type="number"
              name="door"
              error={errors?.door?.message}
            />
          </div>
        </AddressSection>
        <CardSection>
          <span className="title">Данные для оплаты</span>
          <div className="card">
            <Input
              ref={register}
              data-testid="card-number"
              placeholder="Номер карты"
              type="tel"
              inputMode="numeric"
              autoComplete="cc-number"
              name="card_number"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const { value } = event.target;
                event.target.value = normalizeCardNumber(value);
              }}
              error={errors?.card_number?.message}
            />

            <div className="row">
              <Controller
                control={control}
                name="cardDate"
                render={({ onChange, value, name, ref }) => (
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  <InputMask mask="99/9999" maskChar=" " value={value} onChange={onChange}>
                    {() => <Input ref={ref} name={name} placeholder="MM/YYYY" />}
                  </InputMask>
                )}
              />
              <Input
                ref={register}
                placeholder="CVV"
                type="number"
                name="cardCode"
                error={errors?.cardCode?.message}
              />
            </div>
            <Input ref={register} placeholder="Имя как на карте" type="text" name="cardName" />
          </div>
        </CardSection>

        <HelpInfo>
          Доставим пиццу в течение часа или вернем деньги. Артем слов на ветер не бросает.
        </HelpInfo>
      </FormContent>

      <Footer>
        <div className="content">
          <div className="inner">
            <div className="row">
              <span>Стоимость заказа</span>
              <span>{price} руб</span>
            </div>
            <div className="row">
              <span>Доставка</span>
              <span>{DELIVERY_COST} руб</span>
            </div>
          </div>
          <div className="row result">
            <span>К оплате</span>
            <span>{price + DELIVERY_COST} руб</span>
          </div>
        </div>
        <button type="submit" disabled={!formState.isDirty}>
          Заказать за {price + DELIVERY_COST} руб
        </button>
      </Footer>
    </form>
  );
};

export default Form;
