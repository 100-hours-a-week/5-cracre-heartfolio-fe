import { useEffect, useState } from "react";
import UserRankingBox from "./userRankingBox";

function UserRanking() {
  // const token = localStorage.getItem("access_token");
  const token =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzNjc2NTcwMjEyIiwiZXhwIjoxNzI2NzU3MDcyfQ.aQNLQSfJBZEESDb7RnUSnHhPhEvhmDQoptgkniaa4amR2pbfByf0GSayM5nig_Dlb6IxoWUHn_HwdGJD16dKaA";
  const [activeTab, setActiveTab] = useState(1);
  const [accumulationData, setAccumulationData] = useState(null);
  const [accumulationError, setAccumulationError] = useState(null);
  const [accumulationLoading, setAccumulationLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // 데이터 가져오기 시작 전에 로딩 상태 설정
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URI}/rank/cumulativeRevenue`,
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
              `${process.env.REACT_APP_API_URI}/rank/cumulativeRevenue`,
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
        setAccumulationData(result); // 가져온 데이터를 상태에 설정
      } catch (err) {
        setAccumulationError(err); // 에러 발생 시 상태에 설정
      } finally {
        setAccumulationLoading(false); // 데이터 가져오기 완료 후 로딩 상태 해제
      }
    };

    fetchData();
  }, [token]);

  // 누적 수익률 목데이터
  // const accumulation_data = [
  //   {
  //     profile: "/profile/photo1",
  //     name: "John Doe",
  //     percentage: "300%",
  //   },
  //   {
  //     profile: "/profile/photo2",
  //     name: "Jane Smith",
  //     percentage: "270%",
  //   },
  //   {
  //     profile: "/profile/photo3",
  //     name: "Alice Johnson",
  //     percentage: "240%",
  //   },
  //   {
  //     profile: "/profile/photo4",
  //     name: "Michael Brown",
  //     percentage: "210%",
  //   },
  //   {
  //     profile: "/profile/photo5",
  //     name: "Emily Davis",
  //     percentage: "180%",
  //   },
  //   {
  //     profile: "/profile/photo6",
  //     name: "David Wilson",
  //     percentage: "150%",
  //   },
  //   {
  //     profile: "/profile/photo7",
  //     name: "Sophia Martinez",
  //     percentage: "120%",
  //   },
  //   {
  //     profile: "/profile/photo8",
  //     name: "James Anderson",
  //     percentage: "90%",
  //   },
  //   {
  //     profile: "/profile/photo9",
  //     name: "Olivia Taylor",
  //     percentage: "50%",
  //   },
  //   {
  //     profile: "/profile/photo10",
  //     name: "Benjamin Moore",
  //     percentage: "-30%",
  //   },
  // ];

  const [monthlyData, setMonthlyData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // 데이터 가져오기 시작 전에 로딩 상태 설정
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URI}/rank/month`,
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
              `${process.env.REACT_APP_API_URI}/rank/month`,
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
        setMonthlyData(result); // 가져온 데이터를 상태에 설정
      } catch (err) {
        setError(err); // 에러 발생 시 상태에 설정
      } finally {
        setLoading(false); // 데이터 가져오기 완료 후 로딩 상태 해제
      }
    };

    fetchData();
  }, [token]);

  // 월별 수익률 목데이터
  // const monthly_data = [
  //   {
  //     profile: "/profile/photo1",
  //     name: "John Doe",
  //     percentage: "300%",
  //   },
  //   {
  //     profile: "/profile/photo2",
  //     name: "Jane Smith",
  //     percentage: "260%",
  //   },
  //   {
  //     profile: "/profile/photo3",
  //     name: "Alice Johnson",
  //     percentage: "230%",
  //   },
  //   {
  //     profile: "/profile/photo4",
  //     name: "Michael Brown",
  //     percentage: "210%",
  //   },
  //   {
  //     profile: "/profile/photo5",
  //     name: "Emily Davis",
  //     percentage: "190%",
  //   },
  //   {
  //     profile: "/profile/photo6",
  //     name: "David Wilson",
  //     percentage: "170%",
  //   },
  //   {
  //     profile: "/profile/photo7",
  //     name: "Sophia Martinez",
  //     percentage: "140%",
  //   },
  //   {
  //     profile: "/profile/photo8",
  //     name: "James Anderson",
  //     percentage: "100%",
  //   },
  //   {
  //     profile: "/profile/photo9",
  //     name: "Olivia Taylor",
  //     percentage: "0%",
  //   },
  //   {
  //     profile: "/profile/photo10",
  //     name: "Benjamin Moore",
  //     percentage: "-10%",
  //   },
  // ];

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full max-w-[350px]">
        <div role="tablist" className="tabs w-[180px] mr-auto">
          <a
            role="tab"
            className={`tab w-[90px] text-[15px] p-0 ${
              activeTab === 1 ? "tab-active text-iconColor" : ""
            }`}
            onClick={() => setActiveTab(1)}
          >
            누적 수익률
          </a>
          <a
            role="tab"
            className={`tab w-[90px] text-[15px] p-0 ${
              activeTab === 2 ? "tab-active text-iconColor" : ""
            }`}
            onClick={() => setActiveTab(2)}
          >
            월별 수익률
          </a>
        </div>
        <div className="flex items-center">
          <div className="text-sm text-gray-600">내 순위 :</div>
          <div className="text-sm text-gray-600">12위</div>
        </div>
      </div>
      <hr className="mt-1 border-black w-[360px]" />
      <div className="mx-auto max-w-[350px] pb-16">
        <div role="tabpanel" className="tab-content block">
          {activeTab === 1 && (
            <UserRankingBox data={monthlyData?.userRanking} />
          )}
          {activeTab === 2 && (
            <UserRankingBox data={accumulationData?.userRanking} />
          )}
        </div>
      </div>
    </div>
  );
}

export default UserRanking;
