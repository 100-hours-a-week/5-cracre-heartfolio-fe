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
          <div>매도 일시 :</div>
          <div className="ml-1">{formatDate(props.orderDate)}</div>
        </div>
        <div className="flex w-fit">
          <div>거래 가격 :</div>
          <div className="ml-1">{props.orderPrice.toLocaleString()}</div>
        </div>
        <div className="flex w-fit">
          <div>수량 :</div>
          <div className="ml-1">{props.orderAmount}</div>
        </div>
      </div>
    </>
  );
}

export default StockHistoryBox;
