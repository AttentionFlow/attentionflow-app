import React from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const MemoryContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 0;
`;

export default function Memory() {
  return (
    <MemoryContainer>
      <Header />
      <Tabs
        value={0}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Favorites" />
        <Tab label="Footprints" />
      </Tabs>
    </MemoryContainer>
  );
}
