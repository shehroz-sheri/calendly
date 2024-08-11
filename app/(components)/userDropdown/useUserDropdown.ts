import { useState, useEffect, useRef } from "react";
import { signOut, useSession } from "next-auth/react";

const useUserDropdown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    closeDropdown();
    signOut();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const name = session?.user?.name || "";

  return {
    isOpen,
    dropdownRef,
    toggleDropdown,
    closeDropdown,
    handleLogout,
    name,
  };
};

export default useUserDropdown;
