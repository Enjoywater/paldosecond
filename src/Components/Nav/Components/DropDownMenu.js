import React from "react";
import styled from "styled-components";
import { BiUpArrow } from "react-icons/bi";
import {
  GiCow,
  GiSheep,
  GiGoat,
  GiPig,
  GiRam,
  GiChicken,
  GiMushrooms,
  GiMeat,
  GiCheeseWedge,
  GiNoodles,
  GiChiliPepper,
  GiAlmond,
  GiFriedFish,
  GiSalmon,
  GiSwirledShell,
  GiFruitTree,
} from "react-icons/gi";
import { FaCocktail, FaCheese } from "react-icons/fa";
import { withRouter } from "react-router-dom";

function DropDownMenu({ category, history }) {
  return (
    <DropDownWrap>
      <BiUpArrow
        style={{
          position: "absolute",
          top: "-12px",
          fill: "red",
          padding: "0px 20px",
          zIndex: "50",
        }}
      />
      <DropBodyWrap>
        {category.subcategory?.map((sub, idx) => {
          return (
            <DropBody key={idx}>
              <ul>
                {sub?.map((subsub) => {
                  const { id, style, icon, name } = subsub;
                  return (
                    <li
                      key={id}
                      style={style && styles}
                      onClick={() => history.push("/list")}
                    >
                      {icon && SubIcons[id - 1]}
                      {name}
                    </li>
                  );
                })}
              </ul>
            </DropBody>
          );
        })}
      </DropBodyWrap>
      <DropBannerWrap>
        <Banner>
          {category.banner.map((el, idx) => {
            return (
              <BannerWrap key={idx}>
                <BannerImg alt={el.alt} src={el.img}></BannerImg>
                <BannerText>{el.text}</BannerText>
              </BannerWrap>
            );
          })}
        </Banner>
      </DropBannerWrap>
      <DropFootWrap>
        <DropFoot>Browse all wines</DropFoot>
      </DropFootWrap>
    </DropDownWrap>
  );
}

export default withRouter(DropDownMenu);

const iconStyle = {
  width: "28px",
  height: "24px",
};

const styles = {
  fontSize: "18px",
  fontWeight: "400",
  color: "#1d1d1d",
};

const SubIcons = [
  <GiCow style={iconStyle} />,
  <GiGoat style={iconStyle} />,
  <GiSheep style={iconStyle} />,
  <GiPig style={iconStyle} />,
  <GiRam style={iconStyle} />,
  <GiChicken style={iconStyle} />,
  <GiMushrooms style={iconStyle} />,
  <GiMeat style={iconStyle} />,
  <FaCheese style={iconStyle} />,
  <GiCheeseWedge style={iconStyle} />,
  <GiCheeseWedge style={iconStyle} />,
  <GiNoodles style={iconStyle} />,
  <GiChiliPepper style={iconStyle} />,
  <FaCocktail style={iconStyle} />,
  <GiAlmond style={iconStyle} />,
  <GiFriedFish style={iconStyle} />,
  <GiSalmon style={iconStyle} />,
  <GiSwirledShell style={iconStyle} />,
  <GiFruitTree style={iconStyle} />,
];

const DropDownWrap = styled.div`
  position: absolute;
  width: 724px;
  height: auto;
  top: 54px;
  padding: 16px 32px;
  margin-top: 16px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 6px 20px 6px rgba(50, 50, 50, 0.15);
  z-index: 10000;
`;

const DropBodyWrap = styled.div`
  width: 100%;
  height: 60%;
  margin: 16px 0;
  ${({ theme }) => theme.flex("center", "flex-start", "row")}
`;

const DropBody = styled.div`
  flex: 1;
  height: 100%;

  ul {
    font-size: 18px;
    font-weight: 400;
    color: #1d1d1d;
    ${({ theme }) => theme.flex("center", "flex-start", "column")}
  }

  li {
    line-height: normal;
    font-weight: 300;
    min-height: 32px;
    padding: 4px 0;
    font-size: 16px;

    :hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

const DropBannerWrap = styled.div`
  width: 100%;
  height: 30%;
  ${({ theme }) => theme.flex("center", "center", "row")}
`;

const Banner = styled.div`
  flex: 1;
  height: 100%;
  ${({ theme }) => theme.flex("space-between", "center", "row")}
`;

const DropFootWrap = styled.div`
  height: 10%;
  flex: 1;
  margin: 16px 0 0;
  ${({ theme }) => theme.flex("flex-start", "center", "row")}
`;

const DropFoot = styled.div`
  font-size: 13px;
  line-height: 1.53846;
  color: #111;

  :hover {
    color: #a11122;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const BannerWrap = styled.div`
  width: 322px;
  height: 70px;
  max-height: 70px;
  overflow: hidden;
  text-decoration: none;
  background-color: #f7f3f0;
  border-radius: 4px;
  ${({ theme }) => theme.flex("flex-start", "center", "row")}
  flex-wrap: nowrap;
`;

const BannerImg = styled.img`
  height: 70px;
  min-width: 55px;

  :hover {
    transform: scale(1.2);
    transition: all 0.5s;
  }
`;

const BannerText = styled.div`
  padding: 0 16px;
  min-width: 267px;
  line-height: 18px;
  font-size: 16px;
  font-weight: 400;

  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
