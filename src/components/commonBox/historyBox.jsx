function HistoryBox(props) {
  function sellOrBuy(how) {
    if (how == "buy") {
      return "매수";
    } else {
      return "매도";
    }
  }
  const moneyChange = (money) => {
    if (money >= 1000000) {
      // 1,000,000 이상
      let mValue = money / 1000000; // M 단위로 변환
      return `${mValue.toFixed(1).toLocaleString()}M`; // M 단위와 콤마 추가
    } else {
      return money.toLocaleString(); // 기본적으로 1,000 단위로 콤마를 추가
    }
  };

  const formatDate = (date) => {
    const [datePart, timePart] = date.split(".");
    const formattedDate = datePart.replace("T", " ");
    return formattedDate;
  };

  return (
    <>
      <div className="w-[330px] h-[80px] flex justify-center items-center">
        <div className="flex w-[320px] justify-between items-center">
          <div className="w-[180px]">
            <div className="text-sm  text-gray-600">{formatDate(props.orderDate)}</div>
            <div className="flex w-[140px] justify-between  text-gray-600">
              <div>{props.name}</div>
              <div
                className={`${
                  props.orderCategory == "buy"
                    ? "text-redColor" // 매수일 때, 빨강색
                    : "text-blueColor" // 매도일 때, 파랑색
                }`}
              >
                {sellOrBuy(props.orderCategory)}
              </div>
            </div>
          </div>
          <div className="w-[140px]">
            <div className="flex justify-between">
              <div className="text-sm  text-gray-600">평단가</div>
              <div className="text-sm  text-gray-600">{moneyChange(props.orderPrice)}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm  text-gray-600">체결수량</div>
              <div className="text-sm  text-gray-600">{props.orderAmount}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm  text-gray-600">체결금액</div>
              <div
                className={`text-sm ${
                  props.orderCategory == "buy"
                    ? "text-redColor" // 매수일 때, 빨강색
                    : "text-blueColor" // 매도일 때, 파랑색
                }`}
              >
                {moneyChange(props.totalAmount)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HistoryBox;
