import { useState } from "react";
import Header from "../components/header";
import StockHeader from "../components/stockHeader";
import StockHistory from "../components/stockHistory";
import Chart from "../components/chart";

function StockPage() {
  const [activeTab, setActiveTab] = useState(1);
  console.log("Active Tab:", activeTab);
  return (
    <>
      <Header />
      <StockHeader />
      <div
        role="tablist"
        className="tabs tabs-boxed mx-auto max-w-[390px] bg-backColor mt-[20px]"
      >
        <a
          role="tab"
          className={`tab h-[40px] ${
            activeTab === 1 ? "bg-btnclickColor" : ""
          }`}
          onClick={() => setActiveTab(1)}
        >
          차트
        </a>
        <a
          role="tab"
          className={`tab h-[40px] ${
            activeTab === 2 ? "bg-btnclickColor" : ""
          }`}
          onClick={() => setActiveTab(2)}
        >
          거래 내역
        </a>
        {/* <a
          role="tab"
          className={`tab h-[50px] ${activeTab === 3 ? "bg-btnclickColor" : ""}`}
          onClick={() => setActiveTab(3)}
        >
          정보
        </a> */}
      </div>
      <div className="mx-auto max-w-[390px] p-4 flex justify-center">
        <div role="tabpanel" className="tab-content block">
          {activeTab === 1 && <Chart />}
          {activeTab === 2 && <StockHistory />}
          {/* {activeTab === 3 && "3"} */}
        </div>
      </div>
    </>
  );
}

export default StockPage;
