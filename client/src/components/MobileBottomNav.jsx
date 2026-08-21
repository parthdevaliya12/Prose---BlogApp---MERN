import { Home, Compass, PlusCircle, LayoutDashboard, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function MobileBottomNav() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/index", icon: Home },
    { name: "Explore", path: "/explore", icon: Compass },
    { name: "Add", path: "/post", icon: PlusCircle, isPrimary: true },
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Profile", path: "/profile", icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 z-50 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (item.path !== '/index' && location.pathname.startsWith(item.path));

          if (item.isPrimary) {
            return (
              <Link
                key={item.name}
                to={item.path}
                className="relative -top-5 flex flex-col items-center justify-center w-14 h-14 bg-slate-900 text-white rounded-full shadow-lg border-4 border-slate-50 transition-transform hover:scale-105"
              >
                <Icon size={24} />
              </Link>
            );
          }

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                isActive ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <Icon size={22} className={isActive ? "opacity-100" : "opacity-80"} />
              <span className={`text-[10px] font-medium ${isActive ? "font-bold" : ""}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
