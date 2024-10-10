import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Loading } from "../common/loading";
import { MoneyRankBox, MoneyRankTop3Box } from "./moneyRankBox";

function MoneyRanking() {  
  const navigate = useNavigate();

  const { data, loading } = useFetch(
    `${process.env.REACT_APP_API_URI}/rank/donation`
  );

  // 데이터 구조가 유효한지 확인
  const userRanking = data?.userRanking || [];

  // 상위 3개 아이템 추출
  const topThree = userRanking.slice(0, 3);

  // 현재 달을 가져옴
  const formattedDate = `${new Date().getMonth() + 1}월의 기부천사`;

  function handlePortfolio(get_id) {
    navigate(`/portfolio/${get_id}`);
  }
  return (
    <div className="w-[350px]">
      <div className="flex justify-between w-full max-w-[360px]">
        <div className="p-1 text-gray-600 text-xl font-RixXladywatermelonR">
          {formattedDate}
        </div>
        <div className="flex items-center">
          <div className="text-gray-600 text-sm font-RixXladywatermelonR">내 순위 :&nbsp;</div>
          {loading ? (
            <div className="text-gray-600 text-sm font-RixXladywatermelonR">순위 없음</div>
          ) : (
            <div className="text-gray-600 text-sm font-RixXladywatermelonR">
              {data?.personalRank > 0 ? data?.personalRank + "위" : "순위 없음"}
            </div>
          )}
        </div>
      </div>
      <hr className="mt-1 border-black w-[350px]" />
      {loading ? (
        <Loading />
      ) : (
        <div
          className="mx-auto max-w-[350px] h-[588px] overflow-y-auto scrollbar-hide"
          style={{ height: "calc(100dvh - 252px)" }}
        >
          <MoneyRankTop3Box topThree={topThree} onClick={handlePortfolio}/>
          <MoneyRankBox userRanking={userRanking} onClick={handlePortfolio}/>
        </div>
      )}
    </div>
  );
}

export default MoneyRanking;
