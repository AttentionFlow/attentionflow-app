import React from "react";
import styled from "styled-components";
import AppLogo from "@public/title.svg";
import BgColorful from "@public/bg-colorful.svg";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    attentionflow: {
      getAttentionRecord: () => Promise<any>;
    };
  }
}

const LandingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  background-color: #eeeae2;
`;

const TitleText = styled.h1`
  font-size: 36px;
  line-height: 51px;
  font-weight: 400;
  font-family: Lato;
  text-align: center;
  margin: 0 0 24px 12px;
`;

const Logo = styled.img`
  width: 450px;
  height: 150px;
`;

const Container = styled.div`
  display: flex;
  position: absolute;
  top: 60px;
  left: 150px;
`;

const SubTitleText = styled.h2`
  color: #232325;
  font-family: DINCond-Bold;
  font-size: 96px;
  font-style: normal;
  font-weight: 400;
  position: absolute;
  top: 240px;
  left: 150px;
`;

const BgColorfulImg = styled.img`
  z-index: 0;
  position: absolute;
  top: -250px;
  right: -360px;
`;

const Btn = styled.button`
  width: auto;
  padding: 0 24px;
  height: 56px;
  border-radius: 10px;
  border: 1px solid #232325;
  background: #fff;
  box-shadow: 2px 3px 0px 0px rgba(0, 0, 0, 0.25);
  position: absolute;
  bottom: 120px;
  left: 150px;
  font-family: Poppins;
  font-size: 20px;
  &:hover {
    cursor: pointer;
  }
`;

export default function Landing() {
  const isExtensionInstalled = (): boolean => {
    return window.attentionflow !== undefined;
  };

  const navigate = useNavigate();

  return (
    <LandingContainer>
      <BgColorfulImg src={BgColorful} />
      <Container>
        <Logo src={AppLogo} />
        {/* <TitleText>AttentionFlow</TitleText> */}
      </Container>
      <SubTitleText>
        UNLEASH
        <br /> THE VALUE OF <br />
        YOUR ATTENTION.
      </SubTitleText>
      {isExtensionInstalled() ? (
        <Btn
          onClick={() => {
            navigate("/app");
          }}
        >
          Enter App
        </Btn>
      ) : (
        <Btn
          onClick={() => {
            navigate("/app");
          }}
        >
          Install Extension
        </Btn>
      )}
    </LandingContainer>
  );
}
