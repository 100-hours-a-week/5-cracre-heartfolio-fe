import { useState } from "react";
import Header from "../components/header";
import StockHeader from "../components/stockHeader";
import StockHistory from "../components/stockHistory";
import Chart from "../components/chart";
import ButtomNavigation from "../components/bottomNavigation";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

function StockPage() {
  const [activeTab, setActiveTab] = useState(1);
  console.log("Active Tab:", activeTab);
  const { id } = useParams();
  // const {stock_info_data, error, loading} = useFetch("http://localhost:8080/api/invest/"id);
  // const {holdings_history_data, error, loading} = useFetch("http://localhost:8080/api/stock/"+id+"/order");
  const stock_info_data = {
    symbol : "NASDAQ:MSFT",
    name : "Microsoft"
  }
  return (
    <>
      <Header />
      <StockHeader name={stock_info_data.name} />
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
          {activeTab === 1 && <Chart info={stock_info_data}/>}
          {activeTab === 2 && <StockHistory />}
          {/* {activeTab === 3 && "3"} */}
        </div>
      </div>
      <ButtomNavigation />
    </>
  );
}

export default StockPage;
