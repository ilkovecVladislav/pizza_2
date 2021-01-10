import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import styled from 'styled-components';

import RadioButtonGroupField from 'components/Form/RadioButtonGroupField';
import IngredientCheckbox from 'components/Form/IngredientCheckbox';
import { loadIngredients, setPizza } from './state/reducer';
import { useIngredients, useIsIngredientsLoading } from './state/selectors';
import Header from './Header';
import Pizza from './Pizza';
import PizzaDescription from './PizzaDescription';
import { PIZZA_SIZES, DOUGH } from './constants';
import useCalculatePizzaPrice from './priceCalcHooks';
import type { FormValues } from './types';

const Container = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  overflow-x: auto;
  flex-grow: 1;
`;

const Content = styled.div`
  padding: 0 16px;
`;

const PizzaName = styled.h4`
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: #1f1f33;
  margin-bottom: 4px;
`;

const PizzaParamsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const SauceWrapper = styled.div`
  margin-bottom: 24px;
`;

const Row = styled.div`
  margin-bottom: 24px;

  & > .label {
    display: block;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;

    margin-bottom: 10px;
    color: #4b4b7c;
  }

  .items {
    display: flex;
    overflow-y: auto;

    & > div {
      margin-right: 8px;
    }
    & > div:last-child {
      margin-right: 0;
    }
  }
`;

const SubmitWrapper = styled.div`
  background: #ffffff;
  box-shadow: 0px -16px 32px rgba(75, 75, 124, 0.05), 0px 0px 4px rgba(75, 75, 124, 0.1);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  .submit {
    padding: 12px 16px;
    height: 40px;
    width: 328px;
    background: #00a896;
    border-radius: 16px;
    border: none;
    font-weight: 800;
    font-size: 16px;
    line-height: 16px;
    color: #ffffff;
  }
`;

const PizzaConstructor = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadIngredients());
  }, [dispatch]);

  const { register, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      size: 'medium',
      dough: 'thin',
      cheese: [],
      vegetables: [],
      meat: [],
    },
  });

  const formValues = watch();

  const allIngredients = useIngredients();

  const { cheese = [], vegetables = [], sauces = [], meat = [] } = allIngredients;

  const price = useCalculatePizzaPrice({
    selectedIngredients: formValues,
    sauces,
    meat,
    cheese,
    vegetables,
  });

  const handleOrderClick = handleSubmit(() => {
    dispatch(setPizza(formValues));
    history.push('/order-checkout');
  });

  const normalizedSauces = reduce(
    sauces,
    (acc, cur) => ({ ...acc, [cur.slug]: { ...cur, label: cur.name } }),
    {},
  );

  const isLoadingIngredients = useIsIngredientsLoading();

  if (isLoadingIngredients) {
    return <span>Loading</span>;
  }

  return (
    <Container>
      <Wrapper>
        <Header />
        <Pizza data={formValues} />
        <Content>
          <PizzaName>Pepperoni</PizzaName>
          <PizzaDescription data={formValues} />
          <form>
            <PizzaParamsWrapper>
              <RadioButtonGroupField
                label="Размер"
                name="size"
                ref={register}
                options={PIZZA_SIZES}
              />
              <RadioButtonGroupField label="Тесто" name="dough" ref={register} options={DOUGH} />
            </PizzaParamsWrapper>
            <SauceWrapper>
              <RadioButtonGroupField
                label="Выберите соус"
                name="sauce"
                ref={register}
                options={normalizedSauces}
              />
            </SauceWrapper>
            <Row>
              <span className="label">Добавьте сыр</span>
              <div className="items">
                {map(cheese, (option) => (
                  <IngredientCheckbox
                    key={option.id}
                    name="cheese"
                    option={option}
                    ref={register}
                  />
                ))}
              </div>
            </Row>
            <Row>
              <span className="label">Добавьте овощи</span>
              <div className="items">
                {map(vegetables, (option) => (
                  <IngredientCheckbox
                    key={option.id}
                    name="vegetables"
                    option={option}
                    ref={register}
                  />
                ))}
              </div>
            </Row>
            <Row>
              <span className="label">Добавьте мясо</span>
              <div className="items">
                {map(meat, (option) => (
                  <IngredientCheckbox key={option.id} name="meat" option={option} ref={register} />
                ))}
              </div>
            </Row>
          </form>
        </Content>
      </Wrapper>
      <SubmitWrapper>
        <button className="submit" type="button" onClick={handleOrderClick}>
          Заказать за {price} руб
        </button>
      </SubmitWrapper>
    </Container>
  );
};

export default PizzaConstructor;
