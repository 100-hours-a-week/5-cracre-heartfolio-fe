import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Example() {
  return (
    <Disclosure as="nav" >
      <div className="mx-auto max-w-96 px-4 sm:px-6 lg:px-8"> {/*384px*/}
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="Logo"
                src="/assets/images/heartfolioLogo.webp"
                className="h-8 w-auto"
              />
            </div>
            <div className='content-center ml-4'>Heartfolio</div>
          </div>
          <div className="flex ml-auto items-center"> {/* Adjusted this div */}
            {/* Mobile menu button, now visible on all screen sizes */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
        </div>
      </div>
    </Disclosure>
  )
}
