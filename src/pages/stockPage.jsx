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
          `https://heartfolio.site/api/stock/order/${id}/details`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
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
  }, [id]);

  console.log("stockPage get : ", data);

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
            {activeTab === 1 && <Chart data={data} />}
            {activeTab === 2 && <StockHistory />}
            {/* {activeTab === 3 && "3"} */}
          </div>
        </div>
      </div>
      <ButtomNavigation />
    </>
  );
}

export default StockPage;
