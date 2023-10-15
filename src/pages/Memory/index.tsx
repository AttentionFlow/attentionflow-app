import React from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Divider from "../../components/Divider";
import WebsiteCard from "../../components/WebsiteCard";
import WebsiteList from "../../components/WebsiteList";
import attentionRecord from "./mock/websites.json";
import { PieChart } from "@mui/x-charts/PieChart";
import Pie from "@public/pie.svg";
import { convertTimestampToDate, extractDomain } from "../../utils";

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

export default function Memory() {
  const [date, setDate] = React.useState(0);

  React.useEffect(() => {
    const fetchAttentionRecord = async () => {
      const response = await window.attentionflow.getAttentionRecord();
      console.log(response);
    };
    fetchAttentionRecord();
  }, []);

  const _sum = () => {
    let sum = 0;
    attentionRecord.AttentionRecord.History.map((record) => {
      sum += record.visitDuration;
    });
    return sum;
  };

  const _getTop5 = () => {
    let top5 = [];
    attentionRecord.AttentionRecord.History.map((record) => {
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
      <MemoryContainer>
        <div className="date-bar">
          <Date>Today</Date>
          <ChooseDateBtn>Choose Date</ChooseDateBtn>
        </div>
        <Divider />
        <div className="stats-container">
          <BigStats>
            <div className="number">
              {attentionRecord.AttentionRecord.Bookmarks.length}
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
            New favorites ({attentionRecord.AttentionRecord.Bookmarks.length})
          </Subtitle>
          <ShowMoreBtn>Show More</ShowMoreBtn>
        </div>
        <CardGrid>
          {attentionRecord.AttentionRecord.Bookmarks.map((record) => {
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
          <Subtitle>
            History ( {attentionRecord.AttentionRecord.History.length} )
          </Subtitle>
          <ShowMoreBtn>Show More</ShowMoreBtn>
        </div>
        {attentionRecord.AttentionRecord.History.map((record) => {
          return (
            <WebsiteList
              url={record.url}
              title={extractDomain(record.url)}
              usageTime={record.lastVisit}
            />
          );
        })}
      </MemoryContainer>
    </MemoryContainer>
  );
}
