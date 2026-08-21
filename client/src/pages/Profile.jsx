import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  Edit,
  Save,
  X,
  Camera,
  FileText,
  MessageSquare,
  User,
  Mail,
  KeyRound,
  Lock,
  Loader2,
  Bookmark,
  Eye,
  Heart
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [savedPosts, setSavedPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("stats"); // 'stats' | 'saved'

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: null,
  });

  const [tempUser, setTempUser] = useState({
    name: "",
    email: "",
    avatar: null,
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      const userData = {
        name: storedUser.fullname,
        email: storedUser.email,
        avatar: storedUser.avatar || null,
      };
      setUser(userData);
      setTempUser(userData);
    }
    getMyPostsCount();
    getMyCommentsCount();
    getSavedPosts();
  }, []);

  const getMyPostsCount = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "/api/post/my-posts-count",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTotalPosts(res.data.totalPosts);
    } catch (error) {
      console.log(error);
    }
  };

  const getMyCommentsCount = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "/api/comment/my-comments-count",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTotalComments(res.data.totalComments);
    } catch (error) {
      console.log(error);
    }
  };

  const getSavedPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "/api/auth/saved-posts",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSavedPosts(res.data.savedPosts || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const imageURL = URL.createObjectURL(file);
      setTempUser({ ...tempUser, avatar: imageURL });
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("fullname", tempUser.name);

      if (selectedFile) {
        formData.append("avatar", selectedFile);
      }

      const res = await axios.put(
        "/api/auth/profile/update",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedUser = {
        name: res.data.user.fullname,
        email: res.data.user.email,
        avatar: res.data.user.avatar,
      };

      setUser(updatedUser);
      setTempUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  const handleCancel = () => {
    setTempUser(user);
    setIsEditing(false);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }
    if (passwordData.newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters long");
    }

    try {
      setPasswordLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.put(
        "/api/auth/change-password",
        { newPassword: passwordData.newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(res.data.message || "Password updated successfully");
      setShowPasswordModal(false);
      setPasswordData({ newPassword: "", confirmPassword: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Password update failed");
    } finally {
      setPasswordLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    setTimeout(() => {
      navigate("/login");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 space-y-8">
        
        {/* PROFILE CARD */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            
            {/* AVATAR */}
            <div className="relative flex-shrink-0 group">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center text-slate-400 text-4xl font-bold border-4 border-white shadow-md">
                {tempUser.avatar ? (
                  <img src={tempUser.avatar} alt="profile" className="w-full h-full object-cover" />
                ) : (
                  user.name?.charAt(0).toUpperCase() || <User size={48} />
                )}
              </div>
              {isEditing && (
                <label className="absolute bottom-1 right-1 bg-slate-900 text-white p-2.5 rounded-full shadow-lg cursor-pointer hover:bg-slate-800 transition-colors border-2 border-white">
                  <Camera size={18} />
                  <input type="file" className="hidden" onChange={handleImageUpload} />
                </label>
              )}
            </div>

            {/* INFO & ACTIONS */}
            <div className="flex-1 w-full text-center sm:text-left space-y-5">
              {!isEditing ? (
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                    {user.name || "User Name"}
                  </h1>
                </div>
              ) : (
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-semibold text-slate-500 uppercase">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={tempUser.name}
                    onChange={(e) => setTempUser({ ...tempUser, name: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none text-slate-900 transition-colors text-sm"
                  />
                </div>
              )}

              <div className="relative text-left max-w-md mx-auto sm:mx-0">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 text-sm cursor-not-allowed"
                />
              </div>

              <div className="flex flex-wrap gap-3 pt-2 justify-center sm:justify-start">
                {!isEditing ? (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Edit size={16} /> Edit Profile
                    </button>
                    <button
                      onClick={() => setShowPasswordModal(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium transition-colors"
                    >
                      <KeyRound size={16} /> Change Password
                    </button>
                    <button
                      onClick={logout}
                      className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition-colors"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      <Save size={16} /> Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium transition-colors"
                    >
                      <X size={16} /> Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="flex border-b border-slate-200 mt-10">
          <button
            onClick={() => setActiveTab("stats")}
            className={`pb-4 px-6 text-sm font-medium transition-colors border-b-2 ${
              activeTab === "stats"
                ? "border-slate-900 text-slate-900"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Overview & Stats
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`pb-4 px-6 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === "saved"
                ? "border-slate-900 text-slate-900"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Saved Posts
            <span className="bg-slate-100 text-slate-600 py-0.5 px-2 rounded-full text-xs">
              {savedPosts.length}
            </span>
          </button>
        </div>

        {/* TAB CONTENT */}
        <div className="pt-4">
          {activeTab === "stats" ? (
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center mb-3">
                  <FileText size={20} />
                </div>
                <h3 className="text-3xl font-bold text-slate-900">{totalPosts}</h3>
                <p className="text-slate-500 text-sm font-medium mt-1">Published Posts</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center mb-3">
                  <MessageSquare size={20} />
                </div>
                <h3 className="text-3xl font-bold text-slate-900">{totalComments}</h3>
                <p className="text-slate-500 text-sm font-medium mt-1">Comments Made</p>
              </div>
            </div>
          ) : (
            <div>
              {savedPosts.length === 0 ? (
                <div className="text-center py-16 bg-white border border-slate-200 rounded-xl">
                  <Bookmark size={48} className="mx-auto text-slate-300 mb-4" />
                  <h3 className="text-lg font-bold text-slate-900">No saved posts</h3>
                  <p className="text-slate-500 mt-1 max-w-sm mx-auto">
                    Articles you save will appear here. Go explore and find something interesting!
                  </p>
                  <Link to="/explore" className="inline-block mt-6 px-4 py-2 bg-slate-900 text-white rounded-md text-sm font-medium hover:bg-slate-800 transition-colors">
                    Explore Articles
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {savedPosts.map((post) => (
                    <div key={post._id} className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                      <Link to={`/postdetails/${post._id}`} className="block h-40 overflow-hidden bg-slate-100">
                        <img src={post.image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80"} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                      </Link>
                      <div className="p-5 flex flex-col flex-1">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-600 w-fit mb-2">
                          {post.category || "General"}
                        </span>
                        <Link to={`/postdetails/${post._id}`}>
                          <h3 className="text-lg font-bold text-slate-900 hover:text-orange-500 transition-colors line-clamp-2 mb-2">
                            {post.title}
                          </h3>
                        </Link>
                        <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                          {post.content}
                        </p>
                        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-xs font-medium text-slate-500">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </span>
                          <div className="flex items-center gap-3 text-slate-400 text-xs font-medium">
                            <span className="flex items-center gap-1">
                              <Eye size={12} /> {post.views || 0}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart size={12} /> {post.likes?.length || 0}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* PASSWORD MODAL */}
      <AnimatePresence>
        {showPasswordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <KeyRound size={20} className="text-slate-400" /> New Password
                </h3>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">New Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-sm outline-none focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Confirm Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-sm outline-none focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                    />
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="flex-1 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {passwordLoading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
