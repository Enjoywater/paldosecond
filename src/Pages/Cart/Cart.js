import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { api } from "../../config/api";
import CartItem from "./Components/CartItem";
import { TITLE_TEXT } from "./textConstant";

const Cart = () => {
  const [cartList, setCartList] = useState({});
  const fetchFunc = () => {
    fetch(`${api}/orders/carts`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const temp = {};
        result.cart_list.result.map((item) => (temp[item.id] = item));
        setCartList(temp);
      });
  };

  const handleQuantity = (id, quantity, str) => {
    fetch(`${api}/orders/carts`, {
      method: "PATCH",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        id,
        quantity: str === "plus" ? quantity + 1 : quantity - 1,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setCartList({
          ...cartList,
          [id]: {
            ...cartList[id],
            quantity: result.patch.after_quantity,
          },
        });
      });
  };

  const handleDelete = (id) => {
    fetch(`${api}/orders/carts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.message === "CART DO NOT EXIST") {
          alert("❗️오류가 발생했습니다.");
        } else {
          alert("상품이 삭제되었습니다.");
          window.location.reload();
        }
      });
  };
  useEffect(fetchFunc, []);

  return (
    <Wrapper>
      <Container>
        <TitleBox>
          {TITLE_TEXT.map((text, i) => (
            <Title key={i} idx={i}>
              {text}
            </Title>
          ))}
        </TitleBox>
        <CartItem
          cartList={cartList}
          handleQuantity={handleQuantity}
          handleDelete={handleDelete}
        />
      </Container>
    </Wrapper>
  );
};

export default Cart;

const Wrapper = styled.div`
  ${({ theme }) => theme.flex("center", "center")};
  background-color: #f7f3f0;
`;

const Container = styled.div`
  ${({ theme }) => theme.flex(null, null, "column")};
  width: 1216px;
  margin: 44px 0;
`;

const TitleBox = styled.div`
  ${({ theme }) => theme.flex("space-between", "center")}
  height: 15px;
  margin-bottom: 10px;
  padding: 0 30px;
`;

const Title = styled.span`
  display: inline-block;
  width: ${({ idx }) => (idx === 0 ? "576px" : "")};
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.themeBlack};
`;
