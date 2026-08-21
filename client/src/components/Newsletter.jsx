import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[35px] bg-gradient-to-r from-orange-400 via-amber-400 to-emerald-400 p-10 md:p-16"
        >
          {/* Background Glow */}
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/20 blur-3xl"></div>

          <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-white/20 blur-3xl"></div>

          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            {/* Left */}

            <div className="text-white">
              <span className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-lg text-sm font-semibold">
                Newsletter
              </span>

              <h2 className="mt-6 text-4xl md:text-5xl font-bold leading-tight">
                Stay Updated
                <br />
                Never Miss a Blog.
              </h2>

              <p className="mt-5 text-white/90 leading-8">
                Subscribe to receive the latest articles, technology updates,
                development tutorials, productivity tips, and exclusive
                resources directly in your inbox.
              </p>
            </div>

            {/* Right */}

            <div className="bg-white rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center gap-3 border rounded-2xl px-4 py-4">
                <Mail className="text-orange-500" />

                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 outline-none"
                />
              </div>

              <button className="w-full mt-5 py-4 rounded-2xl text-white font-semibold bg-gradient-to-r from-orange-400 to-emerald-400 hover:scale-[1.02] transition flex items-center justify-center gap-2">
                Subscribe Now
                <ArrowRight size={18} />
              </button>

              <p className="text-center text-gray-500 text-sm mt-4">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
