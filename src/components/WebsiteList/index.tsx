import { convertTimestampToDate } from "../../utils";
import React from "react";
import styled from "styled-components";
import Divider from "../Divider";

const WebsiteListContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  font-family: Poppins;
  .title {
    width: 30%;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    overflow: hidden;
  }
  .time {
    width: 10%;
  }

  .subText {
    color: #666;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    max-width: 300px;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    overflow: hidden;
  }
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
      <div className="title">{title}</div>
      <div className="subText">{url}</div>
      <div className="time">{convertTimestampToDate(usageTime)}</div>
    </WebsiteListContainer>
  );
}
