import useFetch from "../hooks/useFetch";
import HoldingsBox from "./box/holdingsBox";

function Holdings() {
  // const holdings_data = [
  //   {
  //     stockId: 1,
  //     name: "Apple",
  //     totalQuantity: 300,
  //     purchaseAvgPrice: 3500,
  //     totalPurchasePrice: 105000,
  //     evalValue: 103200,
  //     evalProfit: -1800,
  //     profitPercentage: -1.69,
  //   },
  //   {
  //     stockId: 2,
  //     name: "NVIDIA",
  //     totalQuantity: 200,
  //     purchaseAvgPrice: 5000,
  //     totalPurchasePrice: 100000,
  //     evalValue: 108200,
  //     evalProfit: 8200,
  //     profitPercentage: 8.2,
  //   },
  //   {
  //     stockId: 3,
  //     name: "SamSung",
  //     totalQuantity: 500,
  //     purchaseAvgPrice: 60000,
  //     totalPurchasePrice: 30000000,
  //     evalValue: 31500000,
  //     evalProfit: 1500000,
  //     profitPercentage: 5,
  //   },
  //   {
  //     stockId: 4,
  //     name: "Tesla",
  //     totalQuantity: 100,
  //     purchaseAvgPrice: 70000,
  //     totalPurchasePrice: 7000000,
  //     evalValue: 6800000,
  //     evalProfit: -200000,
  //     profitPercentage: -2.86,
  //   },
  //   {
  //     stockId: 5,
  //     name: "Amazon",
  //     totalQuantity: 150,
  //     purchaseAvgPrice: 3200,
  //     totalPurchasePrice: 480000,
  //     evalValue: 500000,
  //     evalProfit: 20000,
  //     profitPercentage: 4.17,
  //   },
  // ];
  const { data, error, loading } = useFetch(
    "https://heartfolio.site/api/portfolio/totalStocks"
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
