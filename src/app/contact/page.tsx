// app/about/page.tsx
import React from "react";
import Image from "next/image";
import { FaBookOpen, FaUsers, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { Metadata } from "next";


export const metadata : Metadata = {
  title:"کتابخانه موهو - درباره ما",
};

export default function AboutPage() {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* عنوان صفحه */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl mb-4">
            درباره کتابخانه ما
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-400">
            داستان ما، ماموریت ما و ارزش‌هایی که به آن پایبند هستیم
          </p>
        </div>

        {/* بخش داستان ما */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">داستان ما</h2>
            <p className="text-lg text-gray-300 mb-4">
              کتابخانه ما در سال ۱۴۰۰ با هدف ایجاد یک منبع جامع برای علاقه‌مندان
              به کتاب تأسیس شد. ما باور داریم که کتاب‌ها می‌توانند دنیا را تغییر
              دهند.
            </p>
            <p className="text-lg text-gray-300">
              از ابتدا، هدف ما ایجاد فضایی امن برای کشف، یادگیری و رشد بوده است.
              امروز با بیش از ۱۰,۰۰۰ عنوان کتاب در حوزه‌های مختلف، یکی از
              بزرگترین کتابخانه‌های دیجیتال کشور هستیم.
            </p>
          </div>
          <div className="relative h-96 rounded-xl overflow-hidden">
            <Image
              src="/images/library-story.jpg"
              alt="داستان کتابخانه ما"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* آمار و ارقام */}
        <div className="bg-gray-800 rounded-xl p-8 mb-20">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">
            در یک نگاه
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <FaBookOpen className="text-4xl text-blue-500 mx-auto mb-4" />
              <span className="text-5xl font-bold text-white block">
                10,000+
              </span>
              <span className="text-gray-400">عنوان کتاب</span>
            </div>
            <div className="text-center">
              <FaUsers className="text-4xl text-blue-400 mx-auto mb-4" />
              <span className="text-5xl font-bold text-white block">
                5,000+
              </span>
              <span className="text-gray-400">عضو فعال</span>
            </div>
            <div className="text-center">
              <FaClock className="text-4xl text-blue-400 mx-auto mb-4" />
              <span className="text-5xl font-bold text-white block">24/7</span>
              <span className="text-gray-400">دسترسی همیشگی</span>
            </div>
            <div className="text-center">
              <FaMapMarkerAlt className="text-4xl text-blue-400 mx-auto mb-4" />
              <span className="text-5xl font-bold text-white block">50+</span>
              <span className="text-gray-400">شهر تحت پوشش</span>
            </div>
          </div>
        </div>

        {/* تیم ما */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">
            تیم ما
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">
                    {member.name}
                  </h3>
                  <p className="text-blue-500 mb-2">{member.position}</p>
                  <p className="text-gray-400">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ارزش‌های ما */}
        <div className="bg-gray-800 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">
            ارزش‌های ما
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.id} className="bg-gray-900 p-6 rounded-lg">
                <div className="text-blue-500 text-3xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// داده‌های نمونه
const teamMembers = [
  {
    id: 1,
    name: "موهو",
    position: "بنیانگذار و مدیرعامل",
    bio: "علاقه‌مند به توسعه فرهنگ کتابخوانی با بیش از ۱۵ سال تجربه",
    image: "/images/team1.jpg",
  },
  // ... سایر اعضای تیم
];

const values = [
  {
    id: 1,
    title: "دسترسی آزاد به اطلاعات",
    description: "ما معتقدیم دانش باید برای همه آزاد و در دسترس باشد",
    icon: "📚",
  },
  // ... سایر ارزش‌ها
];
