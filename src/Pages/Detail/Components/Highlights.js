import React from "react";
import styled from "styled-components";
import { GiWineGlass } from "react-icons/gi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

const Highlights = ({ detail, highlightList, HighligtColor }) => {
  const { highlight } = detail;

  const handleHighlight = (item) => {
    // return Object.keys(highlightList)?.filter(
    //   (item) => highlight.indexOf(item) !== -1
    // );
  };
  console.log(highlightList);
  return (
    <>
      {Object.keys(detail).length > 0 && (
        <Container>
          <Title>Highlights</Title>
          <Box>
            {highlight?.map((text, i) => {
              return (
                <Highlight key={i}>
                  <Icon HighligtColor={HighligtColor}>
                    {/* {highlightList[handleHighlight]} */}
                    👍🏼
                  </Icon>
                  <Text>
                    <div>{text}</div>
                  </Text>
                </Highlight>
              );
            })}
          </Box>
        </Container>
      )}
    </>
  );
};

export default Highlights;

const Container = styled.div`
  ${({ theme }) => theme.flex(null, "center")}
  margin: 0 auto;
  padding-top: 112px;
  width: 1216px;
`;
const Title = styled.div`
  margin-right: 100px;
  font-size: 28px;
  font-weight: bold;
`;
const Box = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-right: 50px;
  font-size: 18px;
`;

const Highlight = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  div {
    flex: 1;
  }
`;
const Icon = styled.span`
  ${({ theme }) => theme.flex("center", "center")}
  width: 48px;
  height: 48px;
  margin: 3px 20px 0 5px;
  border-radius: 50%;
  background-color: ${({ bgColor, HighligtColor }) => HighligtColor[bgColor]};
  font-size: 60px;
`;
