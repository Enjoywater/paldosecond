import styled from "styled-components";
import { Btn } from "../../Components/tool/tool";

export const ItemBox = styled.div`
  width: 400px;
  margin-bottom: 80px;
`;

export const TitleBox = styled.div`
  ${({ theme }) => theme.flex("space-between")};
  margin-bottom: 30px;
  color: ${({ theme }) => theme.themeBlack};
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 800;
`;

export const TypeBtn = styled(Btn)`
  display: ${({ fixWidth }) => (fixWidth ? "flex" : "inline-block")};
  width: ${({ fixWidth }) => (fixWidth ? "120px" : "")};
  height: 34px;
  background-color: ${({ clicked }) => (clicked ? "#ba1628" : "white")};
  color: ${({ clicked }) => (clicked ? "white" : "#ba1628")};
  border: 1px solid #ba1628;
  font-size: 13px;
  font-weight: 300;
  padding: ${({ fixWidth }) => (fixWidth ? "" : "0 20px")};
  margin: ${({ fixWidth }) => (fixWidth ? "" : "0 6px 8px")};

  :hover {
    background-color: ${({ clicked }) => (clicked ? "#A22330" : "#fafafa")};
    border: ${({ clicked }) =>
      clicked ? "1px solid #A22330" : "1px solid #ba1628"};
  }
`;
