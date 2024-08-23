import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { BuyModal, SellModal } from "./transactionModal";
import * as StompJs from "@stomp/stompjs";
import SockJS from 'sockjs-client';
const { default: TradingViewWidget } = require("./tradingViewWidget");

function Chart(props) {
  const { id } = useParams();
  // const {money_data, error, loading} = useFetch("http://localhost:8080/api/portfolio/"+userId);
  const [quantity, setQuantity] = useState("");
  const [currentPrice, setCurrentPrice] = useState(0); // 주식 현재가를 저장할 상태
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false); // 모달 상태 관리
  const [isSellModalOpen, setIsSellModalOpen] = useState(false); // 모달 상태 관리
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

  const money_data = {
    cash: 100000, //보유캐시
    total_purchase: 35000616, //총 매수 금액
    total_amount: 200000000, //총 자산
    total_value: 151152125, //총 평가 금액
    profitRate: -10.4, //평가수익률
  };

  const stompClient = useRef(null);

  useEffect(() => {
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

          if (data && data.currentPrice) {
            setCurrentPrice(data.currentPrice);
          }
        }
      );
    });

    return () => {
      if (stompClient.current !== null) {
        stompClient.current.disconnect();
      }
    };
  }, [props.data.symbol]);

  const handleQuantityChange = (e) => {
    if (e.target.value >= 0) {
      setQuantity(e.target.value);
    }
  };

  ///추가 코드1.

  // "최대" 버튼 클릭 시 최대 수량을 계산하여 설정하는 함수
  const handleMaxQuantity = () => {
    const maxQuantity = Math.floor(money_data.cash / currentPrice);
    setQuantity(maxQuantity);
  };

  // "50%" 버튼 클릭 시 최대 수량의 50%를 계산하여 설정하는 함수
  const handle50PercentQuantity = () => {
    const maxQuantity = Math.floor(money_data.cash / currentPrice);
    setQuantity(Math.floor(maxQuantity / 2));
  };

  // "25%" 버튼 클릭 시 최대 수량의 25%를 계산하여 설정하는 함수
  const handle25PercentQuantity = () => {
    const maxQuantity = Math.floor(money_data.cash / currentPrice);
    setQuantity(Math.floor(maxQuantity / 4));
  };

  ////요까지1

  const total_money = currentPrice * quantity;

  const isDisabled = quantity <= 0;
  const buttonStyle = isDisabled ? "bg-[#FEF0F2]" : "bg-[#FFE7E9]";
  function buy() {
    if (quantity * currentPrice > money_data.cash) {
      alert("본인 캐시를 확인해주세요");
      return;
    } else {
      fetch("https://heartfolio.site/api/invest/order", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stockId: 1,
          quantity: quantity,
          price: currentPrice,
        }),
      }).then((res) => {
        if (res.ok) {
          setOrderDetails({
            quantity: quantity,
            price: currentPrice,
            total: quantity * currentPrice,
          });
          setIsBuyModalOpen(true);
        }
      });
    }
    // setOrderDetails({
    //   quantity: quantity,
    //   price: currentPrice,
    //   total: quantity * currentPrice,
    // });
    // setIsBuyModalOpen(true);
  }
  function closeModal() {
    setIsBuyModalOpen(false);
  }

  function sell() {
    if (quantity < 0) {
      // 수량이 본인이 가지고 있는 수량보다 큰 경우
      alert("본인 캐시를 확인해주세요");
      return;
    } else {
      fetch("https://heartfolio.site/api/invest/order", {
        credentials: "include",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          quantity: quantity,
          price: currentPrice,
        }),
      }).then((res) => {
        if (res.ok) {
          setSellDetails({
            quantity: quantity,
            price: currentPrice,
            total: quantity * currentPrice,
          });
          setIsSellModalOpen(true);
        }
      });
    }
    // setSellDetails({
    //   quantity: quantity,
    //   price: currentPrice,
    //   total: quantity * currentPrice,
    // });
    // setIsSellModalOpen(true);
  }
  function closeSellModal() {
    setIsSellModalOpen(false);
  }
  return (
    <>
      <div className="mx-auto max-w-[370px]">
        <div></div>
        <p className="pb-2">{currentPrice.toLocaleString()} KRW</p>
        <TradingViewWidget symbol={props.data.symbol} />
        <div>
          <div className="flex w-[370px]">
            <div className="flex items-center w-3/5 justify-between">
              <label>수량</label>
              <div className="flex items-center">
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  placeholder="0"
                  className="h-[30px] w-[120px]"
                ></input>
                <p className="text-gray-500 ml-1">주</p>
              </div>
            </div>
            <div className="w-2/5 text-center">
              <button
                className="text-center text-[10px] bg-boxBackgroundColor p-2 rounded-md mx-1  hover:bg-boxHoverColor"
                onClick={handle25PercentQuantity}
              >
                25%
              </button>
              <button
                className="text-center text-[10px] bg-boxBackgroundColor p-2 rounded-md mx-1 hover:bg-boxHoverColor"
                onClick={handle50PercentQuantity}
              >
                50%
              </button>
              <button
                className="text-center text-[10px] bg-boxBackgroundColor p-2 rounded-md mx-1 hover:bg-boxHoverColor"
                onClick={handleMaxQuantity}
              >
                최대
              </button>
            </div>
          </div>
          <div className="flex w-[370px] justify-between mt-3">
            <div className="flex items-center w-1/2">
              <p>총액</p>
              <p className="h-[30px] w-[130px] content-center text-right text-xs">
                {total_money.toLocaleString()} KRW
              </p>
            </div>
            <div className="flex items-center w-1/2">
              <p>내 캐시</p>
              <p className="h-[30px] w-[130px] content-center text-right text-xs">
                {money_data.cash.toLocaleString()} KRW
              </p>
            </div>
          </div>
        </div>
        <div className="w-[350px] text-center mt-9">
          <button
            className={`${buttonStyle} h-10 w-[140px] mx-3 rounded-md text-sm`}
            disabled={isDisabled}
            onClick={() => buy()}
          >
            매수
          </button>
          <button
            className={`${buttonStyle} h-10 w-[140px] mx-3 rounded-md text-sm`}
            disabled={isDisabled}
            onClick={() => sell()}
          >
            매도
          </button>
        </div>
      </div>

      {/* 매수 완료 모달 */}
      {isBuyModalOpen && (
        <BuyModal orderDetails={orderDetails} onClick={closeModal} />
      )}
      {/* 매도 완료 모달 */}
      {isSellModalOpen && (
        <SellModal sellDetails={sellDetails} onClick={closeSellModal} />
      )}
    </>
  );
}

export default Chart;
