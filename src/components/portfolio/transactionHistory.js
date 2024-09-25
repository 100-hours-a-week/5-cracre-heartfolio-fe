import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import HistoryBox from "../commonBox/historyBox";
import Lottie from "lottie-react";
import noInfoAnimation from "../../assets/animations/noInfo.json";

function TransactionHistory(props) {
    // URL 설정
    const url = props.id
    ? `${process.env.REACT_APP_API_URI}/portfolio/investInfo/${props.id}`
    : `${process.env.REACT_APP_API_URI}/portfolio/investInfo`;

  // 데이터 가져오기 위한 상태 관리
  const { data, error, loading } = useFetch(url);

  // data가 배열인지 확인
  const transactionData = Array.isArray(data?.body) ? data.body : [];

  return (
    <>
      <div className="mx-auto max-w-[350px] pb-8">
        {loading ? (
          <div className="flex justify-center h-screen">
            <div className="spinner">Loading...</div>
          </div>
        ) : error ? (
          // 에러 상태 처리
          <div className="text-center text-red-500">
            에러가 발생했습니다: {error.message}
          </div>
        ) : transactionData.length === 0 ? (
          // 거래 내역이 없을 때 처리
          <div className="flex flex-col items-center h-screen max-h-[500px]">
            <div className="w-80 h-80">
              <Lottie animationData={noInfoAnimation} loop={true} />
            </div>
            <div className="text-lg text-gray-600">
              거래 내역이 아직 없습니다.
            </div>
          </div>
        ) : (
          <div>
            <div className="text-xs mb-2 text-right text-gray-600">
              가격 단위(KRW)
            </div>
            <ul role="list" className="divide-y divide-gray-200">
              {transactionData.map((item) => (
                <li key={item.id} className="py-2">
                  <HistoryBox
                    name={item.name}
                    orderCategory={item.orderCategory}
                    orderDate={item.orderDate}
                    orderAmount={item.orderAmount}
                    orderPrice={item.orderPrice}
                    totalAmount={item.totalAmount}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default TransactionHistory;
