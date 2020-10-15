import React from "react";
import styled from "styled-components";
import {
  WineStyle,
  Allergens,
  Grapes,
  Region,
  Winery,
  AlcoholContent,
} from "../Icons/Icons";

const Facts = ({ detail }) => {
  const { grape, winery, region, type, alcohol_content, allergen } = detail;
  return (
    <Container>
      <Title>Facts about the wine</Title>
      <Row>
        <Icon>
          <Winery />
        </Icon>
        <HeaderLabel>Winery</HeaderLabel>
        <Fact>{winery}</Fact>
      </Row>
      <Row>
        <Icon>
          <Grapes />
        </Icon>
        <HeaderLabel>Grapes</HeaderLabel>
        <Fact>{grape}</Fact>
      </Row>
      <Row>
        <Icon>
          <Region />
        </Icon>
        <HeaderLabel>Region</HeaderLabel>
        <Fact>{region}</Fact>
      </Row>
      <Row>
        <Icon>
          <WineStyle />
        </Icon>
        <HeaderLabel>Wine style</HeaderLabel>
        <Fact>
          <span>{region}</span>
          <span>{type}</span>
        </Fact>
      </Row>
      <Row>
        <Icon>
          <AlcoholContent />
        </Icon>
        <HeaderLabel>Alcohol content</HeaderLabel>
        <Fact>{Number(alcohol_content)}%</Fact>
      </Row>
      <Row>
        <Icon>
          <Allergens style={{ width: "20px", height: "24px" }} />
        </Icon>
        <HeaderLabel>Allergens</HeaderLabel>
        <Fact>{allergen}</Fact>
      </Row>
    </Container>
  );
};
const Container = styled.div`
  ${({ theme }) => theme.flex("center", null, "column")}
  margin: 0 auto;
  padding: 112px 0 50px 0;

  width: 1216px;
`;
const Title = styled.div`
  margin: 0px 0px 24px;
  font-size: 28px;
  font-weight: bold;
`;

const Row = styled.div`
  display: flex;
  padding: 5px 0;
  width: 100%;
  border-bottom: 1px solid #eae0da;
  font-size: 13px;
`;

const Icon = styled.div`
  ${({ theme }) => theme.flex(null, "center")}
  margin: 0 16px;
  width: auto;
  height: auto;
`;

const HeaderLabel = styled.div`
  margin-right: 100px;
  padding: 8px 0;
  text-align: left;
  width: 120px;
  font-size: 16px;
  font-weight: 300;
`;

const Fact = styled.div`
  padding: 8px 0;
  text-align: left;
  font-size: 16px;
  font-weight: 4px;
  span {
    margin-right: 5px;
  }
`;

export default Facts;
