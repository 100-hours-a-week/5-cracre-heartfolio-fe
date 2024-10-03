import useFetch from "../../hooks/useFetch";
import { Loading } from "../common/loading";
import { MoneyRankBox, MoneyRankTop3Box } from "./moneyRankBox";

function MoneyRanking() {
  const { data, loading } = useFetch(
    `${process.env.REACT_APP_API_URI}/rank/donation`
  );

  // 데이터 구조가 유효한지 확인
  const userRanking = data?.userRanking || [];

  // 상위 3개 아이템 추출
  const topThree = userRanking.slice(0, 3);

  return (
    <div className="w-[350px]">
      <div className="flex justify-between w-full max-w-[360px]">
        <div className="p-1 text-gray-600 text-xl font-RixXladywatermelonR">이달의 기부천사</div>
        <div className="flex items-center">
          <div className="text-gray-600 text-sm">내 순위 :</div>
          {loading ? (
            <div className="text-gray-600 text-sm">순위 없음</div>
          ) : (
            <div className="text-gray-600 text-sm">
              {data?.personalRank > 0 ? data?.personalRank + "위" : "순위 없음"}
            </div>
          )}
        </div>
      </div>
      <hr className="mt-1 border-black w-[350px]" />
      {loading ? (
        <Loading />
      ) : (
        <div className="mx-auto max-w-[350px] h-[588px] overflow-y-auto scrollbar-hide"  style={{ height: "calc(100dvh - 247px)" }}>
          <MoneyRankTop3Box topThree={topThree} />
          <MoneyRankBox userRanking={userRanking} />
        </div>
      )}
    </div>
  );
}

export default MoneyRanking;
