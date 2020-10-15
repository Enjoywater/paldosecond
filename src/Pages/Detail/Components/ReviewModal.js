import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ReviewCard from "./ReviewCard";
import { CgClose } from "react-icons/cg";

const ReviewModal = ({
  visible,
  onClose,
  stars,
  reviewMenu,
  handleBorder,
  reviewList,
  clicked,
  setClicked,
  handleClick,
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

  const [filterStar, setFilterStar] = useState([]);

  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper visible={visible} onClick={onMaskClick}>
        <ModalInner>
          <Header>
            <Title>Community reviews</Title>
            <CgClose onClick={close} style={iconStyle} />
          </Header>
          <Filter>
            {[5, 4, 3, 2, 1].map((num, i) => (
              <RatingsFilter key={i} co>
                <RatingFilter noWidth>{stars(num)}</RatingFilter>
                <Counter>{num}</Counter>
              </RatingsFilter>
            ))}
          </Filter>
          {/* <Menu>
            <ul>
              {Object.keys(reviewMenu).map((menu, i) => (
                <ReviewList
                  key={i}
                  onClick={() => handleBorder(menu)}
                  selected={reviewMenu[menu]}
                >
                  {menu}
                </ReviewList>
              ))}
            </ul>
          </Menu> */}
          <Reviews>
            <CardList>
              {reviewList.length > 0 &&
                reviewList.map((review, i) => {
                  return (
                    <>
                      <ReviewCard
                        key={i}
                        clicked={clicked}
                        setClicked={setClicked}
                        handleClick={handleClick}
                        review={review}
                      />
                    </>
                  );
                })}
            </CardList>
          </Reviews>
        </ModalInner>
      </ModalWrapper>
    </>
  );
};

ReviewModal.propTypes = {
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
  width: 656px;
  max-width: 700px;
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

const Menu = styled.div`
  list-style: none;
  background-color: #fff;
  padding: 0 20px;
`;

const Reviews = styled.div`
  padding: 0 40px;
  width: 100%;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Filter = styled.div`
  display: flex;
  width: 100%;
  padding: 0 20px;
  margin-bottom: 10px;
`;

const RatingsFilter = styled.div`
  display: flex;
  margin: 10px 10px 10px 0;
  padding: 8px;
  border: 1px solid #d0d0cf;
  border-radius: 60px;
`;

const RatingFilter = styled.div`
  display: flex;
  width: ${({ noWidth }) => (noWidth ? "" : "80px")};
`;

const Counter = styled.div`
  font-size: 16px;
  font-weight: 300;
`;

const CardList = styled.div`
  width: 100%;
  padding: 0 16px;
`;

const ReviewInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const RatingInfo = styled.div`
  ${({ theme }) => theme.flex("center", null, "column")}
  margin: 0 8px;
  font-size: 13px;
`;

const StarBox = styled.div``;

const UserName = styled.div`
  margin: 4px 0;
  font-weight: bold;
`;

const ReviewDate = styled.div``;

const ReviewNote = styled.div`
  margin-top: 10px;
  font-size: 20px;
  font-weight: 300;
`;

const Icons = styled.div`
  ${({ theme }) => theme.flex(null, "center")}
  align-self: flex-end;
`;

const ReviewList = styled.li`
  display: inline-block;
  margin-bottom: 20px;
  padding: 10px;
  color: ${({ selected }) => (selected ? "black" : "#ba1628")};
  cursor: pointer;
  :nth-child(1) {
    border-bottom: 1px solid
      ${({ selected }) => (selected ? "black" : "#eae0da")};
  }
  :nth-child(2) {
    border-bottom: 1px solid
      ${({ selected }) => (selected ? "black" : "#eae0da")};
  }
  :nth-child(3) {
    border-bottom: 1px solid
      ${({ selected }) => (selected ? "black" : "#eae0da")};
  }
  :nth-child(4) {
    border-bottom: 1px solid
      ${({ selected }) => (selected ? "black" : "#eae0da")};
  }
`;

const iconStyle = {
  position: "absolute",
  width: "24px",
  height: "24px",
  right: "0",
};

export default ReviewModal;
