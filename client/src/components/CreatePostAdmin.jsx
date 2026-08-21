import {
  ImagePlus,
  Loader2,
  Sparkles,
  PenTool,
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";

export default function CreatePostAdmin() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    toast.success("Image selected");
  };

  const generateWithAI = async () => {
    if (!formData.title.trim()) {
      return toast.error("Enter a title first to generate content");
    }

    try {
      setAiLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/ai/generate",
        { title: formData.title, category: formData.category },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setFormData((prev) => ({ ...prev, content: res.data.content }));
        toast.success("Content generated with AI!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "AI generation failed");
    } finally {
      setAiLoading(false);
    }
  };

  const createPost = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const data = new FormData();
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("content", formData.content);

      if (image) {
        data.append("image", image);
      }

      const res = await axios.post(
        "http://localhost:5000/api/post/create",
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(res.data.message);
      setFormData({ title: "", category: "", content: "" });
      setImage(null);
      setPreview("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl font-sans pb-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <PenTool size={22} className="text-slate-700" />
            Create New Post
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Draft and publish your next story
          </p>
        </div>
        <button
          type="submit"
          form="adminBlogForm"
          disabled={loading}
          className="px-5 py-2 rounded-lg text-white bg-slate-900 hover:bg-slate-800 font-medium text-sm transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Publishing...
            </>
          ) : (
            "Publish"
          )}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <form id="adminBlogForm" onSubmit={createPost} className="space-y-10">
          
          {/* Title Area */}
          <div>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full text-4xl sm:text-5xl font-extrabold outline-none text-slate-900 placeholder:text-slate-300 bg-transparent transition-colors mb-2"
            />
          </div>

          <div className="w-full sm:w-1/2 min-w-[200px]">
            <select
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-sm font-medium outline-none focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors cursor-pointer appearance-none"
            >
              <option value="">Select a category...</option>
              <option value="Technology">Technology</option>
              <option value="Programming">Programming</option>
              <option value="Design">Design</option>
              <option value="Business">Business</option>
              <option value="Finance">Finance</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Education">Education</option>
              <option value="Health">Health</option>
              <option value="Gaming">Gaming</option>
              <option value="Food">Food</option>
              <option value="Sports">Sports</option>
              <option value="Travel">Travel</option>
              <option value="Entertainment">Entertainment</option>
              <option value="News">News</option>
              <option value="Science">Science</option>
              <option value="Art">Art</option>
              <option value="Music">Music</option>
              <option value="Photography">Photography</option>
              <option value="Fashion">Fashion</option>
              <option value="Beauty">Beauty</option>
              <option value="History">History</option>
              <option value="Automotive">Automotive</option>
              <option value="General">General</option>
            </select>
          </div>

          {/* Image Upload Area */}
          <div>
            {preview ? (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 group">
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-[300px] sm:h-[400px] object-cover"
                />
                <label className="absolute inset-0 bg-slate-900/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white font-medium">
                  Change Image
                  <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
                </label>
              </div>
            ) : (
              <label className="block w-full border-2 border-dashed border-slate-200 hover:border-slate-400 rounded-xl p-12 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-slate-400">
                    <ImagePlus size={24} />
                  </div>
                  <span className="text-sm font-medium text-slate-600">
                    Add a cover image
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Content Area */}
          <div className="relative">
            <div className="absolute -top-12 right-0">
              <button
                type="button"
                onClick={generateWithAI}
                disabled={aiLoading}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors disabled:opacity-60"
              >
                {aiLoading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Sparkles size={14} className="text-indigo-500" />
                )}
                Write with AI
              </button>
            </div>
            
            <textarea
              rows="15"
              name="content"
              required
              value={formData.content}
              onChange={handleChange}
              placeholder="Tell your story..."
              className="w-full text-lg leading-relaxed outline-none text-slate-800 placeholder:text-slate-300 resize-y bg-transparent"
            ></textarea>
          </div>
          
        </form>
      </div>
    </div>
  );
}
