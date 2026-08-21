import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  LayoutDashboard,
  Sparkles,
  ArrowRight,
  User,
  LogOut,
  PlusCircle,
  Compass,
  BookOpen,
  Heart,
  Eye,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/post/all");
      setPosts(res.data.posts || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);



  const categories = [
    "All",
    "Tech",
    "Gaming",
    "Sport",
    "Education",
    "Lifestyle",
    "Food",
    "Design",
    "Business",
    "Travel",
    "Health",
    "Finance",
  ];

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter(
          (post) => post.category?.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900">


      {/* HERO */}
      <section className="bg-white border-b border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl mb-4">
            Read, explore, and learn.
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover articles from our network of writers. Dive deep into topics you care about, from technology and design to health and business.
          </p>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-slate-50 py-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
                  activeCategory === cat
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* POSTS FEED */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="bg-white border border-slate-200 rounded-xl p-4 animate-pulse">
                  <div className="w-full h-48 bg-slate-100 rounded-lg mb-4" />
                  <div className="h-4 bg-slate-100 rounded w-1/4 mb-4" />
                  <div className="h-6 bg-slate-100 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-slate-100 rounded w-full mb-4" />
                  <div className="h-10 bg-slate-100 rounded w-full mt-auto" />
                </div>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-900">No posts found</h3>
              <p className="text-slate-500 mt-1">Try selecting a different category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(0, 9).map((post) => (
                <div
                  key={post._id}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col hover:shadow-md transition-shadow"
                >
                  <Link to={`/postdetails/${post._id}`} className="block h-48 overflow-hidden bg-slate-100">
                    <img
                      src={post.image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80"}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                        {post.category || "General"}
                      </span>
                    </div>
                    
                    <Link to={`/postdetails/${post._id}`}>
                      <h3 className="text-xl font-bold text-slate-900 hover:text-orange-500 transition-colors line-clamp-2 mb-2">
                        {post.title}
                      </h3>
                    </Link>
                    
                    <p className="text-slate-600 text-sm line-clamp-3 mb-6">
                      {post.content}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                          {post.author?.fullname ? post.author.fullname.charAt(0).toUpperCase() : "U"}
                        </div>
                        <span className="text-sm font-medium text-slate-600">
                          {post.author?.fullname || "Unknown"}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-400 text-xs font-medium">
                        <span className="flex items-center gap-1">
                          <Eye size={14} /> {post.views || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart size={14} /> {post.likes?.length || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* CTA */}
      {filteredPosts.length > 9 && (
        <div className="flex justify-center pb-20">
          <Link
            to="/explore"
            className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
          >
            View all posts
          </Link>
        </div>
      )}
    </div>
  );
}
