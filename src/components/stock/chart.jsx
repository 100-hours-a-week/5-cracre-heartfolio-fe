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
  const userId = 1;
  const token = localStorage.getItem("access_token");
  const [moneyData, setMoneyData] = useState(null);
  const [curPrice, setCurPrice] = useState(props.data?.curPrice); // 주식 현재가를 저장할 상태
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
  const stompClient = useRef(null);

  useEffect(() => {
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
    });
    return () => {
      // 컴포넌트가 언마운트되거나 종목이 변경될 때 연결 해제
      if (stompClient.current !== null) {
        stompClient.current.disconnect();
        stompClient.current = null;
      }
    };
  }, [props.data?.symbol]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          setMoneyData([]); // 토큰이 없을 경우 빈 데이터를 설정
          return;
        }

        const response = await fetch(`${process.env.REACT_APP_API_URI}/portfolio`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 401) {
          // Access token 만료 -> refresh token으로 새 access token 요청
          const refreshToken = localStorage.getItem("refresh_token");
          const refreshResponse = await fetch(
            `${process.env.REACT_APP_API_URI}/auth/refresh-token`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refreshToken: refreshToken }),
            }
          );

          if (refreshResponse.status === 200) {
            const data = await refreshResponse.json();
            localStorage.setItem("access_token", data.accessToken); // 새 access token 저장

            // 새로운 access token으로 원래 요청 다시 시도
            response = await fetch(
              `${process.env.REACT_APP_API_URI}/portfolio`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "access_token"
                  )}`, // 새 access token 사용
                  "Content-Type": "application/json",
                },
              }
            );
          } else {
            // refresh token도 만료되거나 오류가 있으면 로그인 페이지로 이동
            localStorage.removeItem("access_token");
            window.location.href = "/login";
            return;
          }
        }

        const result = await response.json();
        setMoneyData(result);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
        setMoneyData([]); // 오류가 발생해도 빈 데이터를 설정하여 컴포넌트가 정상적으로 동작하도록 함
      }
    };

    fetchData();
  }, [userId, token]);

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
        <p className="pb-2 text-gray-600 text-lg">
          {curPrice.toLocaleString()} KRW
        </p>
        <TradingViewWidget symbol={props.data?.symbol} />
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
        <div className="mx-auto max-w-[370px] p-4 pb-20">
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
