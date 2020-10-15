import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import VintageRow from "./VintageRow";
import { CgClose } from "react-icons/cg";

const VintageModal = ({
  visible,
  onClose,
  detail,
  iconName,
  iconList,
  handleIcon,
  vintageSort,
  display,
  options,
  handleSortList,
  setDisplay,
  sortedVintage,
}) => {
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  const close = (e) => {
    if (onClose) {
      onClose(e);
    }
  };

  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper visible={visible} onClick={onMaskClick}>
        <ModalInner>
          <Header>
            <Title>Compare Vintages</Title>
            <CgClose onClick={close} style={iconStyle} />
          </Header>
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
            sortedVintage={sortedVintage}
            display={display}
          />
        </ModalInner>
      </ModalWrapper>
    </>
  );
};

export default VintageModal;

VintageModal.propTypes = {
  visible: PropTypes.bool,
};

const ModalOverlay = styled.div`
  pointer-events: ${({ visible }) => (visible ? "initial" : "none")};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: all 0.25s ease-in;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalWrapper = styled.div`
  pointer-events: ${({ visible }) => (visible ? "initial" : "none")};
  transform: translateY(${({ visible }) => (visible ? "0" : "700px")});
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: all 0.25s ease-in;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  outline: 0;
  z-index: 1000;
`;

const ModalInner = styled.div`
  ${({ theme }) => theme.flex(null, null, "column")};
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px #ebebeb;
  background-color: white;
  border-radius: 10px;
  width: 70%;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 20px;
  height: 90vh;
`;

const Header = styled.div`
  display: flex;
  position: relative;
  background-color: #fff;
`;

const Title = styled.h2`
  margin-bottom: 40px;
  padding: 0 20px;
  font-size: 28px;
  font-weight: bold;
`;

const DropDown = styled.div`
  position: relative;
`;
const iconStyle = {
  position: "absolute",
  width: "24px",
  height: "24px",
  right: "0",
};

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
