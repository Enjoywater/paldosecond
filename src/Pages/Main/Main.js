import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Slider from "../../Components/Slider/Slider";
import { Btn } from "../../Components/tool/tool";
import { api } from "../../config/api";
import { PRICE_RANGE, FILTER_BOOL } from "../Main/Components/static";

const Main = () => {
  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    fetch(api + "/products")
      .then((res) => res.json())
      .then((res) => {
        getProducts(res.products.result);
      });
  };

  const shuffleList = (products) => {
    for (let i = products.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [products[i], products[j]] = [products[j], products[i]];
    }
    return products;
  };

  const [products, getProducts] = useState([]);
  const [sortOn, turnOnSort] = useState(FILTER_BOOL);
  const [filterMethod, setMethod] = useState(1);
  const [x, setX] = useState({
    toplist: 0,
    related: 0,
    editors: 0,
    bestseller: 0,
    affordable: 0,
  });

  const priceFilter = {
    1: products
      .filter(({ rating, price }) => rating > 4 && price < 15)
      .sort((a, b) => a.price - b.price),
    2: products
      .filter(({ rating, price }) => rating > 4 && price >= 15 && price < 30)
      .sort((a, b) => a.price - b.price),
    3: products
      .filter(({ rating, price }) => rating > 3 && price >= 30 && price < 60)
      .sort((a, b) => a.price - b.price),
    4: products
      .filter(({ rating, price }) => rating > 4 && price >= 60)
      .sort((a, b) => a.price - b.price),
  };

  const activateFilter = (e) => {
    turnOnSort({
      1: false,
      2: false,
      3: false,
      4: false,
      [e.target.id]: true,
    });
    setMethod(e.target.id);
    setX({ ...x, toplist: 0 });
  };
  const listType = {
    toplist: priceFilter[filterMethod].sort((a, b) => a.rating - b.rating),
    related: shuffleList(products).sort((a, b) => a.rating - b.rating),
    editors: products
      .filter(({ editor_note }) => editor_note !== null)
      .sort((a, b) => a.rating - b.rating),
    bestseller: products
      .filter(({ ratings }) => ratings > 100)
      .sort((a, b) => a.rating - b.rating),
    affordable: products
      .filter(({ price }) => price < 25)
      .sort((a, b) => a.rating - b.rating),
  };

  return (
    <MainWrap>
      <MainBannerWrap>
        <MainBanner />
      </MainBannerWrap>
      <ListWrap>
        <HeadWrap>
          <Header>Top lists in France</Header>
          <Subhead>Updated every Thursday</Subhead>
        </HeadWrap>
      </ListWrap>
      <BottomListWrap>
        <BtnWrap>
          <SortingBtnOne id="1" onClick={activateFilter} sortOn={sortOn[1]} />
          <SortingBtnTwo id="2" onClick={activateFilter} sortOn={sortOn[2]} />
          <SortingBtnThree id="3" onClick={activateFilter} sortOn={sortOn[3]} />
          <SortingBtnFour id="4" onClick={activateFilter} sortOn={sortOn[4]} />
        </BtnWrap>
        <BottomText>{PRICE_RANGE[filterMethod - 1]}</BottomText>
      </BottomListWrap>
      <CompSlider>
        <Slider products={listType.toplist} x={x} setX={setX} title="toplist" />
      </CompSlider>
      <Banner1></Banner1>
      <HeadWrap>
        <Header>Related to the wines you've viewed</Header>
      </HeadWrap>
      <CompSlider>
        <Slider products={listType.related} x={x} setX={setX} title="related" />
      </CompSlider>
      <PMWrap>
        <OurPM />
        <div>
          <Header>Paldovivino Offers</Header>
          <SubheadEditor>
            I'm Lee Heung Soo, Wine Editor at PaldoVivino. <br /> Our community
            of 34 users at Wecode let me create the best offers for high quality
            wines.
          </SubheadEditor>
        </div>
      </PMWrap>
      <CompSlider>
        <Slider products={listType.editors} x={x} setX={setX} title="editors" />
      </CompSlider>
      <Banner2></Banner2>
      <HeadWrap>
        <Header>Bestsellers in France</Header>
        <Subhead>Top-selling wines in France right now.</Subhead>
      </HeadWrap>
      <CompSlider>
        <Slider
          products={listType.bestseller}
          x={x}
          setX={setX}
          title="bestseller"
        />
      </CompSlider>
      <BodyWrap>
        <HeadWrap>
          <Header>Affordable reds</Header>
          <Subhead>Great wines at great prices</Subhead>
        </HeadWrap>
        <CompSlider>
          <Slider
            products={listType.affordable}
            x={x}
            setX={setX}
            title="affordable"
          />
        </CompSlider>
      </BodyWrap>
    </MainWrap>
  );
};

