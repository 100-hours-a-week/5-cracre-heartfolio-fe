import HistoryBox from "./box/historyBox";
import StockHistoryBox from "./box/stockHistoryBox";

function StockHistory(props) {
  const items = props.data;
  console.log(items);
  return (
    <>
      <div className="mx-auto max-w-[370px] py-2 flex flex-col justify-center">
        <div className="text-xs mb-2 text-right">가격 단위(KRW)</div>
        <ul role="list" className="space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="overflow-hidden rounded-md bg-white p-4 shadow w-[350px] mx-auto"
            >
              <StockHistoryBox
                orderCategory={item.orderCategory}
                orderAmount={item.orderAmount}
                orderDate={item.orderDate}
                orderPrice={item.orderPrice}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default StockHistory;
