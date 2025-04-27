"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { useThemeStore } from "@/store/themeStore";
import { useRouter } from "next/navigation";

export default function FeaturedBlogCard({ blog }: { blog: any }) {
  const { theme } = useThemeStore();
  const [categoryName, setCategoryName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [showFullTitle, setShowFullTitle] = useState(false);
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

  const truncateTitle = (title: string) => {
    return title.length > 69 ? title.substring(0, 57) + "..." : title;
  };

  return (
    <div className="relative container px-4 h-[500px] rounded-[12px] overflow-hidden group cursor-pointer mb-16 mt-16 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl">
      <Link
        href={`/blogs/${blog.id}`}
        className="block h-full rounded-[12px] overflow-hidden"
      >
        <div
          className="relative h-full w-full rounded-[12px] overflow-hidden object-cover"
          style={{
            backgroundImage: `url(${blog.thumbnail || "https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90"></div>

          <div className="absolute bottom-0 w-full p-6 text-white">
            <div className="mb-4">
              <span className="px-3 py-1 text-sm bg-blue-600 rounded-md">
                {categoryName}
              </span>
            </div>

            <h2
              className="text-2xl font-bold mb-3 transition-all duration-300 max-w-[500px]"
              onMouseEnter={() => setShowFullTitle(true)}
              onMouseLeave={() => setShowFullTitle(false)}
            >
              {showFullTitle ? blog.title : truncateTitle(blog.title)}
            </h2>

            <div className="flex items-center gap-4 text-sm text-gray-300">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/author-blogs/?author=${blog.author}`);
                }}
                className="hover:text-blue-400 transition-colors"
              >
                {authorEmail}
              </button>
              <span>•</span>
              <time>{format(new Date(blog.created_at), "MMMM dd, yyyy")}</time>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}