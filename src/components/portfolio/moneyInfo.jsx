import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { moneyChange } from "../../utils/moneyUtils";
function MoneyInfo(props) {
  // URL 설정
  const url = props.id
    ? `${process.env.REACT_APP_API_URI}/portfolio/${props.id}`
    : `${process.env.REACT_APP_API_URI}/portfolio`;

  // 데이터 가져오기 상태 관리
  const { data, error, loading } = useFetch(url);

  return (
    <div className="max-w-full">
      <div className="w-full flex justify-center ">
        <div className="w-[250px] text-lg text-gray-600 font-bold font-TmoneyRoundWindExtraBold text-left ml-[22px]">
          {props.id ? "포트폴리오" : "내 포트폴리오"}
        </div>
        <div className=" w-[90px] text-xs text-gray-500 pt-10 text-right mr-6">
          가격 단위 (KRW)
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center h-screen">
          <div className="spinner">Loading...</div>
        </div>
      ) : (
        <div className="mx-auto max-w-[390px] px-3 mt-[10px]">
          <div className="flex justify-around">
            <div>
              <div className="text-sm text-gray-600 font-semibold">총 자산</div>
              <div className="text-base text-gray-600">
                {moneyChange(data?.totalAmount)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 font-semibold">
                보유 캐시
              </div>
              <div className="text-base text-gray-600">
                {moneyChange(data?.cash)}
              </div>
            </div>
          </div>
          <div className="flex justify-around mt-[34px]">
            <div>
              <div className="text-sm text-gray-600 font-semibold">
                총 매수 금액
              </div>
              <div className="text-base text-gray-600">
                {moneyChange(data?.totalPurchase)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 font-semibold">
                총 평가 금액
              </div>
              <div className="text-base text-gray-600">
                {moneyChange(data?.totalValue)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 font-semibold">
                평가 수익률
              </div>
              <div
                className={`text-base ${
                  data?.profitRate > 0
                    ? "text-redColor" // 양수일 때, 빨강색
                    : data?.profitRate < 0
                    ? "text-blueColor" // 음수일 때, 파랑색
                    : " text-gray-600" // 0일 때, 검정색
                }`}
              >
                {/* {data.profitRate}% */}
                {data?.profitRate === undefined
                  ? 0
                  : data?.profitRate.toFixed(2)}
                %
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MoneyInfo;
