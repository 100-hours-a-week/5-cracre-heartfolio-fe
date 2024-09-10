import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import HoldingsBox from "./holdingsBox";
import noInfoAnimation from "../../assets/animations/noInfo.json";
import Lottie from "lottie-react";

function Holdings() {
  const token = localStorage.getItem("access_token");
  // 데이터 가져오기 상태 관리
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // 데이터 가져오기 시작 전에 로딩 상태 설정
      try {
        const response = await fetch(
          "https://heartfolio.site/api/portfolio/totalStocks",
          {
            headers: {
              Authorization: `Bearer ${token}`, // 토큰을 헤더에 추가
              "Content-Type": "application/json", // 선택 사항, API 요구 사항에 따라 설정
            },
          }
        );

        if (!response.ok) {
          throw new Error(response.statusText); // 응답이 정상적이지 않으면 에러 발생
        }

        const result = await response.json();
        setData(result); // 가져온 데이터를 상태에 설정
      } catch (err) {
        setError(err); // 에러 발생 시 상태에 설정
      } finally {
        setLoading(false); // 데이터 가져오기 완료 후 로딩 상태 해제
      }
    };

    fetchData();
  }, [token]);

  return (
    <>
      {loading ? (
        <div className="mx-auto max-w-[350px] py-4 pb-8 min-h-screen bg-white">
          <div className="text-center text-gray-500">로딩 중...</div>
        </div>
      ) : !data ||
        Object.keys(data).length === 0 ||
        !data.stocks ||
        data.stocks.length === 0 ? (
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
