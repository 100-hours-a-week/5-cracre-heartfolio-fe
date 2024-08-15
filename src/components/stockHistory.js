import HistoryBox from "./historyBox";
import StockHistoryBox from "./stockHistoryBox";

function StockHistory() {
  const items = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }];

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
              <StockHistoryBox />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default StockHistory;
