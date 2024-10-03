import { Link } from "react-router-dom";

const tabs = [
  { name: "인기종목", href: "/popularstock", current: false, isIcon: false },
  { name: "관심종목", href: "/intereststock", current: false, isIcon: false },
  { name: "search", href: "/search", isIcon: true, current: false }, // 아이콘 항목 추가
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Stocktype() {
  return (
    <div className="mx-auto max-w-[390px] min-w-[380px] px-3 z-50 flex">
      <div className=" sm:block w-full">
        <nav
          aria-label="Tabs"
          className="isolate flex divide-x divide-gray-200 shadow"
        >
          {tabs.map((tab, tabIdx) => (
            <Link
              key={tab.name}
              to={tab.href}
              aria-current={tab.current ? "page" : undefined}
              className={classNames(
                tab.current
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-700",
                tabIdx === 0 ? "rounded-l-lg" : "",
                tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                "group relative min-w-0 flex items-center justify-center bg-white px-4 py-4 font-TheJamsil5Bold text-center hover:bg-gray-50 focus:z-10",
                tab.isIcon ? "flex-none w-16" : "flex-grow" // 아이콘의 경우 고정 너비, 나머지는 flex-grow로 동일하게 분배
              )}
            >
              {tab.isIcon ? (
                <span className="material-symbols-outlined text-2xl">
                  search
                </span>
              ) : (
                <span>{tab.name}</span>
              )}
              <span
                aria-hidden="true"
                className={classNames(
                  tab.current ? "bg-indigo-500" : "bg-transparent",
                  "absolute inset-x-0 bottom-0 h-0.5"
                )}
              />
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
