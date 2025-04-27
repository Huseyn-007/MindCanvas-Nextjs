'use client'

import React, { useEffect, useState } from "react";
import { useThemeStore } from "@/store/themeStore";
import Link from "next/link";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

type BlogCardProps = {
  blog: any;
  canDelete?: boolean;
};

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength
    ? text.substring(0, maxLength - 3) + "..."
    : text;
};

const BlogCard = ({ blog }: BlogCardProps) => {
  const { theme } = useThemeStore((state) => state);
  const [categoryName, setCategoryName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [showFullTitle, setShowFullTitle] = useState(false);
  const [showFullEmail, setShowFullEmail] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [categoryRes, authorRes] = await Promise.all([
          fetch(`/api/categories/${blog.category}`),
          fetch(`/api/authors/${blog.author}`),
        ]);

        const [categoryData, authorData] = await Promise.all([
          categoryRes.json(),
          authorRes.json(),
        ]);

        setCategoryName(categoryData.name || "Uncategorized");
        setAuthorEmail(authorData.email || "Unknown Author");
      } catch (err) {
        console.error("Failed to fetch category or author:", err);
      }
    };

    fetchDetails();
  }, [blog]);

  return (
    <div className="group relative w-full">
      <div
        onClick={() => router.push(`/blogs/${blog.id}`)}
        className="cursor-pointer max-w-[420px] mx-auto w-full transition-transform duration-300 ease-in-out group-hover:scale-[1.02]"
      >
        <div
          className={`rounded-xl overflow-hidden shadow-md border transition-colors duration-500 ease-in-out ${
            theme === "dark"
              ? "bg-[#181a2a] border-white/10"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="p-3">
            <div
              className={`relative aspect-[4/3] overflow-hidden rounded-xl border transition-colors duration-500 ease-in-out ${
                theme === "dark" ? "border-white/10" : "border-gray-200"
              }`}
            >
              <img
                src={
                  blog.thumbnail ||
                  "https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg"
                }
                alt={blog.title}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>

          <div className="p-4">
            <div className="mb-3">
              <span
                className={`px-3 py-1 text-sm rounded-md font-medium transition-colors duration-500 ease-in-out ${
                  theme === "dark"
                    ? "bg-[#1b1e35] text-[#3c53bc]"
                    : "bg-[#f6f7ff] text-[#8097fd]"
                }`}
              >
                {categoryName}
              </span>
            </div>

            <h2
              className={`text-xl font-semibold mb-3 leading-snug transition-colors duration-500 ease-in-out ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
              onMouseEnter={() => setShowFullTitle(true)}
              onMouseLeave={() => setShowFullTitle(false)}
            >
              {showFullTitle ? blog.title : truncateText(blog.title, 30)}
            </h2>

            <div className="flex items-center gap-4 text-sm">
              <Link
                href={`/author-blogs/?author=${blog.author}`}
                className={`transition-colors duration-500 ease-in-out ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-500 hover:text-black"
                }`}
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={() => setShowFullEmail(true)}
                onMouseLeave={() => setShowFullEmail(false)}
              >
                {showFullEmail ? authorEmail : truncateText(authorEmail, 30)}
              </Link>

              <span
                className={`transition-colors duration-500 ease-in-out ${
                  theme === "dark" ? "text-gray-500" : "text-gray-400"
                }`}
              >
                •
              </span>

              <time
                className={`transition-colors duration-500 ease-in-out ${
                  theme === "dark" ? "text-gray-500" : "text-gray-400"
                }`}
              >
                {format(new Date(blog.created_at), "MMMM dd, yyyy")}
              </time>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
