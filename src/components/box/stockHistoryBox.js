function StockHistoryBox() {
  return (
    <>
        <div className="w-[350px] mx-auto justify-between">
          <div className="flex w-fit">
            <div>매도 일시 :</div>
            <div className="ml-1">YYYY-MM-DD HH-MM-SS</div>
          </div>
          <div className="flex w-fit">
            <div>거래 가격 :</div>
            <div className="ml-1">23,000</div>
          </div>
          <div className="flex w-fit">
            <div>수량 :</div>
            <div className="ml-1">3</div>
          </div>
        </div>
    </>
  );
}

export default StockHistoryBox;
