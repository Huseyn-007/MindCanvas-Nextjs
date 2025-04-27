import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:Request, {params}: {params: {id: string}}) {
    const supabase = await createClient();
    const id = (await params).id;
    if(!id) return new Response(JSON.stringify({error:'Missing id'}), {status:400});

    const { data: blog, error: blogError } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();

  if (blogError || !blog) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  return NextResponse.json(blog);
}
