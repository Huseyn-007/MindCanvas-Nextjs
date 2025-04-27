import { Header } from "@/components/Header";
import BlogList from "@/components/blog/BlogList";
import { Footer } from "@/components/footer";
import Image from "next/image";
export default async function Home({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const category = (await searchParams).category;

  const res = await fetch(
    `${baseUrl}/api/blogs${category ? `?category=${category}` : ""}`,
    { cache: "no-store" }
  );
  const blogs = await res.json();
  return (
    <div className=" transition-colors dark:bg-[#242535]">
      <Header></Header>
      <main>
        <BlogList initialBlogs={blogs} category={category} />
      </main>
      <Footer></Footer>
    </div>
  );
}
