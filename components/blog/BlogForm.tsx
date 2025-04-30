"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useThemeStore } from "@/store/themeStore";

interface BlogFormProps {
  id?: string;
}

interface Category {
  id: string;
  name: string;
}

export default function BlogForm({ id }: BlogFormProps) {
  const router = useRouter();
  const { theme } = useThemeStore();

  const [formData, setFormData] = useState({
    title: "",
    categoryId: "",
    thumbnail: "",
    body: "",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          const res = await fetch(`/api/blogs/${id}`);
          const data = await res.json();
          setFormData({
            title: data.title || "",
            categoryId: data.category || "",
            thumbnail: data.thumbnail || "",
            body: data.body || "",
          });
        } catch (error) {
          console.error("Failed to fetch blog:", error);
        }
      };

      fetchBlog();
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const payload = {
        title: formData.title,
        thumbnail: formData.thumbnail,
        body: formData.body,
        category: formData.categoryId,
      };

      const res = await fetch(id ? `/api/blogs/${id}` : "/api/blogs", {
        method: id ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/");
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error submitting blog:", error);
      alert("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBaseClasses =
    "rounded-lg p-5 text-lg focus:outline-none focus:ring-2 transition-colors";
  const darkInputClasses =
    "bg-[#141624] border-[#242535] text-white focus:ring-yellow-400";
  const lightInputClasses =
    "bg-white border-gray-300 text-black focus:ring-blue-500";

  return (
    <div
      className={`w-full max-w-[768px] mx-auto px-6 py-12 ${
        theme ? "bg-[#181a2a] text-white" : "bg-white text-[#181a2a]"
      } transition-colors`}
    >
      <h1 className="text-4xl font-bold text-center mb-12">
        {id ? "Edit your blog" : "Write a new blog"}
      </h1>

      <div className="flex flex-col gap-8">
        {/* Title */}
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Add title for blog"
          className={`${inputBaseClasses} border ${
            theme ? darkInputClasses : lightInputClasses
          }`}
        />

        {/* Category */}
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className={`${inputBaseClasses} border ${
            theme ? darkInputClasses : lightInputClasses
          }`}
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="thumbnail"
          value={formData.thumbnail}
          onChange={handleChange}
          placeholder="Add thumbnail image URL"
          className={`${inputBaseClasses} border ${
            theme ? darkInputClasses : lightInputClasses
          }`}
        />

        {/* Body */}
        <textarea
          name="body"
          value={formData.body}
          onChange={handleChange}
          placeholder="Add blog body"
          rows={15}
          className={`${inputBaseClasses} border resize-none ${
            theme ? darkInputClasses : lightInputClasses
          }`}
        ></textarea>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="font-bold py-5 text-lg rounded-lg bg-yellow-400 text-black hover:bg-yellow-500 transition-all"
        >
          {isSubmitting
            ? id
              ? "Updating..."
              : "Submitting..."
            : id
            ? "Update Blog"
            : "Submit Blog"}
        </button>
      </div>
    </div>
  );
}
