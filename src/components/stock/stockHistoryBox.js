function StockHistoryBox(props) {
  const formatDate = (date) => {
    const [datePart, timePart] = date.split(".");
    const formattedDate = datePart.replace("T", " ");
    return formattedDate;
  };
  return (
    <>
      <div className="w-[350px] mx-auto justify-between">
        <div className="flex w-fit">
          <div className="text-gray-600">매도 일시 :</div>
          <div className="ml-1 text-gray-600">{formatDate(props.orderDate)}</div>
        </div>
        <div className="flex w-fit">
          <div className="text-gray-600" >거래 가격 :</div>
          <div className="ml-1 text-gray-600">{props.orderPrice.toLocaleString()}</div>
        </div>
        <div className="flex w-fit">
          <div className="text-gray-600">수량 :</div>
          <div className="ml-1 text-gray-600">{props.orderAmount}</div>
        </div>
      </div>
    </>
  );
}

export default StockHistoryBox;
