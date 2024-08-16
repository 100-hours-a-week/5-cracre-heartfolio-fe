function HoldingsBox() {
  return (
    <>
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="p-4">
        <div className="flex justify-between">
          <div className="text-lg">Apple</div>
          <div>
            <div className="flex items-center justify-between w-[130px]">
              <div className="text-xs">평가손익</div>
              <div className="text-xs">2,251,512</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-xs">수익률</div>
              <div className="text-xs">30.08%</div>
            </div>
          </div>
        </div>
        <div className="divider my-0"></div>
        <div className="flex w-full h-[50px]">
          <div className=" h-[50px] flex-grow content-center px-1">
            <div className="flex justify-between">
              <div className="text-sm">보유수량</div>
              <div className="text-sm">3,000,000</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm">평가금액</div>
              <div className="text-sm">571,151,211</div>
            </div>
          </div>
          <div className="divider divider-horizontal m-0"></div>
          <div className=" h-[50px] flex-grow content-center px-1">
            <div className="flex justify-between ">
              <div className="text-sm">매수금액</div>
              <div className="text-sm">571,151,211</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm">매수평균가</div>
              <div className="text-sm">170,000</div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default HoldingsBox;
