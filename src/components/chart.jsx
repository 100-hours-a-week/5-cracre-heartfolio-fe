import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");

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
    cash: 75121616,
    total_purchase: 35000616,
    total_amount: 200000000,
    total_value: 151152125,
    profitRate: -10.4,
  };

  useEffect(() => {
    // 웹소켓을 통해 주식 현재가를 수신하는 로직
    socket.on("stockPriceUpdate", (data) => {
      // 서버로부터 수신한 주식 현재가를 업데이트
      setCurrentPrice(data.price);
    });

    // 컴포넌트 언마운트 시에 소켓 연결 정리
    return () => {
      socket.off("stockPriceUpdate");
    };
  }, []);

  const handleQuantityChange = (e) => {
    if (e.target.value >= 0) {
      setQuantity(e.target.value);
    }
  };
  const total_money = currentPrice * quantity;

  const isDisabled = quantity <= 0;
  const buttonStyle = isDisabled ? "bg-[#FEF0F2]" : "bg-[#FFE7E9]";
  function buy() {
    if (quantity * currentPrice > money_data.cash) {
      alert("본인 캐시를 확인해주세요");
      return;
    } else {
      // fetch("http://localhost:8080/api/invest/order", {
      //   credentials: "include",
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     id: id,
      //     quantity: quantity,
      //     price: currentPrice,
      //   }),
      // }).then((res) => {
      //   if (res.ok) {
      //     setOrderDetails({
      //       quantity: quantity,
      //       price: currentPrice,
      //       total: quantity * currentPrice,
      //     });
      //     setIsBuyModalOpen(true);
      //   }
      // });
    }
    setOrderDetails({
      quantity: quantity,
      price: currentPrice,
      total: quantity * currentPrice,
    });
    setIsBuyModalOpen(true);
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
            // fetch("http://localhost:8080/api/invest/order", {
      //   credentials: "include",
      //   method: "DELETE",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     id: id,
      //     quantity: quantity,
      //     price: currentPrice,
      //   }),
      // }).then((res) => {
      //   if (res.ok) {
      //     setSellDetails({
      //       quantity: quantity,
      //       price: currentPrice,
      //       total: quantity * currentPrice,
      //     });
      //     setIsSellModalOpen(true);
      //   }
      // });
    }
    setSellDetails({
      quantity: quantity,
      price: currentPrice,
      total: quantity * currentPrice,
    });
    setIsSellModalOpen(true);
  }
  function closeSellModal() {
    setIsSellModalOpen(false);
  }
  return (
    <>
      <div className="mx-auto max-w-[370px]">
        <div></div>
        <p className="pb-2">{currentPrice} KRW</p>
        <TradingViewWidget symbol={props.info.symbol} />
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
              <button className="text-center text-[10px] bg-boxBackgroundColor p-2 rounded-md mx-1">
                25%
              </button>
              <button className="text-center text-[10px] bg-boxBackgroundColor p-2 rounded-md mx-1">
                50%
              </button>
              <button className="text-center text-[10px] bg-boxBackgroundColor p-2 rounded-md mx-1">
                최대
              </button>
            </div>
          </div>
          <div className="flex w-[370px] justify-between mt-3">
            <div className="flex items-center w-1/2">
              <p>총액</p>
              <p className="h-[30px] w-[130px] content-center text-right text-xs">
                {total_money} KRW
              </p>
            </div>
            <div className="flex items-center w-1/2">
              <p>내 캐시</p>
              <p className="h-[30px] w-[130px] content-center text-right text-xs">
                {money_data.cash} KRW
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
        <div
          id="my_modal_5"
          className="modal modal-bottom sm:modal-middle "
          open
        >
          <div className="modal-box text-center" style={{ width: "350px" }}>
            <h3 className="font-bold text-lg p-3">매수 거래 체결 완료!</h3>
            <p>수량 : {orderDetails.quantity}</p>
            <p>가격 : {orderDetails.price} KRW</p>
            <p>총액 : {orderDetails.total} KRW</p>
            <div className="modal-action">
              <button className="btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* 매도 완료 모달 */}
      {isSellModalOpen && (
        <div
          id="my_modal_5"
          className="modal modal-bottom sm:modal-middle "
          open
        >
          <div className="modal-box text-center" style={{ width: "350px" }}>
            <h3 className="font-bold text-lg p-3">매도 거래 체결 완료!</h3>
            <p>수량 : {sellDetails.quantity}</p>
            <p>가격 : {sellDetails.price} KRW</p>
            <p>총액 : {sellDetails.total} KRW</p>
            <div className="modal-action">
              <button className="btn" onClick={closeSellModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Chart;
