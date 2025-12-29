"use client";

import Link from "next/link";

export default function LandingView() {

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">

      <div className="relative z-10 grid grid-rows-[auto_1fr_auto] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-IranSans" dir="rtl">
        {/* Header */}
        <header className="row-start-1 text-center">
          <div className="inline-block">
            <div className="w-16 h-1 bg-blue-500 mx-auto mb-4 rounded-full"></div>
            <p className="text-gray-400 text-sm uppercase tracking-widest">
              کتابخانه دیجیتال شخصی
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-col gap-12 row-start-2 items-center justify-center text-center max-w-4xl mx-auto">
          {/* Hero Title */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-blue-500 leading-tight">
              Moho
              <span className="block text-3xl md:text-5xl lg:text-6xl mt-2 text-blue-400">
                کتابخانه
              </span>
            </h1>

            {/* Subtitle */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 max-w-2xl mx-auto shadow-lg">
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-4">
                پناهگاهی شخصی از دانش و خرد
              </p>
              <div className="space-y-3 text-gray-400">
                <p className="flex items-center justify-center space-x-3 rtl:space-x-reverse">
                  <svg
                    className="w-5 h-5 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>منتخب شده به صورت انحصاری برای استفاده شخصی</span>
                </p>
                <p className="flex items-center justify-center space-x-3 rtl:space-x-reverse">
                  <svg
                    className="w-5 h-5 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>ساخته شده توسط موهو</span>
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="group">
            <Link
              className="relative inline-flex items-center justify-center px-12 py-4 text-lg font-bold text-white bg-blue-600 rounded-2xl shadow-lg hover:bg-blue-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              href="/books"
            >

              {/* Button content */}
              <div className="relative flex items-center space-x-3 rtl:space-x-reverse">
                <svg
                  className="w-6 h-6 group-hover:animate-bounce"
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
                <span>ورود به کتابخانه</span>
                <svg
                  className="w-5 h-5 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                  />
                </svg>
              </div>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 w-full max-w-4xl mt-16">
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:bg-gray-800 transition-all duration-300 group">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-700 transition-colors duration-300">
                <svg
                  className="w-6 h-6 text-white"
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
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                مجموعه دیجیتال
              </h3>
              <p className="text-gray-400 text-sm">
                کتاب‌ها و منابع منتخب برای یادگیری شخصی
              </p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:bg-gray-800 transition-all duration-300 group">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-700 transition-colors duration-300">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                دسترسی امن
              </h3>
              <p className="text-gray-400 text-sm">
                کتابخانه خصوصی با احراز هویت امن
              </p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:bg-gray-800 transition-all duration-300 group">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-700 transition-colors duration-300">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                سریع و مدرن
              </h3>
              <p className="text-gray-400 text-sm">
                ساخته شده با فناوری‌های پیشرفته وب
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="row-start-3 flex gap-8 flex-wrap items-center justify-center">
          <a
            className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300 rtl:flex-row-reverse"
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="w-8 h-8 bg-gray-800/50 rounded-lg flex items-center justify-center group-hover:bg-gray-700/50 transition-colors duration-300">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <span className="font-medium">مستندات</span>
          </a>

          <a
            className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300 rtl:flex-row-reverse"
            href="/contact"
            rel="noopener noreferrer"
          >
            <div className="w-8 h-8 bg-gray-800/50 rounded-lg flex items-center justify-center group-hover:bg-gray-700/50 transition-colors duration-300">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
            </div>
            <span className="font-medium">درباره پروژه</span>
          </a>

        </footer>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
