import { FaGithub, FaLinkedin, FaEnvelope, FaCode } from "react-icons/fa";

export default function DeveloperInfo() {
  return (
    <section className="py-24 bg-white border-t border-slate-100" id="about">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left side: Content */}
        <div className="lg:w-1/2">
          <div className="inline-flex items-center gap-2 text-orange-500 font-semibold text-sm mb-4">
            <FaCode size={16} />
            About the Developer
          </div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl mb-6">
            Hi, I'm Parth Devaliya.
          </h2>
          <div className="space-y-4 text-lg text-slate-600">
            <p>
              I am an MCA student and Full Stack Developer passionate about building robust, scalable web applications using modern technologies.
            </p>
            <p>
              TechVerse was created to demonstrate a complete MERN stack architecture, combining a seamless user experience with powerful backend functionality like JWT authentication, image uploads, and AI integration.
            </p>
            <p>
              When I'm not coding, I'm constantly learning about new web technologies, UI/UX design principles, and system architecture.
            </p>
          </div>

          <div className="mt-8 flex gap-4">
            <a
              href="#"
              className="text-slate-400 hover:text-slate-900 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-blue-600 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-orange-500 transition-colors"
              aria-label="Email"
            >
              <FaEnvelope size={24} />
            </a>
          </div>
        </div>

        {/* Right side: Image / Tech Stack */}
        <div className="lg:w-1/2 w-full">
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Technologies Used</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="block text-sm font-semibold text-slate-900">Frontend</span>
                <span className="block text-sm text-slate-600">React.js, Tailwind CSS</span>
              </div>
              <div className="space-y-1">
                <span className="block text-sm font-semibold text-slate-900">Backend</span>
                <span className="block text-sm text-slate-600">Node.js, Express</span>
              </div>
              <div className="space-y-1">
                <span className="block text-sm font-semibold text-slate-900">Database</span>
                <span className="block text-sm text-slate-600">MongoDB</span>
              </div>
              <div className="space-y-1">
                <span className="block text-sm font-semibold text-slate-900">Authentication</span>
                <span className="block text-sm text-slate-600">JWT, bcrypt</span>
              </div>
              <div className="space-y-1 mt-2">
                <span className="block text-sm font-semibold text-slate-900">AI Integration</span>
                <span className="block text-sm text-slate-600">Google Gemini API</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
