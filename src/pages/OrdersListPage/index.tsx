import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import arrowIcon from 'assets/icons/left-arrow.svg';
import { getOrders } from 'services/orders';
import { getIngredients } from 'services/ingredients';
import type Order from 'services/types/Order';
import type Ingredient from 'services/types/Ingredient';
import OrderCard from 'components/OrderCard';

const Header = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 8px;
  background: #fff;
  margin-bottom: 16px;

  h2 {
    font-weight: 800;
    font-size: 20px;
    line-height: 28px;
    color: #1f1f33;
  }

  button {
    width: 40px;
    height: 40px;
    border: none;
    background: transparent;
    position: relative;
    cursor: pointer;
    margin-right: 4px;

    &:before {
      content: '';
      position: absolute;
      width: 15px;
      height: 10px;
      background: url(${arrowIcon});
      background-position: center;
      background-repeat: no-repeat;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const Container = styled.div`
  padding: 0 16px 16px;

  & > div {
    margin-bottom: 8px;
  }

  & > div:last-child {
    margin-bottom: 0;
  }
`;

const getDate = (step: number): Date => {
  const baseDate = new Date();
  const newDate = new Date();
  newDate.setDate(baseDate.getDate() + step * 2);

  return newDate;
};

const OrdersList = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Order[] | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    setIsLoading(true);

    getOrders()
      .then((res) => {
        setData(res);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));

    getIngredients()
      .then((res) => {
        setIngredients(res);
      })
      .catch((err) => console.log(err));
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header>
        <Link to="/home">
          <button type="button" />
        </Link>
        <h2>Мои заказы</h2>
      </Header>
      {data && (
        <Container>
          {data.reverse().map((item, index) => (
            <OrderCard
              key={item.id}
              order={item}
              ingredients={ingredients}
              date={getDate(index)}
              status={index === 0 ? 'not-completed' : 'completed'}
            />
          ))}
        </Container>
      )}
    </div>
  );
};

export default OrdersList;
