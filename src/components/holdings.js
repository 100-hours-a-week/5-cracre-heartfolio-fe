import HoldingsBox from "./box/holdingsBox";

function Holdings(props) {
  const items = props.data;
  return (
    <>
      <div className="mx-auto max-w-[350px] py-4">
        <div className="text-xl">보유 종목(KRW)</div>
        <ul role="list">
          {items.map((item) => (
            <li key={item.stock_id} className="py-2">
              <HoldingsBox
                stock_id={item.stock_id}
                name={item.name}
                evalProfit={item.evalProfit}
                evalValue={item.evalValue}
                profitPercentage={item.profitPercentage}
                purchase_avg_price={item.purchase_avg_price}
                total_purchase_price={item.total_purchase_price}
                total_quantity={item.total_quantity}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Holdings;
