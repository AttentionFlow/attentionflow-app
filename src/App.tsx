import { Navigate, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Landing from "./pages/Landing";
import Memory from "./pages/Memory";
import { DataverseConnector } from "@dataverse/dataverse-connector";
import React from "react";
import Unlock from "./pages/Unlock";

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  align-items: center;
  flex: 1;
`;

const dataverseConnector = new DataverseConnector();

export const DataverseContext = React.createContext(dataverseConnector);

export const WalletContext = React.createContext({});

function App() {
  return (
    <DataverseContext.Provider value={dataverseConnector}>
      <BodyWrapper>
        <Routes>
          <Route path="/" element={<Navigate to="/landing" />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/app/:walletAddress" element={<Memory />} />
          <Route path="/unlock/:walletAddress" element={<Unlock />} />
        </Routes>
      </BodyWrapper>
    </DataverseContext.Provider>
  );
}

export default App;
