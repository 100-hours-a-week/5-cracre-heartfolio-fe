import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Example() {
  return (
    <Disclosure as="nav">
      <div className="mx-auto max-w-[390px] px-3">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="Logo"
                src="/assets/images/heartfolioLogo.webp"
                className="h-8 w-auto"
              />
            </div>
            <div className="content-center ml-4">Heartfolio</div>
          </div>
          <div className="flex ml-auto items-center">
            {" "}
            {/* Adjusted this div */}
            <Disclosure.Button className="group relative inline-flex items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-500 ">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </Disclosure.Button>
          </div>
        </div>
        <Disclosure.Panel className="sm:block">
          <div className="space-y-1 pb-3 pt-2">
            <Disclosure.Button
              as="a"
              href="#"
              className="block border-transparent py-3 pl-3 pr-4 text-base font-medium text-center text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-black"
            >
              내 포트폴리오
            </Disclosure.Button>
            <Disclosure.Button
              as="a"
              href="#"
              className="block border-transparent py-3 pl-3 pr-4 text-base font-medium text-center text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-black"
            >
              랭킹
            </Disclosure.Button>
            <Disclosure.Button
              as="a"
              href="#"
              className="block border-transparent py-3 pl-3 pr-4 text-base font-medium text-center text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
            >
              모의투자
            </Disclosure.Button>
            <Disclosure.Button
              as="a"
              href="#"
              className="block border-transparent py-3 pl-3 pr-4 text-base font-medium text-center text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
            >
              마이페이지
            </Disclosure.Button>
            <Disclosure.Button
              as="a"
              href="#"
              className="block border-transparent py-3 pl-3 pr-4 text-base font-medium text-center text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
            >
              캐시 충전
            </Disclosure.Button>
          </div>
        </Disclosure.Panel>
      </div>
    </Disclosure>
  );
}
