import { useState } from "react";
import { signOut } from "next-auth/react";

const useProfileSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/auth/login" });
  };

  return {
    collapsed,
    isOpen,
    toggleSidebar,
    handleLogout,
    setCollapsed,
  };
};

export default useProfileSidebar;
