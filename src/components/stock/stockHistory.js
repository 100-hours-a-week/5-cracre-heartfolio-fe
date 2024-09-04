import { useParams } from "react-router-dom";
import HistoryBox from "../commonBox/historyBox";
import StockHistoryBox from "./stockHistoryBox";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import noInfoAnimation from "../../assets/animations/noInfo.json";
import alertAnimation from "../../assets/animations/alert.json";
import Lottie from "lottie-react";

function StockHistory(props) {
  const { id } = useParams();
  const token = localStorage.getItem("access_token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // 데이터 가져오기 상태 관리
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // 데이터 가져오기 시작 전에 로딩 상태 설정
      try {
        const response = await fetch(
          `https://heartfolio.site/api/stock/order/${id}/history`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // 토큰을 헤더에 추가
              "Content-Type": "application/json", // 선택 사항, API 요구 사항에 따라 설정
            },
          }
        );

        if (!response.ok) {
          throw new Error(response.statusText); // 응답이 정상적이지 않으면 에러 발생
        }

        const result = await response.json();
        setData(result); // 가져온 데이터를 상태에 설정
      } catch (err) {
        setError(err); // 에러 발생 시 상태에 설정
      } finally {
        setLoading(false); // 데이터 가져오기 완료 후 로딩 상태 해제
      }
    };

    fetchData();
  }, [id, token]);
  return (
    <>
      <div className="mx-auto max-w-[370px] py-2 flex flex-col justify-center">
        {isAuthenticated ? (
          data?.length === 0 ? (
            <div className="flex flex-col items-center">
              <div className="w-80 h-80">
                <Lottie animationData={noInfoAnimation} loop={true} />
              </div>
              <div className="text-lg text-gray-600">거래 내역이 없습니다.</div>
            </div>
          ) : (
            <>
              <div className="text-xs mb-2 text-right text-gray-600">
                가격 단위(KRW)
              </div>
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
          )
        ) : (
          <div className="flex flex-col justify-center items-center h-full">
            <div className="w-80 h-80">
              <Lottie animationData={alertAnimation} loop={true} />
            </div>
            <div className="font-bold text-lg">
              로그인 후 이용 가능한 서비스입니다.
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default StockHistory;
