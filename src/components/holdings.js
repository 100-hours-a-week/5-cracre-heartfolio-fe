import useFetch from "../hooks/useFetch";
import HoldingsBox from "./box/holdingsBox";

function Holdings() {
  const token = localStorage.getItem("access-token");
  const { data, error, loading } = useFetch(
    "https://heartfolio.site/api/portfolio/totalStocks",
    {
      headers: {
        Authorization: `Bearer ${token}`, // 토큰을 헤더에 추가
        "Content-Type": "application/json", // 선택 사항, API 요구 사항에 따라 설정
      },
    }
  );
  return (
    <>
      <div className="mx-auto max-w-[350px] py-4 pb-8">
        <div className="text-xl">보유 종목(KRW)</div>
        {data?.length === 0 ? (
          <div className="text-center text-gray-500">보유 종목이 없습니다.</div>
        ) : (
          <ul role="list">
            {data?.stocks.map((item) => (
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
        )}
      </div>
    </>
  );
}

export default Holdings;
