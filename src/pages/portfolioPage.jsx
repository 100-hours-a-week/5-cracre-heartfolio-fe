import { useState } from "react";
import Header from "../components/header";
import MoneyInfo from "../components/moneyInfo";
import AssetConfiguration from "../components/assetConfiguration";
import TransactionHistory from "../components/transactionHistory";
import Holdings from "../components/holdings";
import ButtomNavigation from "../components/bottomNavigation";
import useFetch from "../hooks/useFetch";

function Portfolio() {
  const [activeTab, setActiveTab] = useState(1);
  console.log("Active Tab:", activeTab);

  // const {data, error, loading} = useFetch("http://localhost:8080/api/portfolio/"+userId);
  // const {data, error, loading} = useFetch("http://localhost:8080/api/portfolio/"+userId+"/stock");
  const cash_data = {
    cash: 75121616,
    total_purchase: 35000616,
    total_amount: 200000000,
    total_value: 151152125,
    profitRate: -10.4,
  };
  const asset_data = {
    data: {
      stocks: [
        {
          id: 1,
          stock_name: "Apple",
          percentage: 13.8,
        },
        {
          id: 2,
          stock_name: "AMD",
          percentage: 2.6,
        },
        {
          id: 3,
          stock_name: "Tesla",
          percentage: 8.5,
        },
        {
          id: 4,
          stock_name: "Google",
          percentage: 5.7,
        },
        {
          id: 5,
          stock_name: "MicroSoft",
          percentage: 9.3,
        },
        {
          id: 6,
          stock_name: "Samsung",
          percentage: 7.1,
        },
        {
          id: 7,
          stock_name: "Nvidia",
          percentage: 11.4,
        },
        {
          id: 8,
          stock_name: "Amazon",
          percentage: 6.8,
        },
        {
          id: 9,
          stock_name: "Facebook",
          percentage: 4.9,
        },
        {
          id: 10,
          stock_name: "Alibaba",
          percentage: 3.9,
        },
      ],
    },
  };

  return (
    <>
      <Header />
      <MoneyInfo data={cash_data} />
      <div
        role="tablist"
        className="tabs tabs-bordered mx-auto max-w-[370px] bg-backColor mt-[34px]"
      >
        <a
          role="tab"
          className={`tab h-[50px] ${activeTab === 1 ? "tab-active" : ""}`}
          onClick={() => setActiveTab(1)}
        >
          자산 구성
        </a>
        <a
          role="tab"
          className={`tab h-[50px] ${activeTab === 2 ? "tab-active" : ""}`}
          onClick={() => setActiveTab(2)}
        >
          거래 내역
        </a>
        <a
          role="tab"
          className={`tab h-[50px] ${activeTab === 3 ? "tab-active" : ""}`}
          onClick={() => setActiveTab(3)}
        >
          보유 종목
        </a>
      </div>
      <div className="mx-auto max-w-[370px] bg-backColor p-4">
        <div role="tabpanel" className="tab-content block">
          {activeTab === 1 && <AssetConfiguration data={asset_data}/>}
          {activeTab === 2 && <TransactionHistory />}
          {activeTab === 3 && <Holdings />}
        </div>
      </div>
      <ButtomNavigation />
    </>
  );
}

export default Portfolio;
