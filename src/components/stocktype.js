const tabs = [
  { name: "관심종목", href: "/intereststock", current: false },
  { name: "인기종목", href: "/popularstock", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Stocktype() {
  return (
    <div className="mx-auto max-w-[390px] px-3  z-50 flex">
      <div className="hidden sm:block">
        <nav
          aria-label="Tabs"
          className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
        >
          {tabs.map((tab, tabIdx) => (
            <a
              key={tab.name}
              href={tab.href}
              aria-current={tab.current ? "page" : undefined}
              className={classNames(
                tab.current
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-700",
                tabIdx === 0 ? "rounded-l-lg" : "",
                tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                "group relative min-w-0 flex-1  bg-white px-4 py-4 text-center  hover:bg-gray-50 focus:z-10 w-40"
              )}
            >
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  tab.current ? "bg-indigo-500" : "bg-transparent",
                  "absolute inset-x-0 bottom-0 h-0.5"
                )}
              />
            </a>
          ))}
        </nav>
      </div>
      <a
        href="/search" //검색 화면으로 이동
        className="material-symbols-outlined px-4 py-4 text-gray-500 hover:text-gray-700 "
      >
        search
      </a>
    </div>
  );
}