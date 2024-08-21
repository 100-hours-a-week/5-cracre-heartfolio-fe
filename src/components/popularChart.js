import PopularStockBox from "./box/popularStockBox";
import Eachpopularstock from "./eachpopularstock";

const items = [{ id: 1 }, { id: 2 }, { id: 3 }];

function PopularChart() {
  // const {popular_data, error, loading} = useFetch("https://heartfolio.site/api/stock/popular?limit={limit}");

  // 인기 종목 데이터 배열
  const popular_data = {
    data: [
      {
        stockId: 1, //주식별 종목 아이디
        rank: 1, //순위
        stockName: "Apple Inc.", //종목명
        currentPrice: 13500, //현재가
        earningValue: -150, //전일대비 증가량
        earningRate: -3.5, //수익률
      },
      {
        stockId: 2,
        rank: 2,
        stockName: "NVIDIA",
        currentPrice: 14500,
        earningValue: 100,
        earningRate: 1.5,
      },
      {
        stockId: 3,
        rank: 3,
        stockName: "Microsoft Corp.",
        currentPrice: 25000,
        earningValue: -200,
        earningRate: -0.8,
      },
      {
        stockId: 4,
        rank: 4,
        stockName: "Tesla Inc.",
        currentPrice: 42000,
        earningValue: 500,
        earningRate: 1.2,
      },
      {
        stockId: 5,
        rank: 5,
        stockName: "Amazon.com Inc.",
        currentPrice: 34000,
        earningValue: 600,
        earningRate: 1.9,
      },
      {
        stockId: 6,
        rank: 6,
        stockName: "Alphabet Inc.",
        currentPrice: 30000,
        earningValue: 350,
        earningRate: 2.3,
      },
      {
        stockId: 7,
        rank: 7,
        stockName: "Meta Platforms Inc.",
        currentPrice: 21000,
        earningValue: -80,
        earningRate: -0.5,
      },
      {
        stockId: 8,
        rank: 8,
        stockName: "Netflix Inc.",
        currentPrice: 18000,
        earningValue: 120,
        earningRate: 0.7,
      },
      {
        stockId: 9,
        rank: 9,
        stockName: "Adobe Inc.",
        currentPrice: 14000,
        earningValue: 90,
        earningRate: 0.6,
      },
      {
        stockId: 10,
        rank: 10,
        stockName: "Intel Corp.",
        currentPrice: 10000,
        earningValue: 50,
        earningRate: 0.5,
      },
    ],
  };

  // 상위 25개의 종목만 선택
  const top5Stocks = popular_data.data.slice(0, 5);

  return (
    <div className="py-10">
      <div className="flex justify-between">
        <div className="text-lg ml-[10px]">오늘의 인기 차트</div>
        <div className="text-sm py-1 float-right mr-[5px] pt-[10px]">더보기</div>
      </div>
      <div className="mx-auto max-w-[390px] pb-[40px] mt-[6px] border-t border-gray-300">
        {/* map을 사용하여 상위 25개 종목 반복 렌더링 */}
        {top5Stocks.map((stock) => (
          <Eachpopularstock
            key={stock.stockId}
            stockId={stock.stockId} //주식별 고유 아이디(기본키)
            rank={stock.rank} //순위
            stockName={stock.stockName} //종목명
            currentPrice={stock.currentPrice} //현재가
            earningValue={stock.earningValue} //전일대비 증가량
            earningRate={stock.earningRate} //수익률
          />
        ))}
      </div>
    </div>
  );
}

export default PopularChart;
