import { createClient } from "@/utils/supabase/server";

export async function GET(req: Request) {
  const supabase = await createClient();

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  let query = supabase.from("blogs").select("*").order("created_at", { ascending: false });

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
export async function POST(req:Request){
    const supabase = await createClient();
    const formbody = await req.json();
    const {title, body, category, thumbnail} = formbody;

    const{
        data:{user},
        error:userError
    } = await supabase.auth.getUser();

    if(userError) return new Response(JSON.stringify({error:userError.message}), {status:500});

    const authorId = user?.id;
    if (!title || !body || !category || !thumbnail) {
        return new Response(JSON.stringify({error:'Missing required fields'}), {status:400});
    }

    const {data, error} = await supabase
        .from('blogs')
        .insert({
            title,
            body,
            category,
            thumbnail,
            author: authorId
        })
        .single();

    if (error) {
        return new Response(JSON.stringify({error:error.message}), {status:500});
    }

    return new Response(JSON.stringify(data), {headers: {"Content-Type": "application/json"}});
}