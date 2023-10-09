"use client";
import { Menu, Transition } from "@headlessui/react";
import { Avatar } from "./avatar";
import { useSession } from "next-auth/react";
import { Fragment } from "react";

export const ProfileDropDown = () => {
  const { data } = useSession();
  const user = data?.user;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="min-w-[100px] bg-gray-800 rounded-full inline-flex gap-2 items-center px-4 cursor-pointer hover:bg-gray-700 duration-300">
        <Avatar src={user?.image} alt={user?.name} size="sm" className="-ml-4" />
        <span className="text-gray-100">{user?.name}</span>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <a
                className={`${active && "bg-blue-500"}`}
                href="/account-settings"
              >
                Account settings
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                className={`${active && "bg-blue-500"}`}
                href="/account-settings"
              >
                Documentation
              </a>
            )}
          </Menu.Item>
          <Menu.Item disabled>
            <span className="opacity-75">Invite a friend (coming soon!)</span>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
