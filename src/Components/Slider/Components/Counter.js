import React, { useState } from "react";
import styled from "styled-components";
import { Btn } from "../../tool/tool";
import { api } from "../../../config/api";

function Counter({ price, product, idx }) {
  const [count, setCount] = useState(6);
  const [index, setIdx] = useState(0);

  const AddToCart = () => {
    console.log(product.id);
    console.log(count);
    fetch(api + "/orders/carts", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        vintage_id: product.id,
        quantity: count,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          alert("상품이 장바구니에 추가되었습니다.");
        }
      });
  };

  const minusCount = () => {
    count !== 1 ? setCount(count - 1) : setCount(1);
  };

  const plusCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <SlideBottom>
        <Price>€{Number(price).toLocaleString()}</Price>
        <CounterWrap>
          <QtyCounter>
            <Minus onClick={minusCount}>-</Minus>
            <Count>{count}</Count>
            <Plus onClick={plusCount}>+</Plus>
          </QtyCounter>
          <AddCartBtn onClick={AddToCart} />
        </CounterWrap>
      </SlideBottom>
    </div>
  );
}

export default Counter;

const SlideBottom = styled.div`
  width: 250px;
  line-height: 100%;
  padding: 16px;
  height: 112px;
`;

const Price = styled.div`
  font-size: 20px;
  line-height: normal;
  font-weight: 900;
  margin-top: 8px;
`;

const CounterWrap = styled.div`
  margin-top: 8px;
  ${({ theme }) => theme.flex("space-between", "center", "row")}
`;

const QtyCounter = styled.div`
  border: solid 1px #e4e4e4;
  flex-basis: 60%;
  height: 40px;
  font-size: 13px;
  line-height: 1.53846;
  color: #111;
  border-radius: 4px;
  ${({ theme }) => theme.flex("center", "center", "row")}
`;

const Minus = styled.div`
  font-size: 38px;
  font-weight: 300;
  max-width: 40px;
  flex: 1;
  text-align: center;
  cursor: pointer;
  border-right: solid 1px #e4e4e4;
`;

const Count = styled.div`
  font-size: 14px;
  font-weight: 400;
  flex: 1;
  text-align: center;
`;

const Plus = styled.div`
  font-size: 24px;
  font-weight: 300;
  max-width: 40px;
  flex: 1;
  text-align: center;
  cursor: pointer;
  border-left: solid 1px #e4e4e4;
`;

const AddCartBtn = styled(Btn)`
  height: 40px;
  background-color: #02a78b;
  background-repeat: no-repeat;
  background-position: center;
  border: 1px solid #02a78b;
  color: #ffffff;
  background-image: url("/images/addcart.png");
  background-size: 25px 23px;
  flex-basis: 35%;
  transition: all 0.25s ease;
`;
