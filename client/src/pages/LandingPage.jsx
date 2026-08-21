// import { useState } from "react";
// import { Menu, X, PenTool, Zap, Globe, Users, TrendingUp } from "lucide-react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";

// export default function App() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <div className="bg-white dark:bg-black text-black dark:text-white transition duration-300 overflow-x-hidden">
//       {/* ================= NAVBAR ================= */}
//       <nav className="fixed w-full z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-amber-500 to-emerald-400 bg-clip-text text-transparent">
//             Prose
//           </h1>

//           <div className="flex items-center gap-3 sm:gap-5">
//             <Link to={"/login"}>
//               <button className="px-3 sm:px-4 py-2 border rounded-lg hover:border-orange-400 text-sm">
//                 Sign In
//               </button>
//             </Link>

//             <Link to={"/register"}>
//               <button className="px-3 sm:px-4 py-2 rounded-lg text-white bg-gradient-to-r from-orange-400 to-emerald-400 text-sm">
//                 Sign Up
//               </button>
//             </Link>
//           </div>
//         </div>
//       </nav>

//       {/* ================= HERO ================= */}
//       <section className="min-h-screen flex items-center justify-center text-center px-4 sm:px-6 relative">
//         {/* Background Glow */}
//         <div className="absolute w-[400px] h-[400px] bg-orange-400/20 blur-3xl rounded-full top-20 left-10"></div>
//         <div className="absolute w-[300px] h-[300px] bg-emerald-400/20 blur-3xl rounded-full bottom-10 right-10"></div>

//         <div className="relative z-10 max-w-3xl">
//           <motion.h1
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight"
//           >
//             Create Blogs That{" "}
//             <span className="bg-gradient-to-r from-orange-400 to-emerald-400 bg-clip-text text-transparent">
//               People Love
//             </span>
//           </motion.h1>

//           <p className="mt-6 text-gray-500 dark:text-gray-400">
//             A powerful and elegant blogging platform designed for creators who
//             want performance and beauty.
//           </p>

//           <div className="mt-8 flex justify-center gap-4 flex-wrap">
//             <button className="px-6 py-3 rounded-lg text-white bg-gradient-to-r from-orange-400 to-emerald-400">
//               Get Started
//             </button>
//             <button className="px-6 py-3 rounded-lg border hover:border-orange-400">
//               Explore
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* ================= FEATURES ================= */}
//       <section className="py-24 px-4 sm:px-6 relative">
//         <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
//           Next-Level Features
//         </h2>

//         <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
//           {[
//             {
//               icon: <PenTool size={32} />,
//               title: "Smart Editor",
//               desc: "AI-ready, distraction-free writing experience with auto formatting.",
//             },
//             {
//               icon: <Globe size={32} />,
//               title: "Global Publishing",
//               desc: "Instantly publish your blog worldwide with SEO optimization.",
//             },
//             {
//               icon: <Zap size={32} />,
//               title: "Ultra Fast",
//               desc: "Blazing fast performance with modern architecture.",
//             },
//           ].map((item, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ scale: 1.05 }}
//               className="relative group p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 dark:from-gray-900/80 dark:to-black border border-gray-200 dark:border-gray-800 backdrop-blur-xl overflow-hidden"
//             >
//               {/* Glow Effect */}
//               <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-orange-400/20 to-emerald-400/20 blur-xl"></div>

//               <div className="relative z-10">
//                 <div className="text-orange-400 mb-4">{item.icon}</div>
//                 <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
//                 <p className="text-gray-500 dark:text-gray-400">{item.desc}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* ================= NEWSLETTER ================= */}
//       <section className="py-20 px-4 sm:px-6 text-center bg-gray-100 dark:bg-gray-900">
//         <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
//         <p className="text-gray-500 mb-6">
//           Subscribe to receive latest updates and features.
//         </p>

//         <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="px-4 py-3 rounded-lg border flex-1 bg-white dark:bg-black"
//           />
//           <button className="px-6 py-3 rounded-lg text-white bg-gradient-to-r from-orange-400 to-emerald-400">
//             Subscribe
//           </button>
//         </div>
//       </section>

//       {/* ================= FOOTER ================= */}
//       <footer className="border-t border-gray-200 dark:border-gray-800 py-16 px-6">
//         <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-4">
//           {/* Brand */}
//           <div>
//             <h2 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-emerald-400 bg-clip-text text-transparent">
//               Prose
//             </h2>
//             <p className="text-gray-500 mt-4 text-sm">
//               Build, publish, and grow your blog with modern tools and powerful
//               features.
//             </p>
//           </div>

//           {/* Links */}
//           <div>
//             <h3 className="font-semibold mb-3">Product</h3>
//             <ul className="space-y-2 text-gray-500 text-sm">
//               <li className="hover:text-orange-400 cursor-pointer">Features</li>
//               <li className="hover:text-orange-400 cursor-pointer">Pricing</li>
//               <li className="hover:text-orange-400 cursor-pointer">Updates</li>
//             </ul>
//           </div>

//           <div>
//             <h3 className="font-semibold mb-3">Company</h3>
//             <ul className="space-y-2 text-gray-500 text-sm">
//               <li className="hover:text-orange-400 cursor-pointer">About</li>
//               <li className="hover:text-orange-400 cursor-pointer">Careers</li>
//               <li className="hover:text-orange-400 cursor-pointer">Blog</li>
//             </ul>
//           </div>

//           <div>
//             <h3 className="font-semibold mb-3">Support</h3>
//             <ul className="space-y-2 text-gray-500 text-sm">
//               <li className="hover:text-orange-400 cursor-pointer">
//                 Help Center
//               </li>
//               <li className="hover:text-orange-400 cursor-pointer">Privacy</li>
//               <li className="hover:text-orange-400 cursor-pointer">Terms</li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom */}
//         <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-200 dark:border-gray-800 pt-6">
//           © 2026 Prose. All rights reserved. By Parth Devaliya
//         </div>
//       </footer>
//     </div>
//   );
// }
import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import DeveloperInfo from "../components/DeveloperInfo";
// import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <DeveloperInfo />
      {/* <Newsletter /> */}
      <Footer />
    </>
  );
};

export default LandingPage;
