import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import last from 'lodash/last';

import OrderCard from 'components/OrderCard';
import successIcon from 'assets/icons/success.svg';
import { getIngredients } from 'services/ingredients';
import { getOrders } from 'services/orders';
import type Order from 'services/types/Order';
import type Ingredient from 'services/types/Ingredient';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    color: ${({ theme }) => theme.colors.primary.text};
    margin-bottom: 8px;
  }

  p {
    font-size: 16px;
    line-height: 20px;
    color: ${({ theme }) => theme.colors.gray[600]};
    margin-bottom: 32px;
    text-align: center;
  }
`;

const Success = styled.div`
  width: 67px;
  height: 67px;
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

const SuccessVariant = (): JSX.Element => {
  const [data, setData] = useState<Order[] | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    getOrders()
      .then((res) => {
        setData(res);
      })
      .catch((err) => console.log(err));

    getIngredients()
      .then((res) => {
        setIngredients(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const order = last(data);

  return (
    <Container>
      <Success />
      <h3>Спасибо за заказ!</h3>
      <p>Заказ успешно оплачен, ждите вашу пиццу уже через час</p>
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
