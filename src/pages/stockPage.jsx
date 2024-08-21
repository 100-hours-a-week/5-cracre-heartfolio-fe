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
  // const {stock_info_data, error, loading} = useFetch("https://heartfolio.site/api/invest/"id);
  // const {holdings_history_data, error, loading} = useFetch("https://heartfolio.site/api/stock/"+id+"/order");
  const stock_info_data = {
    symbol: "NASDAQ:MSFT",
    name: "Microsoft",
  };
  const holdings_history_data = [
    {
      id: 1,
      orderCategory: "buy",
      orderDate: "2024-08-13T11:00:00Z",
      orderAmount: 100,
      orderPrice: 150,
    },
    {
      id: 2,
      orderCategory: "sell",
      orderDate: "2024-08-14T10:00:00Z",
      orderAmount: 50,
      orderPrice: 155,
    },
    {
      id: 3,
      orderCategory: "buy",
      orderDate: "2024-08-15T09:30:00Z",
      orderAmount: 75,
      orderPrice: 152,
    },
    {
      id: 4,
      orderCategory: "sell",
      orderDate: "2024-08-16T14:45:00Z",
      orderAmount: 30,
      orderPrice: 160,
    },
    {
      id: 5,
      orderCategory: "buy",
      orderDate: "2024-08-17T13:20:00Z",
      orderAmount: 120,
      orderPrice: 148,
    },
    {
      id: 6,
      orderCategory: "sell",
      orderDate: "2024-08-18T16:10:00Z",
      orderAmount: 60,
      orderPrice: 157,
    },
    {
      id: 7,
      orderCategory: "buy",
      orderDate: "2024-08-19T08:00:00Z",
      orderAmount: 90,
      orderPrice: 149,
    },
    {
      id: 8,
      orderCategory: "sell",
      orderDate: "2024-08-20T15:30:00Z",
      orderAmount: 40,
      orderPrice: 158,
    },
    {
      id: 9,
      orderCategory: "buy",
      orderDate: "2024-08-21T11:50:00Z",
      orderAmount: 110,
      orderPrice: 151,
    },
    {
      id: 10,
      orderCategory: "sell",
      orderDate: "2024-08-22T12:25:00Z",
      orderAmount: 70,
      orderPrice: 159,
    },
  ];

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
          {activeTab === 1 && <Chart info={stock_info_data} />}
          {activeTab === 2 && <StockHistory data={holdings_history_data} />}
          {/* {activeTab === 3 && "3"} */}
        </div>
      </div>
      <ButtomNavigation />
    </>
  );
}

export default StockPage;
