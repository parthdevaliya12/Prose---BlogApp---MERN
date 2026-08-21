import { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowLeft,
  Trash2,
  Calendar,
  Share2,
  Loader2,
  Heart,
  Bookmark,
  Eye,
  Clock,
  Link as LinkIcon
} from "lucide-react";
import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "sonner";

export default function PostDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentLoading, setCommentLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const loggedUser = JSON.parse(localStorage.getItem("user"));

  const getSinglePost = async () => {
    try {
      // Fetch Post
      const res = await axios.get(`http://localhost:5000/api/post/single/${id}`);
      const fetchedPost = res.data.post;
      setPost(fetchedPost);
      setLikeCount(fetchedPost.likes?.length || 0);

      if (loggedUser) {
        setIsLiked(fetchedPost.likes?.includes(loggedUser.id));
        checkIfSaved();
      }

      // Increment views
      await axios.put(`http://localhost:5000/api/post/views/${id}`);
      
      // Fetch Related
      getRelatedPosts(fetchedPost._id);

    } catch (error) {
      console.log(error);
      toast.error("Post not found");
    } finally {
      setLoading(false);
    }
  };

  const getRelatedPosts = async (postId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/post/related/${postId}`);
      setRelatedPosts(res.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfSaved = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axios.get("http://localhost:5000/api/auth/saved-posts", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const savedIds = res.data.savedPosts.map(p => p._id);
      setIsSaved(savedIds.includes(id));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return toast.error("Please login to like this post");

      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);

      await axios.post(
        `http://localhost:5000/api/post/like/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount + 1 : likeCount - 1);
      toast.error("Error liking post");
    }
  };

  const toggleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return toast.error("Please login to save this post");

      setIsSaved(!isSaved);

      const res = await axios.post(
        `http://localhost:5000/api/auth/save/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message);
    } catch (error) {
      setIsSaved(!isSaved);
      toast.error("Error saving post");
    }
  };

  const getComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/comment/all/${id}`,
      );
      setComments(res.data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async () => {
    if (!comment.trim()) {
      return toast.error("Write comment first");
    }
    try {
      setCommentLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return toast.error("Please login first");

      const res = await axios.post(
        `http://localhost:5000/api/comment/add/${id}`,
        { comment },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success(res.data.message);
      setComment("");
      getComments();
    } catch (error) {
      toast.error(error.response?.data?.message || "Comment failed");
    } finally {
      setCommentLoading(false);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(
        `http://localhost:5000/api/comment/delete/${commentId}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success(res.data.message);
      getComments();
      setDeleteId(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => {
    setLoading(true);
    getSinglePost();
    getComments();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-slate-400 mb-4" size={32} />
        <span className="text-slate-500 font-medium">Loading post...</span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Post not found</h2>
        <button onClick={() => navigate(-1)} className="text-orange-500 hover:text-orange-600 font-medium transition-colors">
          Go back
        </button>
      </div>
    );
  }

  const shareUrl = window.location.href;
  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard!");
  };

  const calculateReadTime = (text) => {
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / 200);
    return `${time} min read`;
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 pb-20">
      
      {/* HEADER / COVER IMAGE */}
      {post.image ? (
        <div className="w-full h-[40vh] sm:h-[50vh] relative bg-slate-100">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
          <div className="absolute top-6 left-6 sm:left-12">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/30 text-white rounded-lg transition-colors text-sm font-medium">
              <ArrowLeft size={16} /> Back
            </button>
          </div>
        </div>
      ) : (
        <div className="pt-12 px-6 sm:px-12">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium">
            <ArrowLeft size={16} /> Back
          </button>
        </div>
      )}

      {/* CONTENT CONTAINER */}
      <article className={`max-w-3xl mx-auto px-6 sm:px-8 ${post.image ? "-mt-20 relative z-10" : "mt-8"}`}>
        
        {/* Post Header Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 sm:p-10 mb-12">
          <div className="flex justify-between items-start mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
              {post.category || "General"}
            </span>
            <div className="flex items-center gap-4 text-slate-500 text-sm font-medium">
              <span className="flex items-center gap-1"><Eye size={16}/> {post.views || 0}</span>
              <span className="flex items-center gap-1"><Clock size={16}/> {calculateReadTime(post.content)}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">
                {post.author?.fullname ? post.author.fullname.charAt(0).toUpperCase() : "U"}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{post.author?.fullname || "Unknown User"}</p>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <Calendar size={12} />
                  {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={toggleLike} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${isLiked ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}>
                <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
                <span className="text-sm font-semibold">{likeCount}</span>
              </button>
              <button onClick={toggleSave} className={`p-1.5 rounded-lg border transition-colors ${isSaved ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`} title="Save for later">
                <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="prose prose-lg prose-slate max-w-none mb-16">
          {post.content.split("\n").map((para, i) => (
            <p key={i} className="mb-6 text-slate-700 leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {/* Share Section */}
        <div className="flex flex-col items-center justify-center border-t border-b border-slate-100 py-10 mb-16">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Share this article</h3>
          <div className="flex items-center gap-4">
            <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${post.title}`} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white transition-colors">
              <FaTwitter size={20} />
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[#4267B2] hover:bg-[#4267B2] hover:text-white transition-colors">
              <FaFacebook size={20} />
            </a>
            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${post.title}`} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-colors">
              <FaLinkedin size={20} />
            </a>
            <button onClick={copyLink} className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-colors">
              <LinkIcon size={20} />
            </button>
          </div>
        </div>

        {/* COMMENTS SECTION */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
            Comments
            <span className="bg-slate-100 text-slate-600 text-sm py-0.5 px-2.5 rounded-full font-medium">
              {comments.length}
            </span>
          </h2>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-10 flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-colors"
            />
            <button
              onClick={addComment}
              disabled={commentLoading}
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-70 min-w-[120px]"
            >
              {commentLoading ? <Loader2 size={16} className="animate-spin" /> : "Post"}
            </button>
          </div>

          <div className="space-y-6">
            {comments.length === 0 ? (
              <p className="text-slate-500 text-center py-8">No comments yet. Be the first to share your thoughts!</p>
            ) : (
              comments.map((item) => (
                <div key={item._id} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center text-slate-600 font-bold text-sm">
                    {item.user?.fullname?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl rounded-tl-none p-4 relative group">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-slate-900 text-sm">
                        {item.user?.fullname}
                      </h4>
                      <span className="text-xs text-slate-400">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                      {item.comment}
                    </p>
                    
                    {loggedUser?.id === item.user?._id && (
                      <button
                        onClick={() => setDeleteId(item._id)}
                        className="absolute -right-2 -top-2 p-2 bg-white text-red-500 hover:bg-red-50 border border-slate-200 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                        title="Delete comment"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Read Next Section */}
        {relatedPosts.length > 0 && (
          <div className="border-t border-slate-200 pt-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Read Next</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((post) => (
                <Link to={`/post/${post._id}`} key={post._id} className="group flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all hover:border-slate-300">
                  <div className="h-48 bg-slate-100 overflow-hidden">
                    <img src={post.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643'} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-semibold text-orange-500 mb-2 block">{post.category}</span>
                      <h3 className="font-bold text-lg text-slate-900 group-hover:text-orange-500 transition-colors line-clamp-2 mb-2">{post.title}</h3>
                      <p className="text-sm text-slate-600 line-clamp-2">{post.content}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* DELETE MODAL */}
      {deleteId && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Comment</h3>
            <p className="text-slate-600 text-sm mb-6">Are you sure you want to delete this comment? This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteComment(deleteId)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
