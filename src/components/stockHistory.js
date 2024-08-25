import { useParams } from "react-router-dom";
import HistoryBox from "./box/historyBox";
import StockHistoryBox from "./box/stockHistoryBox";
import useFetch from "../hooks/useFetch";

function StockHistory(props) {
  const { id } = useParams();
  const token = localStorage.getItem('access_token');
  const { data, error, loading } = useFetch(
    "https://heartfolio.site/api/stock/" + id + "/order",
    {
      headers: {
        Authorization: `Bearer ${token}`, // 토큰을 헤더에 추가
        'Content-Type': 'application/json', // 선택 사항, API 요구 사항에 따라 설정
      },
    }
  );
  return (
    <>
      <div className="mx-auto max-w-[370px] py-2 flex flex-col justify-center">
        {data?.length === 0 ? (
          <div className="text-center text-gray-500">거래 내역이 없습니다.</div>
        ) : (
          <>
            <div className="text-xs mb-2 text-right">가격 단위(KRW)</div>
            <ul role="list" className="space-y-3">
              {data?.map((item) => (
                <li
                  key={item.id}
                  className="overflow-hidden rounded-md bg-white p-4 shadow w-[350px] mx-auto"
                >
                  <StockHistoryBox
                    orderCategory={item.orderCategory}
                    orderAmount={item.orderAmount}
                    orderDate={item.orderDate}
                    orderPrice={item.orderPrice}
                  />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}

export default StockHistory;
