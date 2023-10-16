import React, { useContext, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Divider from "../../components/Divider";
import WebsiteCard from "../../components/WebsiteCard";
import WebsiteList from "../../components/WebsiteList";
import { PieChart } from "@mui/x-charts/PieChart";
import Pie from "@public/pie.svg";
import { convertTimestampToDate, extractDomain } from "../../utils";
import { DataverseContext } from "../../App";
import { WalletProvider } from "@dataverse/wallet-provider";
import {
  WALLET,
  SYSTEM_CALL,
  RESOURCE,
  Currency,
} from "@dataverse/dataverse-connector";

const MemoryContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 0;
  margin: 0 10vw 0 10vw;

  .date-bar {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 40px;
    justify-content: space-between;
    margin-top: 45px;
    margin-bottom: 26px;
  }

  .stats-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 30px;
    margin-bottom: 26px;
  }

  .img {
    width: 100%;
  }
`;

const Date = styled.div`
  color: #232325;
  font-family: Poppins;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const ChooseDateBtn = styled.div`
  color: #232325;
  text-align: right;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const BigStats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: Poppins;

  .number {
    color: #232325;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .text {
    color: #232325;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

const Subtitle = styled.div`
  color: #232325;
  font-family: Poppins;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const ShowMoreBtn = styled.div`
  color: #666;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 15px;
  row-gap: 15px;
`;

export interface AttentionRecord {
  bookmarks: {
    url: string;
    title: string;
    category: string;
    folder: string;
    addedAt: number;
  }[];
  history: {
    url: string;
    category: string;
    visitCount: number;
    lastVisit: number;
    visitDuration: number;
  }[];
}

const MonetizeBtn = styled.div`
  font-size: 20px;
  font-family: Poppins;
  line-height: 80px;
  color: #007aff;
  cursor: pointer;
  position: fixed;
  top: 0;
`;

