import { usePathname } from "next/navigation";
import { useState } from "react";

const useSidebar = (onCollapseChange: (collapsed: boolean) => void) => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCollapseToggle = () => {
    setCollapsed((prev) => {
      const newCollapsedState = !prev;
      onCollapseChange(newCollapsedState);
      return newCollapsedState;
    });
  };

  return {
    collapsed,
    isOpen,
    isActive,
    toggleSidebar,
    handleCollapseToggle,
  };
};

export default useSidebar;
