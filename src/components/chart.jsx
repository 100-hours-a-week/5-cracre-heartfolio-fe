import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { BuyModal, SellModal } from "./transactionModal";
import * as StompJs from "@stomp/stompjs";
import SockJS from "sockjs-client";
import TradingViewWidget from "./tradingViewWidget";
import SellBox from "./sellBox";
import BuyBox from "./buyBox";
import useFetch from "../hooks/useFetch";

function Chart(props) {
  const { id } = useParams();
  const userId = 1;
  const {
    data: moneyData,
    error,
    loading,
  } = useFetch("https://heartfolio.site/api/portfolio/" + userId);
  const [curPrice, setcurPrice] = useState(10000); // 주식 현재가를 저장할 상태
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false); // 모달 상태 관리
  const [isSellModalOpen, setIsSellModalOpen] = useState(false); // 모달 상태 관리
  const [activeTab, setActiveTab] = useState(1);
  const [orderDetails, setOrderDetails] = useState({
    quantity: 0,
    price: 0,
    total: 0,
  });
  const [sellDetails, setSellDetails] = useState({
    quantity: 0,
    price: 0,
    total: 0,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const moneyData = {
  //   cash: 100000, //보유캐시
  //   total_purchase: 35000616, //총 매수 금액
  //   total_amount: 200000000, //총 자산
  //   total_value: 151152125, //총 평가 금액
  //   profitRate: -10.4, //평가수익률
  // };

  const stompClient = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    const socket = new SockJS("https://heartfolio.site/heartfolio");
    stompClient.current = StompJs.Stomp.over(socket);

    stompClient.current.connect({}, function (frame) {
      console.log("Connected: " + frame);

      // 특정 종목에 대한 구독
      stompClient.current.subscribe(
        `/from/stock/APPL`, // 일단 종목 APPL로 설정
        function (message) {
          const data = JSON.parse(message.body);
          console.log("서버에서 받은 데이터:", data);

          if (data && data.curPrice) {
            setcurPrice(data.curPrice);
          }
        }
      );
    });

    return () => {
      if (stompClient.current !== null) {
        stompClient.current.disconnect();
      }
    };
  }, [props.data?.symbol]);

  function closeBuyModal() {
    setIsBuyModalOpen(false);
  }

  function closeSellModal() {
    setIsSellModalOpen(false);
  }

  return (
    <>
      <div className="mx-auto max-w-[370px]">
        <div></div>
        <p className="pb-2">{curPrice.toLocaleString()} KRW</p>
        <TradingViewWidget symbol={props.data?.symbol} />
        <div
          role="tablist"
          className="tabs tabs-bordered mx-auto max-w-[370px] mt-[34px]"
        >
          <div
            role="tab"
            className={`tab h-[50px] ${activeTab === 1 ? "tab-active" : ""}`}
            onClick={() => setActiveTab(1)}
          >
            매수
          </div>
          <div
            role="tab"
            className={`tab h-[50px] ${activeTab === 2 ? "tab-active" : ""}`}
            onClick={() => setActiveTab(2)}
          >
            매도
          </div>
        </div>
        <div className="mx-auto max-w-[370px] p-4">
          <div role="tabpanel" className="tab-content block">
            {activeTab === 1 && (
              <BuyBox
                isLoggedIn={isLoggedIn}
                curPrice={curPrice}
                data={moneyData}
                id={id}
                setIsBuyModalOpen={setIsBuyModalOpen}
                setOrderDetails={setOrderDetails}
              />
            )}
            {activeTab === 2 && (
              <SellBox
                isLoggedIn={isLoggedIn}
                curPrice={curPrice}
                amount={props.data.amount}
                id={id}
                setIsSellModalOpen={setIsSellModalOpen}
                setSellDetails={setSellDetails}
              />
            )}
          </div>
        </div>
      </div>

      {/* 매수 완료 모달 */}
      {isBuyModalOpen && (
        <BuyModal
          orderDetails={orderDetails}
          onClick={() => {
            closeBuyModal();
            window.location.reload(); // 페이지 새로고침
          }}
        />
      )}
      {/* 매도 완료 모달 */}
      {isSellModalOpen && (
        <SellModal
          sellDetails={sellDetails}
          onClick={() => {
            closeSellModal();
            window.location.reload(); // 페이지 새로고침
          }}
        />
      )}
    </>
  );
}

export default Chart;
