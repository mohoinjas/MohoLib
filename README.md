# Moho Library - کتابخانه موهو

یک کتابخانه دیجیتال مدرن و کامل با رابط کاربری زیبا و تجربه کاربری عالی. این پروژه با استفاده از Next.js 15 و Supabase ساخته شده است.

![Next.js](https://img.shields.io/badge/Next.js-15.3.1-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-2.53-3ECF8E?style=for-the-badge&logo=supabase)

## ویژگی‌ها

### احراز هویت و امنیت
- سیستم ثبت‌نام و ورود کامل
- مدیریت پروفایل کاربری
- احراز هویت امن با Supabase
- پشتیبانی از آپلود آواتار

### مدیریت کتاب‌ها
- نمایش لیست کامل کتاب‌ها
- صفحه جزئیات هر کتاب
- دانلود فایل PDF
- سیستم قرض گرفتن کتاب
- مدیریت کتاب‌های قرض گرفته شده

### رابط کاربری
- طراحی مدرن و زیبا
- پشتیبانی کامل از RTL (راست به چپ)
- رابط کاربری فارسی
- دارک مود
- واکنش‌گرا (Responsive) برای تمام دستگاه‌ها
- انیمیشن‌های روان و جذاب

### پنل کاربری
- مشاهده و ویرایش پروفایل
- مدیریت کتاب‌های قرض گرفته شده
- آمار قرض‌گیری
- تاریخچه فعالیت‌ها

### پنل مدیریت
- مدیریت کاربران
- مدیریت کتاب‌ها (افزودن، ویرایش، حذف)
- کنترل دسترسی‌ها

## شروع سریع

### پیش‌نیازها

- Node.js 18.x یا بالاتر
- npm یا yarn یا pnpm
- حساب Supabase (برای backend)

### نصب

1. **کلون کردن ریپازیتوری**
```bash
git clone https://github.com/itsmearman/mohoL.git
cd mohoL
```

2. **نصب وابستگی‌ها**
```bash
npm install
# یا
yarn install
# یا
pnpm install
```

3. **تنظیم متغیرهای محیطی**

فایل `.env.local` را در ریشه پروژه ایجاد کنید:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **اجرای پروژه**

```bash
npm run dev
# یا
yarn dev
# یا
pnpm dev
```

5. **باز کردن در مرورگر**

پروژه در آدرس [moholibrary](https://moholibrary.vercel.app/) در دسترس خواهد بود.

## ساختار پروژه

```
mohoL/
├── src/
│   ├── app/                    # صفحات Next.js App Router
│   │   ├── admin/              # پنل مدیریت
│   │   ├── api/                # API Routes
│   │   ├── books/              # صفحات کتاب‌ها
│   │   ├── contact/            # صفحه تماس/درباره ما
│   │   ├── login/              # صفحه ورود
│   │   ├── signup/             # صفحه ثبت‌نام
│   │   ├── profile/            # صفحه پروفایل
│   │   ├── my-book/            # کتاب‌های قرض گرفته شده
│   │   └── layout.tsx          # Layout اصلی
│   ├── components/             # کامپوننت‌های قابل استفاده مجدد
│   │   └── BooksList.tsx      # لیست کتاب‌ها
│   ├── view/                   # View Components
│   │   ├── admin/              # کامپوننت‌های پنل مدیریت
│   │   ├── layout/             # کامپوننت‌های Layout
│   │   │   ├── Navbar.tsx      # نوار ناوبری
│   │   │   └── navbarItem.ts   # آیتم‌های منو
│   │   ├── library/            # کامپوننت‌های کتابخانه
│   │   └── index.tsx           # صفحه لندینگ
│   ├── lib/                    # کتابخانه‌ها و تنظیمات
│   │   ├── supabase.ts         # تنظیمات Supabase Server
│   │   └── supabaseClient.ts  # تنظیمات Supabase Client
│   ├── utils/                  # توابع کمکی
│   ├── i18n/                   # تنظیمات بین‌المللی‌سازی
│   └── middleware.ts           # Middleware Next.js
├── public/                     # فایل‌های استاتیک
│   └── fonts/                  # فونت‌های فارسی
├── messages/                   # فایل‌های ترجمه
│   └── fa/                     # ترجمه فارسی
└── package.json
```

## تکنولوژی‌های استفاده شده

### Frontend
- **Next.js 15.3.1** - فریمورک React با SSR و SSG
- **React 19.0.0** - کتابخانه UI
- **TypeScript 5.0** - تایپ‌ایمنی
- **Tailwind CSS 4.0** - استایل‌دهی
- **React Hot Toast** - نمایش نوتیفیکیشن
- **React Icons** - آیکون‌ها

### Backend & Database
- **Supabase** - Backend as a Service
  - Authentication
  - Database (PostgreSQL)
  - Storage

### Development Tools
- **ESLint** - لینتر کد
- **TypeScript** - تایپ‌چکینگ

## اسکریپت‌های موجود

```bash
# اجرای پروژه در حالت توسعه
npm run dev

# ساخت نسخه Production
npm run build

# اجرای نسخه Production
npm start

# بررسی خطاهای کد
npm run lint
```

## ساختار دیتابیس

### جداول اصلی

#### `profiles`
- `id` (UUID, Primary Key)
- `username` (String, Unique)
- `email` (String)
- `full_name` (String)
- `avatar_url` (String)
- `bio` (Text)
- `role` (String: 'user' | 'admin')
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

#### `books`
- `id` (Serial, Primary Key)
- `title` (String)
- `description` (Text)
- `cover_url` (String)
- `pdf_url` (String)
- `slug` (String, Unique)
- `created_at` (Timestamp)

#### `borrowed_books`
- `id` (Serial, Primary Key)
- `user_id` (UUID, Foreign Key → profiles.id)
- `book_id` (Integer, Foreign Key → books.id)
- `borrowed_at` (Timestamp)
- `returned_at` (Timestamp, Nullable)

## صفحات اصلی

- **/** - صفحه اصلی (لندینگ)
- **/books** - لیست تمام کتاب‌ها
- **/books/[slug]** - صفحه جزئیات کتاب
- **/login** - صفحه ورود
- **/signup** - صفحه ثبت‌نام
- **/profile** - پروفایل کاربری
- **/my-book** - کتاب‌های قرض گرفته شده
- **/contact** - درباره ما
- **/admin** - پنل مدیریت (فقط برای ادمین)

## امنیت

- احراز هویت کامل با Supabase Auth
- Row Level Security (RLS) در دیتابیس
- محافظت از API Routes
- اعتبارسنجی ورودی‌های کاربر

## پشتیبانی از زبان‌ها

- فارسی (RTL) - کامل
- پشتیبانی از i18n برای افزودن زبان‌های بیشتر

## Deploy

### Vercel

```bash
# نصب Vercel CLI
npm i -g vercel

# Deploy
vercel
```
## توسعه‌دهنده

**موهو**

- GitHub: [@itsmearman](https://github.com/itsmearman)

