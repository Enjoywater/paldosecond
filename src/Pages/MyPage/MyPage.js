import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { api } from "../../config/api";
import WishCard from "./Components/WishCard";

const MyPage = () => {
  const [wishList, setWishList] = useState([]);
  const [imgBase64, setImgBase64] = useState("");
  const [profile, setProfile] = useState("");

  const handleImgForm = (e) => {
    const formData = new FormData();
    formData.append("filename", e.target.files[0], e.target.files[0].name);
    console.log("filename", e.target.files[0], e.target.files[0].name);
    fetch(`${api}/accounts/profile`, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        return result.message !== "SUCCESS"
          ? alert("오류가 발생했습니다.")
          : "";
      });

    let reader = new FileReader();

    reader.onloadend = (e) => {
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString());
      }
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    fetch(`${api}/accounts/wishlist`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then(({ products }) => {
        setWishList(products.result);
        setProfile(products.profile.profile_image);
      });
  }, []);
  return (
    <>
      <Wrapper>
        <Container>
          <UserInfo>
            <ImgContainer>
              <label htmlFor="fileUpload">
                <Img
                  imgBase64={
                    imgBase64 !== ""
                      ? imgBase64
                      : profile
                      ? profile
                      : "http://images.vivino.com/avatars/default_user.png"
                  }
                />
              </label>
            </ImgContainer>
            <InfoContainer>
              <InfoBox direction="column">
                <Bold size={20}>Heungsoo Lee</Bold>
                <Text size={10}>Korea (South)</Text>
                <FileInput onChange={handleImgForm} />
              </InfoBox>
              <InfoBox direction="row">
                <RatingBox>
                  <Text size={12}>RATINGS</Text>
                  <Text size={12}>RANK IN KR</Text>
                </RatingBox>
                <RatingBox num>
                  <Text size={36}>0</Text>
                  <Text size={36}>0</Text>
                </RatingBox>
              </InfoBox>
            </InfoContainer>
          </UserInfo>
          <WishBox>
            <MenuTitle>
              <div>
                <MenuText>LATEST RATINGS</MenuText>
              </div>
              <div>
                <MenuText>TOP RATINGS</MenuText>
              </div>
              <div>
                <MenuText clicked>WISH LIST</MenuText>
              </div>
            </MenuTitle>
            <ContentBox>
              {wishList?.map((item) => (
                <WishCard key={item.id} item={item} />
              ))}
            </ContentBox>
          </WishBox>
        </Container>
      </Wrapper>
      <EmptyBox />
    </>
  );
};

export default MyPage;

const Text = styled.div`
  color: ${({ theme }) => theme.themeBlack};
  font-size: ${({ size }) => `${size}px`};
`;

const Bold = styled(Text)`
  font-weight: 800;
`;

const Wrapper = styled.div`
  ${({ theme }) => theme.flex("center", "center")};
  height: 300px;
  background-color: #97bce9;
  position: relative;
`;

const EmptyBox = styled.div`
  height: 600px;
  background-color: #f8f8f8;
`;

const Container = styled.div`
  ${({ theme }) => theme.flex(null, "center")};
  width: 1216px;
  position: absolute;
  top: 200px;
`;

const UserInfo = styled.div`
  ${({ theme }) => theme.flex("space-around", "center", "column")}
  width: 400px;
  height: 300px;
  border: 1px solid #dfdfdf;
  background-color: white;
  position: relative;
  border: 1px solid #ebebeb;
  box-shadow: 0 0 4px #dfdfdf;
`;

const ImgContainer = styled.div`
  ${({ theme }) => theme.flex("center", "center")};
  width: 122px;
  height: 122px;
  position: absolute;
  background-color: white;
  border: 1px solid #bcbcbc;
  border-radius: 61px;
  top: -60px;
  left: 139px;
`;

const Img = styled.div`
  width: 112px;
  height: 112px;
  border-radius: 56px;
  background-image: ${({ imgBase64 }) => `url(${imgBase64})`};
  background-size: cover;
  border: 1px solid #dfdfdf;
  cursor: pointer;
`;

const InfoContainer = styled.div`
  ${({ theme }) => theme.flex("space-between", "center", "column")};
  height: 50%;
  margin-top: 40px;
`;

const InfoBox = styled.div`
  ${({ theme }) => theme.flex("space-around", "center", "column")};
  width: ${({ direction }) => (direction === "row" ? "200px" : "")};
  height: ${({ direction }) => (direction === "row" ? "100px" : "50px")};
`;

const FileInput = styled.input.attrs(() => ({
  id: "fileUpload",
  type: "file",
}))`
  display: none;
`;

const RatingBox = styled.div`
  ${({ theme }) => theme.flex("space-between", "center")}
  width: ${({ num }) => (num ? "80%" : "100%")};
  height: ${({ num }) => (num ? "50%" : "90%")};
`;

const WishBox = styled.div`
  width: 830px;
  height: 740px;
  position: absolute;
  top: -60px;
  right: 0;
  box-shadow: 0 0 14px #b0b0b0;
  background-color: ${({ theme }) => theme.backgroundColor};
  overflow: scroll;
`;

const MenuTitle = styled.div`
  ${({ theme }) => theme.flex(null, "center")};
  height: 60px;
  background-color: white;
  box-shadow: 0 6px 6px #e2e2e2;
  padding: 0 60px;

  div {
    ${({ theme }) => theme.flex(null, "center")};
    width: 240px;
    height: 100%;
  }
`;

const MenuText = styled.span`
  ${({ theme }) => theme.flex(null, "center")};
  height: 100%;
  color: ${({ theme }) => theme.themeBlack};
  font-size: 12px;
  font-weight: 300;
  cursor: pointer;
  border-bottom: ${({ clicked }) => (clicked ? "3px solid #ba1629" : "")};
`;

const ContentBox = styled.div`
  ${({ theme }) => theme.flex("cetner", null, "column")};
  padding: 50px 30px;
`;
