import React from "react";
import styled from "styled-components";
import Placeholder from "@public/placeholder.png";
import { LinkPreview } from "@dhaiwat10/react-link-preview";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  border-radius: 14px 14px 14px 14px;
  background: transparent;
  backdrop-filter: blur(2px);
  box-shadow: 0px 0px 15.96172px 0px rgba(0, 0, 0, 0.24);

  .img {
    width: 100%;
    height: 148px;
    border-radius: 14px 14px 0px 0px;
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-wrap: wrap;
    overflow: hidden;
    width: 100%;
    height: 100%;
    padding: 10px 18px 0 8px;

    .title {
      width: 100%;
      font-family: Poppins;
      font-size: 16px;
      word-wrap: break-word;
      margin-bottom: 12px;
    }

    .botton-bar {
      width: 100%;
      height: 20px;
      margin-bottom: 12px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .subTitle {
        font-size: 12px;
        font-family: Poppins;
      }

      .btn {
        cursor: pointer;
        position: relative;
        right: 15px;
      }
    }
  }
`;

interface WebsiteCardProps {
  url: string;
  favicon?: string;
  title: string;
}

export default function WebsiteCard({ url, favicon, title }: WebsiteCardProps) {
  return (
    <CardContainer>
      <img className="img" src={Placeholder} alt="favicon" />
      <div className="container">
        <div className="title">{url}</div>
        <div className="botton-bar">
          <div className="subTitle">{title}</div>
          <svg
            className="btn"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <g clip-path="url(#clip0_10_2242)">
              <path
                d="M8.45878 1.80625L9.91065 5.26625C9.9458 5.35022 10.0032 5.423 10.0767 5.47675C10.1501 5.5305 10.2369 5.56317 10.3275 5.57125L14.0438 5.8925C14.1424 5.90042 14.2364 5.93742 14.314 5.99881C14.3916 6.06019 14.4492 6.14321 14.4796 6.23735C14.5099 6.33149 14.5117 6.43253 14.4846 6.52768C14.4576 6.62283 14.4029 6.70781 14.3275 6.77187L11.5082 9.23125C11.4396 9.29145 11.3887 9.36908 11.3607 9.4559C11.3328 9.54273 11.3289 9.6355 11.3494 9.72437L12.1944 13.3831C12.2167 13.4787 12.2105 13.5787 12.1763 13.6707C12.1422 13.7627 12.0818 13.8427 12.0026 13.9006C11.9233 13.9585 11.8288 13.9918 11.7308 13.9964C11.6328 14.0009 11.5355 13.9765 11.4513 13.9263L8.25753 11.9888C8.17993 11.9416 8.09085 11.9166 8.00003 11.9166C7.90921 11.9166 7.82013 11.9416 7.74253 11.9888L4.54878 13.9263C4.46451 13.9765 4.36731 14.0009 4.26928 13.9964C4.17125 13.9918 4.07673 13.9585 3.9975 13.9006C3.91827 13.8427 3.85784 13.7627 3.82372 13.6707C3.78961 13.5787 3.78332 13.4787 3.80565 13.3831L4.65065 9.72437C4.67119 9.6355 4.66728 9.54273 4.63933 9.4559C4.61138 9.36908 4.56043 9.29145 4.4919 9.23125L1.67253 6.77187C1.59715 6.70781 1.54248 6.62283 1.51541 6.52768C1.48835 6.43253 1.49012 6.33149 1.5205 6.23735C1.55087 6.14321 1.60849 6.06019 1.68607 5.99881C1.76364 5.93742 1.85767 5.90042 1.95628 5.8925L5.67253 5.57125C5.7632 5.56317 5.84994 5.5305 5.9234 5.47675C5.99687 5.423 6.05426 5.35022 6.0894 5.26625L7.54128 1.80625C7.58006 1.71679 7.64414 1.64063 7.72565 1.58713C7.80716 1.53362 7.90253 1.50512 8.00003 1.50512C8.09753 1.50512 8.1929 1.53362 8.27441 1.58713C8.35591 1.64063 8.42 1.71679 8.45878 1.80625Z"
                fill="#007AFF"
                stroke="#007AFF"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_10_2242">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </CardContainer>
  );
}
