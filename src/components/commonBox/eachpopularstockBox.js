import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 인기종목의 각 주식
export default function EachpopularStockBox(props) {
  const navigate = useNavigate();

  // 각 주식 페이지 이동
  function handleClick(get_id) {
    navigate(`/stock/${get_id}`);
  }

  return (
    <div
      className="flex mx-auto max-w-[350px] m-3 mb-2 bg-white hover:bg-gray-50 flex-col"
      onClick={() => handleClick(props.stockId)}
    >
      <div className="flex">
        {/* 순위 */}
        <p className="text-gray-600 w-10 py-3 text-center content-center font-semibold text-lg">
          {props.rank}
        </p>
        {/* 내용 */}
        <div className="text-gray-600 ml-4 w-[300px]">
          {/* 종목이름 */}
          <h1 className="text-gray-600 text-[15px] font-bold ">
            {props.stockKorea} ({props.stockName})
          </h1>
          {/* 종목정보 */}
          <div className="flex flex-row mt-1">
            {/* 현재가 */}
            <p className="mr-1">{props.currentPrice.toLocaleString()}원</p>
            {/* 전일대비수익 */}
            <div
              className={`mr-1 ${
                props.earningValue > 0
                  ? "text-redColor"
                  : props.earningValue < 0
                  ? "text-blueColor"
                  : "text-gray-600"
              }`}
            >
              {props.earningValue > 0
                ? `+${props.earningValue.toLocaleString()}`
                : `${props.earningValue.toLocaleString()}`}
            </div>

            {/* 수익률 */}
            <div
              className={` mr-1 ${
                props.earningRate > 0
                  ? "text-redColor"
                  : props.earningRate < 0
                  ? "text-blueColor"
                  : "text-gray-600"
              }`}
            >
              ({props.earningRate.toFixed(2)}%)
            </div>
          </div>
        </div>
      </div>
      <div className="border-gray-300 border-[1px] mt-2" />
    </div>
  );
}
