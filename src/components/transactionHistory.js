import useFetch from "../hooks/useFetch";
import HistoryBox from "./box/historyBox";

function TransactionHistory() {
  // const transaction_data = {
  //   data: [
  //     {
  //       stockId: 1,
  //       name: "NVIDIA",
  //       orderCategory: "buy",
  //       orderDate: "2024-08-14 13:16:00",
  //       orderAmount: 100,
  //       orderPrice: 30330,
  //       totalAmount: 303300,
  //     },
  //     {
  //       stockId: 2,
  //       name: "Apple",
  //       orderCategory: "sell",
  //       orderDate: "2024-08-15 09:30:00",
  //       orderAmount: 50,
  //       orderPrice: 15000,
  //       totalAmount: 750000,
  //     },
  //     {
  //       stockId: 3,
  //       name: "Tesla",
  //       orderCategory: "buy",
  //       orderDate: "2024-08-16 10:45:00",
  //       orderAmount: 75,
  //       orderPrice: 68000,
  //       totalAmount: 5100000,
  //     },
  //     {
  //       stockId: 4,
  //       name: "AMD",
  //       orderCategory: "buy",
  //       orderDate: "2024-08-17 11:22:00",
  //       orderAmount: 200,
  //       orderPrice: 12000,
  //       totalAmount: 2400000,
  //     },
  //     {
  //       stockId: 5,
  //       name: "Microsoft",
  //       orderCategory: "sell",
  //       orderDate: "2024-08-18 14:50:00",
  //       orderAmount: 30,
  //       orderPrice: 32000,
  //       totalAmount: 96023442000,
  //     },
  //     {
  //       stockId: 6,
  //       name: "Microsoft",
  //       orderCategory: "sell",
  //       orderDate: "2024-08-18 14:50:00",
  //       orderAmount: 30,
  //       orderPrice: 32000,
  //       totalAmount: 960000,
  //     },
  //   ],
  // };
  const token = localStorage.getItem("access-token");
  const { data, error, loading } = useFetch(
    "https://heartfolio.site/api/portfolio/investInfo",
    {
      headers: {
        Authorization: `Bearer ${token}`, // 토큰을 헤더에 추가
        "Content-Type": "application/json", // 선택 사항, API 요구 사항에 따라 설정
      },
    }
  );
  console.log(data);
  return (
    <>
      <div className="mx-auto max-w-[350px] pb-8">
        {data?.length === 0 ? (
          <div className="text-center text-gray-500">거래 내역이 없습니다.</div>
        ) : (
          <ul role="list" className="divide-y divide-gray-200">
            {data?.map((item) => (
              <li key={item.orderId} className="py-2">
                <HistoryBox
                  stockId={item.stockId}
                  name={item.name}
                  orderCategory={item.orderCategory}
                  orderDate={item.orderDate}
                  orderAmount={item.orderAmount}
                  orderPrice={item.orderPrice}
                  totalAmount={item.totalAmount}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default TransactionHistory;
