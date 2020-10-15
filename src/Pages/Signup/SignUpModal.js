import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { Btn } from "../../Components/tool/tool";
import { api } from "../../config/api";

function SignUpModal({
  className,
  onClose,
  maskClosable,
  closable,
  displayModal,
}) {
  const [email, setEmail] = useState("");

  const onMaskClick = (e) => {
    e.target === e.currentTarget && onClose(e);
  };

  const close = (e) => {
    onClose && onClose(e);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const loginWithKakao = () => {
    window.Kakao.Auth.login({
      success: function (authObj) {
        fetch(`${api}/accounts/signin`, {
          headers: { Authorization: authObj.access_token },
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            if (res.Authorization) {
              localStorage.setItem("token", res.Authorization);
              alert("Log-in Successful!");
              close();
            }
          });
      },
      fail: function (err) {
        alert(JSON.stringify(err));
      },
    });
  };

  return (
    <SignUpWrap>
      <ModalOverlay displayModal={displayModal} />
      <ModalWrapper
        className={className}
        displayModal={displayModal}
        onClick={maskClosable ? onMaskClick : null}
      >
        <ModalInner>
          <ModalLeft />
          <ModalRight>
            {closable && <AiOutlineClose style={iconStyle} onClick={close} />}
            <ModalTitle>
              <p>Join PaldoVivino </p> | <span>Log-In</span>
            </ModalTitle>
            <LoginForm>
              <EmailInput
                type="email"
                name="email"
                placeholder="Type your email"
                value={email}
                onChange={handleEmail}
                required
              />
              <ContinueBtn>Continue</ContinueBtn>
              <section>
                <div />
                <p>or</p>
                <div />
              </section>
            </LoginForm>
            <KakaoBtn onClick={loginWithKakao}>Continue with Kakao</KakaoBtn>
            <AppleBtn>Continue with Apple</AppleBtn>
            <FacebookBtn>Continue with Facebook</FacebookBtn>
            <GoogleBtn>Continue with Google</GoogleBtn>
            <SignWrap>
              <p>Don't have a profile?</p>
              <span>Join Vivino</span>
            </SignWrap>
          </ModalRight>
        </ModalInner>
      </ModalWrapper>
    </SignUpWrap>
  );
}

export default SignUpModal;

const SignUpWrap = styled.main``;

SignUpWrap.defaultProps = {
  closable: true,
  maskClosable: true,
  visible: false,
};

const ModalOverlay = styled.div`
  pointer-events: ${({ displayModal }) => (displayModal ? "initial" : "none")};
  opacity: ${({ displayModal }) => (displayModal ? 1 : 0)};
  transition: all 0.25s ease-in;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalWrapper = styled.div`
  width: auto;
  height: auto;
  pointer-events: ${({ displayModal }) => (displayModal ? "initial" : "none")};
  transform: translateY(
    ${({ displayModal }) => (displayModal ? "0" : "700px")}
  );
  opacity: ${({ displayModal }) => (displayModal ? 1 : 0)};
  transition: all 0.25s ease-in;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  outline: 0;
  z-index: 1000;
`;

const ModalInner = styled.div`
  position: relative;
  width: 1008px;
  height: 100%;
  min-width: 1008px;
  max-width: 1008px;
  max-height: 746px;
  border-radius: 8px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  outline: 0;
  ${({ theme }) => theme.flex("flex-start", "flex-start", "row")}
`;

const ModalLeft = styled.div`
  background: url("/images/signin1.jpg") no-repeat;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background-size: cover;
  height: 100%;
  flex: 1.1;
`;

const ModalRight = styled.div`
  flex: 1;
  height: 100%;
  padding: 56px 104px;
  ${({ theme }) => theme.flex("center", "flex-start", "column")}
`;

const ModalTitle = styled.div`
  font-size: 32px;
  font-weight: 300;
  margin-bottom: 40px;
  ${({ theme }) => theme.flex("flex-start", "center", "row")}

  p {
    display: inline-block;
    color: #ba1628;
    font-size: 32px;
    font-weight: 300;
    padding-right: 7px;
  }

  span {
    font-size: 32px;
    font-weight: 900;
    padding-left: 7px;
  }
`;

const LoginForm = styled.form`
  width: 100%;
  section {
    margin-bottom: 48px;
    ${({ theme }) => theme.flex("center", "center", "row")}
  }
  p {
    color: #a8a5a3;
    text-align: center;
    font-weight: 300;
    font-size: 20px;
    margin: 0 8px 13px;
  }
  div {
    width: 167.5px;
    height: 0.1px;
    background-color: #a8a5a3;
  }
`;

const EmailInput = styled.input`
  width: 100%;
  height: 48px;
  border: solid 1px #eae09a;
  font-size: 20px;
  font-weight: 300;
  background-color: #fafafa;
  padding: 8px 8px 8px 16px;
  margin-bottom: 24px;
  border-radius: 4px;
`;

const ContinueBtn = styled(Btn)`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  margin-bottom: 48px;
  font-size: 16px;
  line-height: normal;
  font-weight: 400;
  border: none;
  background-color: #ba1628;
  color: #fff;
  transition: all 0.5s ease;
  :hover {
    background-color: #a11122;
  }
`;

const AppleBtn = styled(ContinueBtn)`
  margin-bottom: 24px;
  background-color: #000;
  text-align: left;
  :hover {
    background-color: #000;
  }
`;
const FacebookBtn = styled(AppleBtn)`
  background-color: #4a659f;
  transition: all 0.5s ease;
  :hover {
    background-color: #3a4f7c;
  }
`;
const GoogleBtn = styled(AppleBtn)`
  color: #a8a5a3;
  background-color: #fff;
  box-shadow: 0 1px 1px 1px #eee6df;
  transition: all 0.5s ease;
  :hover {
    background-color: #f7f7f7;
  }
`;

const KakaoBtn = styled(GoogleBtn)`
  color: black;
  background-color: #fcce00;
`;

const SignWrap = styled.div`
  width: 100%;
  ${({ theme }) => theme.flex("center", "flex-end", "column")}
  p {
    font-size: 16px;
    font-weight: 300;
    color: #111;
  }
  span {
    font-size: 16px;
    font-weight: 400;
    color: #ba1628;
  }
`;

const iconStyle = {
  position: "absolute",
  right: "23px",
  top: "23px",
  width: "32px",
  height: "30px",
  padding: "6px",
  cursor: "pointer",
  color: "#a8a5a3",
  fontWeight: "300",
};
