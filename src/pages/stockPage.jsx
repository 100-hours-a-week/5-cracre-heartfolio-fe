import { useEffect, useState } from "react";
import Header from "../components/common/header";
import StockHeader from "../components/stock/stockHeader";
import StockHistory from "../components/stock/stockHistory";
import Chart from "../components/stock/chart";
import ButtomNavigation from "../components/common/bottomNavigation";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

function StockPage() {
  const [activeTab, setActiveTab] = useState(1);
  const { id } = useParams();
  const token = localStorage.getItem("access_token");

  // 데이터 가져오기 상태 관리
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // 데이터 가져오기 시작 전에 로딩 상태 설정
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URI}/stock/order/${id}/details`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
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
              `${process.env.REACT_APP_API_URI}/stock/order/${id}/details`,
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

        const result = await response.json();
        setData(result); // 가져온 데이터를 상태에 설정
      } catch (err) {
        setError(err); // 에러 발생 시 상태에 설정
      } finally {
        setLoading(false); // 데이터 가져오기 완료 후 로딩 상태 해제
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <Header />
      <div className="pt-[75px] min-h-screen bg-white">
        <StockHeader data={data} />
        <div
          role="tablist"
          className="tabs tabs-boxed mx-auto max-w-[390px] bg-backColor mt-[10px] "
        >
          <a
            role="tab"
            className={`tab h-[40px] ${
              activeTab === 1 ? "bg-btnClickColor" : ""
            }  text-gray-600`}
            onClick={() => setActiveTab(1)}
          >
            차트
          </a>
          <a
            role="tab"
            className={`tab h-[40px] ${
              activeTab === 2 ? "bg-btnClickColor" : ""
            }  text-gray-600`}
            onClick={() => setActiveTab(2)}
          >
            거래 내역
          </a>
          {/* <a
          role="tab"
          className={`tab h-[50px] ${activeTab === 3 ? "bg-btnClickColor" : ""}`}
          onClick={() => setActiveTab(3)}
        >
          정보
        </a> */}
        </div>
        <div className="mx-auto max-w-[390px] p-4 flex justify-center">
          <div role="tabpanel" className="tab-content block pb-[29px]">
            {loading ? (
              <p className="min-h-screen bg-white text-center">Loading...</p>
            ) : error ? (
              <p className="min-h-screen bg-white text-center">
                Error: {error.message}
              </p>
            ) : (
              <>
                {activeTab === 1 && <Chart data={data} />}
                {activeTab === 2 && <StockHistory />}
              </>
            )}
          </div>
        </div>
      </div>
      <ButtomNavigation />
    </>
  );
}

export default StockPage;
