import { useEffect, useState } from "react";
import { Menu, X, PenSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${
        scrolled ? "bg-white shadow-sm border-b border-gray-100 py-3" : "bg-white py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center transition-colors group-hover:bg-slate-800">
            <PenSquare className="text-white" size={18} />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">
            Prose
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "text-orange-500"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-md transition-colors"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-50 transition-colors"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className="text-base font-medium text-slate-700 hover:text-orange-500 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <hr className="border-gray-100 my-2" />
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium text-slate-700 hover:text-orange-500 transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="text-center px-4 py-2.5 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-md transition-colors"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
