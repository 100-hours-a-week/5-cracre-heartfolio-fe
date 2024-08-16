import PopularStockBox from "./box/popularStockBox";

const items = [{ id: 1 }, { id: 2 }, { id: 3 }];

function PopularChart() {
  return (
    <div className="py-5">
      <div className="text-base">오늘의 인기 차트</div>
      <div className="text-sm py-1 float-right">더보기</div>
      <ul role="list" className="divide-y divide-gray-200">
        {items.map((item) => (
          <li key={item.id} className="py-4">
            <PopularStockBox />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PopularChart;