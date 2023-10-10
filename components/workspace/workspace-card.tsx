"use client";
import { Avatar } from "@cmp/shared/avatar";
import { Popover, Transition } from "@headlessui/react";
import { cn } from "@lib/utils";
import { Workspace } from "@prisma/client";
import Link from "next/link";
import React, { ButtonHTMLAttributes } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiDelete, FiEdit3, FiShare2 } from "react-icons/fi";

type Props = {
  workspace: Workspace;
};

export const WorkspaceCard: React.FC<Props> = ({ workspace }) => {
  return (
    <div className="border rounded-lg flex justify-between items-center hover:shadow-md duration-300">
      <Link href={`/worksapce/${workspace.id}`} className="px-4 py-2 flex-1">
        <p className="font-semibold">{workspace.name}</p>

        <div className="inline-flex gap-1 items-center">
          <Avatar className="bg-blue-100 border-gray-200" size={20} />
          <Avatar className="bg-red-100 border-gray-200 ring-2 ring-white -ml-3" size={20} />

          <small className="text-gray-500 text-xs">You, Ali, ...</small>
        </div>
      </Link>

      <div className="px-4 py-2 flex-grow-0">
        <Popover className="relative">
          <Popover.Button>
            <BsThreeDotsVertical className="h-5 w-5 text-gray-500" />
          </Popover.Button>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel className="absolute origin-top-right right-0 min-w-[150px] bg-white border rounded-lg shadow z-50">
              <div className="grid">
                <MenuItem icon={FiEdit3} label="Edit" onClick={() => {}} />
                <MenuItem icon={FiShare2} label="Share" onClick={() => {}} />
                <MenuItem
                  icon={FiDelete}
                  label="Delete"
                  onClick={() => {}}
                  className="text-red-600 hover:bg-red-600 hover:text-white"
                />
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
    </div>
  );
};

type MenuItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: any;
  label: string;
};

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  label,
  className,
  ...props
}) => {
  const Icon = icon;
  return (
    <button
      {...props}
      className={cn(
        "group flex w-full items-center justify-between rounded-md p-2 text-left text-sm font-medium transition-all duration-75 hover:bg-gray-100",
        className,
      )}
    >
      <div className="flex gap-2 items-center">
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </div>
    </button>
  );
};
