import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BookOpen, User, LogOut } from "lucide-react";
import { toast } from "sonner";
import MobileBottomNav from "./MobileBottomNav";

export default function AuthenticatedLayout({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logout Successful");
    setTimeout(() => {
      navigate("/login");
    }, 1200);
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 pb-20 md:pb-0 flex flex-col">
      {/* Desktop/Tablet Top Navigation (Hidden on mobile) */}
      <nav className="sticky top-0 z-40 bg-white border-b border-slate-200 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <Link to="/index" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-slate-900 rounded flex items-center justify-center text-white">
              <BookOpen size={16} />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Prose</h1>
          </Link>

          <div className="flex items-center gap-8">
            <Link to="/index" className={`text-sm font-medium ${location.pathname === '/index' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}>Home</Link>
            <Link to="/explore" className={`text-sm font-medium ${location.pathname.startsWith('/explore') ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}>Explore</Link>
            <Link to="/post" className={`text-sm font-medium ${location.pathname === '/post' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}>Write</Link>
            <Link to="/admin/dashboard" className={`text-sm font-medium ${location.pathname.startsWith('/admin') ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}>Dashboard</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/profile" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold overflow-hidden ring-2 ring-transparent hover:ring-slate-300 transition-all">
                {user?.avatar ? (
                  <img src={user.avatar} alt="profile" className="w-full h-full object-cover" />
                ) : (
                  user?.fullname ? user.fullname.charAt(0).toUpperCase() : <User size={14} />
                )}
              </div>
              <span className="text-sm font-medium text-slate-700 hidden lg:block">{user?.fullname || "Profile"}</span>
            </Link>
            <button onClick={logout} className="p-2 text-slate-400 hover:text-red-500 transition-colors" title="Logout">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="w-full flex-1">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}
