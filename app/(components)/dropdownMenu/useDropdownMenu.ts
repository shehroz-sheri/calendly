import { useState } from "react";

export const useDropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return {
    isOpen,
    toggleDropdown,
  };
};
