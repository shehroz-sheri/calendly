import { useState } from "react";

const useSidebar = (onCollapseChange: (collapsed: boolean) => void) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
    toggleSidebar,
    handleCollapseToggle,
  };
};

export default useSidebar;
