import React, { useEffect, useState, useCallback } from "react";
import styled, { css } from "styled-components";
import Sorting from "./Components/Sorting";
import ProductCard from "./Components/ProductCard";
import {
  COUNTRY,
  RATING,
  RATING_BOOL,
  REGION,
  SORTBOX_ITEM,
  STYLES,
  WINE_TYPES,
} from "./textConstant";
import { selectedBtn, selectedSortItem } from "./utils";
import { api } from "../../config/api";

const List = () => {
  const [display, setDisplay] = useState(false);
  const [products, setProducts] = useState([]);

  const [typeList, setTypeList] = useState(WINE_TYPES);
  const [regionList, setRegionList] = useState(REGION);
  const [countryList, setCountryList] = useState(COUNTRY);
  const [styleList, setStyleList] = useState(STYLES);

  const [bgBool, setBgBool] = useState(RATING_BOOL);

  const [sortTitle, setSortTitle] = useState("Highest User Rating");
  const [fetchStr, setFetchStr] = useState("-average_score");
  const [subFetchStr, setSubFetchStr] = useState("");

  const [rangeMin, setRangeMin] = useState(300);
  const [rangeMax, setRangeMax] = useState(1500);

  const handleTitle = useCallback(
    (state) => {
      let keys = selectedSortItem(state);
      return state === typeList ? keys.join(", ") : keys.join();
    },
    [typeList]
  );

  const handleSubFetchStr = useCallback(() => {
    const selectedStr = {
      type: selectedSortItem(typeList),
      region: selectedSortItem(regionList),
      country: selectedSortItem(countryList),
      style: selectedSortItem(styleList),
    };

    const strSum = (arr, str) => arr.map((item) => `&${str}=${item}`).join("");

    const strList = [
      selectedStr.type.length ? strSum(selectedStr.type, "type") : "",
      selectedStr.region.length ? strSum(selectedStr.region, "region") : "",
      selectedStr.country.length ? strSum(selectedStr.country, "country") : "",
      selectedStr.style.length ? strSum(selectedStr.style, "style") : "",
    ];
    return strList.join("");
  }, [countryList, regionList, styleList, typeList]);

  const handleApi = useCallback(() => {
    const mainFetch = fetchStr;
    const backgroundFetch = bgBool;
    const subFetch = subFetchStr;
    const priceMin = rangeMin;
    const priceMax = rangeMax;

    const abc = `${api}/products?order=${mainFetch}&rating=${
      RATING[handleTitle(backgroundFetch)]
    }${subFetch}&price_low=${priceMin}&price_high=${
      priceMax === 2300 ? 99999 : priceMax
    }`;
    return abc;
  }, [bgBool, fetchStr, handleTitle, rangeMax, rangeMin, subFetchStr]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${handleApi()}`);
      const result = await response.json();

      setProducts(result.products);
    })();
  }, [handleTitle, handleApi]);

  useEffect(() => {
    setSubFetchStr(handleSubFetchStr());
  }, [typeList, regionList, countryList, styleList, handleSubFetchStr]);

  const handleSortList = (item) => {
    setFetchStr(SORTBOX_ITEM[item]);
    setSortTitle(item);
    setDisplay(!display);
  };

  const { count = 0, result } = products;

  return (
    <Wrapper>
      <Container>
        <Title>{`Showing ${count} ${handleTitle(
          typeList
        )} alcohols between €${rangeMin} ~ €${rangeMax} rated above ${
          RATING[handleTitle(bgBool)]
        } stars`}</Title>
        <SortContainer>
          <SelectedBox>
            {selectedBtn(typeList, setTypeList)}
            {selectedBtn(regionList, setRegionList)}
            {selectedBtn(countryList, setCountryList)}
            {selectedBtn(styleList, setStyleList)}
          </SelectedBox>
          <SortTitle onClick={() => setDisplay(!display)}>
            <SortText>Sort :</SortText>
            <SortText listItem>{sortTitle}</SortText>
            <SortText rotateOn>{`>`}</SortText>
          </SortTitle>
          <SortList displayOn={display}>
            {Object.keys(SORTBOX_ITEM).map((item, i) => (
              <li key={i} onClick={() => handleSortList(item)}>
                {item}
              </li>
            ))}
          </SortList>
        </SortContainer>
        <ContentBox>
          <Sorting
            typeList={typeList}
            setTypeList={setTypeList}
            bgBool={bgBool}
            setBgBool={setBgBool}
            regionList={regionList}
            setRegionList={setRegionList}
            countryList={countryList}
            setCountryList={setCountryList}
            styleList={styleList}
            setStyleList={setStyleList}
            rangeMin={rangeMin}
            setRangeMin={setRangeMin}
            rangeMax={rangeMax}
            setRangeMax={setRangeMax}
          />
          <CardBox>
            {result?.map((el) => (
              <ProductCard key={el.id} products={el} />
            ))}
          </CardBox>
        </ContentBox>
      </Container>
    </Wrapper>
  );
};

export default List;

const Wrapper = styled.div`
  ${({ theme }) => theme.flex("center", "center")};
  width: 100%;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

const Container = styled.div`
  ${({ theme }) => theme.flex(null, null, "column")};
  width: 1216px;
  height: 100%;
`;

const Title = styled.h2`
  margin-top: 80px;
  font-size: 20px;
  font-weight: 800;
  color: ${({ theme }) => theme.themeBlack};
`;

const SortContainer = styled.div`
  ${({ theme }) => theme.flex("space-between")};
  height: auto;
  margin-top: 16px;
  position: relative;
`;

const SelectedBox = styled.div`
  overflow-wrap: break-word;
  max-width: 1000px;
`;

const sortStyle = () => css`
  width: 200px;
  font-size: 14px;
  color: #484848;
  background-color: #ffffff;
  border: 1px solid #e4e4e4;
  border-radius: 4px;
`;

const SortTitle = styled.div`
  ${sortStyle}
  ${({ theme }) => theme.flex("space-around", "center")};
  height: 40px;
  cursor: pointer;
`;

const SortText = styled.span`
  display: inline-block;
  width: ${({ listItem }) => listItem && "123px"};
  transform: ${({ rotateOn }) => (rotateOn ? "rotate(90deg)" : "")};
`;

const SortList = styled.ul`
  ${sortStyle}
  display: ${({ displayOn }) => (displayOn ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  padding: 20px 16px;
  position: absolute;
  top: 50px;
  right: 0;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  li {
    display: flex;
    align-items: center;
    height: 24px;
    cursor: pointer;

    :hover {
      background-color: #f3f3f3;
    }
  }
`;

const ContentBox = styled.div`
  ${({ theme }) => theme.flex("space-between")};
  margin-top: 16px;
`;

const CardBox = styled.div`
  display: flex;
  flex-direction: column;
`;
