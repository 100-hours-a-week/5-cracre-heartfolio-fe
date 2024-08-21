import HistoryBox from "./box/historyBox";

function TransactionHistory(props) {
  const items = props.data;
  return (
    <>
      <div className="mx-auto max-w-[350px] pb-8">
        <ul role="list" className="divide-y divide-gray-200">
          {items.map((item) => (
            <li key={item.stock_id} className="py-2">
              <HistoryBox
                stock_id={item.stockId}
                name={item.name}
                order_category={item.orderCategory}
                order_date={item.orderDate}
                order_amount={item.orderAmount}
                order_price={item.orderPrice}
                total_amount={item.totalAmount}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default TransactionHistory;
