import { useEffect, useState } from "react";
import axios from "axios";
import {
  Pencil,
  Trash2,
  X,
  Folder,
  User,
  ImagePlus,
} from "lucide-react";
import { toast } from "sonner";

export default function ManagePosts() {
  const [posts, setPosts] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [editImage, setEditImage] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [editPostData, setEditPostData] = useState({
    id: "",
    title: "",
    content: "",
    category: "",
    oldImage: "",
  });

  const getMyPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/post/my-posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data.posts);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load posts");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(
        `http://localhost:5000/api/post/delete/${id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success(res.data.message);
      setDeleteId(null);
      getMyPosts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const openEdit = (post) => {
    setEditPostData({
      id: post._id,
      title: post.title,
      content: post.content,
      category: post.category,
      oldImage: post.image,
    });
    setEditImage(null);
    setEditOpen(true);
  };

  const updatePost = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", editPostData.title);
      formData.append("content", editPostData.content);
      formData.append("category", editPostData.category);

      if (editImage) {
        formData.append("image", editImage);
      }

      const res = await axios.put(
        `http://localhost:5000/api/post/edit/${editPostData.id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success(res.data.message);
      setEditOpen(false);
      getMyPosts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  useEffect(() => {
    getMyPosts();
  }, []);

  return (
    <div className="w-full font-sans pb-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Manage Posts
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Update or remove your published articles
        </p>
      </div>

      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <p className="text-slate-500 font-medium">
              No posts found. Start by creating one!
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-colors"
            >
              <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                
                <div className="w-full lg:w-48 h-32 flex-shrink-0 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                  <img
                    src={post.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-slate-900 truncate">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 text-sm mt-1 line-clamp-2">
                    {post.content}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3 text-xs font-semibold text-slate-600">
                    <span className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md">
                      <User size={14} className="text-slate-400" />
                      {post.author?.fullname}
                    </span>
                    <span className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md">
                      <Folder size={14} className="text-slate-400" />
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  <button
                    onClick={() => openEdit(post)}
                    className="p-2.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors flex items-center justify-center"
                    title="Edit Post"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => setDeleteId(post._id)}
                    className="p-2.5 bg-white border border-slate-200 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center"
                    title="Delete Post"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* EDIT MODAL */}
      {editOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Edit Post</h2>
              <button
                onClick={() => setEditOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Title</label>
                <input
                  type="text"
                  value={editPostData.title}
                  onChange={(e) => setEditPostData({ ...editPostData, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Content</label>
                <textarea
                  rows={6}
                  value={editPostData.content}
                  onChange={(e) => setEditPostData({ ...editPostData, content: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-colors resize-y"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Category</label>
                <select
                  value={editPostData.category}
                  onChange={(e) => setEditPostData({ ...editPostData, category: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-colors cursor-pointer"
                >
                  <option value="Tech">Tech</option>
                  <option value="Design">Design</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Food">Food</option>
                  <option value="Health">Health</option>
                  <option value="Bussines">Business</option>
                  <option value="Education">Education</option>
                  <option value="Sport">Sport</option>
                  <option value="Travel">Travel</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Current Image</label>
                  <div className="w-full h-40 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                    <img
                      src={editImage ? URL.createObjectURL(editImage) : editPostData.oldImage}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 flex flex-col justify-end">
                  <label className="w-full h-40 border-2 border-dashed border-slate-300 hover:border-slate-400 bg-slate-50 hover:bg-slate-100 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors">
                    <ImagePlus size={24} className="text-slate-400" />
                    <span className="text-sm font-medium text-slate-600">Choose New Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setEditImage(e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8 pt-6 border-t border-slate-100">
              <button
                onClick={() => setEditOpen(false)}
                className="flex-1 py-2.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg font-medium text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={updatePost}
                className="flex-1 py-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-lg font-medium text-sm transition-colors"
              >
                Update Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-sm rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Delete Post</h2>
            <p className="text-slate-600 text-sm mb-6">
              This post will be permanently deleted. You cannot recover it.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg font-medium text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg font-medium text-sm transition-colors"
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
