import { convertTimestampToDate } from "../../utils";
import React from "react";
import styled from "styled-components";

const WebsiteListContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

interface WebsiteListProps {
  url: string;
  favicon?: string;
  title: string;
  usageTime: number;
}

export default function WebsiteList({
  url,
  favicon,
  title,
  usageTime,
}: WebsiteListProps) {
  return (
    <WebsiteListContainer>
      <div>{title}</div>
      <div>{url}</div>
      <div>{convertTimestampToDate(usageTime)}</div>
    </WebsiteListContainer>
  );
}
