import Header from "../components/common/header";
import Stocktype from "../components/mock investment/stocktype";
import Eachintereststock from "../components/mock investment/eachintereststock";
import ButtomNavigation from "../components/common/bottomNavigation";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";

function Intereststock() {  
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
            "https://heartfolio.site/api/stock/favorites",
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
      <Header />
      <div className="pt-[80px] min-h-screen bg-white">
        <Stocktype />
        {/* 관심종목리스트 */}
        <div className="mx-auto max-w-[390px] pb-[40px]">
          {/* If data array is empty, show the message */}
          {data?.length === 0 ? (
            <div className="max-w-[370px] m-5 text-center mt-10">
              추가한 관심종목이 없습니다
            </div>
          ) : (
            data?.map((stock) => (
              <Eachintereststock
                key={stock.stockId}
                stockId={stock.stockId} // 주식별 고유 아이디(기본키)
                stockKorea={stock.koreanName} // 종목명 한국어
                stockName={stock.englishName} // 종목명
                currentPrice={stock.currentPrice} // 현재가
                earningValue={stock.earningValue} // 전일대비 증가량
                earningRate={stock.earningRate} // 수익률
              />
            ))
          )}
        </div>
      </div>
      <ButtomNavigation />
    </>
  );
}
export default Intereststock;
