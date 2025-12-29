"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";

export default function BorrowedBooksPage() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBorrowedBooks = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("ابتدا وارد حساب کاربری شوید.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("borrowed_books")
      .select(
        `
        id,
        borrowed_at,
        returned_at,
        books:books!borrowed_books_book_id_fkey (
          id,
          title,
          cover_url,
          description,
          slug
        )
      `
      )
      .eq("user_id", user.id);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setBorrowedBooks(data || []);
    setError(null);
    setLoading(false);
  };

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  // حالت لودینگ
  if (loading)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center pt-24 relative overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-600 rounded-full opacity-5"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-blue-600 rounded-full opacity-5"></div>

        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-600 border-t-blue-500 mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg">در حال بارگذاری...</p>
        </div>
      </div>
    );

  // حالت خطا
  if (error)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center pt-24 relative overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-600 rounded-full opacity-5"></div>
        <div className="bg-red-900/50 border border-red-600/30 rounded-3xl p-8 text-center shadow-lg">
          <div className="w-16 h-16 bg-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded-full opacity-80"></div>
          </div>
          <p className="text-red-200 font-bold text-lg">خطا: {error}</p>
        </div>
      </div>
    );

  // حالت بدون کتاب
  if (borrowedBooks.length === 0)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center pt-24 relative overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-600 rounded-full opacity-5"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-blue-600 rounded-full opacity-5"></div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-3xl p-12 text-center shadow-lg max-w-md mx-4">
          <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
            <div className="w-10 h-10 bg-white rounded-full opacity-80"></div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            هیچ کتابی یافت نشد
          </h2>
          <p className="text-gray-400 text-lg">
            هیچ کتاب قرض گرفته شده‌ای وجود ندارد.
          </p>
        </div>
      </div>
    );

  // حالت نمایش کتاب‌ها
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
     
      <div className="max-w-6xl mx-auto p-6 pt-32 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-500 mb-4">
            کتاب‌های قرض گرفته شده
          </h1>
          <p className="text-gray-400 text-lg">مجموعه کتاب‌های در اختیار شما</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {borrowedBooks.map(({ id, borrowed_at, returned_at, books }) => (
            <div
              key={id}
              className="bg-gray-800/50 border border-gray-700 rounded-3xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-blue-500/10 group"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={books.cover_url}
                  alt={books.title}
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  height={300}
                  width={300}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                <div className="absolute top-4 right-4">
                  {returned_at ? (
                    <div className="bg-blue-600/90 text-blue-100 px-3 py-1 rounded-full text-xs font-semibold border border-blue-500/30">
                      برگشت داده شده
                    </div>
                  ) : (
                    <div className="bg-blue-600/90 text-blue-100 px-3 py-1 rounded-full text-xs font-semibold border border-blue-500/30">
                      قرض گرفته شده
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold mb-3 text-white line-clamp-2 leading-tight">
                  {books.title}
                </h2>

                <p className="text-gray-400 flex-grow mb-4 text-sm leading-relaxed">
                  {books.description
                    ? books.description.length > 120
                      ? books.description.substring(0, 120) + "..."
                      : books.description
                    : "بدون توضیح"}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="bg-gray-700/50 rounded-2xl p-3 border border-gray-600/30">
                    <p className="text-xs text-blue-300 mb-1">
                      تاریخ قرض گرفتن
                    </p>
                    <p className="text-gray-200 font-medium">
                      {new Date(borrowed_at).toLocaleDateString("fa-IR")}
                    </p>
                  </div>

                  {returned_at && (
                    <div className="bg-gray-700/50 rounded-2xl p-3 border border-gray-600/30">
                      <p className="text-xs text-blue-300 mb-1">
                        تاریخ بازگشت
                      </p>
                      <p className="text-gray-200 font-medium">
                        {new Date(returned_at).toLocaleDateString("fa-IR")}
                      </p>
                    </div>
                  )}
                </div>

                <a
                  href={`/books/${books.slug}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl text-center font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                >
                  مشاهده جزئیات
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gray-800/50 border border-gray-700 rounded-3xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-blue-500 text-center">
            آمار قرض گیری
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-700/50 rounded-2xl p-6 text-center border border-gray-600/30">
              <p className="text-3xl font-bold text-white mb-2">
                {borrowedBooks.length}
              </p>
              <p className="text-blue-300 text-sm">کل کتاب‌های قرض گرفته</p>
            </div>

            <div className="bg-gray-700/50 rounded-2xl p-6 text-center border border-gray-600/30">
              <p className="text-3xl font-bold text-white mb-2">
                {borrowedBooks.filter((b) => b.returned_at).length}
              </p>
              <p className="text-blue-300 text-sm">برگشت داده شده</p>
            </div>

            <div className="bg-gray-700/50 rounded-2xl p-6 text-center border border-gray-600/30">
              <p className="text-3xl font-bold text-white mb-2">
                {borrowedBooks.filter((b) => !b.returned_at).length}
              </p>
              <p className="text-blue-300 text-sm">در اختیار</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
