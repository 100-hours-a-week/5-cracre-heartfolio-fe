import useFetch from "../hooks/useFetch";
import HistoryBox from "./box/historyBox";

function TransactionHistory() {
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
  console.log("transactionHistory fetch",data);
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
