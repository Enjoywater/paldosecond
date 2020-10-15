import React, { useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { starRating } from "../tool/tool";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Counter from "./Components/Counter";

const Slider = ({ products, x, setX, title, history }) => {
  // const [productLength, changeLength] = useState(products.length);
  const slideLength = 534;
  const goRight = (titleName) => {
    // x[titleName] === 0
    //   ? setX({ ...x, [titleName]: -107 * (products.length - 1) })
    // : setX({ ...x, [titleName]: x[titleName] + 535 });
    setX({ ...x, [titleName]: x[titleName] - slideLength });
    // setX({ ...x, [titleName]: x[titleName] + 107 * productLength });
  };

  const goLeft = (titleName) => {
    // x[titleName] === -535 * (products.length - 1)
    //   ?
    // : setX({ ...x, [titleName]: x[titleName] - 535 });
    setX({ ...x, [titleName]: x[titleName] + slideLength });
    //   setX({ ...x, [titleName]: x[titleName] - 107 * productLength });
    // }
  };

  return (
    <RelativeWrap>
      {/* {console.log(productLength)} */}
      <SliderWrap>
        {products?.map((product, idx) => {
          const {
            id,
            rating,
            ratings,
            wine_name,
            image_url,
            winery,
            region,
            nation,
            price,
          } = product;
          return (
            <Slide key={idx} style={{ transform: `translateX(${x[title]}%)` }}>
              <SlideTop>
                <TopLeft>
                  <Score>{rating.toFixed(1)}</Score>
                  <Star>{starRating(rating)}</Star>
                  <RatingCtn>{ratings} ratings</RatingCtn>
                </TopLeft>
                <TopRight>
                  <WineImg
                    onClick={() => history.push(`/detail/${id}`)}
                    alt={wine_name}
                    src={image_url}
                  ></WineImg>
                </TopRight>
              </SlideTop>
              <SlideMid>
                <TitleWrap>
                  <Winery>{winery}</Winery>
                  <WineName>{wine_name}</WineName>
                </TitleWrap>
                <DescriptionWrap>
                  <Flag>
                    <img alt="" src="#"></img>
                  </Flag>
                  <WineType>Rosé wine </WineType>
                  from
                  <Region> {region}</Region> -<Country>{nation}</Country>
                </DescriptionWrap>
              </SlideMid>
              <Counter price={price} product={product} idx={idx} />
            </Slide>
          );
        })}
        {x[title] === 0 || (
          <ButtonLeft onClick={() => goLeft(title)}>
            <IoIosArrowBack size="23px" opacity="0.3" />
          </ButtonLeft>
        )}
        {x[title] < products.length * -107 || (
          <ButtonRight onClick={() => goRight(title)}>
            <IoIosArrowForward size="23px" opacity="0.3" />
          </ButtonRight>
        )}
      </SliderWrap>
    </RelativeWrap>
  );
};

export default withRouter(Slider);

const RelativeWrap = styled.main`
  position: relative;
`;

const SliderWrap = styled.div`
  width: 1232px;
  height: 560px;
  margin: 0;
  overflow: hidden;
  ${({ theme }) => theme.flex("flex-start", "center", "row")}
`;

const Slide = styled.div`
  min-width: 19%;
  width: 100%;
  height: 100%;
  transition: 0.5s;
  border-radius: 4px;
  margin-right: 16px;
  background-color: #fafafa;
  ${({ theme }) => theme.flex("flex-start", "center", "column")}
`;

const SlideTop = styled.div`
  line-height: 100%;
  width: 100%;
  flex: 1;
  padding: 0 24px;
  background-color: #f7f3f0;
  ${({ theme }) => theme.flex("center", "center", "row")}
`;

const TopLeft = styled.div`
  height: 100%;
  flex: 1;
  ${({ theme }) => theme.flex("center", "flex-start", "column")};
`;

const Score = styled.div`
  font-size: 30px;
  font-weight: 400;
  margin-bottom: 8px;
  line-height: 100%;
`;

const Star = styled.div`
  width: 80px;
  height: 14px;
`;

const RatingCtn = styled.div`
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
  color: #989999;
`;

const TopRight = styled.div`
  height: 100%;
  flex: 1;
`;

const WineImg = styled.img`
  margin-top: 16px;
`;

const SlideMid = styled.div`
  line-height: 100%;
  height: 91.2px;
  width: 100%;
  margin-top: 16px;
  padding: 16px 16px 0;
`;

const TitleWrap = styled.div``;

const Winery = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
`;

const WineName = styled.div`
  font-size: 14px;
  font-weight: 900;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const DescriptionWrap = styled.div`
  margin-top: 8px;
  font-size: 12px;
  font-weight: 300;
`;

const Flag = styled.span``;

const WineType = styled.span`
  font-size: 12px;
  font-weight: 300;
`;
const Region = styled.span`
  color: #1e1e1e;
  font-size: 12px;
  font-weight: 400;
`;
const Country = styled(Region)``;

const ButtonLeft = styled.button`
  position: absolute;
  top: 50%;
  left: -38px;
  transform: translateY(-200%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 4px 20px 0 rgba(66, 66, 66, 0.2);
  cursor: pointer;
  z-index: 10;
  ${({ theme }) => theme.flex("center", "center", "column")}
`;

const ButtonRight = styled.button`
  position: absolute;
  top: 50%;
  right: -38px;
  transform: translateY(-200%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 4px 20px 0 rgba(66, 66, 66, 0.2);
  cursor: pointer;
  z-index: 10;
  ${({ theme }) => theme.flex("center", "center", "column")}
`;
