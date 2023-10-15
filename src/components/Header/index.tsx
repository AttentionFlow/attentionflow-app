import React from "react";
import styled from "styled-components";
import TitleImg from "@public/title.svg";

const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const HeaderTitle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 140px;
  font-size: 20px;
  font-family: Lato;
  line-height: 80px;

  .img {
    width: 180px;
    height: 80px;
    margin: 0 8px 0 0;
  }
`;

const MonetizeBtn = styled.div`
  font-size: 20px;
  font-family: Poppins;
  line-height: 80px;
  color: #007aff;
  cursor: pointer;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderTitle>
        <img className="img" src={TitleImg} alt="logo" />
        {/* <div>AttentionFlow</div> */}
      </HeaderTitle>
      <MonetizeBtn>Monetize your space</MonetizeBtn>
    </HeaderContainer>
  );
}
