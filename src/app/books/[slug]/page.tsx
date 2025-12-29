import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
// import { Metadata } from "next";
// import { useRouter } from "next/router";

// const w = useRouter()
// export const metadata : Metadata = {
//   title:`کتابخانه موهو - ${w}`,
// };

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const { data: book, error } = await supabase
    .from("books")
    .select("*")
    .eq("slug", resolvedParams.slug)
    .single();

  if (error || !book) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 shadow-lg">
          <p className="text-red-400 text-lg font-medium">کتاب پیدا نشد</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-right">
      <div className="pt-24 p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-blue-500">
            {book.title}
          </h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Book Cover */}
        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-blue-600/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <Image
            src={book.cover_url}
            alt={book.title}
            className="relative w-full max-w-md mx-auto h-96 object-cover rounded-2xl shadow-2xl border border-gray-700/50 group-hover:scale-105 transition-transform duration-300"
            width={300}
            height={300}
          />
        </div>

        {/* Description */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 mb-8 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-200 mb-4 flex flex-row-reverse items-center">
            <svg
              className="w-5 h-5 ml-2 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            توضیحات
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            {book.description ?? book.title}
          </p>
        </div>

        {/* Download Button */}
        <div className="text-center">
          <a
            href={book.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-2xl shadow-lg hover:bg-blue-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <svg
              className="w-5 h-5 mr-3 group-hover:animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            دانلود فایل PDF
          </a>
        </div>

        {/* Decorative Elements */}
        <div className="fixed top-1/4 left-10 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="fixed bottom-1/4 right-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>
      </div>
    </div>
  );
}
