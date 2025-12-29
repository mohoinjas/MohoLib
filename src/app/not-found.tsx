"use client";
import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden pt-24">
      {/* Simple background elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-blue-600 rounded-full opacity-5"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-blue-600 rounded-full opacity-5"></div>

      <div className="text-center relative z-10 max-w-2xl mx-auto">
        {/* Main 404 Card */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-3xl p-12 shadow-lg">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-9xl md:text-[12rem] font-black text-blue-500 leading-none tracking-tighter">
              ۴۰۴
            </h1>
          </div>

          {/* Error Icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-600 rounded-full mb-8 shadow-lg">
            <div className="w-12 h-12 bg-white rounded-full opacity-90 flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
            </div>
          </div>

          {/* Message */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            صفحه‌ای که دنبالش می‌گردید پیدا نشد!
          </h2>

          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            متأسفانه صفحه مورد نظر شما وجود ندارد یا ممکن است منتقل شده باشد.
            <br />
            لطفاً آدرس را بررسی کنید یا به صفحه اصلی بازگردید.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              بازگشت به صفحه اصلی
            </Link>

            <button
              onClick={() => window.history.back()}
              className="bg-gray-700 border border-gray-600 hover:bg-gray-600 text-gray-200 font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              برگشت به صفحه قبل
            </button>
          </div>

          {/* Search Suggestion */}
          <div className="mt-10 pt-8 border-t border-gray-700">
            <p className="text-gray-500 text-sm mb-4">
              یا می‌توانید جستجو کنید:
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link
                href="/books"
                className="bg-blue-600/20 border border-blue-500/30 text-blue-300 hover:bg-blue-600/30 px-4 py-2 rounded-full text-sm transition-all duration-300 hover:scale-105"
              >
                کتاب‌ها
              </Link>
              <Link
                href="/profile"
                className="bg-blue-600/20 border border-blue-500/30 text-blue-300 hover:bg-blue-600/30 px-4 py-2 rounded-full text-sm transition-all duration-300 hover:scale-105"
              >
                پروفایل
              </Link>
              <Link
                href="/my-book"
                className="bg-blue-600/20 border border-blue-500/30 text-blue-300 hover:bg-blue-600/30 px-4 py-2 rounded-full text-sm transition-all duration-300 hover:scale-105"
              >
                کتاب‌های قرضی
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