export default Main;

const MainWrap = styled.div`
  height: auto;
  ${({ theme }) => theme.flex("center", "center", "column")};
`;

const MainBannerWrap = styled.div`
  width: auto;
  height: auto;
  ${({ theme }) => theme.flex("center", "center", "row")};
`;

const MainBanner = styled.div`
  width: 1519px;
  height: 300px;
  background-image: url("https://www.vivino.com/misc/bazooka/Rioja_2020/web/desktop_FR.jpg");
  background-position: center;
  background-size: cover;
`;

const BodyWrap = styled.div`
  width: auto;
  height: auto;
  margin-bottom: 64px;
`;

const ListWrap = styled.div`
  width: 1216px;
  height: auto;
  margin: 0 auto;
`;

const HeadWrap = styled.div`
  margin: 64px 0 24px 0;
  max-width: 1216px;
  width: 100%;
  ${({ theme }) => theme.flex("center", "flex-start", "column")};
`;

const PMWrap = styled(HeadWrap)`
  ${({ theme }) => theme.flex("flex-start", "center", "row")};
`;

const Header = styled.div`
  font-size: 28px;
  font-weight: 900;
  margin-bottom: 24px;
`;

const OurPM = styled.div`
  background: url("/images/pm.png") no-repeat center;
  background-size: cover;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin: 0 16px 8px 0;
`;

const Subhead = styled.div`
  max-width: 600px;
  color: gray;
  font-size: 20px;
  font-weight: light;
`;

const SubheadEditor = styled(Subhead)`
  max-width: 1000px;
  margin: 0;
`;

const CompSlider = styled.div`
  margin: 24px 0;
  width: 1232px;
  height: auto;
  line-height: 534px;
  ${({ theme }) => theme.flex("center", "center", "row")}
`;

const BottomListWrap = styled.div``;

const BtnWrap = styled.div`
  width: 1216px;
  ${({ theme }) => theme.flex("flex-start", "center", "row")}
`;

const SortingBtnOne = styled(Btn)`
  width: 70px;
  height: 30px;
  background-color: ${({ sortOn }) => (sortOn ? "#a31323" : "#ffffff")};
  background-repeat: no-repeat;
  background-position: center;
  border: 1px solid #a31323;
  margin: 0 8px 8px 0;
  background-image: ${({ sortOn }) =>
    sortOn ? "url('/images/coin1ON.svg')" : "url('/images/coin1OFF.svg')"};
  background-size: 20px 16px;
`;

const SortingBtnTwo = styled(SortingBtnOne)`
  ${({ sortOn }) => (sortOn ? "#a31323" : "#ffffff")};
  background-image: ${({ sortOn }) =>
    sortOn ? "url('/images/coin2ON.svg')" : "url('/images/coin2OFF.svg')"};
`;

const SortingBtnThree = styled(SortingBtnOne)`
  ${({ sortOn }) => (sortOn ? "#a31323" : "#ffffff")};
  background-image: ${({ sortOn }) =>
    sortOn ? "url('/images/coin3ON.svg')" : "url('/images/coin3OFF.svg')"};
`;

const SortingBtnFour = styled(SortingBtnOne)`
  ${({ sortOn }) => (sortOn ? "#a31323" : "#ffffff")};
  background-image: ${({ sortOn }) =>
    sortOn ? "url('/images/coin4ON.svg')" : "url('/images/coin4OFF.svg')"};
`;

const BottomText = styled.div`
  margin-top: 8px;
  font-size: 13px;
  line-height: 1.53846;
`;

const Banner1 = styled.div`
  background: url(/images/paris.jpg) no-repeat;
  background-position: top 100% right 0;
  background-size: 100%;
  width: 100%;
  max-width: 1216px;
  height: 400px;
  margin: 56px 0 16px 0;
  text-align: center;
  line-height: 284px;
`;

const Banner2 = styled(Banner1)`
  background: url(/images/thai.jpg) no-repeat;
  background-size: 100%;
  background-position: top 30% right 0;
`;
