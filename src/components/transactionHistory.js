import HistoryBox from "./historyBox";

function TransactionHistory() {
  const items = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ];

  return (
    <>
      <div className="mx-auto max-w-[350px]">
        <ul role="list" className="divide-y divide-gray-200">
          {items.map((item) => (
            <li key={item.id} className="py-2">
              <HistoryBox/>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default TransactionHistory;
