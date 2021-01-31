import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputMask from 'react-input-mask';

import {
  FormContent,
  AddressSection,
  AddressLabel,
  AddressRow,
  CardSection,
  CardLabel,
  CardRow,
  HelpInfo,
  Footer,
  FooterWrapper,
  FooterInner,
  FooterRow,
  FooterResult,
} from './Form.style';
import Input from 'components/Form/Input';
import Button from 'components/Button';

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
  cardName: yup.string().required('Имя обязательное поле'),
  cardCode: yup
    .number()
    .positive('Значение CVV должно позитивным')
    .integer('Значение CVV должно целым')
    .max(9999, 'Неверное значение CVV'),
  phone: yup.string().required('Телефон обязательное поле'),
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
  cardName: string;
  phone: string;
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
          <AddressLabel>Адрес доставки</AddressLabel>
          <Input
            ref={register}
            type="text"
            name="address"
            error={errors?.address?.message}
            placeholder="Введите адрес"
          />
          <AddressRow>
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
          </AddressRow>
        </AddressSection>
        <CardSection>
          <CardLabel>Данные для оплаты</CardLabel>
          <div>
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

            <CardRow>
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
            </CardRow>
            <Input ref={register} placeholder="Имя как на карте" type="text" name="cardName" />
          </div>
        </CardSection>

        <HelpInfo>
          Доставим пиццу в течение часа или вернем деньги. Артем слов на ветер не бросает.
        </HelpInfo>
        <Input
          ref={register}
          placeholder="Номер телефона"
          type="tel"
          name="phone"
          error={errors?.phone?.message}
        />
      </FormContent>

      <Footer>
        <FooterWrapper>
          <FooterInner>
            <FooterRow>
              <span>Стоимость заказа</span>
              <span>{price} руб</span>
            </FooterRow>
            <FooterRow>
              <span>Доставка</span>
              <span>{DELIVERY_COST} руб</span>
            </FooterRow>
          </FooterInner>
          <FooterResult>
            <span>К оплате</span>
            <span>{price + DELIVERY_COST} руб</span>
          </FooterResult>
          <Button
            text={`Заказать за ${price + DELIVERY_COST} руб`}
            type="submit"
            disabled={!formState.isDirty}
          />
        </FooterWrapper>
      </Footer>
    </form>
  );
};

export default Form;
