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

  // const {cash_data, error, loading} = useFetch("https://heartfolio.site/api/portfolio/"+userId);
  // const {asset_data, error, loading} = useFetch("https://heartfolio.site/api/portfolio/"+userId+"/stock");
  const {data:transaction_data, error, loading} = useFetch("https://heartfolio.site/api/portfolio/investInfo");
  // const {holdings_data, error, loading} = useFetch("https://heartfolio.site/api/portfolio/totalStocks");

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

  // const transaction_data = {
  //   data: [
  //     {
  //       stockId: 1,
  //       name: "NVIDIA",
  //       orderCategory: "buy",
  //       orderDate: "2024-08-14 13:16:00",
  //       orderAmount: 100,
  //       orderPrice: 30330,
  //       totalAmount: 303300,
  //     },
  //     {
  //       stockId: 2,
  //       name: "Apple",
  //       orderCategory: "sell",
  //       orderDate: "2024-08-15 09:30:00",
  //       orderAmount: 50,
  //       orderPrice: 15000,
  //       totalAmount: 750000,
  //     },
  //     {
  //       stockId: 3,
  //       name: "Tesla",
  //       orderCategory: "buy",
  //       orderDate: "2024-08-16 10:45:00",
  //       orderAmount: 75,
  //       orderPrice: 68000,
  //       totalAmount: 5100000,
  //     },
  //     {
  //       stockId: 4,
  //       name: "AMD",
  //       orderCategory: "buy",
  //       orderDate: "2024-08-17 11:22:00",
  //       orderAmount: 200,
  //       orderPrice: 12000,
  //       totalAmount: 2400000,
  //     },
  //     {
  //       stockId: 5,
  //       name: "Microsoft",
  //       orderCategory: "sell",
  //       orderDate: "2024-08-18 14:50:00",
  //       orderAmount: 30,
  //       orderPrice: 32000,
  //       totalAmount: 96023442000,
  //     },
  //     {
  //       stockId: 6,
  //       name: "Microsoft",
  //       orderCategory: "sell",
  //       orderDate: "2024-08-18 14:50:00",
  //       orderAmount: 30,
  //       orderPrice: 32000,
  //       totalAmount: 960000,
  //     },
  //   ],
  // };

  const holdings_data = [
    {
      stockId: 1,
      name: "Apple",
      totalQuantity: 300,
      purchaseAvgPrice: 3500,
      totalPurchasePrice: 105000,
      evalValue: 103200,
      evalProfit: -1800,
      profitPercentage: -1.69,
    },
    {
      stockId: 2,
      name: "NVIDIA",
      totalQuantity: 200,
      purchaseAvgPrice: 5000,
      totalPurchasePrice: 100000,
      evalValue: 108200,
      evalProfit: 8200,
      profitPercentage: 8.2,
    },
    {
      stockId: 3,
      name: "SamSung",
      totalQuantity: 500,
      purchaseAvgPrice: 60000,
      totalPurchasePrice: 30000000,
      evalValue: 31500000,
      evalProfit: 1500000,
      profitPercentage: 5,
    },
    {
      stockId: 4,
      name: "Tesla",
      totalQuantity: 100,
      purchaseAvgPrice: 70000,
      totalPurchasePrice: 7000000,
      evalValue: 6800000,
      evalProfit: -200000,
      profitPercentage: -2.86,
    },
    {
      stockId: 5,
      name: "Amazon",
      totalQuantity: 150,
      purchaseAvgPrice: 3200,
      totalPurchasePrice: 480000,
      evalValue: 500000,
      evalProfit: 20000,
      profitPercentage: 4.17,
    },
  ];

  return (
    <>
      <Header />
      <div className="mt-[90px]">
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
          {activeTab === 1 && <AssetConfiguration data={asset_data} />}
          {activeTab === 2 && <TransactionHistory data={transaction_data} />}
          {activeTab === 3 && <Holdings data={holdings_data} />}
        </div>
      </div>
      </div>
      <ButtomNavigation />
    </>
  );
}

export default Portfolio;
