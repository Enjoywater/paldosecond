import React from "react";
import styled from "styled-components";
import { Range } from "rc-slider";
import SearchSorting from "./SearchSorting";
import { RATING } from "../textConstant";
import { ItemBox, TitleBox, Title, TypeBtn } from "../styles";
import { starRating } from "../../../Components/tool/tool";
import { handlePlace } from "../utils";
import "rc-slider/assets/index.css";

const Sorting = ({
  typeList,
  setTypeList,
  bgBool,
  setBgBool,
  regionList,
  setRegionList,
  countryList,
  setCountryList,
  styleList,
  setStyleList,
  rangeMin,
  setRangeMin,
  rangeMax,
  setRangeMax,
}) => {
  const handleChecked = (key) => {
    setBgBool({
      "Rare & extraordinary": false,
      "Very good stuff": false,
      "Good stuff": false,
      Average: false,
      [key]: true,
    });
  };

  const RATING_KEYS = Object.keys(RATING);
  const RATING_VALS = Object.values(RATING);
  return (
    <div>
      <ItemBox>
        <TitleBox>
          <Title>Wine Types</Title>
          <Text>Select multiple</Text>
        </TitleBox>
        <TypeBox>
          {Object.keys(typeList).map((type, i) => {
            return (
              <TypeBtn
                key={i}
                fixWidth
                clicked={typeList[type]}
                onClick={() => handlePlace(type, typeList, setTypeList)}
              >
                {type}
              </TypeBtn>
            );
          })}
        </TypeBox>
      </ItemBox>
      <ItemBox>
        <TitleBox>
          <Title>Price Range</Title>
        </TitleBox>
        <Price>
          <Text>{`€ ${rangeMin}`}</Text>
          <Text>{`€ ${
            rangeMax === 2300 ? `${rangeMax} +` : `${rangeMax}`
          }`}</Text>
        </Price>
        <RangeBox>
          <Range
            {...slideSetting}
            onAfterChange={(e) => {
              setRangeMin(e[0]);
              setRangeMax(e[1]);
            }}
          />
        </RangeBox>
      </ItemBox>
      <ItemBox>
        <TitleBox>
          <Title>Vivino User Rating</Title>
        </TitleBox>
        <StarList>
          {Array(4)
            .fill(2)
            .map((item, i) => (
              <li key={i}>
                <CheckContainer onClick={() => handleChecked(RATING_KEYS[i])}>
                  <CheckCircle
                    type="checkbox"
                    bgColor={bgBool[RATING_KEYS[i]]}
                  />
                </CheckContainer>
                <StarBox>{starRating(RATING_VALS[i])}</StarBox>
                <StarText bold>{RATING_VALS[i].toFixed(1)}</StarText>
                <StarText>{RATING_KEYS[i]}</StarText>
              </li>
            ))}
        </StarList>
      </ItemBox>
      <SearchSorting
        regionList={regionList}
        setRegionList={setRegionList}
        countryList={countryList}
        setCountryList={setCountryList}
        styleList={styleList}
        setStyleList={setStyleList}
      />
    </div>
  );
};

export default Sorting;

const slideSetting = {
  defaultValue: [300, 1500],
  min: 0,
  max: 2300,
  railStyle: {
    backgroundColor: "#E9E9E9",
  },
  trackStyle: [
    {
      backgroundColor: "#BB1629",
    },
  ],
  handleStyle: [
    {
      backgroundColor: "#bb1629",
      border: "1px solid white",
    },
    {
      backgroundColor: "#bb1629",
      border: "1px solid white",
    },
  ],
};

const Text = styled.span`
  font-size: 13px;
  font-weight: 300;
`;

const TypeBox = styled.div`
  ${({ theme }) => theme.flex("space-between")};
  flex-wrap: wrap;
  height: 100px;
`;

const Price = styled.div`
  ${({ theme }) => theme.flex("space-between")};
`;

const RangeBox = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
  position: relative;
`;

const StarList = styled.ul`
  ${({ theme }) => theme.flex("space-between", null, "column")};

  li {
    ${({ theme }) => theme.flex("space-between", "center")};
    width: 320px;
    margin-bottom: 4px;
  }
`;

const CheckContainer = styled.div`
  ${({ theme }) => theme.flex("center", "center")}
  width: 22px;
  height: 22px;
  border: 1px solid #bfbfbf;
  border-radius: 11px;
  cursor: pointer;
`;

const CheckCircle = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 7px;
  background-color: ${({ bgColor }) => (bgColor ? "#A41323" : "white")};
`;

const StarBox = styled.div`
  ${({ theme }) => theme.flex("space-around")};
  width: 80px;
`;

const StarText = styled.span`
  width: ${({ bold }) => (bold ? "22px" : "150px")};
  font-size: 13px;
  font-weight: ${({ bold }) => (bold ? 700 : 400)};
  color: ${({ theme }) => theme.themeBlack};
`;
