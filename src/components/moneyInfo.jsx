function MoneyInfo(props) {
  function money_change(money) {
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
  return (
    <div className="max-w-full">
      <div className="mx-auto max-w-[390px] px-3 mt-[34px]">
        <div className="flex justify-around">
          <div>
            <div className="text-sm">총 자산</div>
            <div className="text-base">
              {money_change(props.data.total_amount)}
            </div>
          </div>
          <div>
            <div className="text-sm">보유 캐시(KRW)</div>
            <div className="text-base">{money_change(props.data.cash)}</div>
          </div>
        </div>
        <div className="flex justify-around mt-[34px]">
          <div>
            <div className="text-sm">총 매수 금액(KRW)</div>
            <div className="text-base">
              {money_change(props.data.total_purchase)}
            </div>
          </div>
          <div>
            <div className="text-sm">총 평가 금액(KRW)</div>
            <div className="text-base">
              {money_change(props.data.total_value)}
            </div>
          </div>
          <div>
            <div className="text-sm">평가 수익률</div>
            <div
              className={`text-base ${
                props.data.profitRate > 0
                  ? "text-redColor" // 양수일 때, 빨강색
                  : props.data.profitRate < 0
                  ? "text-blueColor" // 음수일 때, 파랑색
                  : "text-[#000000]" // 0일 때, 검정색
              }`}
            >
              {props.data.profitRate}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoneyInfo;
