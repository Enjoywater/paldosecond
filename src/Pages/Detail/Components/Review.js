import React, { useState } from "react";
import styled from "styled-components";
import ReviewModal from "./ReviewModal";
import ReviewCard from "./ReviewCard";
import { starRating } from "../../../Components/tool/tool";

const Review = ({
  reviewMenu,
  handleBorder,
  detail,
  stars,
  reviewList,
  setThumbIndex,
  setReviewList,
}) => {
  const { rating, ratings, score } = detail;

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <>
      {Object.keys(detail).length > 0 && (
        <Container>
          <Title>Community reviews</Title>
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
          <ReviewRating>
            <CardList>
              {reviewList.length > 0 &&
                reviewList.map((review, i) => {
                  if (review.id < 4) {
                    return (
                      <div key={i}>
                        <ReviewCard
                          clicked={clicked}
                          setClicked={setClicked}
                          handleClick={handleClick}
                          review={review}
                          stars={stars}
                        />
                      </div>
                    );
                  }
                })}
            </CardList>
            <RatingBox>
              <RatingAvg>
                <Rating>{Number(rating).toFixed(1)}</Rating>
                <StarRating>
                  <StarBox>{starRating(Number(rating).toFixed(1))}</StarBox>
                  {ratings}rating
                </StarRating>
              </RatingAvg>
              <Seperator />
              {[5, 4, 3, 2, 1].map((num, i) => (
                <RatingsFilter key={num}>
                  <RatingFilter>{stars(num)}</RatingFilter>
                  <Bar>
                    <RatingBar
                      width={`${(Number(score[i]) / Number(ratings)) * 100}%`}
                    />
                  </Bar>
                  <Ratings></Ratings>
                  <Counter>{score[i]}</Counter>
                </RatingsFilter>
              ))}
            </RatingBox>
          </ReviewRating>
          <MoreButton onClick={openModal}>Show more reviews</MoreButton>
          {
            <ReviewModal
              visible={modalVisible}
              onClose={closeModal}
              stars={stars}
              handleBorder={handleBorder}
              reviewList={reviewList}
              reviewMenu={reviewMenu}
              clicked={clicked}
              setClicked={setClicked}
              handleClick={handleClick}
            />
          }
        </Container>
      )}
    </>
  );
};
export default Review;

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

const Menu = styled.div`
  list-style: none;
`;

const ReviewRating = styled.div`
  display: flex;
  align-items: flex-start;
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

const CardList = styled.div`
  width: 75%;
  padding: 0 16px;
`;

const Card = styled.div`
  ${({ theme }) => theme.flex("center", null, "column")}
  margin-top: 15px;
  padding: 24px 20px 8px;
  background-color: white;
  box-shadow: 0 0 6px #ebebeb;
  border-radius: 10px;
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
  ${({ theme }) => theme.flex("flex-end", "center")};
  align-self: flex-end;
  margin: 0 16px 8px 0;
  div {
    display: flex;
  }
`;

const Thumbsup = styled.div`
  display: flex;
  margin: 4px;
  text-align: center;
`;

const RatingBox = styled.div`
  width: 25%;
  padding: 0 16px;
`;

const RatingAvg = styled.div`
  ${({ theme }) => theme.flex(null, "center")};
`;

const Rating = styled.div`
  margin-right: 10px;
  font-size: 40px;
  font-weight: bold;
`;

const StarRating = styled.div`
  width: 100px;
  font-size: 12px;
  line-height: 1.1;
`;

const Seperator = styled.div`
  margin: 16px 0;
  width: 100%;
  height: 1px;
  display: block;
  background-color: #eae0da;
`;

const RatingsFilter = styled.div`
  ${({ theme }) => theme.flex("space-between")}
  margin-bottom: 5px;
`;

const RatingFilter = styled.div`
  display: flex;
  width: 80px;
  flex-direction: row-reverse;
`;

const Bar = styled.div`
  width: 124px;
  height: 16px;
  position: relative;
  background-color: #f7f3f0;
  border-radius: 2px;
  z-index: 2;
`;
const RatingBar = styled.div`
  width: ${(props) => props.width};
  height: 16px;
  position: absolute;
  background-color: #f1a90d;
  border-radius: 2px;
  z-index: 1;
`;
const Ratings = styled.div``;

const Counter = styled.div`
  font-size: 16px;
  font-weight: 300;
  width: 50px;
`;

const MoreButton = styled.button`
  margin: 16px 0 24px;
  font-size: 16px;
  color: #ba1628;
`;
