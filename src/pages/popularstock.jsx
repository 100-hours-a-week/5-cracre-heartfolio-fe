import Header from "../components/header";
import Stocktype from "../components/stocktype";
import Eachpopularstock from "../components/eachpopularstock";
import ButtomNavigation from "../components/bottomNavigation";

function Popularstock() {

  // const {data, error, loading} = useFetch("http://localhost:8080/api//api/stock/popular?limit={limit}");

  // 인기 종목 데이터 배열
  const popular_data = {
    "data": [
      {
        "stock_id": 1,
        "stock_name": "Apple Inc.",
        "earningRate": 3.5
      },
      {
        "stock_id": 2,
        "stock_name": "NVIDIA",
        "earningRate": 1.5
      },
      {
        "stock_id": 3,
        "stock_name": "Tesla, Inc.",
        "earningRate": 4.2
      },
      {
        "stock_id": 4,
        "stock_name": "Amazon.com Inc.",
        "earningRate": 2.8
      },
      {
        "stock_id": 5,
        "stock_name": "Microsoft Corporation",
        "earningRate": -0.5
      },
      {
        "stock_id": 6,
        "stock_name": "Alphabet Inc.",
        "earningRate": 0.8
      },
      {
        "stock_id": 7,
        "stock_name": "Meta Platforms, Inc.",
        "earningRate": 3.1
      },
      {
        "stock_id": 8,
        "stock_name": "Netflix, Inc.",
        "earningRate": -1.2
      },
      {
        "stock_id": 9,
        "stock_name": "Intel Corporation",
        "earningRate": 2.0
      },
      {
        "stock_id": 10,
        "stock_name": "Advanced Micro Devices, Inc.",
        "earningRate": 1.7
      }
    ]
  }
  

  // 상위 25개의 종목만 선택
  const top25Stocks = popular_data.data.slice(0, 25);

  return (
    <>
      <Header />
      <Stocktype />
      {/* 인기종목리스트 */}
      <div className="mx-auto max-w-[390px]">
        {/* map을 사용하여 상위 25개 종목 반복 렌더링 */}
        {top25Stocks.map((stock) => (
          <Eachpopularstock
            key={stock.stock_id}
            rank={stock.rank}
            name={stock.stock_name}
            price={stock.price}
            change={stock.change}
            percentage={stock.earningRate}
          />
        ))}
      </div>
      <ButtomNavigation />
    </>
  );
}

export default Popularstock;
