"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

type Book = {
  id: number;
  title: string;
  description: string | null;
  cover_url: string;
  pdf_url: string;
  slug: string;
};

export default function BooksList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .order("id", { ascending: false });
    if (error) {
      setError(error.message);
    } else {
      setBooks(data ?? []);
    }
    setLoading(false);
  };
  console.log("error", error);
  useEffect(() => {
    fetchBooks();
  }, []);

  const borrowBook = async (bookId: number) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("ابتدا وارد حساب کاربری شوید.");
      toast.error("ابتدا وارد حساب کاربری شوید.");
      return;
    }

    // چک کردن اینکه آیا کاربر این کتاب را قبلاً گرفته و هنوز پس نداده
    const { data: existingBorrow, error: checkError } = await supabase
      .from("borrowed_books")
      .select("*")
      .eq("user_id", user.id)
      .eq("book_id", bookId)
      .is("returned_at", null) // یعنی هنوز کتاب برگردانده نشده
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      // خطای غیر از نبودن رکورد
      toast.error("خطا در بررسی سوابق: " + checkError.message);
      return;
    }

    if (existingBorrow) {
      toast.error("شما این کتاب را قبلاً گرفته‌اید و هنوز برنگردانده‌اید.");
      return;
    }

    // اگر کتاب قبلاً قرض گرفته نشده بود، ثبت جدید انجام بده
    const { error } = await supabase.from("borrowed_books").insert({
      user_id: user.id,
      book_id: bookId,
      borrowed_at: new Date().toISOString(),
    });

    if (error) {
      toast.error("خطا در ثبت قرض گرفتن: " + error.message);
    } else {
      toast.success("کتاب با موفقیت قرض گرفته شد");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-300 text-lg font-medium">
            در حال بارگذاری کتاب‌ها...
          </p>
        </div>
      </div>
    );

  if (books.length === 0)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 shadow-lg text-center">
          <svg
            className="w-16 h-16 text-gray-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <p className="text-gray-300 text-lg font-medium">کتابی وجود ندارد.</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900">
      <Toaster
        position="top-center"
        toastOptions={{
          className: "bg-gray-800 text-white border border-gray-700",
          duration: 3000,
        }}
      />

      {/* Simple background elements */}
      <div className="fixed top-1/4 left-10 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-1/4 right-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-500">
              کتابخانه دیجیتال
            </h1>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-400 text-lg">
              مجموعه‌ای از بهترین کتاب‌های دیجیتال
            </p>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {books.map((book) => (
              <div
                key={book.id}
                className="group bg-gray-800/50 border border-gray-700 rounded-2xl shadow-lg overflow-hidden hover:bg-gray-800 hover:border-gray-600 hover:scale-105 transition-all duration-300"
              >
                <Link href={`/books/${book.slug}`} className="block">
                  {/* Book Cover */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={book.cover_url}
                      alt={book.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      width={300}
                      height={300}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Book Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-500 transition-colors duration-300 line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-gray-400 mb-6 line-clamp-3 leading-relaxed">
                      {book.description || "توضیحی در دسترس نیست"}
                    </p>
                  </div>
                </Link>

                {/* Action Buttons */}
                <div className="p-6 pt-0 space-y-3">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      borrowBook(book.id);
                    }}
                    className="w-full cursor-pointer bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    <span>قرض گرفتن کتاب</span>
                  </button>

                  <a
                    href={book.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse"
                  >
                    <svg
                      className="w-5 h-5"
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
                    <span>مشاهده / دانلود</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
