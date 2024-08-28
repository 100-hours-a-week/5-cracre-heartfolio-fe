import Header from "../components/header";
import Stocktype from "../components/stocktype";
import Eachintereststock from "../components/eachintereststock";
import ButtomNavigation from "../components/bottomNavigation";
import useFetch from "../hooks/useFetch";

function Intereststock() {
  const { data, error, loading } = useFetch(
    "https://heartfolio.site/api/stock/favorites"
  );

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 내용
  }

  if (error) {
    return <div>Error: {error.message}</div>; // 에러 발생 시 표시할 내용
  }

  if (!data) {
    return <div>No data available</div>; // 데이터가 없을 때 표시할 내용
  }

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
