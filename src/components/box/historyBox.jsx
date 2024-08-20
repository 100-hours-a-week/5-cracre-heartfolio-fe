function HistoryBox(props) {
  function sellOrBuy(how) {
    if (how == "buy") {
      return "매수";
    } else {
      return "매도";
    }
  }
  function money_change(money) {
    if (money >= 1000000) {
      // 1,000,000 이상
      let mValue = money / 1000000; // M 단위로 변환
      return `${mValue.toFixed(1).toLocaleString()}M`; // M 단위와 콤마 추가
    } else {
      return money.toLocaleString(); // 기본적으로 1,000 단위로 콤마를 추가
    }
  }
  return (
    <>
      <div className="w-[330px] h-[80px] flex justify-center items-center">
        <div className="flex w-[320px] justify-between items-center">
          <div className="w-[180px]">
            <div className="text-sm">{props.order_date}</div>
            <div className="flex w-[140px] justify-between">
              <div>{props.name}</div>
              <div
                className={`${
                  props.order_category == "buy"
                    ? "text-redColor" // 매수일 때, 빨강색
                    : "text-blueColor" // 매도일 때, 파랑색
                }`}
              >
                {sellOrBuy(props.order_category)}
              </div>
            </div>
          </div>
          <div className="w-[140px]">
            <div className="flex justify-between">
              <div className="text-sm">평단가</div>
              <div className="text-sm">{money_change(props.order_price)}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm">체결수량</div>
              <div className="text-sm">{props.order_amount}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm">체결금액</div>
              <div
                className={`text-sm ${
                  props.order_category == "buy"
                    ? "text-redColor" // 매수일 때, 빨강색
                    : "text-blueColor" // 매도일 때, 파랑색
                }`}
              >
                {money_change(props.total_amount)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HistoryBox;
