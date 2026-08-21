import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-sm font-medium mb-8"
        >
          <Sparkles size={16} />
          Prose 2.0 is now live
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl leading-tight"
        >
          Publish your ideas to the world,{" "}
          <span className="text-orange-500">beautifully.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
        >
          A professional publishing platform designed for modern creators. Write with a seamless editor, manage your audience, and scale your content effortlessly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
        >
          <Link to="/register" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
              Start writing today
              <ArrowRight size={18} />
            </button>
          </Link>
          <Link to="/explore" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-3.5 bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-lg font-medium transition-colors">
              Explore blogs
            </button>
          </Link>
        </motion.div>

        {/* Dashboard Mockup Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="mt-20 w-full max-w-5xl mx-auto relative rounded-xl border border-slate-200/60 shadow-2xl bg-white overflow-hidden"
        >
          {/* Mockup Header */}
          <div className="h-12 border-b border-slate-100 bg-slate-50 flex items-center px-4 gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-slate-200" />
              <div className="w-3 h-3 rounded-full bg-slate-200" />
              <div className="w-3 h-3 rounded-full bg-slate-200" />
            </div>
            <div className="flex-1 px-4 py-2 bg-white flex items-center justify-center">
              <span className="text-sm font-medium text-slate-500">
                prose.com/editor
              </span>
            </div>
          </div>
          {/* Mockup Body */}
          <img
            src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2070&auto=format&fit=crop"
            alt="Dashboard Preview"
            className="w-full object-cover object-top h-[300px] sm:h-[400px] lg:h-[500px]"
          />
        </motion.div>
      </div>

      {/* Very subtle background pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
    </section>
  );
}
