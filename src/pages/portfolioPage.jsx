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

  // const {asset_data, error, loading} = useFetch("https://heartfolio.site/api/portfolio/"+userId+"/stock");
  // const {holdings_data, error, loading} = useFetch("https://heartfolio.site/api/portfolio/totalStocks");
  // const cash_data = {
  //   cash: 75121616,
  //   total_purchase: 35000616,
  //   total_amount: 200000000,
  //   total_value: 151152125,
  //   profitRate: -10.4,
  // };
  const asset_data = {
    data: {
      stocks: [
        {
          id: 1,
          stockName: "Apple",
          percentage: 13.8,
        },
        {
          id: 2,
          stockName: "AMD",
          percentage: 2.6,
        },
        {
          id: 3,
          stockName: "Tesla",
          percentage: 8.5,
        },
        {
          id: 4,
          stockName: "Google",
          percentage: 5.7,
        },
        {
          id: 5,
          stockName: "Microsoft",
          percentage: 9.3,
        },
        {
          id: 6,
          stockName: "Samsung",
          percentage: 7.1,
        },
        {
          id: 7,
          stockName: "Nvidia",
          percentage: 11.4,
        },
        {
          id: 8,
          stockName: "Amazon",
          percentage: 6.8,
        },
        {
          id: 9,
          stockName: "Facebook",
          percentage: 4.9,
        },
        {
          id: 10,
          stockName: "Alibaba",
          percentage: 3.9,
        },
      ],
    },
  };

  

  return (
    <>
      <Header />
      <div className="mt-[90px]">
      <MoneyInfo />
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
          {activeTab === 1 && <AssetConfiguration data={asset_data} />}
          {activeTab === 2 && <TransactionHistory/>}
          {activeTab === 3 && <Holdings />}
        </div>
      </div>
      </div>
      <ButtomNavigation />
    </>
  );
}

export default Portfolio;
