import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // wrap params in Promise
) {
  const resolvedParams = await params; // unwrap the Promise
  const supabase = await createClient();
  const body = await req.json();

  const { error } = await supabase
    .from("books")
    .update({
      title: body.title,
      author: body.author,
      description: body.description,
      slug: body.slug,
    })
    .eq("id", resolvedParams.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ success: true });
}
