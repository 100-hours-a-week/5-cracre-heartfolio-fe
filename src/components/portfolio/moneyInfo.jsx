import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
function MoneyInfo() {
  const userId = 1;
  const token = localStorage.getItem("access_token");
  // 데이터 가져오기 상태 관리
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // 데이터 가져오기 시작 전에 로딩 상태 설정
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URI}/portfolio`, {
          headers: {
            Authorization: `Bearer ${token}`, // 토큰을 헤더에 추가
            "Content-Type": "application/json", // 선택 사항, API 요구 사항에 따라 설정
          },
        });

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
              `${process.env.REACT_APP_API_URI}/portfolio`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "access_token"
                  )}`, // 새 access token 사용
                  "Content-Type": "application/json",
                },
              }
            );
            console.log(
              "Second request response with new access token:",
              response
            );
          } else {
            // refresh token도 만료되거나 오류가 있으면 로그인 페이지로 이동
            localStorage.removeItem("access_token");
            window.location.href = "/login";
            return;
          }
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
  }, [userId, token]);
  
  function money_change(money) {
    if (money === undefined || money === null) return "0";
    if (money >= 1000000000000) {
      // 1조 이상
      let trillion = Math.floor(money / 1_0000_0000_0000);
      let billion = Math.floor((money % 1_0000_0000_0000) / 1_0000_0000);
      let million = Math.floor((money % 1_0000_0000) / 10000);
      return `${trillion}조 ${billion}억 ${million}만`;
    } else if (money >= 100000000) {
      // 1억 이상 1조 미만
      let billion = Math.floor(money / 1_0000_0000);
      let million = Math.floor((money % 1_0000_0000) / 10000);
      return `${billion}억 ${million}만`;
    } else {
      return money.toLocaleString(); // 기본적으로 1,000 단위로 콤마를 추가
    }
  }
  return (
    <div className="max-w-full">
      <div className="w-full flex justify-center ">
        <div className="w-[250px] text-lg text-gray-600 font-bold font-TmoneyRoundWindExtraBold text-left ml-[22px]">
          내 포트폴리오
        </div>
        <div className=" w-[90px] text-xs text-gray-500 pt-10 text-right mr-6">
          가격 단위 (KRW)
        </div>
      </div>
      <div className="mx-auto max-w-[390px] px-3 mt-[10px]">
        <div className="flex justify-around">
          <div>
            <div className="text-sm text-gray-600 font-semibold">총 자산</div>
            <div className="text-base text-gray-600">
              {money_change(data?.totalAmount)}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 font-semibold">보유 캐시</div>
            <div className="text-base text-gray-600">
              {money_change(data?.cash)}
            </div>
          </div>
        </div>
        <div className="flex justify-around mt-[34px]">
          <div>
            <div className="text-sm text-gray-600 font-semibold">
              총 매수 금액
            </div>
            <div className="text-base text-gray-600">
              {money_change(data?.totalPurchase)}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 font-semibold">
              총 평가 금액
            </div>
            <div className="text-base text-gray-600">
              {money_change(data?.totalValue)}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 font-semibold">
              평가 수익률
            </div>
            <div
              className={`text-base ${
                data?.profitRate > 0
                  ? "text-redColor" // 양수일 때, 빨강색
                  : data?.profitRate < 0
                  ? "text-blueColor" // 음수일 때, 파랑색
                  : " text-gray-600" // 0일 때, 검정색
              }`}
            >
              {/* {data.profitRate}% */}
              {data?.profitRate === undefined ? 0 : data?.profitRate.toFixed(2)}
              %
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoneyInfo;
