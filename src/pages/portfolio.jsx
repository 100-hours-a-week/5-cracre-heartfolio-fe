import { useState } from "react";
import Header from "../components/header";
import MoneyInfo from "../components/moneyInfo";
import AssetConfiguration from "../components/assetConfiguration";

function Portfolio() {
  const [activeTab, setActiveTab] = useState(1);
  console.log("Active Tab:", activeTab);

  return (
    <>
      <Header />
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
          보유 자산
        </a>
      </div>
      <div role="tabpanel" className="tab-content block p-10">
        {activeTab === 1 && <AssetConfiguration />}
        {activeTab === 2 && "거래 내역"}
        {activeTab === 3 && "보유 자산"}
      </div>
    </>
  );
}

export default Portfolio;
