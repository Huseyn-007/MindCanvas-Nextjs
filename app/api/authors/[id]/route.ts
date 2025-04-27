import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:Request, {params}: {params: {id: string}}) {
    const supabase = await createClient();
    const id = (await params).id;
    if(!id) return new Response(JSON.stringify({error:'Missing id'}), {status:400});

    const { data: author, error: authorError } = await supabase
    .from("authors")
    .select("*")
    .eq("id", id)
    .single();

  if (authorError || !author) {
    return NextResponse.json({ error: "Author not found" }, { status: 404 });
  }

  return NextResponse.json(author);
}