import Header from "../components/header";
import Stocktype from "../components/stocktype";
import Eachintereststock from "../components/eachintereststock";
import ButtomNavigation from "../components/bottomNavigation";

function Intereststock() {

  // const {data, error, loading} = useFetch("http://localhost:8080/api//api/stock/favorites");

  // 인기 종목 데이터 배열
  const interest_data = [
    {
        "stock_id": 1,
        "stock_code": "AAPL",
        "stock_name": "Apple Inc."
    },
    {
        "stock_id": 2,
        "stock_code": "GOOGL",
        "stock_name": "Alphabet Inc."
    },
    {
        "stock_id": 3,
        "stock_code": "MSFT",
        "stock_name": "Microsoft Corporation"
    },
    {
        "stock_id": 4,
        "stock_code": "AMZN",
        "stock_name": "Amazon.com Inc."
    },
    {
        "stock_id": 5,
        "stock_code": "TSLA",
        "stock_name": "Tesla, Inc."
    },
    {
        "stock_id": 6,
        "stock_code": "FB",
        "stock_name": "Meta Platforms, Inc."
    },
    {
        "stock_id": 7,
        "stock_code": "NVDA",
        "stock_name": "NVIDIA Corporation"
    },
    {
        "stock_id": 8,
        "stock_code": "NFLX",
        "stock_name": "Netflix, Inc."
    },
    {
        "stock_id": 9,
        "stock_code": "INTC",
        "stock_name": "Intel Corporation"
    },
    {
        "stock_id": 10,
        "stock_code": "AMD",
        "stock_name": "Advanced Micro Devices, Inc."
    }
]

  

console.log(interest_data)

  return (
    <>
      <Header />
      <Stocktype />
      {/* 인기종목리스트 */}
      <div className="mx-auto max-w-[390px] ">
        {/* map을 사용하여 반복 렌더링 */}
        {interest_data.map((stock) => (
          <Eachintereststock
            key={stock.stock_id}
            name={stock.stock_name}
            price={stock.price}
            change={stock.change}
            percentage={stock.percentage}
          />
        ))}
      </div>
      <ButtomNavigation />
    </>
  );
}
export default Intereststock;
