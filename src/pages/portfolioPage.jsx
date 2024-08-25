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
            {activeTab === 1 && <AssetConfiguration />}
            {activeTab === 2 && <TransactionHistory />}
            {activeTab === 3 && <Holdings />}
          </div>
        </div>
      </div>
      <ButtomNavigation />
    </>
  );
}

export default Portfolio;
