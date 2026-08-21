import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";
import { PenSquare } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const links = {
    product: ["Features", "Pricing", "Explore", "Changelog"],
    company: ["About", "Blog", "Careers", "Contact"],
    legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  };

  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-12">
          
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
                <PenSquare className="text-white" size={16} />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                Prose
              </span>
            </Link>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xs mb-6">
              A professional publishing platform designed for modern creators to write, publish, and scale their content beautifully.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
                <FaGithub size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-pink-600 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-orange-500 transition-colors">
                <FaEnvelope size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Product</h3>
            <ul className="space-y-3">
              {links.product.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Company</h3>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              {links.legal.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Prose. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm">
            Designed by Parth Devaliya
          </p>
        </div>
      </div>
    </footer>
  );
}
