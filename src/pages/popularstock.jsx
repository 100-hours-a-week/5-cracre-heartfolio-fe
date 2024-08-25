import Header from "../components/header";
import Stocktype from "../components/stocktype";
import Eachpopularstock from "../components/eachpopularstock";
import ButtomNavigation from "../components/bottomNavigation";
import useFetch from "../hooks/useFetch";

function Popularstock() {
  const { data, error, loading } = useFetch(
    "https://heartfolio.site/api/stock/popular?limit=" + 50
  );
  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 내용
  }

  if (error) {
    return <div>Error: {error.message}</div>; // 에러 발생 시 표시할 내용
  }

  if (!data || data.length === 0) {
    return <div>No data available</div>; // 데이터가 없을 때 표시할 내용
  }
  
  return (
    <>
      <Header />
      <div className="mt-[80px]">
        <Stocktype />
        {/* 인기종목리스트 */}
        <div className="mx-auto max-w-[390px] pb-[40px] mt-[10px]">
          {/* map을 사용하여 상위 25개 종목 반복 렌더링 */}
          {data?.map((stock) => (
            <Eachpopularstock
              key={stock.stockId}
              stockId={stock.stockId} //주식별 고유 아이디(기본키)
              rank={stock.rank} //순위
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
