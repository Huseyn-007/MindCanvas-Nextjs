"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/Header";
import BlogForm from "@/components/blog/BlogForm";
import { useThemeStore } from "@/store/themeStore";

export default function WriteBlog() {
  const { theme } = useThemeStore();

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors ${
        theme === "dark" ? "bg-[#242535] text-white" : "bg-white text-[#181a2a]"
      }`}
    >
      
      <Header />
      <main className="flex-grow"></main>
      <BlogForm />
     <Footer />
    </div>
  );
}
