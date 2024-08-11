'use client'

import { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import UserDropdown from "../userDropdown/UserDropdown";
import Events from "../events/Events";

const DashboardSection: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <>
            <div className="flex">
                <div className="fixed z-50">
                    <Sidebar isCollapsed={() => setIsCollapsed(!isCollapsed)} />
                </div>
                <main className={`flex-grow bg-light min-h-screen max-w-[100vw] ${isCollapsed ? "lg:ml-16" : "lg:ml-64"}`}>
                    <div>
                        <div className="lg:text-end pt-2 lg:pt-1 lg:pr-2 max-lg:pl-1">
                            <UserDropdown />
                        </div>
                        <Events />
                    </div>
                </main>
            </div>
        </>
    )
}

export default DashboardSection