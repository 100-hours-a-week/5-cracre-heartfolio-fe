function HistoryBox() {
  return (
    <>
      <div className="w-[350px] h-[80px] content-center">
        <div className="flex w-[350px] justify-between items-center">
          <div className="w-[180px]">
            <div className="text-sm">YYYY-MM-DD HH:MM:SS</div>
            <div className="flex w-[90px] justify-between">
              <div>종목명</div>
              <div>매수</div>
            </div>
          </div>
          <div className="w-[120px]">
            <div className="flex justify-between">
              <div className="text-sm">평단가</div>
              <div className="text-sm">65,000</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm">체결수량</div>
              <div className="text-sm">2</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm">체결금액</div>
              <div className="text-sm">130,000</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HistoryBox;
