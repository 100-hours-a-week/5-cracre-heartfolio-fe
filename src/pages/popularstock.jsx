import Header from "../components/common/header";
import Stocktype from "../components/mock investment/stocktype";
import EachpopularStockBox from "../components/commonBox/eachpopularstockBox";
import ButtomNavigation from "../components/common/bottomNavigation";
import useFetch from "../hooks/useFetch";

function Popularstock() {
  const { data, error, loading } = useFetch(
    `${process.env.REACT_APP_API_URI}/stock/popular?limit=` + 25
  );
  if (loading) {
    return <div className="min-h-screen bg-white text-center">Loading...</div>; // 로딩 중일 때 표시할 내용
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white text-center">
        Error: {error.message}
      </div>
    ); // 에러 발생 시 표시할 내용
  }

  if (!data || data.length === 0) {
    return <div>No data available</div>; // 데이터가 없을 때 표시할 내용
  }

  return (
    <>
      <Header />
      <div className="pt-[80px] min-h-dvh bg-white">
        <Stocktype />
        {/* 인기종목리스트 */}
        <div className="mx-auto max-w-[390px] cursor-pointer overflow-y-auto scrollbar-hide" style={{ height: "calc(100vh - 206px)" }}>
          {/* map을 사용하여 상위 50개 종목 반복 렌더링 */}
          {data?.map((stock) => (
            <EachpopularStockBox
              key={stock.stockId}
              stockId={stock.stockId} //주식별 고유 아이디(기본키)
              rank={stock.rank} //순위
              stockKorea={stock.koreanName}
              stockName={stock.englishName} //종목명
              currentPrice={stock.currentPrice} //현재가
              earningValue={stock.earningValue} //전일대비 증가량
              earningRate={stock.earningRate} //수익률
            />
          ))}
        </div>
      </div>
      <ButtomNavigation />
    </>
  );
}

export default Popularstock;
