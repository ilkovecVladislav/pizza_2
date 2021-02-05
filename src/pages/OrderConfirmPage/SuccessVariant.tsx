import React, { useState, useEffect, ReactElement } from 'react';
import styled from 'styled-components';
import last from 'lodash/last';
import { useDispatch } from 'react-redux';

import OrderCard from 'components/OrderCard';
import successIcon from 'assets/icons/success.svg';
import { getOrders } from 'services/orders';
import type Order from 'services/types/Order';
import { useIngredientsArray } from '../PizzaConstructorPage/state/selectors';
import { resetPizza } from '../PizzaConstructorPage/state/reducer';
import { Label, Description } from './OrderConfirm.style';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
`;

const Success = styled.div`
  width: 51px;
  height: 51px;
  background: ${({ theme }) => theme.colors.primary.main};
  border-radius: 99px;
  position: relative;
  margin-bottom: 24px;

  &:after {
    content: '';
    position: absolute;
    width: 32px;
    height: 23px;
    background: url(${successIcon});
    background-position: center;
    background-repeat: no-repeat;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const SuccessVariant = (): ReactElement => {
  const [data, setData] = useState<Order[] | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    let isActive = true;
    getOrders()
      .then((res) => {
        if (isActive) {
          setData(res);
        }
      })
      .catch((err) => console.log(err));

    return () => {
      isActive = false;
      dispatch(resetPizza());
    };
  }, [dispatch]);

  const order = last(data);
  const ingredients = useIngredientsArray();

  return (
    <Container>
      <Success />
      <Label>Спасибо за заказ!</Label>
      <Description>Заказ успешно оплачен, ждите вашу пиццу уже через час</Description>
      {order && (
        <OrderCard
          order={order}
          ingredients={ingredients}
          date={new Date()}
          status="not-completed"
        />
      )}
    </Container>
  );
};

export default SuccessVariant;
