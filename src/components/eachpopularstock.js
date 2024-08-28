import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 인기종목의 각 주식
export default function Eachpopularstock(props) {
  const navigate = useNavigate();

  // 각 주식 페이지 이동
  function handleClick(get_id) {
    navigate(`/stock/${get_id}`);
  }

  return (
    //onClick={handleClick} 아래줄에 넣어주세요!!
    <div
      className="flex flex-row mx-auto max-w-[350px] m-3 bg-white hover:bg-gray-50 "
      onClick={() => handleClick(props.stockId)}
    >
      {/* 순위 */}
      <p className="text-gray-600 w-10 py-3 text-center content-center">{props.rank}</p>
      {/* 내용 */}
      <div className="text-gray-600 ml-4 w-[300px]">
        {/* 종목이름 */}
        <h1 className="text-gray-600 text-[15px]">{props.stockKorea} ({props.stockName})</h1>
        {/* 종목정보 */}
        <div className="flex flex-row mt-1">
          {/* 현재가 */}
          <p className="mr-1">{props.currentPrice.toLocaleString()}</p>
          {/* 전일대비수익 */}
          <div
            className={`mr-1 ${
              props.earningValue > 0
                ? "text-redColor"
                : props.earningValue < 0
                ? "text-blueColor"
                : "text-[#000000]"
            }`}
          >
            {props.earningValue}
          </div>

          {/* 수익률 */}
          <div
            className={` mr-1 ${
              props.earningRate > 0
                ? "text-redColor"
                : props.earningRate < 0
                ? "text-blueColor"
                : "text-[#000000]"
            }`}
          >
            ({props.earningRate}%)
          </div>
        </div>
      </div>
    </div>
  );
}
