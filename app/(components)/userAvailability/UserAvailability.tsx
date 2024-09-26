"use client";

import { useSearchParams } from "next/navigation";
import AvailabilitySection from "../availabilitySection/AvailabilitySection";
import Sidebar from "../sidebar/Sidebar";
import UserDropdown from "../userDropdown/UserDropdown";

const UserAvailability: React.FC = () => {
  const params = useSearchParams();
  const loginStatus = params.get("login-status");

  if (loginStatus) return <AvailabilitySection />;

  return (
    <>
      <div className="flex">
        <div className="fixed z-50 lg:border-r lg:pr-3">
          <Sidebar isCollapsed={() => true} />
        </div>
        <main className="flex-grow min-h-screen max-w-[100vw]">
          <div>
            <div className="lg:text-end pt-2 lg:pt-1 lg:pr-2 max-lg:pl-1">
              <UserDropdown />
            </div>
            <AvailabilitySection />
          </div>
        </main>
      </div>
    </>
  );
};

export default UserAvailability;
