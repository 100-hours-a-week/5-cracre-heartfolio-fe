import React, { useState } from "react";
import Swal from "sweetalert2";

function SellBox({
  curPrice,
  amount,
  id,
  setIsSellModalOpen,
  setSellDetails,
  isLoggedIn,
}) {
  const [quantity, setQuantity] = useState("");
  const token = localStorage.getItem("access_token");

  const handleQuantityChange = (e) => {
    if (e.target.value >= 0) {
      setQuantity(e.target.value);
    }
  };

  const handleMaxQuantity = () => {
    setQuantity(amount);
  };

  const handle50PercentQuantity = () => {
    setQuantity(Math.floor(amount / 2));
  };

  const handle25PercentQuantity = () => {
    setQuantity(Math.floor(amount / 4));
  };

  const total_money = curPrice * quantity;

  const isDisabled = quantity <= 0;
  const buttonStyle = isDisabled ? "bg-[#FEF0F2]" : "bg-[#FFE7E9]";

  function money_change(money) {
    if (money === undefined || money === null) return "0";
    if (money >= 1000000000000) {
      // 1조 이상
      let trillion = Math.floor(money / 1_0000_0000_0000);
      let billion = Math.floor((money % 1_0000_0000_0000) / 1_0000_0000);
      let million = Math.floor((money % 1_0000_0000) / 10000);
      return `${trillion}조 ${billion}억 ${million}만`;
    } else if (money >= 100000000) {
      // 1억 이상 1조 미만
      let billion = Math.floor(money / 1_0000_0000);
      let million = Math.floor((money % 1_0000_0000) / 10000);
      return `${billion}억 ${million}만`;
    } else {
      return money.toLocaleString(); // 기본적으로 1,000 단위로 콤마를 추가
    }
  }

  function sell() {
    if (!isLoggedIn) {
      Swal.fire({
        icon: "warning",
        text: "로그인이 필요한 서비스입니다.",
        footer: '<a href="/login">로그인 하러가기</a>',
        customClass: {
          confirmButton:
            "bg-btnNoClickColor w-[70px] h-[40px] text-gray-800 rounded hover:bg-btnClickColor", // Tailwind CSS 클래스 적용
        },
        buttonsStyling: false,
      });
      return;
    } else if (amount < quantity) {
      Swal.fire({
        icon: "error",
        text: "본인의 보유 수량을 확인해주세요",
        customClass: {
          confirmButton:
            "bg-btnNoClickColor w-[70px] h-[40px] text-gray-800 rounded hover:bg-btnClickColor", // Tailwind CSS 클래스 적용
        },
        buttonsStyling: false,
      });
      return;
    } else {
      fetch("https://heartfolio.site/api/invest/order", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stockId: id,
          quantity: quantity,
          price: curPrice,
        }),
      }).then((res) => {
        if (res.ok) {
          setSellDetails({
            quantity: quantity,
            price: curPrice,
            total: quantity * curPrice,
          });
          setIsSellModalOpen(true);
        }
      });
    }
  }

  return (
    <div>
      <div className="flex w-[350px] pt-5">
        <div className="flex items-center w-[170px] justify-between">
          <label className="text-gray-600">수량</label>
          <div className="flex items-center">
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              placeholder="0"
              className="h-[30px] w-[100px] text-gray-600"
            ></input>
            <p className="text-gray-600 ml-1 ">주</p>
          </div>
        </div>
        <div className="w-[180px] text-center">
          <button
            className="text-center text-[10px] bg-boxBackgroundColor p-2 rounded-md mx-1 hover:bg-boxHoverColor text-gray-600"
            onClick={() => setQuantity(0)}
          >
            0
          </button>
          <button
            className="text-center text-[10px] bg-boxBackgroundColor p-2 rounded-md mx-1 hover:bg-boxHoverColor  text-gray-600"
            onClick={handle25PercentQuantity}
          >
            25%
          </button>
          <button
            className="text-center text-[10px] bg-boxBackgroundColor p-2 rounded-md mx-1 hover:bg-boxHoverColor  text-gray-600"
            onClick={handle50PercentQuantity}
          >
            50%
          </button>
          <button
            className="text-center text-[10px] bg-boxBackgroundColor p-2 rounded-md mx-1 hover:bg-boxHoverColor  text-gray-600"
            onClick={handleMaxQuantity}
          >
            최대
          </button>
        </div>
      </div>
      <div className="flex w-[350px] justify-between mt-5">
        <div className="flex items-center w-1/2">
          <p className=" text-gray-600">총액</p>
          <p className="h-[30px] w-[120px] content-center text-right text-xs  text-gray-600">
            {money_change(total_money)} KRW
          </p>
        </div>
        <div className="flex items-center w-1/2">
          <p className=" text-gray-600">보유수량</p>
          <p className="h-[30px] w-[115px] content-center text-right text-xs  text-gray-600">
            {amount}
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className={`${buttonStyle} h-10 w-[180px] mt-5 rounded-md text-sm  text-gray-600`}
          disabled={isDisabled}
          onClick={() => sell()}
        >
          매도
        </button>
      </div>
    </div>
  );
}

export default SellBox;
