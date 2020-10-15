import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DropDownMenu from "./Components/DropDownMenu";
import { FaAngleDown } from "react-icons/fa";
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import {
  GiWineGlass,
  GiMoneyStack,
  GiCheeseWedge,
  GiGrapes,
} from "react-icons/gi";
import { GrLocation } from "react-icons/gr";
import SignUpModal from "../../Pages/Signup/SignUpModal";
import { withRouter } from "react-router-dom";

const Nav = ({ history }) => {
  const [mainCategory, setCategory] = useState([]);
  const [hoverOn, handleHover] = useState(false);
  const [navCountry, getCountry] = useState([]);
  const [navLang, getLang] = useState([]);
  const [displayLang, animateLang] = useState(false);
  const [displayCountry, animateCountry] = useState(false);
  const [displayCart, animateCart] = useState(false);
  const [navIndex, setIndex] = useState(0);
  const [displayModal, switchModal] = useState(false);

  useEffect(() => {
    fetch("/Data/nav_mock.json")
      .then((res) => res.json())
      .then((res) => {
        setCategory(res.MainCategory);
        getCountry(res.navCountry);
        getLang(res.navLanguage);
      });
  }, []);

  const dropMenu = (idx) => {
    handleHover(!hoverOn);
    setIndex(idx);
  };

  const validToken = localStorage.token;

  const toggleCountry = () => {
    return [
      animateCountry(!displayCountry),
      animateLang(false),
      animateCart(false),
    ];
  };

  const toggleLang = () => {
    return [
      animateLang(!displayLang),
      animateCountry(false),
      animateCart(false),
    ];
  };

  const toggleCart = () => {
    validToken && history.push("/cart");
    return [
      animateCart(!displayCart),
      animateLang(false),
      animateCountry(false),
    ];
  };

  const toggleUser = () => [
    switchModal(!displayModal),
    animateLang(false),
    animateCart(false),
    animateCountry(false),
    validToken && history.push("/mypage"),
  ];

  return (
    <Navigation>
      {/* {console.log(localStorage.token)} */}
      <NavUpper>
        <LeftSideWrap>
          <Logo onClick={() => (window.location.href = "/")} />
          <Search>
            <SearchBar placeholder="Search any wine" autocomplete="off" />
          </Search>
        </LeftSideWrap>
        <RightSideWrap>
          <MenuWrapper onClick={toggleCountry}>
            <TextWrapper>
              <Select>Ship to</Select>
              France
            </TextWrapper>
            <FaAngleDown color="#BEBFBF" size="13px" />
            <DropCountry animate={displayCountry}>
              <ul>
                {navCountry?.map((country, idx) => {
                  return <li key={idx}>{country}</li>;
                })}
              </ul>
            </DropCountry>
          </MenuWrapper>
          <MenuWrapper onClick={toggleLang}>
            <TextWrapper>
              <Select>Language</Select>
              English
            </TextWrapper>
            <FaAngleDown color="#BEBFBF" size="13px" />
            <DropLang animate={displayLang}>
              <ul>
                {navLang?.map((lang, idx) => {
                  return <li key={idx}>{lang}</li>;
                })}
              </ul>
            </DropLang>
          </MenuWrapper>
          <User onClick={toggleUser}>
            <AiOutlineUser style={iconStyle("27px", "27px", "7px")} />
          </User>
          {!validToken && (
            <SignUpModal
              displayModal={displayModal}
              closable={true}
              maskClosable={true}
              onClose={toggleUser}
            >
              Hello
            </SignUpModal>
          )}

          <Cart onClick={toggleCart}>
            <AiOutlineShoppingCart style={iconStyle("27px", "27px", "7px")} />
            {!validToken && (
              <DropCart animate={displayCart}>
                <div>You have no shipping carts</div>
                <span>Explore</span>
              </DropCart>
            )}
          </Cart>
        </RightSideWrap>
      </NavUpper>
      <NavLower>
        <CategoryWrap>
          <Category>
            {mainCategory.map((category, idx) => (
              <li
                key={category.id}
                onMouseEnter={() => dropMenu(idx)}
                onMouseLeave={() => handleHover(false)}
                onClick={() => history.push("/list")}
              >
                {MainIcons[idx]}
                {category.category}
                {hoverOn && navIndex === idx && (
                  <DropDownMenu category={category} />
                )}
              </li>
            ))}
          </Category>
        </CategoryWrap>
      </NavLower>
    </Navigation>
  );
};

export default withRouter(Nav);

const iconStyle = (height, width, marginRight) => {
  return {
    height,
    width,
    marginRight,
  };
};

