import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const UnlockContainer = styled.div`
  height: 100%;
  width: 80%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Poppins;
  font-size: 32px;

  .bar {
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: 24px;
    margin: 20px 0 40px 0;
  }
`;

const UnlockBtn = styled.div`
  width: 162px;
  height: 45px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #007aff;
  font-size: 20px;
  text-align: center;
  line-height: 45px;
  color: #fff;
`;

const _shortenWalletAddress = (walletAddress: string) => {
  return `${walletAddress.slice(0, 6)}...${walletAddress.slice(38, 42)}`;
};

export default function Unlock() {
  const { walletAddress } = useParams();
  return (
    <UnlockContainer>
      <div>Unlock</div>
      <div>{_shortenWalletAddress(walletAddress!)}'s</div>
      <div>Attention Analysis</div>
      <div className="bar">
        {" "}
        <div>Price: 0.1 WMATIC</div>
        <div>1/100 Sold</div>
        <div>Subscription fee: $10 / month</div>
      </div>
      <UnlockBtn>Collect NFT</UnlockBtn>
    </UnlockContainer>
  );
}
