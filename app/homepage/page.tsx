'use client';

import BlogList from "@/components/blog/BlogList";
import { Header } from "@/components/Header";
import { Footer } from "@/components/footer";
import { useThemeStore } from "@/store/themeStore";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const { theme } = useThemeStore((state) => state);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const category = searchParams?.get("category") || "";

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/blogs${category ? `?category=${category}` : ""}`,
          { cache: "no-store" }
        );
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [category]);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        theme === "dark" ? "dark bg-[#242535]" : "bg-white"
      }`}
    >
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500">Not found.</p>
        ) : (
          <BlogList initialBlogs={blogs} />
        )}
      </main>
      <Footer />
    </div>
  );
}
