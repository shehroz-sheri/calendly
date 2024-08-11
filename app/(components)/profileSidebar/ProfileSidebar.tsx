"use client";

import Link from "next/link";
import Logo from "../logo/Logo";
import { RiSettings3Line } from "react-icons/ri";
import { LuUsers2 } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { AiOutlineLink } from "react-icons/ai";
import { IoList } from "react-icons/io5";
import { IoIosHelpCircleOutline, IoMdArrowDropdown, IoMdCalendar } from "react-icons/io";
import { BiSolidArrowToLeft } from "react-icons/bi";
import useProfileSidebar from "./useProfileSidebar";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md";

const ProfileSidebar: React.FC = () => {
  const { collapsed, isOpen, toggleSidebar, handleLogout } = useProfileSidebar();

  return (
    <div className="lg:flex lg:flex-col lg:h-screen">
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 right-1.5 z-50 text-gray-300 hover:text-white hover:bg-gray-200 p-2 rounded"
      >
        {isOpen ? (
          <MdKeyboardDoubleArrowLeft size={22} color="black" />
        ) : (
          <MdKeyboardDoubleArrowRight size={22} color="black" />
        )}
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
          <Link href="#" className="w-full mt-1">
            <p className="flex items-center space-x-2">
              <Logo
                width={128}
                className={` ${collapsed ? "hidden" : "block"}`}
              />
            </p>
          </Link>
        </div>

        <nav className="flex-grow overflow-auto">
          <ul className="flex flex-col space-y-1 px-4 pb-4 pt-3">
            <li>
              <span className={`${collapsed ? "hidden" : "block"}`}>
                <Link
                  href={"/dashboard"}
                  className="hover:text-primary/80 font-semibold text-[14.5px] text-primary w-full mb-3"
                >
                  <MdOutlineKeyboardArrowLeft size={20} className="inline" />{" "}
                  Back to home
                </Link>
              </span>
            </li>
            <h3
              className={`font-bold text-lg ps-2.5 py-2 ${
                collapsed ? "hidden" : "block"
              }`}
            >
              Account settings
            </h3>
            <li>
              <Link href="/profile/edit-profile">
                <p className="flex items-center text-dark/90 space-x-3 p-2 rounded hover:bg-gray-200">
                  <LuUsers2 />
                  <span
                    className={`${
                      collapsed ? "hidden" : "block"
                    } font-bold text-[14.5px]`}
                  >
                    Profile
                  </span>
                </p>
              </Link>
            </li>
            <li>
              <Link href="/calendar">
                <p className="flex items-center text-dark/90 space-x-3 p-2 rounded hover:bg-gray-200">
                  <FaRegStar />
                  <span
                    className={`${
                      collapsed ? "hidden" : "block"
                    } font-bold text-[14.5px]`}
                  >
                    Branding
                  </span>
                </p>
              </Link>
            </li>
            <li>
              <Link href="/calendar">
                <p className="flex items-center text-dark/90 space-x-3 p-2 rounded hover:bg-gray-200">
                  <AiOutlineLink />
                  <span
                    className={`${
                      collapsed ? "hidden" : "block"
                    } font-bold text-[14.5px]`}
                  >
                    My Link
                  </span>
                </p>
              </Link>
            </li>
            <li>
              <Link href="/profile/change-password">
                <p className="flex items-center text-dark/90 space-x-3 p-2 rounded hover:bg-gray-200">
                  <IoList />
                  <span
                    className={`${
                      collapsed ? "hidden" : "block"
                    } font-bold text-[14.5px]`}
                  >
                    Change Password
                  </span>
                </p>
              </Link>
            </li>
            <li>
              <Link href="/calendar">
                <p className="flex items-center text-dark/90 space-x-3 p-2 rounded hover:bg-gray-200">
                  <RiSettings3Line />
                  <span
                    className={`${
                      collapsed ? "hidden" : "block"
                    } font-bold text-[14.5px]`}
                  >
                    Cookie settings
                  </span>
                </p>
              </Link>
            </li>
            <li>
              <Link href="/calendar">
                <p className="flex items-center text-dark/90 space-x-3 p-2 rounded hover:bg-gray-200">
                  <IoMdCalendar />
                  <span
                    className={`${
                      collapsed ? "hidden" : "block"
                    } font-bold text-[14.5px]`}
                  >
                    Calendar sync
                  </span>
                </p>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 mt-auto">
          <Link href="#">
            <p className="flex items-center text-dark/90 space-x-3 p-2 rounded hover:bg-gray-200">
              <IoIosHelpCircleOutline />
              <span
                className={`${
                  collapsed ? "hidden" : "block"
                } font-bold text-[14.5px]`}
              >
                Help <IoMdArrowDropdown className="inline" />
              </span>
            </p>
          </Link>
          <div className="cursor-pointer" onClick={handleLogout}>
            <p className="flex items-center text-dark/90 space-x-3 p-2 rounded hover:bg-gray-200">
              <BiSolidArrowToLeft />
              <span
                className={`${
                  collapsed ? "hidden" : "block"
                } font-bold text-[14.5px]`}
              >
                Logout
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
