import useFetch from "../hooks/useFetch";
import Eachpopularstock from "./eachpopularstock";

const items = [{ id: 1 }, { id: 2 }, { id: 3 }];

function PopularChart() {
  const { data, error, loading } = useFetch(
    "https://heartfolio.site/api/stock/popular?limit=" + 5
  );

  return (
    <div className="py-10">
      <div className="flex justify-between">
        <div className="text-lg ml-[10px] text-gray-600 font-bold text-xl">오늘의 인기 차트</div>
        <a href="/popularstock">
          <div className="text-sm py-1 float-right mr-[5px] pt-[10px] text-gray-600">
            더보기
          </div>
        </a>
      </div>
      <div className="mx-auto max-w-[390px] pb-[40px] mt-[6px] border-t border-gray-300">
        {/* map을 사용하여 상위 5개 종목 반복 렌더링 */}
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
  );
}

export default PopularChart;
