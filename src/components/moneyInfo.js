function MoneyInfo() {
  return (
    <div className="mx-auto max-w-[390px] px-3 mt-[34px]">
      <div className="flex justify-around">
        <div>
          <div>총 자산</div>
          <div>200,000,000</div> {/*총 자산 넣기*/}
        </div>
        <div>
          <div>보유 캐시(KRW)</div>
          <div>200,000,000</div> {/*보유 캐시 넣기*/}
        </div>
      </div>
    </div>
  );
}

export default MoneyInfo;
