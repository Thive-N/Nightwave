import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Disclosure } from '@headlessui/react';
import {
  MdOutlineSpaceDashboard,
  MdOutlineAnalytics,
  MdOutlineIntegrationInstructions,
  MdOutlineMoreHoriz,
  MdOutlineSettings,
  MdOutlineLogout,
} from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { FaRegComments } from 'react-icons/fa';
import { BiMessageSquareDots } from 'react-icons/bi';

function SideNavbar() {
  return (
    <div>
      <Disclosure as="nav">
        <Disclosure.Button className="group peer absolute right-4 top-4 inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
          <GiHamburgerMenu className="block h-6 w-6 md:hidden" aria-hidden="true" />
        </Disclosure.Button>
        <div className="peer:transition fixed -left-96 top-0 z-20 h-screen w-1/2 bg-white p-6 delay-150 duration-200 ease-out peer-focus:left-0 lg:left-0 lg:w-60">
          <div className="item-center flex flex-col justify-start">
            <h1 className="w-full cursor-pointer border-b border-gray-100 pb-4 text-center text-base font-bold text-blue-900">
              Virtual Dashboard
            </h1>
            <div className="my-4 border-b border-gray-100 pb-4">
              <div className="group m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 pl-5 hover:bg-gray-900 hover:shadow-lg">
                <MdOutlineSpaceDashboard className="text-2xl text-gray-600 group-hover:text-white" />
                <h3 className="text-base font-semibold text-gray-800 group-hover:text-white">
                  Dashboard
                </h3>
              </div>
              <div className="group m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 pl-5 hover:bg-gray-900 hover:shadow-lg">
                <CgProfile className="text-2xl text-gray-600 group-hover:text-white" />
                <h3 className="text-base font-semibold text-gray-800 group-hover:text-white">
                  Profile
                </h3>
              </div>
              <div className="group m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 pl-5 hover:bg-gray-900 hover:shadow-lg">
                <FaRegComments className="text-2xl text-gray-600 group-hover:text-white" />
                <h3 className="text-base font-semibold text-gray-800 group-hover:text-white">
                  Comments
                </h3>
              </div>
              <div className="group m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 pl-5 hover:bg-gray-900 hover:shadow-lg">
                <MdOutlineAnalytics className="text-2xl text-gray-600 group-hover:text-white" />
                <h3 className="text-base font-semibold text-gray-800 group-hover:text-white">
                  Analytics
                </h3>
              </div>
              <div className="group m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 pl-5 hover:bg-gray-900 hover:shadow-lg">
                <BiMessageSquareDots className="text-2xl text-gray-600 group-hover:text-white" />
                <h3 className="text-base font-semibold text-gray-800 group-hover:text-white">
                  Messages
                </h3>
              </div>
              <div className="group m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 pl-5 hover:bg-gray-900 hover:shadow-lg">
                <MdOutlineIntegrationInstructions className="text-2xl text-gray-600 group-hover:text-white" />
                <h3 className="text-base font-semibold text-gray-800 group-hover:text-white">
                  Integration
                </h3>
              </div>
            </div>
            {/* setting  */}
            <div className="my-4 border-b border-gray-100 pb-4">
              <div className="group m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 pl-5 hover:bg-gray-900 hover:shadow-lg">
                <MdOutlineSettings className="text-2xl text-gray-600 group-hover:text-white" />
                <h3 className="text-base font-semibold text-gray-800 group-hover:text-white">
                  Settings
                </h3>
              </div>
              <div className="group m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 pl-5 hover:bg-gray-900 hover:shadow-lg">
                <MdOutlineMoreHoriz className="text-2xl text-gray-600 group-hover:text-white" />
                <h3 className="text-base font-semibold text-gray-800 group-hover:text-white">
                  More
                </h3>
              </div>
            </div>
            {/* logout */}
            <div className="my-4">
              <div className="group m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md border border-gray-200 p-2 pl-5 hover:bg-gray-900 hover:shadow-lg">
                <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white" />
                <h3 className="text-base font-semibold text-gray-800 group-hover:text-white">
                  Logout
                </h3>
              </div>
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
}

export default SideNavbar;
