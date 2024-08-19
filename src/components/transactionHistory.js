import HistoryBox from "./box/historyBox";

function TransactionHistory(props) {
  const items = props.data.data;
  console.log(items);
  return (
    <>
      <div className="mx-auto max-w-[350px]">
        <ul role="list" className="divide-y divide-gray-200">
          {items.map((item) => (
            <li key={item.stock_id} className="py-2">
              <HistoryBox
                stock_id={item.stock_id}
                name={item.name}
                order_category={item.order_category}
                order_date={item.order_date}
                order_amount={item.order_amount}
                order_price={item.order_price}
                total_amount={item.total_amount}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default TransactionHistory;
