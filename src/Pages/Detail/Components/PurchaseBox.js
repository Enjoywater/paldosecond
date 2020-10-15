import React, { useState } from "react";
import styled from "styled-components";
import { Btn } from "../../../Components/tool/tool";
import { RiShoppingCart2Line } from "react-icons/ri";
import { FiTruck } from "react-icons/fi";
import { BiStore } from "react-icons/bi";

const PurchaseBox = ({ detail }) => {
  const [quantity, setQuantity] = useState(6);
  const { percentage, price, merchant, editor_note } =
    Object.keys(detail) && detail;

  const discountCalc = (price, percent) => {
    return parseInt(price * 1 * (1 - percent * 0.01 * 1));
  };

  const priceCalc = (quantity, price) => {
    return quantity * 1 * (price * 1);
  };

  const freeDeliveryCalc = (quantity, price) => {
    return 250 - quantity * 1 * (price * 1);
  };

  const AddToCart = () => {
    fetch(`http://10.58.3.209:8000/orders/carts`, {
      method: "POST",
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyfQ.Qq0oXYANstjhyDGnyKR658yxUNeE4R36ERuodLf0aMk",
      },
      body: JSON.stringify({
        vintage_id: detail.id,
        quantity: quantity,
      }),
    });
  };

  return (
    <>
      {Object.keys(detail) && (
        <Box>
          {editor_note ? (
            <EditorPick>
              <span>EDITOR'S PICK</span>
              <span>- SAVE 20%</span>
            </EditorPick>
          ) : null}
          <Purchase>
            <PricePerBottle>
              {percentage === null ? (
                <Price>
                  <BottlePrice>€{price}</BottlePrice>
                </Price>
              ) : (
                <Price>
                  <SalePrice>
                    €{percentage ? discountCalc(price, percentage) : price}
                  </SalePrice>
                  <DiscountPrice>€{price}</DiscountPrice>
                </Price>
              )}
              <p>Price is per bottle</p>
            </PricePerBottle>
            <SelectQuantity>
              <PlusMinusButton
                topLeft="4px"
                bottomLeft="4px"
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              >
                -
              </PlusMinusButton>
              <Quantity>{quantity}</Quantity>
              <PlusMinusButton
                topRight="4px"
                bottomRight="4px"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </PlusMinusButton>
            </SelectQuantity>
            <CartButton onClick={AddToCart}>Add to cart</CartButton>
          </Purchase>
          <Policies>
            <Policy>
              <RiShoppingCart2Line style={{ width: "30px" }} />
              <p>
                {priceCalc(quantity, price) >= 250
                  ? `You have FREE shipping from ${merchant}. Are you getting the most of it ?`
                  : `Free shipping for orders of 9 bottles or more, or over ${freeDeliveryCalc(
                      quantity,
                      price
                    ).toFixed(2)}`}
              </p>
            </Policy>
            <Policy>
              <FiTruck style={{ width: "30px" }} />
              <p>Estimated between Wed, Oct 07 and Thu, Oct 08</p>
            </Policy>
            <Policy>
              <BiStore style={{ width: "30px" }} />
              <p>Sold by {merchant}</p>
            </Policy>
          </Policies>
        </Box>
      )}
    </>
  );
};

export default PurchaseBox;

const Box = styled.div`
  /* ${({ theme }) => theme.flex(null, null, "column")} */
  width: 33%;
  box-shadow: 0 0 10px #ebebeb;
`;

const EditorPick = styled.div`
  padding-top: 15px;
  height: 50px;
  background-color: #333;
  color: #dba969;
  font-size: 16px;
  text-align: center;
  span {
    &:last-child {
      color: white;
    }
  }
`;

const Purchase = styled.div`
  ${({ theme }) => theme.flex(null, "center", "column")}
  padding: 24px;
  background-color: white;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const PricePerBottle = styled.div`
  ${({ theme }) => theme.flex(null, null, "column")}
  align-self: flex-start;
  p {
    margin-bottom: 32px;
  }
`;

const Price = styled.div`
  ${({ theme }) => theme.flex(null, "center")}
  margin-bottom: 8px;
  p {
    font-size: 12px;
  }
`;

const BottlePrice = styled.div`
  font-size: 40px;
`;

const SalePrice = styled.div`
  margin-right: 16px;
  font-size: 40px;
`;

const DiscountPrice = styled.div`
  font-size: 24px;
  text-decoration: line-through;
`;

const SelectQuantity = styled.div`
  margin-bottom: 20px;
  display: flex;
`;

const CartButton = styled(Btn)`
  width: 100%;
  height: 40px;
  background-color: #028e76;
  color: white;
  font-size: 16px;
  &:hover {
    background-color: #19ca92;
  }
`;

const PlusMinusButton = styled.button`
  padding: 0 13px;
  border-top-left-radius: ${(props) => props.topLeft || 0};
  border-bottom-left-radius: ${(props) => props.bottomLeft || 0};
  border-top-right-radius: ${(props) => props.topRight || 0};
  border-bottom-right-radius: ${(props) => props.bottomRight || 0};
  border: 1px solid #e6e3e3;
  font-size: 26px;
`;

const Quantity = styled.div`
  width: 255px;
  padding: 7px 130px 0 130px;
  border: 1px solid #e6e3e3;
  font-size: 14px;
  text-align: center;
  font-size: 14px;
`;

const Policies = styled.div`
  padding-left: 16px;
  background-color: white;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const Policy = styled.div`
  display: flex;
  /* 추가 margin-bottom: 10px; */
  padding-bottom: 12px;
  p {
    margin-left: 5px;
  }
`;
