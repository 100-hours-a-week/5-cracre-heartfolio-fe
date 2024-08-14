function MoneyInfo() {
  return (
    <div className="max-w-full">
      <div className="mx-auto max-w-[390px] px-3 mt-[34px]">
        <div className="flex justify-around">
          <div>
            <div className="text-sm">총 자산</div>
            <div className="text-base">200,000,000</div> {/*총 자산 넣기*/}
          </div>
          <div>
            <div className="text-sm">보유 캐시(KRW)</div>
            <div className="text-base">200,000,000</div> {/*보유 캐시 넣기*/}
          </div>
        </div>
        <div className="flex justify-around mt-[34px]">
          <div>
            <div className="text-sm">총 매수 금액(KRW)</div>
            <div className="text-base">200,000,000</div> {/*총 매수 금액 넣기*/}
          </div>
          <div>
            <div className="text-sm">총 평가 금액(KRW)</div>
            <div className="text-base">200,000,000</div> {/*총 평가 금액 넣기*/}
          </div>
          <div>
            <div className="text-sm">평가 수익률</div>
            <div className="text-base">200,000,000</div> {/*평가 수익률 넣기*/}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoneyInfo;
