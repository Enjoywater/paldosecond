import React from "react";
import styled from "styled-components";
import { FLAG } from "../../List/textConstant";

const WishCard = ({ item }) => {
  const {
    winery,
    wine_name,
    year,
    nation,
    region,
    rating,
    ratings,
    image_url,
  } = item;
  return (
    <Container>
      <ContentBox>
        <ImgContainer>
          <Img image_url={image_url} />
        </ImgContainer>
        <TextContainer>
          <TitleBox>
            <Text>{winery}</Text>
            <DivBox>
              <Bold size={20} weight={800}>
                {`${wine_name} ${year}`}
              </Bold>
            </DivBox>
            <DivBox>
              <FlagIcon nation={FLAG[nation]} />
              <Text>{`${region} ∙ ${nation}`}</Text>
            </DivBox>
          </TitleBox>
          <RatingContainer>
            <RatingBox>
              <Text>AVG RATING</Text>
              <Bold size={20}>{Number(rating).toFixed(1)}</Bold>
              <Text>{`${ratings} Ratings`}</Text>
            </RatingBox>
            <RatingBox>
              <Text>AVG PRICE</Text>
              <Bold size={20}>-</Bold>
              <Text>-</Text>
            </RatingBox>
          </RatingContainer>
        </TextContainer>
      </ContentBox>
    </Container>
  );
};

export default WishCard;

const Text = styled.span`
  color: ${({ theme }) => theme.themeBlack};
  font-size: 12px;
`;

const Bold = styled(Text)`
  font-weight: ${({ weight }) => weight};
  font-size: ${({ size }) => `${size}px`};
`;

const DivBox = styled.div`
  ${({ theme }) => theme.flex(null, "center")};
`;

const Container = styled.div`
  height: 240px;
  margin-bottom: 20px;
  background-color: white;
  box-shadow: 0 0 4px #e5e5e5;
`;

const ContentBox = styled.div`
  ${({ theme }) => theme.flex("space-between", "center")};
  height: 100%;
  padding: 20px;
`;

const ImgContainer = styled.div`
  width: 140px;
  height: 100%;
`;

const Img = styled.img.attrs(({ image_url }) => ({
  src: image_url,
}))`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TextContainer = styled.div`
  ${({ theme }) => theme.flex("center", null, "column")};
  width: 560px;
  height: 100%;
`;

const TitleBox = styled.div`
  ${({ theme }) => theme.flex("space-around", null, "column")};
  width: 500px;
  height: 90px;
  border-bottom: 1px solid #e4e4e4;
`;

const FlagIcon = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 8px;
  background-image: url(${({ nation }) => nation});
  background-size: cover;
`;

const RatingContainer = styled.div`
  ${({ theme }) => theme.flex(null, "center")}
  height:100px;
`;

const RatingBox = styled.div`
  ${({ theme }) => theme.flex("space-between", "center", "column")}
  width:130px;
  height: 70%;
`;
