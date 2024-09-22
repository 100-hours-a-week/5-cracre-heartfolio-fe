import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import HoldingsBox from "./holdingsBox";
import noInfoAnimation from "../../assets/animations/noInfo.json";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";

function Holdings() {
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  // 데이터 가져오기 상태 관리
  const {data, error, loading} = useFetch(`${process.env.REACT_APP_API_URI}/portfolio/totalStocks`)

  return (
    <>
      {loading ? (
        <div className="mx-auto max-w-[350px] py-4 pb-8 min-h-screen bg-white">
          <div className="text-center text-gray-500">로딩 중...</div>
        </div>
      ) : !data || !data.stocks || data.stocks.length === 0 ? (
        <div className="flex flex-col items-center h-screen max-h-[500px]">
          <div className="w-80 h-80">
            <Lottie animationData={noInfoAnimation} loop={true} />
          </div>
          <div className="text-lg text-gray-600">보유 종목이 없습니다.</div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500">
          에러가 발생했습니다: {error.message}
        </div>
      ) : (
        <div className="mx-auto max-w-[350px] pb-8">
          <div className="text-xs mb-2 text-right text-gray-600">
            가격 단위(KRW)
          </div>
          <ul role="list">
            {data.stocks.map((item) => (
              <li key={item.stockId} className="py-2">
                <HoldingsBox
                  stock_id={item.stockId}
                  onClick={()=>{navigate(`/stock/${item.stockId}`)}}
                  name={item.name}
                  evalProfit={item.evalProfit}
                  evalValue={item.evalValue}
                  profitPercentage={item.profitPercentage}
                  purchaseAvgPrice={item.purchaseAvgPrice}
                  totalPurchasePrice={item.totalPurchasePrice}
                  totalQuantity={item.totalQuantity}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Holdings;
