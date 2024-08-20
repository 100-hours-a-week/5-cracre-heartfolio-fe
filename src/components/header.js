import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Disclosure
      as="nav"
      className="relative z-50"
      onChange={(open) => setIsOpen(open)}
    >
      <div className="mx-auto max-w-[390px] px-3 relative z-50">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <a href="/" className=" flex content-center"> 
                <img
                  alt="Logo"
                  src="/assets/images/heartfolioLogo.webp"
                  className="h-8 w-auto"
                />           
                <div className=" ml-4 mr-36">Heartfolio</div>
              </a>
            </div>
            <a href="/login" className="content-center">
            <div className=" ml-5 mr-5 text-sm" >로그인</div>
            </a>
          </div>
          <div className="flex ml-auto items-center">
            <Disclosure.Button
              className="group relative inline-flex rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-500 "
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon aria-hidden="true" className="block h-6 w-6" />
              ) : (
                <Bars3Icon aria-hidden="true" className="block h-6 w-6" />
              )}
            </Disclosure.Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 top-16 z-40 bg-black opacity-50"
            onClick={() => setIsOpen(false)}
          ></div>

          <Disclosure.Panel className="absolute left-0 right-0 top-16 flex justify-center z-50">
            <div className="bg-white h-fit shadow-lg">
              <div className="space-y-1 pb-3 pt-2 w-[390px]">
                <Disclosure.Button
                  as="a"
                  href="/portfolio"
                  className="block border-transparent py-3 pl-3 pr-4 text-base font-medium text-center text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-black"
                >
                  내 포트폴리오
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="/ranking"
                  className="block border-transparent py-3 pl-3 pr-4 text-base font-medium text-center text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-black"
                >
                  랭킹
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="/intereststock"
                  className="block border-transparent py-3 pl-3 pr-4 text-base font-medium text-center text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                >
                  모의투자
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="/mypage"
                  className="block border-transparent py-3 pl-3 pr-4 text-base font-medium text-center text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                >
                  마이페이지
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="/cashcharge"
                  className="block border-transparent py-3 pl-3 pr-4 text-base font-medium text-center text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                >
                  캐시 충전
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Header;
