import { MoneyRankBox, MoneyRankTop3Box } from "./moneyRankBox";

function MoneyRanking() {
  return (
    <div>
      <div className="flex justify-between w-full max-w-[350px] my-2">
        <div className="text-gray-600 text-xl">이달의 기부왕</div>
        <div className="flex items-center">
          <div className="text-gray-600 text-sm">내 순위 :</div>
          <div className="text-gray-600 text-sm">34위</div>
        </div>
      </div>
      <hr className="mt-1 border-black w-[350px]" />
      <div className="mx-auto max-w-[350px] pb-16">
        <MoneyRankTop3Box />
        <MoneyRankBox />
      </div>
    </div>
  );
}

export default MoneyRanking;
