import {
  LayoutDashboard,
  FileText,
  PlusSquare,
  Menu,
  X,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Sidebar({
  active,
  setActive,
  sidebarOpen,
  setSidebarOpen,
}) {
  const navigate = useNavigate();

  const links = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      value: "dashboard",
    },
    {
      icon: FileText,
      label: "Manage Posts",
      value: "manage",
    },
    {
      icon: PlusSquare,
      label: "Create Post",
      value: "create",
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-md shadow-sm border border-slate-200 text-slate-600"
      >
        <Menu size={20} />
      </button>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 md:top-16 left-0 h-screen md:h-[calc(100vh-4rem)] bg-slate-50 border-r border-slate-200 z-50 flex flex-col
          w-[85%] max-w-[280px]
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:w-64 md:translate-x-0
        `}
      >
        {/* Close Mobile */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 md:hidden text-slate-500 hover:text-slate-900"
        >
          <X size={20} />
        </button>

        {/* Logo Section */}
        <div className="h-16 flex items-center px-6 border-b border-slate-200 bg-white">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Blog Admin
          </h1>
        </div>

        {/* Menu Links */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
          {links.map((item, i) => {
            const Icon = item.icon;

            return (
              <button
                key={i}
                onClick={() => {
                  setActive(item.value);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium
                  ${
                    active === item.value
                      ? "bg-slate-200/60 text-slate-900"
                      : "text-slate-600 hover:bg-slate-200/40 hover:text-slate-900"
                  }
                `}
              >
                <Icon size={18} className={active === item.value ? "text-slate-900" : "text-slate-500"} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="p-4 bg-white border-t border-slate-200">
          <button
            onClick={() => navigate("/index")}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>
        </div>
      </aside>
    </>
  );
}
