import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { BuyModal, SellModal } from "./transactionModal";
import * as StompJs from "@stomp/stompjs";
import SockJS from "sockjs-client";
import TradingViewWidget from "./tradingViewWidget";
import SellBox from "./sellBox";
import BuyBox from "./buyBox";
import useFetch from "../../hooks/useFetch";

function Chart(props) {
  const { id } = useParams();
  const token = localStorage.getItem("access_token");
  const [moneyData, setMoneyData] = useState(null);
  const [curPrice, setCurPrice] = useState(props.data?.curPrice); // 주식 현재가를 저장할 상태
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false); // 모달 상태 관리
  const [isSellModalOpen, setIsSellModalOpen] = useState(false); // 모달 상태 관리
  const [activeTab, setActiveTab] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
  const stompClient = useRef(null);

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    const socket = new SockJS(`${process.env.REACT_APP_API_HOST}/heartfolio`);
    stompClient.current = StompJs.Stomp.over(socket);

    stompClient.current.connect({}, function (frame) {
      console.log("Connected: " + frame);

      // 특정 종목에 대한 구독
      if (stompClient.current && props.data?.symbol) {
        stompClient.current.subscribe(
          `/from/stock/${props.data.symbol}`,
          function (message) {
            const data = JSON.parse(message.body);

            if (data && data.curPrice) {
              setCurPrice(data.curPrice);
            }
          }
        );
      }
    },
      function (error) {
        console.log("WebSocket connection error handled");
      }
    );
    return () => {
      // 컴포넌트가 언마운트되거나 종목이 변경될 때 연결 해제
      if (stompClient.current !== null) {
        stompClient.current.disconnect();
        stompClient.current = null;
      }
    };
  }, [props.data?.symbol, token]);

  const { data } = useFetch(
    isAuthenticated ? `${process.env.REACT_APP_API_URI}/portfolio` : null
  );

  // 로그인이 되어 있지 않다면 빈 데이터를 설정
  useEffect(() => {
    console.log("Fetched data: ", data);
    if (!token) {
      setMoneyData([]); // 토큰이 없을 경우 빈 데이터를 설정
    } else if (data) {
      setMoneyData(data); // 데이터를 받아왔을 경우 설정
    }
  }, [data, token]);
  console.log("data",data);
  console.log("token",token);
  function closeBuyModal() {
    setIsBuyModalOpen(false);
  }

  function closeSellModal() {
    setIsSellModalOpen(false);
  }

  return (
    <>
      <div
        className="mx-auto max-w-[370px] overflow-y-auto scrollbar-hide"
        style={{ height: "calc(100dvh - 243px)" }}
      >
        <p className="pb-2 text-gray-600 text-lg">
          {curPrice.toLocaleString()} KRW
        </p>
        <TradingViewWidget
          symbol={props.data?.symbol}
          width={370}
          height={400}
        />
        <div
          role="tablist"
          className="tabs tabs-bordered mx-auto max-w-[370px] mt-[34px] "
        >
          <div
            role="tab"
            className={`tab h-[50px] ${
              activeTab === 1 ? "tab-active" : ""
            } text-gray-600`}
            onClick={() => setActiveTab(1)}
          >
            매수
          </div>
          <div
            role="tab"
            className={`tab h-[50px] ${
              activeTab === 2 ? "tab-active" : ""
            } text-gray-600`}
            onClick={() => setActiveTab(2)}
          >
            매도
          </div>
        </div>
        <div className="mx-auto max-w-[370px] p-4">
          <div role="tabpanel" className="tab-content block">
            {activeTab === 1 && (
              <BuyBox
                isLoggedIn={isAuthenticated}
                curPrice={curPrice}
                data={moneyData}
                id={id}
                setIsBuyModalOpen={setIsBuyModalOpen}
                setOrderDetails={setOrderDetails}
              />
            )}
            {activeTab === 2 && (
              <SellBox
                isLoggedIn={isAuthenticated}
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
