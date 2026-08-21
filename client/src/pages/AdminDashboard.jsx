import { useState } from "react";

import Sidebar from "../components/Sidebar";
import DashboardHome from "../components/DashboardHome";
import ManagePosts from "../components/ManagePosts";
import CreatePostAdmin from "../components/CreatePostAdmin";

export default function AdminDashboard() {
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (active) {
      case "dashboard":
        return <DashboardHome />;

      case "manage":
        return <ManagePosts />;

      case "create":
        return <CreatePostAdmin />;

      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-x-hidden relative">
      {/* Sidebar */}
      <Sidebar
        active={active}
        setActive={setActive}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <main
        className="
          flex-1
          md:ml-64
          p-3
          sm:p-5
          lg:p-8
          pt-16
          md:pt-8
          overflow-x-hidden
        "
      >
        {renderPage()}
      </main>
    </div>
  );
}
