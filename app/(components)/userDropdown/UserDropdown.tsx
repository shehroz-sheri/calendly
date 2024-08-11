'use client'

import Link from "next/link";
import { MdOutlineArrowDropDown } from "react-icons/md";
import useUserDropdown from "./useUserDropdown";

const UserDropdown = () => {
  const { isOpen, dropdownRef, toggleDropdown, closeDropdown, handleLogout, name } = useUserDropdown();

  return (
    <div className="relative inline-block text-left p-2" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex justify-center rounded-md text-sm font-medium ml-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={toggleDropdown}
      >
        <span className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
          {name?.[0]?.toUpperCase()}
        </span>
        <MdOutlineArrowDropDown size={20} className="my-auto" />
      </button>
      {isOpen && (
        <div
          className="absolute max-lg:left-1 lg:right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          role="menu"
        >
          <p
            className="block px-4 py-2 text-sm hover:bg-gray-100 border-b"
            role="menuitem"
          >
            {name}
          </p>
          <Link
            href="/profile/edit-profile"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
            role="menuitem"
            onClick={closeDropdown}
          >
            Profile
          </Link>
          <p
            className="block px-4 py-2 text-sm text-danger hover:bg-gray-100 cursor-pointer"
            role="menuitem"
            onClick={handleLogout}
          >
            Logout
          </p>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
