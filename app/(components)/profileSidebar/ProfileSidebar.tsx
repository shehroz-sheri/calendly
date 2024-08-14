"use client";

import Link from "next/link";
import Logo from "../logo/Logo";
import { IoMdArrowDropdown, IoIosHelpCircleOutline } from "react-icons/io";
import { BiSolidArrowToLeft } from "react-icons/bi";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import useProfileSidebar from "./useProfileSidebar";
import { profileSidebarMenuItems } from "@/constants/Constants";

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
        className={`fixed inset-0 z-40 opacity-50 transition-opacity duration-300 ${isOpen ? "block" : "hidden"
          } lg:hidden`}
        onClick={toggleSidebar}
      ></div>

      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 transform bg-white ${isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col min-h-screen ${collapsed ? "w-16" : "w-60"
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
              className={`font-bold text-lg ps-2.5 py-2 ${collapsed ? "hidden" : "block"
                }`}
            >
              Account settings
            </h3>
            {profileSidebarMenuItems?.map((item, index) => (
              <li key={index}>
                <Link href={item?.href}>
                  <p className="flex items-center text-dark/90 space-x-3 p-2 rounded hover:bg-gray-200">
                    <item.icon />
                    <span
                      className={`${collapsed ? "hidden" : "block"
                        } font-bold text-[14.5px]`}
                    >
                      {item?.label}
                    </span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 mt-auto">
          <div className="cursor-pointer">
            <p className="flex items-center text-dark/90 space-x-3 p-2 rounded hover:bg-gray-200">
              <IoIosHelpCircleOutline />
              <span
                className={`${collapsed ? "hidden" : "block"
                  } font-bold text-[14.5px]`}
              >
                Help <IoMdArrowDropdown className="inline" />
              </span>
            </p>
          </div>
          <div className="cursor-pointer" onClick={handleLogout}>
            <p className="flex items-center text-dark/90 space-x-3 p-2 rounded hover:bg-gray-200">
              <BiSolidArrowToLeft />
              <span
                className={`${collapsed ? "hidden" : "block"
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
