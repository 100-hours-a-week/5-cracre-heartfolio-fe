import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import HoldingsBox from "./holdingsBox";
import noInfoAnimation from "../../assets/animations/noInfo.json";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import dotLoadingAnimation from "../../assets/animations/dotLoading.json";

function Holdings(props) {
  const navigate = useNavigate();
  // URL 설정
  const url = props.id
    ? `${process.env.REACT_APP_API_URI}/portfolio/totalStocks/${props.id}`
    : `${process.env.REACT_APP_API_URI}/portfolio/totalStocks`;

  // 데이터 가져오기 위한 상태 관리
  const { data, error, loading } = useFetch(url);

  return (
    <>
      {loading ? (
        <Lottie animationData={dotLoadingAnimation} loop={true} />
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
        <>
          <div className="text-xs mb-2 text-right text-gray-600">
            가격 단위(KRW)
          </div>
          <div className="mx-auto max-w-[350px] mb-5 overflow-y-auto scrollbar-hide" style={{ height: "calc(100dvh - 250px)" }}>
            <ul role="list">
              {data.stocks.map((item) => (
                <li key={item.stockId} className="py-2">
                  <HoldingsBox
                    stock_id={item.stockId}
                    onClick={() => {
                      navigate(`/stock/${item.stockId}`);
                    }}
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
        </>
      )}
    </>
  );
}

export default Holdings;
