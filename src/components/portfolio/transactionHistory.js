import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import HistoryBox from "../commonBox/historyBox";
import Lottie from "lottie-react";
import noInfoAnimation from "../../assets/animations/noInfo.json";

function TransactionHistory() {
  const token = localStorage.getItem("access_token");
  // 데이터를 가져오기 위한 상태 관리
  const [data, setData] = useState([]); // 초기 상태를 빈 배열로 설정
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // 데이터를 가져오기 전 로딩 상태를 true로 설정
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URI}/portfolio/investInfo`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // 토큰을 헤더에 추가
              "Content-Type": "application/json", // 선택 사항, API 요구 사항에 따라 설정
            },
          }
        );

        if (response.status === 401) {
          // Access token 만료 -> refresh token으로 새 access token 요청
          const refreshToken = localStorage.getItem("refresh_token");
          const refreshResponse = await fetch(
            `${process.env.REACT_APP_API_URI}/auth/refresh-token`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refreshToken: refreshToken }),
            }
          );

          if (refreshResponse.status === 200) {
            const data = await refreshResponse.json();
            localStorage.setItem("access_token", data.accessToken); // 새 access token 저장

            // 새로운 access token으로 원래 요청 다시 시도
            response = await fetch(
              `${process.env.REACT_APP_API_URI}/portfolio/investInfo`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "access_token"
                  )}`, // 새 access token 사용
                  "Content-Type": "application/json",
                },
              }
            );
          } else {
            // refresh token도 만료되거나 오류가 있으면 로그인 페이지로 이동
            localStorage.removeItem("access_token");
            window.location.href = "/login";
            return;
          }
        }
        let result = await response.json();

        // 응답에서 body를 가져와서 설정
        if (result && Array.isArray(result.body)) {
          setData(result.body); // 가져온 데이터의 body 배열을 상태에 설정
        } else {
          setData([]); // body가 배열이 아닐 경우 빈 배열로 설정
        }
      } catch (err) {
        setError(err); // 에러가 발생할 경우 에러 상태에 설정
      } finally {
        setLoading(false); // 데이터를 가져온 후 로딩 상태를 false로 설정
      }
    };

    fetchData();
  }, [token]); // 토큰이 변경될 때마다 데이터를 다시 가져옴

  return (
    <>
      <div className="mx-auto max-w-[350px] pb-8">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="spinner">Loading...</div>
          </div>
        ) : data.length === 0 ? (
          <div className="flex flex-col items-center h-screen max-h-[500px]">
            <div className="w-80 h-80">
              <Lottie animationData={noInfoAnimation} loop={true} />
            </div>
            <div className="text-lg text-gray-600">
              거래 내역이 아직 없습니다.
            </div>
          </div>
        ) : (
          <div>
            <div className="text-xs mb-2 text-right text-gray-600">
              가격 단위(KRW)
            </div>
            <ul role="list" className="divide-y divide-gray-200">
              {data.map((item) => (
                <li key={item.id} className="py-2">
                  <HistoryBox
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
          </div>
        )}
      </div>
    </>
  );
}

export default TransactionHistory;
