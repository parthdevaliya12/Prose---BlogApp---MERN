import {
  PenSquare,
  Sparkles,
  ShieldCheck,
  BarChart3,
  Globe2,
  Smartphone,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      title: "Clean Editing Experience",
      desc: "Write your blogs using a distraction-free editor that supports rich text formatting, auto-saving, and instant previews.",
      icon: <PenSquare size={20} />,
    },
    {
      title: "AI Writing Assistant",
      desc: "Stuck on a sentence? Use our integrated Gemini AI assistant to generate ideas, fix grammar, or summarize content.",
      icon: <Sparkles size={20} />,
    },
    {
      title: "Secure Authentication",
      desc: "Your data is safe. We use industry-standard JSON Web Tokens (JWT) and encrypted passwords for all users.",
      icon: <ShieldCheck size={20} />,
    },
    {
      title: "Performance Analytics",
      desc: "Understand your audience. Track views, comments, and general engagement right from your personal dashboard.",
      icon: <BarChart3 size={20} />,
    },
    {
      title: "SEO Optimized",
      desc: "Built to rank. Every post is rendered with clean semantic HTML and proper metadata to help you stand out on Google.",
      icon: <Globe2 size={20} />,
    },
    {
      title: "Mobile First Design",
      desc: "Whether you are writing on a laptop or reading on a phone, the platform adapts flawlessly to any screen size.",
      icon: <Smartphone size={20} />,
    },
  ];

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-100" id="features">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl">
            Everything you need to run a modern blog
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            We’ve built the infrastructure so you can focus entirely on your writing. From powerful editing tools to built-in SEO and analytics, Prose has you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 flex flex-col items-start"
            >
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
