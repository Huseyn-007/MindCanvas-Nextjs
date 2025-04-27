"use client";

import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import FeaturedBlogCard from "./FeaturedBlogCard";



type BlogListProps = {
  initialBlogs: any[];
  category?: string;
  author?: string;
  canDelete?: boolean;
};

export default function BlogList({
  initialBlogs,
  category,
  author,
  canDelete = false,
}: BlogListProps) {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const isHomepage = !author && !category;
  const hasFeatured = isHomepage && blogs.length > 0;

  const featuredBlog = hasFeatured ? blogs[0] : null;
  const regularBlogs = hasFeatured ? blogs.slice(1) : blogs;

  const fetchMoreBlogs = async () => {
    setLoading(true);

    const params = new URLSearchParams({
      limit: "6",
      offset: (page * 6).toString(),
    });

    if (category) params.append("category", category);
    if (author) params.append("author", author);

    const res = await fetch(`/api/blogs?${params.toString()}`);
    const newBlogs = await res.json();

    if (newBlogs.length === 0) {
      setHasMore(false);
    } else {
      setBlogs((prev) => [...prev, ...newBlogs]);
      setPage((prev) => prev + 1);
    }

    setLoading(false);
  };

  const showLess = () => {
    setBlogs(initialBlogs);
    setPage(1);
    setHasMore(true);
  };

  useEffect(() => {
    setBlogs(initialBlogs);
    setPage(1);
    setHasMore(true);
  }, [initialBlogs]);

  if (!blogs || blogs.length === 0) {
    return <p className="text-gray-500 text-center">No blogs found.</p>;
  }

  return (
    <div className="mb-16">
      <div className="max-w-[1520px] mx-auto px-4">
        {hasFeatured && featuredBlog && (
          <div className="lg:col-span-3 mb-4">
            <FeaturedBlogCard blog={featuredBlog} />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 px-4 md:px-6 lg:px-8">
          {regularBlogs.map((blog: any) => (
            <BlogCard key={blog.id} blog={blog} canDelete={canDelete} />
          ))}
        </div>

        
      </div>
    </div>
  );
}