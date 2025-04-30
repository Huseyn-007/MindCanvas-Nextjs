import BlogList from "@/components/blog/BlogList";
import { Footer } from "@/components/footer";
import { Header } from "@/components/Header";
import { createClient } from "@/utils/supabase/server";
import AuthorInfoBox from "@/components/author/AuthorInfoBox";

// Tema kontrolü sadece görünüm için manuel olarak tailwind sınıflarıyla yapılır
export default async function AuthorBlogs({
  searchParams,
}: {
  searchParams: { author?: string };
}) {
  const author = searchParams.author;

  const supabase = await createClient();

  const { data: blogs } = await supabase
    .from("blogs")
    .select("*")
    .eq("author", author)
    .order("created_at", { ascending: false });

  const { data: authorData } = await supabase
    .from("authors")
    .select("*")
    .eq("id", author)
    .single();

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#181a2a] dark:bg-[#242535] dark:text-white transition-colors">
      <Header />
      <AuthorInfoBox email={authorData.email} />
      <main className="flex-grow">
        <div className="container px-4 mb-6">
          <h2 className="text-xl font-semibold">Latest Post</h2>
        </div>
        <BlogList hasFeatured={false} initialBlogs={blogs || []} />
      </main>
      <Footer />
    </div>
  );
}
