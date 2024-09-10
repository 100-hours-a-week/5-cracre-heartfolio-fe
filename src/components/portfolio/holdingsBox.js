function HoldingsBox(props) {
  return (
    <>
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="p-4">
          <div className="flex justify-between">
            <div className="text-lg  text-gray-600 font-semibold">
              {props.name}
            </div>
            <div>
              <div className="flex items-center justify-between w-[130px]">
                <div className="text-xs  text-gray-600">평가손익</div>
                <div
                  className={`text-xs ${
                    props.evalProfit > 0
                      ? "text-redColor"
                      : props.evalProfit < 0
                      ? "text-blueColor"
                      : "text-[#000000]"
                  }`}
                >
                  {props.evalProfit.toLocaleString()}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-600">수익률</div>
                <div
                  className={`text-xs ${
                    props.profitPercentage > 0
                      ? "text-redColor"
                      : props.profitPercentage < 0
                      ? "text-blueColor"
                      : "text-[#000000]"
                  }`}
                >
                  {props.profitPercentage.toFixed(2)}%
                </div>
              </div>
            </div>
          </div>
          <div className="divider my-0"></div>
          <div className="flex w-full h-[50px]">
            <div className=" h-[50px] flex-grow content-center px-1">
              <div className="flex justify-between">
                <div className="text-sm text-gray-600">보유수량</div>
                <div className="text-sm  text-gray-600">
                  {props.totalQuantity}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm  text-gray-600">평가금액</div>
                <div className="text-sm  text-gray-600">
                  {props.evalValue.toLocaleString()}
                </div>
              </div>
            </div>
            <div className="divider divider-horizontal m-0"></div>
            <div className=" h-[50px] flex-grow content-center px-1">
              <div className="flex justify-between ">
                <div className="text-sm  text-gray-600">매수금액</div>
                <div className="text-sm  text-gray-600">
                  {props.totalPurchasePrice.toLocaleString()}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm  text-gray-600">매수평균가</div>
                <div className="text-sm  text-gray-600">
                  {props.purchaseAvgPrice.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HoldingsBox;
