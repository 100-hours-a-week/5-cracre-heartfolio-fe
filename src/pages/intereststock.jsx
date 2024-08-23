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

  // 관심 종목 데이터 배열_목업데이터
  // const data = [
  //   {
  //     stockId: 1,
  //     stockName: "Apple Inc.", //종목명
  //     currentPrice: 15000, //현재가
  //     earningValue: 500, //전일대비 증가량
  //     earningRate: "3.45", //수익률
  //   },
  //   {
  //     stockId: 2,
  //     stockName: "Alphabet Inc.",
  //     currentPrice: 27500,
  //     earningValue: 1200,
  //     earningRate: "4.56",
  //   },
  //   {
  //     stockId: 3,
  //     stockName: "Amazon.com Inc.",
  //     currentPrice: 34000,
  //     earningValue: -300,
  //     earningRate: "-0.88",
  //   },
  //   {
  //     stockId: 4,
  //     stockName: "Tesla Inc.",
  //     currentPrice: 42000,
  //     earningValue: 1500,
  //     earningRate: "3.70",
  //   },
  //   {
  //     stockId: 5,
  //     stockName: "Microsoft Corp.",
  //     currentPrice: 29000,
  //     earningValue: 800,
  //     earningRate: "2.83",
  //   },
  //   {
  //     stockId: 6,
  //     stockName: "Meta Platforms Inc.",
  //     currentPrice: 21000,
  //     earningValue: -450,
  //     earningRate: "-2.10",
  //   },
  //   {
  //     stockId: 7,
  //     stockName: "Netflix Inc.",
  //     currentPrice: 18000,
  //     earningValue: 900,
  //     earningRate: "5.26",
  //   },
  //   {
  //     stockId: 8,
  //     stockName: "NVIDIA Corp.",
  //     currentPrice: 35000,
  //     earningValue: 2000,
  //     earningRate: "6.06",
  //   },
  //   {
  //     stockId: 9,
  //     stockName: "Adobe Inc.",
  //     currentPrice: 14000,
  //     earningValue: -200,
  //     earningRate: "-1.41",
  //   },
  //   {
  //     stockId: 10,
  //     stockName: "Intel Corp.",
  //     currentPrice: 10000,
  //     earningValue: 300,
  //     earningRate: "3.00",
  //   },
  // ];
  return (
    <>
      <Header />
      <div className="mt-[80px]">
        <Stocktype />
        {/* 관심종목리스트 */}
        <div className="mx-auto max-w-[390px] pb-[40px]">
          {/* If data array is empty, show the message */}
          {data?.length === 0 ? (
            <div className='max-w-[370px] m-3'>추가한 관심종목이 없습니다</div>
          ) : (
            data?.map((stock) => (
              <Eachintereststock
                key={stock.stockId}
                stockId={stock.stockId} // 주식별 고유 아이디(기본키)
                stockName={stock.stockName} // 종목명
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
