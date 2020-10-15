import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import {
  RiVipCrown2Line,
  RiSeedlingLine,
  RiThumbUpLine,
  RiMusic2Line,
  RiMoneyEuroCircleLine,
} from "react-icons/ri";
import { FLAG, ICON_NAME } from "../textConstant";
import { Btn, starRating } from "../../../Components/tool/tool";

const ProductCard = ({ products, history }) => {
  const {
    feature,
    id,
    image_url,
    nation,
    price,
    rating,
    ratings,
    region,
    wine_name,
    winery,
    year,
    type,
  } = products;

  const iconList = {
    "top rated": <RiVipCrown2Line size="20" color="white" />,
    vintage: <RiSeedlingLine size="20" color="white" />,
    "Great value": <RiThumbUpLine size="20" color="white" />,
    Popular: <RiMusic2Line size="20" color="white" />,
    "top 1%": <RiMoneyEuroCircleLine size="20" color="white" />,
  };

  const handleIcon = () => {
    return Object.keys(iconList).filter((item) => feature.indexOf(item) !== -1);
  };

  return (
    <>
      {Object.keys(products).length > 0 && (
        <Container>
          <ImgBox type={type} onClick={() => history.push(`/detail/${id}`)}>
            <ProducImg image_url={image_url} />
          </ImgBox>
          <InfoBox feature={feature}>
            <div>
              <Title>
                <DivText as="div" small>
                  {winery}
                </DivText>
                <DivText as="div">{`${wine_name}  ${year}`}</DivText>
              </Title>
              <Nation>
                <Flag alt="flag" src={FLAG[nation]} />
                <SpanText>{nation}</SpanText>
                <SpanText>∙</SpanText>
                <SpanText>{region}</SpanText>
              </Nation>
            </div>
            <Rating>
              <StarText size="34px">{Number(rating).toFixed(1)}</StarText>
              <Stars>
                <StarBox>{starRating(Number(rating).toFixed(1))}</StarBox>
                <StarText size="12px">{`${ratings}ratings`}</StarText>
              </Stars>
              <BuyingBtn>{`€${parseInt(price)}`}</BuyingBtn>
            </Rating>
          </InfoBox>
          <OptionalBox>
            <FeatureBox>
              {feature && (
                <Icon bgColor={handleIcon()}>{iconList[handleIcon()]}</Icon>
              )}
              <DivText as="div" small>
                {feature}
              </DivText>
            </FeatureBox>
          </OptionalBox>
        </Container>
      )}
    </>
  );
};

export default withRouter(ProductCard);

const TYPES_BG = {
  Cognac: "#FEC9C9",
  Soju: "#F3F3F3",
  Red: "#A3CFDA",
  White: "#ECF2DF",
  Rosé: "#D99E91",
};

const BuyingBtn = styled(Btn)`
  width: 120px;
  height: 40px;
  background-color: #02a78b;
  color: white;
  font-size: 16px;
  font-weight: 500;

  :hover {
    background-color: #028e76;
  }
`;

const Container = styled.div`
  ${({ theme }) => theme.flex(null, "center")};
  height: 230px;
  margin-bottom: 20px;
  background-color: white;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0px 0px 8px #f0f0f0;
`;

const ImgBox = styled.div`
  ${({ theme }) => theme.flex("center", "center")};
  width: 160px;
  height: 210px;
  border-radius: 6px;
  /* background-color: #ffecbf; */
  background-color: ${({ type }) => `${TYPES_BG[type]}`};
`;

const ProducImg = styled.div`
  width: 50px;
  height: 178px;
  background-image: url(${({ image_url }) => image_url});
  background-size: cover;
`;

const InfoBox = styled.div`
  ${({ theme }) => theme.flex("space-between", null, "column")};
  width: 300px;
  height: 90%;
  padding: 0 16px;
  border-right: ${({ feature }) => (feature ? "1px solid #dfdfdf" : "")};
`;

const Title = styled.div`
  cursor: pointer;

  :hover {
    div {
      color: #ba1629;
    }
  }
`;

const SpanText = styled.span`
  font-size: 14px;
  margin: 0 0 0 4px;
  color: ${({ theme }) => theme.themeBlack};
`;

const DivText = styled(SpanText)`
  font-size: ${({ small }) => (small ? "14px" : "16px")};
  font-weight: ${({ small }) => (small ? "300" : "")};
  margin: 0 0 6px 0;
`;

const StarText = styled(SpanText)`
  font-size: ${({ size }) => size};
  color: ${({ theme }) => theme.themeBlack};
  margin: 0;
`;

const StarBox = styled.div`
  ${({ theme }) => theme.flex("space-around")};
  width: 80px;
`;

const Nation = styled.span`
  ${({ theme }) => theme.flex(null, "center")};
  cursor: pointer;

  :hover {
    span {
      color: #ba1629;
    }
  }
`;

const Flag = styled.img.attrs((props) => ({
  src: props.src,
}))`
  width: 14px;
  height: 14px;
`;

const Rating = styled.div`
  ${({ theme }) => theme.flex("space-between", "center")};
  cursor: default;
`;

const Stars = styled.span``;

const OptionalBox = styled.div`
  width: 300px;
  height: 90%;
`;

const FeatureBox = styled.div`
  ${({ theme }) => theme.flex(null, null, "column")};
  width: 100%;
  height: 100%;
  padding-left: 16px;
  cursor: default;
`;

const Icon = styled.span`
  ${({ theme }) => theme.flex("center", "center")};
  width: 32px;
  height: 32px;
  margin-bottom: 14px;
  border-radius: 16px;
  background-color: ${({ bgColor }) => ICON_NAME[bgColor]};
`;
