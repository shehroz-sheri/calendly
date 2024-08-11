import { useCallback } from "react";
import toast from "react-hot-toast";

export const useEventHeader = () => {
  const handleCopyLink = useCallback((eventLink: string) => {
    const baseLink = process.env.NEXT_PUBLIC_APP_URL;
    navigator.clipboard.writeText(`${baseLink}/appointment/${eventLink}`);
    toast.success("Event link copied to clipboard!");
  }, []);

  return {
    handleCopyLink,
  };
};
