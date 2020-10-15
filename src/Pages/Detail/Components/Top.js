import React, { useState } from "react";
import styled from "styled-components";
import PurchaseBox from "./PurchaseBox";
import { starRating } from "../../../Components/tool/tool";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";

const Top = ({ detail, flag, iconName, iconList }) => {
  const {
    winery,
    year,
    wine_name,
    wine_type,
    nation,
    region,
    rating,
    ratings,
    editor_note,
    feature,
  } = detail;

  const [checked, setChecked] = useState(false);

  const handleIcon = () => {
    return Object.keys(iconList).filter((item) => feature.indexOf(item) !== -1);
  };

  return (
    <>
      {Object.keys(detail).length > 0 && (
        <TopRow>
          <ProductDetail>
            <Img alt="wine" src="/Images/wineBottle.png" />
            <Table>
              <Title>
                <p>{winery}</p>
                <h1>
                  {wine_name} {year}
                </h1>
              </Title>
              <Location>
                <img alt="flag" src={flag[nation]} />
                <p>
                  {wine_type}
                  {wine_type === ("Conac" || "Soju") ? " from " : " wine from "}
                  <b>
                    {region} · {nation}
                  </b>
                </p>
              </Location>
              <RateWishlist>
                <Rating>{Number(rating).toFixed(1)}</Rating>
                <StarRating>
                  <StarBox>{starRating(Number(rating).toFixed(1))}</StarBox>
                  {ratings}rating
                </StarRating>
                <Wishlist onClick={() => setChecked(!checked)}>
                  {checked ? (
                    <MdBookmark
                      style={{
                        width: "24px",
                        height: "24px",
                      }}
                    />
                  ) : (
                    <MdBookmarkBorder
                      style={{
                        width: "24px",
                        height: "24px",
                      }}
                    />
                  )}
                  <WishTitle>
                    {checked ? "Wishlisted" : "Add to Wishlist"}
                  </WishTitle>
                </Wishlist>
              </RateWishlist>
              <EditorNote>
                <p>
                  <b>Editor's note:</b>
                  {editor_note}
                </p>
                <a href="#editorNote">Read full Editor's note</a>
              </EditorNote>
              <FeatureBox>
                <Feature>
                  <Icon iconName={iconName} bgColor={handleIcon()}>
                    {iconList[handleIcon()]}
                  </Icon>
                  <p>{feature}</p>
                </Feature>
              </FeatureBox>
            </Table>
            <PurchaseBox detail={detail} />
          </ProductDetail>
        </TopRow>
      )}
    </>
  );
};

export default Top;

const TopRow = styled.div`
  ${({ theme }) => theme.flex("center")}
  padding: 0 48px;
  background-color: #f7f3f0;
`;

const ProductDetail = styled.div`
  ${({ theme }) => theme.flex("center")}
  align-items:flex-start;
  padding: 48px 0;
  width: 1216px;
`;

const Img = styled.img`
  padding: 0 16px;
  height: 500px;
`;

const Table = styled.div`
  ${({ theme }) => theme.flex(null, null, "column")}
  width: 50%;
`;

const Title = styled.div`
  padding: 0 16px;
  p {
    margin: 0 0 8px;
    font-size: 26px;
  }
  h1 {
    margin: 0 0 16px;
    font-weight: bold;
    font-size: 32px;
  }
`;

const Location = styled.div`
  ${({ theme }) => theme.flex(null, "center")}
  margin: 10px 16px;
  font-size: 18px;
  img {
    margin-right: 10px;
    width: 20px;
    height: 20px;
  }
  b {
    font-weight: bold;
  }
`;

const RateWishlist = styled.div`
  ${({ theme }) => theme.flex(null, "center")}
  margin: 30px 16px;
  padding-right: 30px;
`;

const Rating = styled.div`
  margin-right: 10px;
  font-size: 40px;
  font-weight: bold;
`;

const StarRating = styled.div`
  ${({ theme }) => theme.flex(null, null, "column")}
  font-size: 12px;
  line-height: 1.1;
`;

const Wishlist = styled.div`
  ${({ theme }) => theme.flex(null, "center")}
  margin-left: 30px;
  padding: 0 16px;
  font-size: 16px;
  cursor: pointer;
`;

const WishTitle = styled.div`
  padding-left: 5px;
`;

const EditorNote = styled.div`
  margin: 0 16px;
  font-size: 20px;
  line-height: 1.5;
  b {
    font-weight: bold;
  }
  a {
    padding-top: 8px;
    font-size: 14px;
    font-weight: bold;
  }
`;

const Feature = styled.span`
  ${({ theme }) => theme.flex(null, "center")}
  margin: 20px 16px;
  padding-right: 16px;
  height: 48px;
  border-radius: 44px;
  background-color: white;
  p {
    margin-left: 10px;
    line-height: 38px;
    font-size: 13px;
  }
`;

const FeatureBox = styled.div`
  display: flex;
`;

const Icon = styled.span`
  ${({ theme }) => theme.flex("center", "center")}
  width: 32px;
  height: 32px;
  margin-left: 5px;
  border-radius: 16px;
  background-color: ${({ bgColor, iconName }) => iconName[bgColor]};
`;

const StarBox = styled.div``;
