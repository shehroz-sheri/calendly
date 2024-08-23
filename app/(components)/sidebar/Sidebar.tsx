"use client";

import Link from "next/link";
import Logo from "../logo/Logo";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdOutlineAnalytics,
  MdOutlineCalendarMonth,
} from "react-icons/md";
import { GoClock } from "react-icons/go";
import { RiVipCrown2Line } from "react-icons/ri";
import { SlMenu } from "react-icons/sl";
import useSidebar from "./useSidebar";
import { SidebarProps } from "@/types/types";

const Sidebar: React.FC<SidebarProps> = (props) => {
  const { collapsed, isOpen, toggleSidebar, handleCollapseToggle } = useSidebar(
    props?.isCollapsed
  );

  return (
    <div className="lg:flex lg:flex-col lg:h-screen">
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-2 right-2 z-50 text-gray-300 hover:text-white hover:bg-gray-200 p-2 rounded"
      >
        <SlMenu className="text-dark" size={28} />
      </button>

      <div
        className={`fixed inset-0 z-40 opacity-50 transition-opacity duration-300 ${
          isOpen ? "block" : "hidden"
        } lg:hidden`}
        onClick={toggleSidebar}
      ></div>

      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 transform bg-white ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col min-h-screen ${
          collapsed ? "w-16" : "w-60"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <Link href="/dashboard" className="w-full mt-1">
            <p className="flex items-center space-x-2">
              <Logo
                width={128}
                className={` ${collapsed ? "hidden" : "block"}`}
              />
            </p>
          </Link>
          <button
            onClick={handleCollapseToggle}
            className="text-gray-300 hover:text-white hover:bg-gray-200 rounded max-lg:hidden"
          >
            {collapsed ? (
              <MdKeyboardDoubleArrowRight className="text-dark" size={22} />
            ) : (
              <MdKeyboardDoubleArrowLeft className="text-dark" size={22} />
            )}
          </button>
        </div>

        <nav className="flex-grow overflow-auto">
          <ul className="flex flex-col space-y-2 p-4">
            <li>
              <span className={`${collapsed ? "hidden" : "block"}`}>
                <Link
                  href={"/create-event"}
                  className="inline-block text-center bg-primary rounded-[40px] py-2 hover:bg-primary/80 font-bold text-[14.75px] text-white w-full mb-3"
                >
                  + Create
                </Link>
              </span>
            </li>
            <li>
              <Link href="/dashboard">
                <p className="flex items-center space-x-3 p-2 rounded hover:bg-gray-200">
                  <MdOutlineCalendarMonth />
                  <span
                    className={`${
                      collapsed ? "hidden" : "block"
                    } font-bold text-[14.63px]`}
                  >
                    Scheduled events
                  </span>
                </p>
              </Link>
            </li>
            <li>
              <Link href="/analytics">
                <p className="flex items-center space-x-3 p-2 rounded hover:bg-gray-200">
                  <MdOutlineAnalytics />
                  <span
                    className={`${
                      collapsed ? "hidden" : "block"
                    } font-bold text-[14.63px]`}
                  >
                    Analytics
                  </span>
                </p>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-4 mt-auto">
          <Link href="/dashboard/availability">
            <p className="flex items-center space-x-3 p-2 rounded hover:bg-gray-200">
              <GoClock />
              <span
                className={`${
                  collapsed ? "hidden" : "block"
                } font-bold text-[14.63px]`}
              >
                Availability
              </span>
            </p>
          </Link>
          <div>
            <p className="flex items-center space-x-3 p-2 rounded hover:bg-gray-200">
              <RiVipCrown2Line />
              <span
                className={`${
                  collapsed ? "hidden" : "block"
                } font-bold text-[14.63px]`}
              >
                Admin center
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