export default function Memory() {
  const [date, setDate] = React.useState(0);
  const [attentionRecord, setAttentionRecord] = React.useState<AttentionRecord>(
    {
      bookmarks: [],
      history: [],
    } as AttentionRecord
  );

  React.useEffect(() => {
    const fetchAttentionRecord = async () => {
      const response = await window.attentionflow.getAttentionRecord();
      console.log(response);
      setAttentionRecord(response);
    };
    fetchAttentionRecord();
  }, []);

  const dataverseConnector = useContext(DataverseContext);
  const [provider, setProvider] = useState<WalletProvider>();
  const [wallet, setWallet] = useState<WALLET>(WALLET.PARTICLE);
  const [appId, setAppId] = useState<string>(
    "8760167a-0514-4974-9dee-e7383c16dc1a"
  );
  const [pkh, setPkh] = useState<string>();
  const [streamId, setStreamId] = useState<string>();
  const [indexFileId, setIndexFileId] = useState<string>();
  const modelId =
    "kjzl6hvfrbw6c55avcny9cx0jogqv2hfif5h8taww9hpbno2hezm5tluizoohwg";

  const switchNetwork = async () => {
    if (!dataverseConnector?.isConnected) {
      console.error("please connect wallet first");
      const provider = new WalletProvider();
      const res = await dataverseConnector.connectWallet({
        ...(wallet !== WALLET.EXTERNAL_WALLET && {
          wallet: wallet,
          preferredAuthType: "twitter",
        }),
        provider,
      });
      console.log({ res });
    }

    await provider?.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x13881" }],
    });
  };

  React.useEffect(() => {
    console.log({ pkh });
  }, [pkh]);

  const createCapability = async () => {
    const pkh = await dataverseConnector.runOS({
      method: SYSTEM_CALL.createCapability,
      params: {
        appId,
        resource: RESOURCE.CERAMIC,
      },
    });
    setPkh(pkh);
    console.log(pkh);
    return pkh;
  };

  const createStream = async () => {
    const date = new window.Date().toISOString();
    const encrypted = JSON.stringify({
      content: false,
    });

    // console.log(JSON.stringify(attentionRecord));

    const res = await dataverseConnector.runOS({
      method: SYSTEM_CALL.createStream,
      params: {
        modelId,
        streamContent: {
          appVersion: "0.0.1",
          content: JSON.stringify(attentionRecord),
          createdAt: date,
          updatedAt: date,
          encrypted,
        },
      },
    });

    console.log({ res });

    setStreamId(res.streamId);
    setIndexFileId(res.streamContent.file.indexFileId);
    return {
      streamId: res.streamId,
      indexFileId: res.streamContent.file.indexFileId,
    };
  };

  const getProfileId = async ({
    pkh,
    lensNickName,
  }: {
    pkh: string;
    lensNickName?: string;
  }) => {
    const lensProfiles = await dataverseConnector.getProfiles(
      pkh.slice(pkh.lastIndexOf(":") + 1)
    );

    let profileId;
    if (lensProfiles?.[0]?.id) {
      profileId = lensProfiles?.[0]?.id;
    } else {
      if (!lensNickName) {
        throw "Please pass in lensNickName";
      }
      if (!/^[\da-z]{5,26}$/.test(lensNickName) || lensNickName.length > 26) {
        throw "Only supports lower case characters, numbers, must be minimum of 5 length and maximum of 26 length";
      }
      profileId = await dataverseConnector.createProfile(lensNickName);
    }

    return profileId;
  };

  const monetizeFile = async (
    pkh: string,
    streamId: string,
    indexFileId: string
  ) => {
    try {
      if (!pkh) {
        throw "You must connect capability";
      }
      const profileId = await getProfileId({
        pkh,
        lensNickName: "xiangyu123",
      });

      const res = await dataverseConnector.runOS({
        method: SYSTEM_CALL.monetizeFile,
        params: {
          ...(indexFileId ? { indexFileId } : { streamId }),
          datatokenVars: {
            profileId,
            collectLimit: 100,
            amount: 0.0001,
            currency: Currency.WMATIC,
          },
          // decryptionConditions: [
          //   [
          //     {
          //       conditionType: "evmBasic",
          //       contractAddress: "",
          //       standardContractType: "",
          //       chain: "filecoin",
          //       method: "",
          //       parameters: [":userAddress"],
          //       returnValueTest: {
          //         comparator: "=",
          //         value: "0xd10d5b408A290a5FD0C2B15074995e899E944444",
          //       },
          //     },
          //     { operator: "or" },
          //     {
          //       conditionType: "evmBasic",
          //       contractAddress: "",
          //       standardContractType: "",
          //       chain: "filecoin",
          //       method: "",
          //       parameters: [":userAddress"],
          //       returnValueTest: {
          //         comparator: "=",
          //         value: "0x3c6216caE32FF6691C55cb691766220Fd3f55555",
          //       },
          //     },
          //   ] as any,
          // ], // Only sell to specific users
        },
      });

      console.log(res);
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const handle = async () => {
    await switchNetwork();
    const pkh = await createCapability();
    const { streamId, indexFileId } = await createStream();
    await monetizeFile(pkh, streamId, indexFileId);
  };

  const _sum = () => {
    let sum = 0;
    attentionRecord.history.map((record) => {
      sum += record.visitDuration;
    });
    return sum;
  };

  const _getTop5 = () => {
    let top5 = [];
    attentionRecord.history.map((record) => {
      top5.push(record);
    });
    top5.sort((a, b) => {
      return b.visitDuration - a.visitDuration;
    });
    console.log({ top5 });
    return top5.slice(0, 5);
  };

  return (
    <MemoryContainer>
      <Header />
      <MonetizeBtn
        onClick={() => {
          handle();
        }}
      >
        Monetize your space
      </MonetizeBtn>
      <MemoryContainer>
        <div className="date-bar">
          <Date>Today</Date>
          <ChooseDateBtn>Choose Date</ChooseDateBtn>
        </div>
        <Divider />
        <div className="stats-container">
          <BigStats>
            <div className="number">
              {attentionRecord.bookmarks && attentionRecord.history.length}
            </div>
            <div className="text">Websites</div>
          </BigStats>
          <BigStats>
            <div className="number">{convertTimestampToDate(_sum())}</div>
            <div className="text">Usage time</div>
          </BigStats>
          {/* <PieChart
            series={[
              {
                data: [
                  { value: 10, color: "#FF3B30" },
                  { value: 20, color: "#FF9500" },
                  { value: 10, color: "#FF3B30" },
                  { value: 20, color: "#FF9500" },
                  { value: 10, color: "#FF3B30" },
                  { value: 20, color: "#FF9500" },
                ],
                innerRadius: 30,
                outerRadius: 100,
                paddingAngle: 5,
                cornerRadius: 5,
                startAngle: -90,
                endAngle: 180,
                // cx: 150,
                // cy: 150,
              },
            ]}
          /> */}
        </div>
        <img className="img" src={Pie} />
        <div className="date-bar">
          <Subtitle>
            New favorites ({attentionRecord.bookmarks.length})
          </Subtitle>
          <ShowMoreBtn>Show More</ShowMoreBtn>
        </div>
        <CardGrid>
          {attentionRecord.bookmarks.map((record) => {
            return <WebsiteCard url={record.url} title={record.title} />;
          })}
        </CardGrid>
        <div className="date-bar">
          <Subtitle>Longest using websites ( 1-5 )</Subtitle>
        </div>
        {_getTop5().map((record) => {
          return (
            <WebsiteList
              url={record.url}
              title={extractDomain(record.url)}
              usageTime={record.visitDuration}
            />
          );
        })}
        <div className="date-bar">
          <Subtitle>History ( {attentionRecord.history.length} )</Subtitle>
          <ShowMoreBtn>Show More</ShowMoreBtn>
        </div>
        {attentionRecord.history.map((record) => {
          return (
            <>
              <WebsiteList
                url={record.url}
                title={extractDomain(record.url)}
                usageTime={record.lastVisit}
              />
              <Divider />
            </>
          );
        })}
      </MemoryContainer>
    </MemoryContainer>
  );
}
