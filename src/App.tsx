import { Navigate, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Landing from "./pages/Landing";
import Memory from "./pages/Memory";
import { DataverseConnector } from "@dataverse/dataverse-connector";
import React from "react";

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  align-items: center;
  flex: 1;
`;

function App() {
  return (
    <BodyWrapper>
      <Routes>
        <Route path="/" element={<Navigate to="/landing" />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/app" element={<Memory />} />
      </Routes>
    </BodyWrapper>
  );
}

export default App;
