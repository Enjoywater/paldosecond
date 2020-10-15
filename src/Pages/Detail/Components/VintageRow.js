import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { starRating } from "../../../Components/tool/tool";

const VintageRow = ({
  iconName,
  iconList,
  handleIcon,
  detail,
  vintageSort,
}) => {
  const { feature } = detail;
  const [filterData, setFilterData] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("/Data/detailData/detailData.json")
      .then((res) => res.json())
      .then((res) => setFilterData(res.product.vintages));
  }, []);

  useEffect(() => {
    if (vintageSort === "Most popular") {
      setFilterData(filterData.sort((a, b) => b.rating - a.rating));
      setFilter(vintageSort);
    } else if (vintageSort === "Year") {
      setFilterData(filterData.sort((a, b) => b.year - a.year));
      setFilter(vintageSort);
    } else if (vintageSort === "Lowest price first") {
      setFilterData(filterData.sort((a, b) => a.price - b.price));
      setFilter(vintageSort);
    } else if (vintageSort === "Highest price first") {
      setFilterData(filterData.sort((a, b) => b.price - a.price));
      setFilter(vintageSort);
    } else if (vintageSort === "Highest user rating") {
      setFilterData(filterData.sort((a, b) => b.ratings - a.ratings));
      setFilter(vintageSort);
    }
  }, [filterData, vintageSort]);

  return (
    <Container>
      <VintageList>
        {filterData?.map((vintage, i) => (
          <Row key={i}>
            <Year>{vintage.year}</Year>
            {feature ? (
              <Feature>
                {vintage.feature
                  ? (
                      <Icon iconName={iconName} bgColor={handleIcon()}>
                        {iconList[handleIcon()]}
                      </Icon>
                    ) && <p>{vintage.feature}</p>
                  : null}
              </Feature>
            ) : null}
            <Rating>
              <Average>{Number(vintage.rating).toFixed(1)}</Average>
              <StarBox>{starRating(Number(vintage.rating).toFixed(1))}</StarBox>
              <Ratings>{vintage.ratings}ratings</Ratings>
            </Rating>
            <Purchase>Available for purchase</Purchase>
            <Price>€{vintage.price}</Price>
          </Row>
        ))}
      </VintageList>
    </Container>
  );
};

const Container = styled.div``;

const VintageList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 0;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dedede;
  padding: 10px 16px;
  text-align: center;
`;

const Year = styled.div`
  margin-right: 10px;
  padding: 0 16px;
  font-size: 20px;
`;

const Rating = styled.div`
  display: flex;
  margin-right: 10px;
  width: 33.3%;
`;

const StarBox = styled.div`
  margin-right: 10px;
`;

const Ratings = styled.div`
  font-size: 14px;
  font-weight: 300;
`;

const Average = styled.div`
  font-size: 16px;
  margin-right: 5px;
`;
const Purchase = styled.div`
  padding: 0 16px;
  width: 25%;
  font-size: 14px;
  font-weight: 400;
`;
const Price = styled.div`
  font-size: 16px;
`;

const Feature = styled.div`
  ${({ theme }) => theme.flex(null, "center")}
  padding: 0 16px;
  width: 25%;
  height: 30px;
  text-align: left;

  p {
    margin-left: 10px;
    line-height: normal;
    font-size: 13px;
  }
`;

const Icon = styled.span`
  ${({ theme }) => theme.flex("center", "center")}
  width: 24px;
  height: 24px;
  margin-left: 5px;
  border-radius: 16px;
  background-color: ${({ bgColor, iconName }) => iconName[bgColor]};
`;

export default VintageRow;
