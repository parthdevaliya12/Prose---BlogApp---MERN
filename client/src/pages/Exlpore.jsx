import { useEffect, useState } from "react";
import axios from "axios";
import { BookOpen, Search, X, Heart, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function Explore() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);


  const fetchPosts = async (category = "") => {
    try {
      setLoading(true);
      const url = category
        ? `/api/post/search?category=${encodeURIComponent(category)}`
        : "/api/post/all";

      const res = await axios.get(url);
      setPosts(res.data.posts || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchPosts(search);
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* HEADER SECTION */}
      <div className="bg-white border-b border-slate-200 pt-10 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">


          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
                Explore posts
              </h1>
              <p className="mt-2 text-lg text-slate-600">
                Search by category, title, or discover new articles.
              </p>
            </div>

            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg bg-white text-slate-900 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-colors sm:text-sm"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* POSTS GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
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
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
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
        ) : (
          <div className="text-center py-24 bg-white border border-slate-200 rounded-xl">
            <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-900">No blogs found</h3>
            <p className="text-slate-500 mt-1 max-w-sm mx-auto">
              {search
                ? `We couldn't find any articles matching "${search}".`
                : "No articles available right now."}
            </p>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="mt-6 px-4 py-2 bg-slate-900 text-white rounded-md text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
