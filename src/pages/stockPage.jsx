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
  const { data, error, loading } = useFetch(
    "https://heartfolio.site/api/stock/order/" + id + "/details"
  );

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
