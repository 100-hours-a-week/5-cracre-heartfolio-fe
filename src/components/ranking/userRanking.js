import { useState } from "react";
import UserRankingBox from "./userRankingBox";

function UserRanking() {
  const [activeTab, setActiveTab] = useState(1);

  // 누적 수익률 목데이터
  const accumulation_data = [
    {
      profile: "/profile/photo1",
      name: "John Doe",
      percentage: "300%",
    },
    {
      profile: "/profile/photo2",
      name: "Jane Smith",
      percentage: "270%",
    },
    {
      profile: "/profile/photo3",
      name: "Alice Johnson",
      percentage: "240%",
    },
    {
      profile: "/profile/photo4",
      name: "Michael Brown",
      percentage: "210%",
    },
    {
      profile: "/profile/photo5",
      name: "Emily Davis",
      percentage: "180%",
    },
    {
      profile: "/profile/photo6",
      name: "David Wilson",
      percentage: "150%",
    },
    {
      profile: "/profile/photo7",
      name: "Sophia Martinez",
      percentage: "120%",
    },
    {
      profile: "/profile/photo8",
      name: "James Anderson",
      percentage: "90%",
    },
    {
      profile: "/profile/photo9",
      name: "Olivia Taylor",
      percentage: "60%",
    },
    {
      profile: "/profile/photo10",
      name: "Benjamin Moore",
      percentage: "30%",
    },
  ];

// 월별 수익률 목데이터
  const monthly_data = [
    {
      profile: "/profile/photo1",
      name: "John Doe",
      percentage: "300%",
    },
    {
      profile: "/profile/photo2",
      name: "Jane Smith",
      percentage: "260%",
    },
    {
      profile: "/profile/photo3",
      name: "Alice Johnson",
      percentage: "230%",
    },
    {
      profile: "/profile/photo4",
      name: "Michael Brown",
      percentage: "210%",
    },
    {
      profile: "/profile/photo5",
      name: "Emily Davis",
      percentage: "190%",
    },
    {
      profile: "/profile/photo6",
      name: "David Wilson",
      percentage: "170%",
    },
    {
      profile: "/profile/photo7",
      name: "Sophia Martinez",
      percentage: "140%",
    },
    {
      profile: "/profile/photo8",
      name: "James Anderson",
      percentage: "135%",
    },
    {
      profile: "/profile/photo9",
      name: "Olivia Taylor",
      percentage: "130%",
    },
    {
      profile: "/profile/photo10",
      name: "Benjamin Moore",
      percentage: "100%",
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full max-w-[350px]">
        <div role="tablist" className="tabs w-[180px] mr-auto">
          <a
            role="tab"
            className={`tab w-[90px] text-[15px] p-0 ${
              activeTab === 1 ? "tab-active text-iconColor" : ""
            }`}
            onClick={() => setActiveTab(1)}
          >
            누적 수익률
          </a>
          <a
            role="tab"
            className={`tab w-[90px] text-[15px] p-0 ${
              activeTab === 2 ? "tab-active text-iconColor" : ""
            }`}
            onClick={() => setActiveTab(2)}
          >
            월별 수익률
          </a>
        </div>
        <div className="flex items-center">
          <div className="text-sm text-gray-600">내 순위 :</div>
          <div className="text-sm text-gray-600">12위</div>
        </div>
      </div>
      <hr className="mt-1 border-black w-[360px]" />
      <div className="mx-auto max-w-[350px] pb-16">
        <div role="tabpanel" className="tab-content block">
          {activeTab === 1 && <UserRankingBox data={accumulation_data} />}
          {activeTab === 2 && <UserRankingBox data={monthly_data}/>}
        </div>
      </div>
    </div>
  );
}

export default UserRanking;
