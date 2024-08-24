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
  const {data, error, loading} = useFetch("https://heartfolio.site/api/stock/"+id);
  // const stock_info_data = {
  //   symbol: "NASDAQ:MSFT",
  //   name: "Microsoft",
  //   likePresent: "false"
  // };
  console.log(data);

  return (
    <>
      <Header />
      <div className="mt-[75px]">
        <StockHeader data={data} />
        <div
          role="tablist"
          className="tabs tabs-boxed mx-auto max-w-[390px] bg-backColor mt-[10px]"
        >
          <a
            role="tab"
            className={`tab h-[40px] ${
              activeTab === 1 ? "bg-btnClickColor" : ""
            }`}
            onClick={() => setActiveTab(1)}
          >
            차트
          </a>
          <a
            role="tab"
            className={`tab h-[40px] ${
              activeTab === 2 ? "bg-btnClickColor" : ""
            }`}
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
            {activeTab === 1 && <Chart data={data}/>}
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
