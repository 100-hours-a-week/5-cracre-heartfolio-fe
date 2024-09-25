import { useEffect, useState } from "react";
import UserRankingBox from "./userRankingBox";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

function UserRanking() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const [activeTab, setActiveTab] = useState(1);
  const { data: accumulationData, loading: accumulationLoading } = useFetch(
    `${process.env.REACT_APP_API_URI}/rank/cumulativeRevenue`
  );
  const { data: monthlyData, loading: monthlyLoading } = useFetch(
    `${process.env.REACT_APP_API_URI}/rank/month`
  );
  function handlePortfolio(get_id) {
    navigate(`/portfolio/${get_id}`);
  }
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
          <div className="text-sm text-gray-600">
            {activeTab === 1
              ? monthlyData?.personalRank === -1
                ? "순위 없음"
                : monthlyData?.personalRank + "위"
              : accumulationData?.personalRank === -1
              ? "순위 없음"
              : accumulationData?.personalRank + "위"}
          </div>
        </div>
      </div>
      <hr className="mt-1 border-black w-[360px]" />
      <div className="mx-auto max-w-[350px] pb-16">
        <div role="tabpanel" className="tab-content block">
          {activeTab === 1 && (
            <UserRankingBox
              data={monthlyData?.userRanking}
              onClick={handlePortfolio}
            />
          )}
          {activeTab === 2 && (
            <UserRankingBox
              data={accumulationData?.userRanking}
              onClick={handlePortfolio}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default UserRanking;
