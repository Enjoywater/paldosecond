import React, { useState } from "react";
import styled from "styled-components";
import { starRating } from "../../../Components/tool/tool";
import { RiThumbUpLine, RiThumbUpFill, RiChat3Line } from "react-icons/ri";
import { BsStarFill } from "react-icons/bs";
const ReviewCard = ({ reviewMenu, handleBorder, review, stars }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <Container>
      <ReviewRating>
        <CardList>
          <Card>
            <ReviewInfo>
              <UserImg src={review.src} />
              <RatingInfo>
                <StarBox>
                  {starRating(Number(review.rating), "#f1a90d")}
                </StarBox>

                <UserName>{review.userName}</UserName>
                <ReviewDate>{review.reviewDate}</ReviewDate>
              </RatingInfo>
            </ReviewInfo>
            <ReviewNote>
              <p>{review.reviewNote}</p>
            </ReviewNote>
            <Icons>
              <Thumbsup>
                {!clicked ? (
                  <div onClick={() => handleClick()}>
                    <RiThumbUpLine style={{ marginRight: "4px" }} />
                    {review.thumbsUp}
                  </div>
                ) : (
                  <div onClick={() => handleClick()}>
                    <RiThumbUpFill style={{ marginRight: "4px" }} />
                    {Number(review.thumbsUp) + 1}
                  </div>
                )}
              </Thumbsup>
              <RiChat3Line style={{ marginRight: "4px" }} />
              {review.chat}
            </Icons>
          </Card>
        </CardList>
      </ReviewRating>
    </Container>
  );
};

export default ReviewCard;

const Container = styled.div``;

const ReviewRating = styled.div`
  display: flex;
  align-items: flex-start;
`;

const CardList = styled.div`
  width: 100%;
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
