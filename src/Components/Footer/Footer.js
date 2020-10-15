import React from "react";
import styled from "styled-components";
import STATIC from "../Nav/static";

const Footer = () => {
  return (
    <FooterBody>
      <FooterWrap>
        <TopWrap>
          <Top>
            <p>
              Trusted by millions to discover and buy the right wine every time.
            </p>
            <IconWrap>
              {STATIC.FOOTER_DESCRIPTION.map((el, idx) => (
                <IconBox>
                  <img alt={el.alt} src={el.src} key={idx} />
                  <IconText>{el.text}</IconText>
                </IconBox>
              ))}
            </IconWrap>
          </Top>
        </TopWrap>
        <BottomWrap>
          <Bottom>
            <DownloadPayWrap>
              <Download>
                <img src="/images/applestore.svg" alt="appledownload" />
                <img src="/images/googleplay.svg" alt="googledownload" />
              </Download>
              <Payment>
                <PayWrap>
                  {STATIC.PAYMENT.map((el, idx) => (
                    <img alt={el.alt} src={el.src} key={idx} />
                  ))}
                </PayWrap>
                <PayText>Payment options will vary by merchant</PayText>
              </Payment>
            </DownloadPayWrap>
            <Legal>
              L’abus d’alcool est dangereux pour le santé. À consommer avec
              modération.
            </Legal>
            <SitemapWrap>
              <SitemapLeft>
                <img
                  alt="icon"
                  src="/images/icon.png"
                  style={{ width: "40px", marginRight: "24px" }}
                ></img>
                <Sitemap>
                  {STATIC.FOOTERSITEMAP.map((sitemap, idx) => {
                    return <li key={idx}>{sitemap}</li>;
                  })}
                </Sitemap>
              </SitemapLeft>
              <SitemapRight>
                <ShareBtn>
                  <img alt="instagram" src="/images/instagram.svg"></img>
                  <img alt="facebook" src="/images/facebook.svg"></img>
                  <img alt="twitter" src="/images/twitter.svg"></img>
                </ShareBtn>
                <p>© Vivino 2020</p>
              </SitemapRight>
            </SitemapWrap>
          </Bottom>
        </BottomWrap>
      </FooterWrap>
    </FooterBody>
  );
};

export default Footer;

const FooterBody = styled.footer`
  display: fixed;
  bottom: 0px;
  margin: 0 auto;
  width: 100%;
`;

const FooterWrap = styled.div`
  height: 455px;
  width: 100%;
  border-top: 1px solid #e4e4e4;
  background-color: #f7f3f0;
  color: #1e1e1e;
  ${({ theme }) => theme.flex("center", "center", "column")}
`;

const TopWrap = styled.section`
  width: 100%;
  height: 50%;
  ${({ theme }) => theme.flex("center", "center", "row")}
`;

const Top = styled.div`
  flex: 1;
  width: 100%;
  max-width: 1216px;
  margin: 0 auto;
  padding: 32px 0 56px;

  p {
    font-size: 32px;
    font-weight: 900;
    line-height: normal;
    margin: 16px 0 24px;
  }
`;

const IconWrap = styled.div`
  ${({ theme }) => theme.flex("space-between", "center", "row")}
`;

const IconBox = styled.span`
  width: 256px;
  margin: 8px 0;
  ${({ theme }) => theme.flex("flex-start", "center", "row")}
`;

const IconText = styled.span`
  max-width: 192px;
  font-size: 16px;
  line-height: 1.53846;
  margin-left: 16px;
`;

const BottomWrap = styled.section`
  width: 100%;
  height: 50%;
  background-color: #eae0da;
  ${({ theme }) => theme.flex("center", "center", "row")}
`;

const Bottom = styled.div`
  flex: 1;
  width: 100%;
  max-width: 1216px;
  margin: 0 auto;
  padding: 24px 0;
`;

const DownloadPayWrap = styled.div`
  ${({ theme }) => theme.flex("space-between", "flex-start", "row")}
`;
const Download = styled.div`
  img {
    padding-right: 10px;
  }
`;
const Payment = styled.div``;
const PayWrap = styled.div`
  img {
    margin-left: 16px;
  }
`;
const PayText = styled.div`
  margin-top: 8px;
  font-family: "LatoLatinWeb", "Verdana", sans-serif;
  font-size: 11px;
  line-height: normal;
  font-weight: 300;
  color: #9da5a6;
  text-align: right;
`;
const Legal = styled.div`
  font-family: "LatoLatinWeb", "Verdana", sans-serif;
  font-size: 11px;
  margin-top: 8px;
  line-height: normal;
  font-weight: 300;
  color: #9da5a6;
  text-align: right;
`;
const SitemapWrap = styled.div`
  margin-top: 32px;
  ${({ theme }) => theme.flex("space-between", "center", "row")}
`;

const SitemapLeft = styled.div`
  ${({ theme }) => theme.flex("flex-start", "center", "row")}
`;

const Sitemap = styled.ul`
  max-width: 1051px;
  ${({ theme }) => theme.flex("flex-start", "center", "row")}
  flex-wrap: wrap;

  li {
    margin: 0 24px 8px 0;
    font-size: 12px;
    line-height: normal;
    font-weight: 400;
  }
`;

const SitemapRight = styled.div`
  p {
    font-family: "LatoLatinWeb", "Verdana", sans-serif;
    font-size: 11px;
    line-height: normal;
    font-weight: 300;
    color: #9da5a6;
    text-align: right;
  }
`;

const ShareBtn = styled.div`
  ${({ theme }) => theme.flex("flex-start", "center", "row")}

  img {
    margin: 16px 0 0 16px;
  }
`;
