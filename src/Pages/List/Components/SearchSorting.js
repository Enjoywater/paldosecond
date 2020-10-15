import React from "react";
import styled from "styled-components";
import { ItemBox, TitleBox, Title } from "../styles";
import { selectedBtn, unSelectedBtn } from "../utils";

const SearchSorting = ({
  countryList,
  setCountryList,
  regionList,
  setRegionList,
  styleList,
  setStyleList,
}) => {
  const renderComponents = {
    COUNTRY: [countryList, setCountryList],
    REGION: [regionList, setRegionList],
    STYLES: [styleList, setStyleList],
  };
  const renderKeys = Object.keys(renderComponents);
  const renderVals = Object.values(renderComponents);
  return (
    <>
      {renderKeys.map((key, i) => (
        <TypeRender
          key={i}
          title={key}
          state={renderVals[i][0]}
          setState={renderVals[i][1]}
        />
      ))}
    </>
  );
};

export default SearchSorting;

const TypeRender = ({ title, state, setState }) => (
  <ItemBox>
    <TitleBox>
      <Title>{title}</Title>
    </TitleBox>
    <TypeBox>
      {selectedBtn(state, setState)}
      {unSelectedBtn(state, setState)}
    </TypeBox>
  </ItemBox>
);

const TypeBox = styled.div`
  width: 400px;
  height: 136px;
  padding-top: 10px;
  overflow: scroll;
`;
