import useFetch from "../../hooks/useFetch";
import { MoneyRankBox, MoneyRankTop3Box } from "./moneyRankBox";

function MoneyRanking() {
  const { data, loading } = useFetch(`${process.env.REACT_APP_API_URI}/rank/donation`);
  
  // 데이터 구조가 유효한지 확인
  const userRanking = data?.userRanking || [];

  // 상위 3개 아이템 추출
  const topThree = userRanking.slice(0, 3);

  return (
    <div>
      <div className="flex justify-between w-full max-w-[350px] my-2">
        <div className="text-gray-600 text-xl">이달의 기부왕</div>
        <div className="flex items-center">
          <div className="text-gray-600 text-sm">내 순위 :</div>
          <div className="text-gray-600 text-sm">{data?.personalRank>0 ? data?.personalRank+"위" : "순위 없음"}</div>
        </div>
      </div>
      <hr className="mt-1 border-black w-[350px]" />
      <div className="mx-auto max-w-[350px] h-[660px] pb-5 overflow-y-auto scrollbar-hide">
        <MoneyRankTop3Box topThree={topThree}/>
        <MoneyRankBox userRanking={userRanking}/>
      </div>
    </div>
  );
}

export default MoneyRanking;
