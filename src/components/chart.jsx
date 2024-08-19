import { useState } from "react";

const { default: TradingViewWidget } = require("./tradingViewWidget");

function Chart() {
  const [quantity, setQuantity] = useState("");

  const handleQuantityChange = (e) => {
    if (e.target.value >= 0) {
      setQuantity(e.target.value);
    }
  };
  const isDisabled = quantity <= 0;
  const buttonStyle = isDisabled ? "bg-[#FEF0F2]" : "bg-[#FFE7E9]";
  return (
    <>
      <div className="mx-auto max-w-[370px]">
        <TradingViewWidget />
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
                KRW
              </p>
            </div>
            <div className="flex items-center w-1/2">
              <p>내 캐시</p>
              <p className="h-[30px] w-[130px] content-center text-right text-xs">
                KRW
              </p>
            </div>
          </div>
        </div>
        <div className="w-[390px] text-center mt-9">
          <button
            className={`${buttonStyle} h-10 w-[140px] mx-3 rounded-md text-sm`}
            disabled={isDisabled}
          >
            매수
          </button>
          <button
            className={`${buttonStyle} h-10 w-[140px] mx-3 rounded-md text-sm`}
            disabled={isDisabled}
          >
            매도
          </button>
        </div>
      </div>
    </>
  );
}

export default Chart;
