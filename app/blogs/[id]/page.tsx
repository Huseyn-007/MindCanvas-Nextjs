"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/Header";
import BlogDetail from "@/components/blog/BlogDetail";
import { useThemeStore } from "@/store/themeStore";

export default function BlogPost({ params }: { params: { id: string } }) {
  const { theme } = useThemeStore();

  return (
    <div
      className={`min-h-screen flex flex-col ${
        theme === "dark" ? "bg-[#242535] text-white" : "bg-white text-[#181a2a]"
      }`}
    >
      <Header />
      <main className="flex-grow">
        <BlogDetail id={params.id} />
      </main>
      <Footer />
    </div>
  );
}
