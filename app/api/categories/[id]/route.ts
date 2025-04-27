

import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:Request, {params}: {params: {id: string}}) {
    const supabase = await createClient();
    const id = (await params).id;
    if(!id) return new Response(JSON.stringify({error:'Missing id'}), {status:400});

    const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

  if (categoryError || !category) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  return NextResponse.json(category);
}
