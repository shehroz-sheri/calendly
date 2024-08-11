'use client'

import Link from "next/link";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useDropdownMenu } from "./useDropdownMenu";

const DropdownMenu = () => {
    const { isOpen, toggleDropdown } = useDropdownMenu();


    return (
        <div className="relative">
            <div
                className="w-[82.9px] h-11 flex items-center cursor-pointer"
                onClick={toggleDropdown}
            >
                Menu <MdKeyboardArrowDown className="ml-[10px] inline" />
            </div>
            {isOpen && (
                <div className="absolute right-3 min-w-40 bg-white border border-gray-200 rounded-md shadow-lg">
                    <div className="py-2">
                        <Link
                            href="/dashboard"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Dashboard
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;
