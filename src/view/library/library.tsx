import Link from "next/link";
import React from "react";

export default function LibraryView() {
  const currentYear = 2003;
  return (
    <div
      className="font-IranSans text-gray-100 m-0 p-0 pt-18 bg-gray-900"
      dir="rtl"
    >
      <section className="bg-gray-900 text-white p-16 text-center relative overflow-hidden">
        <div className="max-w-3xl h-[60vh] mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            کشف کتاب بعدی مورد علاقه‌تان
          </h2>
          <p className="text-lg mb-8 text-gray-300">
            مجموعه گسترده‌ای از کتاب‌ها در تمام ژانرها را کاوش کنید و کتاب مناسب
            خود را بیابید.
          </p>
          <Link
            href="/books"
            className="bg-blue-600 text-white font-bold py-4 px-8 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-block"
          >
            مرور مجموعه
          </Link>
        </div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-600 rounded-full opacity-10"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-blue-600 rounded-full opacity-10"></div>
      </section>
      <footer className="bg-gray-900 text-white p-8 text-center relative overflow-hidden border-t border-gray-800">
        <div className="relative z-10">
          <p className="text-gray-400">
            &copy; {currentYear} کتابخانه موهو. تمامی حقوق محفوظ است.
          </p>
        </div>
      </footer>
    </div>
  );
}
