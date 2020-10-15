import React from "react";
import styled from "styled-components";

const TasteCharacteristics = ({ detail }) => {
  const { taste_summary, bold, sweet, acidic } = detail;
  return (
    <Container>
      <Title>What does this wine taste like?</Title>
      <Taste>
        <TasteBox>
          <TasteRow>
            <Character>Light</Character>
            <Bar>
              <IndicatorBar left={`${bold}%`} />
            </Bar>
            <Character>Bold</Character>
          </TasteRow>
          <TasteRow>
            <Character>Dry</Character>
            <Bar>
              <IndicatorBar left={`${sweet}%`} />
            </Bar>
            <Character>Sweet</Character>
          </TasteRow>
          <TasteRow>
            <Character>Soft</Character>
            <Bar>
              <IndicatorBar left={`${acidic}%`} />
            </Bar>
            <Character>Acidic</Character>
          </TasteRow>
        </TasteBox>
        <Summary>
          <SummaryTitle>WINE LOVES TASTE SUMMARY</SummaryTitle>
          <UserSummary>{taste_summary}</UserSummary>
        </Summary>
      </Taste>
    </Container>
  );
};

export default TasteCharacteristics;

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

const Taste = styled.div`
  width: 1216px;
  display: flex;
  justify-content: center;
`;

const TasteBox = styled.div`
  ${({ theme }) => theme.flex(null, null, "column")}
  width: 1216px;
`;

const TasteRow = styled.div`
  ${({ theme }) => theme.flex("flex-start", "center")}
  margin: 5px;
`;

const Character = styled.span`
  display: inline-block;
  width: 50px;
  font-size: 16px;
`;

const Bar = styled.div`
  width: 600px;
  height: 8px;
  margin-right: 10px;
  position: relative;
  border-radius: 7px;
  background-color: #f7f3f0;
  z-index: 2;
`;

const IndicatorBar = styled.span`
  width: 15%;
  height: 8px;
  position: absolute;
  left: ${({ left }) => left};
  border-radius: 7px;
  background-color: #ba1628;
  z-index: 1;
`;

const Summary = styled.div``;

const SummaryTitle = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
`;

const UserSummary = styled.div`
  line-height: 1.3;
`;