const MainIcons = [
  <GiWineGlass style={iconStyle("20px", "20px", "4px")} />,
  <GiMoneyStack style={iconStyle("20px", "20px", "4px")} />,
  <GiCheeseWedge style={iconStyle("20px", "20px", "4px")} />,
  <GiGrapes style={iconStyle("20px", "20px", "4px")} />,
  <GrLocation style={iconStyle("20px", "20px", "4px")} />,
];

const Navigation = styled.nav`
  position: relative;
  width: 100%;
  height: 128px;
  background-color: #fff;
  box-shadow: 0 1px 4px #a8a5a3;
  ${({ theme }) => theme.flex("center", "center", "column")}
`;

const NavUpper = styled.div`
  width: 100%;
  height: 50%;
  margin: 0 auto;
  max-width: 1216px;
  ${({ theme }) => theme.flex("space-between", "center", "row")}
`;

const LeftSideWrap = styled.div`
  ${({ theme }) => theme.flex("center", "center", "row")}
`;

const Logo = styled.span`
  display: inline-block;
  width: 250px;
  height: 26px;
  background: url("/images/textlogo.png") no-repeat center;
  background-size: cover;
  margin-right: 15px;
  cursor: pointer;
`;

const Search = styled.form`
  width: 300px;
  height: 40px;
`;

const SearchBar = styled.input`
  width: 100%;
  height: 40px;
  padding: 4px 0 4px 48px;
  border: 1px solid #dedede;
  border-radius: 32px;
  background: url(/images/searchbar.svg) no-repeat;
  background-position: 16px;
  background-size: 16px;
  background-color: #fff;
  font-size: 16px;
  font-weight: 300;
  color: #333;
  outline: none;
`;

const RightSideWrap = styled.div`
  ${({ theme }) => theme.flex("center", "center", "row")}
`;

const MenuWrapper = styled.div`
  position: relative;
  margin-right: 10px;
  cursor: pointer;
  ${({ theme }) => theme.flex("center", "center", "row")}
  i {
    font-size: 11px;
    font-weight: 600;
    color: #a8a5a3;
  }
`;

const TextWrapper = styled.div`
  padding-right: 5px;
  font-size: 14px;
`;

const Select = styled.div`
  padding-bottom: 3px;
  font-size: 13px;
  color: #a8a5a3;
`;

const DropCountry = styled.div`
  position: absolute;
  top: 40px;
  right: 2px;
  width: auto;
  height: auto;
  padding: 16px 32px;
  margin-top: 16px;
  box-shadow: 0 6px 20px 6px rgba(50, 50, 50, 0.15);
  border-radius: 4px;
  z-index: 10;
  background-color: #fff;
  opacity: ${({ animate }) => (animate ? 1 : 0)};
  pointer-events: ${({ animate }) => (animate ? "initial" : "none")};
  transform: translateY(${({ animate }) => (animate ? 0 : "20px")});
  transition: all 0.25s ease-in;

  li {
    padding: 8px;
    color: #333;
    font-size: 14px;
    font-weight: 400;

    :hover {
      color: #a11122;
      text-decoration: underline;
    }
  }
`;

const DropLang = styled(DropCountry)`
  right: 2px;
`;

const User = styled.div`
  cursor: pointer;
`;

const Cart = styled.div`
  position: relative;
  cursor: pointer;
`;

const DropCart = styled(DropLang)`
  ${({ theme }) => theme.flex("center", "center", "column")}
  div {
    display: inline-block;
    width: 150px;
    font-size: 13px;
    font-weight: 400;
    text-align: center;
    border-bottom: 1px solid #e4e4e4;
    padding-bottom: 16px;
    margin-bottom: 8px;
    color: #111;
  }
  span {
    width: 100%;
    padding: 8px;
    color: #ba1628;
    text-align: center;
    cursor: pointer;
    font-size: 13px;
    :hover {
      text-decoration: underline;
    }
  }
`;

const NavLower = styled.div`
  width: 100%;
  height: 50%;
  margin: 0 auto;
  max-width: 1216px;
  ${({ theme }) => theme.flex("flex-start", "center", "row")}
`;

const CategoryWrap = styled.div`
  ${({ theme }) => theme.flex("flex-start", "center", "row")}
`;

const Category = styled.ul`
  height: 64px;
  display: inline-block;
  ${({ theme }) => theme.flex("flex-start", "center", "row")}

  li {
    position: relative;
    height: 100%;
    margin-right: 16px;

    :hover {
      text-decoration: underline;
      cursor: pointer;
    }

    ${({ theme }) => theme.flex("flex-start", "center", "row")}
  }
`;
