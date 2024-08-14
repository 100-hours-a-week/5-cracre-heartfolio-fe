import HoldingsBox from "./holdingsBox";

function Holdings() {
  const items = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ];
  return (
    <>
      <div className="mx-auto max-w-[350px] py-4">
        <div className="text-xl">보유 종목(KRW)</div>
        <ul role="list">
          {items.map((item) => (
            <li key={item.id} className="py-2">
              <HoldingsBox />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Holdings;
