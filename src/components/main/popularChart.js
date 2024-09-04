import useFetch from "../../hooks/useFetch";
import EachpopularstockBox from "../commonBox/eachpopularstockBox";

const items = [{ id: 1 }, { id: 2 }, { id: 3 }];

function PopularChart() {
  const { data, error, loading } = useFetch(
    "https://heartfolio.site/api/stock/popular?limit=" + 5
  );

  return (
    <div className="cursor-pointer">
      {/* map을 사용하여 상위 5개 종목 반복 렌더링 */}
      {data?.map((stock) => (
        <EachpopularstockBox
          key={stock.stockId}
          stockId={stock.stockId} //주식별 고유 아이디(기본키)
          rank={stock.rank} //순위
          stockKorea={stock.koreanName} //종목명
          stockName={stock.englishName} //종목명
          currentPrice={stock.currentPrice} //현재가
          earningValue={stock.earningValue} //전일대비 증가량
          earningRate={stock.earningRate} //수익률
        />
      ))}
    </div>
  );
}

export default PopularChart;
