import { useEffect, useState } from "react";
import UserRankingBox from "./userRankingBox";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { Loading } from "../common/loading";

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
          {accumulationLoading || monthlyLoading ? (
            <div className="text-sm text-gray-600">순위 없음</div>
          ) : (
            <div className="text-sm text-gray-600">
              {activeTab === 1
                ? accumulationData?.personalRank === -1
                  ? "순위 없음"
                  : accumulationData?.personalRank + "위"
                : monthlyData?.personalRank === -1
                ? "순위 없음"
                : monthlyData?.personalRank + "위"}
            </div>
          )}
        </div>
      </div>
      <hr className="mt-1 border-black w-[350px]" />
      <div
        className="mx-auto max-w-[360px] overflow-y-auto scrollbar-hide"
        style={{ height: "calc(100dvh - 247px)" }}
      >
        <div role="tabpanel" className="tab-content block">
          {activeTab === 1 &&
            (accumulationLoading ? (
              <Loading />
            ) : (
              <UserRankingBox
                data={accumulationData?.userRanking}
                onClick={handlePortfolio}
              />
            ))}
          {activeTab === 2 &&
            (monthlyLoading ? (
              <Loading />
            ) : (
              <UserRankingBox
                data={monthlyData?.userRanking}
                onClick={handlePortfolio}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default UserRanking;
