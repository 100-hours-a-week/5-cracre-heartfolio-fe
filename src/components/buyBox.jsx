import React, { useState } from "react";

function BuyBox({
  curPrice,
  moneyData,
  id,
  setIsBuyModalOpen,
  setOrderDetails,
}) {
  const [quantity, setQuantity] = useState("");

  const handleQuantityChange = (e) => {
    if (e.target.value >= 0) {
      setQuantity(e.target.value);
    }
  };

  const handleMaxQuantity = () => {
    const maxQuantity = Math.floor(moneyData.cash / curPrice);
    setQuantity(maxQuantity);
  };

  const handle50PercentQuantity = () => {
    const maxQuantity = Math.floor(moneyData.cash / curPrice);
    setQuantity(Math.floor(maxQuantity / 2));
  };

  const handle25PercentQuantity = () => {
    const maxQuantity = Math.floor(moneyData.cash / curPrice);
    setQuantity(Math.floor(maxQuantity / 4));
  };

  const total_money = curPrice * quantity;

  const isDisabled = quantity <= 0;
  const buttonStyle = isDisabled ? "bg-[#FEF0F2]" : "bg-[#FFE7E9]";

  function buy() {
    console.log("id:", id);
    console.log("quantity:", quantity);
    console.log("price:", curPrice);
    if (quantity * curPrice > moneyData.cash) {
      alert("본인 캐시를 확인해주세요");
      return;
    } else {
      fetch("https://heartfolio.site/api/invest/order", {
        // credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stockId: id,
          quantity: quantity,
          price: curPrice,
        }),
      }).then((res) => {
        if (res.ok) {
          setOrderDetails({
            quantity: quantity,
            price: curPrice,
            total: quantity * curPrice,
          });
          setIsBuyModalOpen(true);
        }
      });
    }
  }

  return (
    <div>
      <div className="flex w-[350px] pt-5">
        <div className="flex items-center w-[200px] justify-between">
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
        <div className="w-[150px] text-center">
          <button
            className="text-center text-[10px] bg-boxBackgroundColor p-2 rounded-md mx-1 hover:bg-boxHoverColor"
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
      <div className="flex w-[350px] justify-between mt-5">
        <div className="flex items-center w-1/2">
          <p>총액</p>
          <p className="h-[30px] w-[120px] content-center text-right text-xs">
            {total_money.toLocaleString()} KRW
          </p>
        </div>
        <div className="flex items-center w-1/2">
          <p>내 캐시</p>
          <p className="h-[30px] w-[115px] content-center text-right text-xs">
            {moneyData.cash.toLocaleString()} KRW
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className={`${buttonStyle} h-10 w-[180px] mt-5 rounded-md text-sm`}
          disabled={isDisabled}
          onClick={() => buy()}
        >
          매수
        </button>
      </div>
    </div>
  );
}

export default BuyBox;
