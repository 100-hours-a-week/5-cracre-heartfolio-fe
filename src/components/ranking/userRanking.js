import { useState } from "react";
import Accumulation from "./accumulation";
import MonthlyEarnings from "./monthlyEarnings";

function UserRanking() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="flex flex-col items-center">
      <div
        role="tablist"
        className="tabs w-[180px] mr-auto"
      >
        <a
          role="tab"
          className={`tab w-[90px] text-[15px] p-0 ${activeTab === 1 ? "tab-active text-iconColor" : ""}`}
          onClick={() => setActiveTab(1)}
        >
          누적 수익률
        </a>
        <a
          role="tab"
          className={`tab w-[90px] text-[15px] p-0 ${activeTab === 2 ? "tab-active text-iconColor" : ""}`}
          onClick={() => setActiveTab(2)}
        >
          월별 수익률
        </a>
      </div>
      <hr className="mt-1 border-black w-[360px]"/>
      <div className="mx-auto max-w-[370px]">
        <div role="tabpanel" className="tab-content block">
          {activeTab === 1 && <Accumulation />}
          {activeTab === 2 && <MonthlyEarnings />}
        </div>
      </div>
    </div>
  );
}

export default UserRanking;
