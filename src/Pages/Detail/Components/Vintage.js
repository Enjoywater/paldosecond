import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import VintageModal from "./VintageModal";
import VintageRow from "./VintageRow";
import { starRating } from "../../../Components/tool/tool";

const Vintage = ({ detail, iconList, iconName, stars, filters, setDetail }) => {
  const { feature, vintages } = detail;

  const [vintageSort, setVintageSort] = useState("Year");
  const [vintageValue, setVintageValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [sortedVintage, setSortedVintage] = useState([]);
  const [display, setDisplay] = useState(false);

  const handleIcon = () => {
    return Object.keys(iconList).filter((item) => feature.indexOf(item) !== -1);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSortList = (option) => {
    setVintageSort(option.label);
    setDisplay(!display);
    setVintageValue(option.value);
  };

  return (
    <>
      {Object.keys(detail).length > 0 && (
        <Container>
          <Title>Compare Vintages</Title>
          <SubTitle>
            Which Gérard Bertrand Domaine de L'Aigle Chardonnay Limoux vintage
            is the best to drink now?
          </SubTitle>

          <DropDown>
            <SortContainer>
              <SortTitle onClick={() => setDisplay(!display)}>
                <SortText listItem>{vintageSort}</SortText>
                <SortText rotateOn>{`>`}</SortText>
              </SortTitle>
              <SortList displayOn={display}>
                {options?.map((option, i) => (
                  <li key={i} onClick={() => handleSortList(option)}>
                    {option.label}
                  </li>
                ))}
              </SortList>
            </SortContainer>
          </DropDown>

          <VintageRow
            detail={detail}
            iconName={iconName}
            iconList={iconList}
            handleIcon={handleIcon}
            vintageSort={vintageSort}
            display={display}
          />
          <ShowButton onClick={openModal}>Show All</ShowButton>
          <VintageModal
            detail={detail}
            iconName={iconName}
            iconList={iconList}
            handleIcon={handleIcon}
            visible={modalVisible}
            onClose={closeModal}
            vintageSort={vintageSort}
            handleSortList={handleSortList}
            options={options}
            setDisplay={setDisplay}
            display={display}
            sortedVintage={sortedVintage}
          />
        </Container>
      )}
    </>
  );
};

export default Vintage;

const Container = styled.div`
  margin: 0 auto;
  padding-top: 112px;
  width: 1216px;
`;
const Title = styled.div`
  margin: 0px 0px 24px;
  font-size: 28px;
  font-weight: bold;
`;

const SubTitle = styled.div`
  margin: 16px 0;
  font-size: 20px;
  font-weight: 300;
`;

const DropDown = styled.div`
  position: relative;
`;

const ShowButton = styled.button`
  display: inline-block;
  margin: 24px 0;
  color: #ba1628;
  font-size: 16px;
`;

const SortContainer = styled.div`
  display: flex;
  height: 40px;
  margin-top: 16px;
  position: relative;
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
  height: 100%;
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

const options = [
  { label: "Year", value: "year" },
  { label: "Most popular", value: "popular" },
  { label: "Highest user rating", value: "highRating" },
  { label: "Lowest price first", value: "lowPrice" },
  { label: "Highest price first", value: "highPrice" },
];
