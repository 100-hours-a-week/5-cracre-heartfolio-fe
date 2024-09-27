import Header from "../components/common/header";
import Stocktype from "../components/mock investment/stocktype";
import Eachintereststock from "../components/mock investment/eachintereststock";
import ButtomNavigation from "../components/common/bottomNavigation";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import heartAnimation from "../assets/animations/heart.json";
import alertAnimation from "../assets/animations/alert.json";

function Intereststock() {
  const token = localStorage.getItem("access_token");

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // 데이터 가져오기 상태 관리
  const {data, error, loading} = useFetch(`${process.env.REACT_APP_API_URI}/stock/favorites`);

  return (
    <>
      <Header />
      <div className="pt-[80px] min-h-screen bg-white">
        <Stocktype />
        {/* 관심종목리스트 */}
        <div className="mx-auto max-w-[390px] cursor-pointer h-[720px] overflow-y-auto scrollbar-hide">
          {isAuthenticated ? (
            data?.length === 0 ? (
              <div className="flex flex-col items-center justify-center">
                <div className="w-60 h-60">
                  <Lottie animationData={heartAnimation} loop={true} />
                </div>
                <div className="text-lg text-gray-600">
                  관심있는 종목을 추가해주세요
                </div>
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
            )
          ) : (
            <div className="flex flex-col justify-center items-center h-full">
              <div className="w-80 h-80">
                <Lottie animationData={alertAnimation} loop={true} />
              </div>
              <div className="font-bold text-lg text-gray-400">
                관심종목 등록은 로그인 후 가능합니다.
              </div>
              <a
                href="/login"
                className="pt-5 text-gray-400 hover:text-gray-600"
              >
                로그인 하러가기
              </a>
            </div>
          )}
        </div>
      </div>
      <ButtomNavigation />
    </>
  );
}
export default Intereststock;
