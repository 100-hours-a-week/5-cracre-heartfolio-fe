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
  const token = localStorage.getItem("access-token");

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
          <p>보유수량</p>
          <p className="h-[30px] w-[115px] content-center text-right text-xs">
            {amount}
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className={`${buttonStyle} h-10 w-[180px] mt-5 rounded-md text-sm`}
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
