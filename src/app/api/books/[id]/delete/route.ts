// app/api/books/[id]/delete/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params; // unwrap the Promise

  const supabase = await createClient();

  const { error } = await supabase
    .from("books")
    .delete()
    .eq("id", resolvedParams.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ success: true });
}

