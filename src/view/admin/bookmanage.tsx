"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

type BorrowedBook = {
  id: number;
  title: string;
  cover_url: string;
  description: string;
  slug: string;
  pdf_url: string;
};

export default function AdminBooksPanel() {
  const [books, setBooks] = useState<BorrowedBook[]>([]);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const fetchBooks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .order("id", { ascending: false });

    if (error) toast.error("خطا در دریافت کتاب‌ها: " + error.message);
    else setBooks(data || []);
    setLoading(false);
  };

  const uploadFile = async (file: File, folder: string) => {
    const filePath = `${folder}/${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from("books")
      .upload(filePath, file);
    if (error) {
      toast.error("خطا در آپلود فایل: " + error.message);
      return null;
    }
    const { data: urlData } = supabase.storage
      .from("books")
      .getPublicUrl(data.path);
    return urlData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !coverFile || !pdfFile) {
      toast.error("لطفا همه فیلدها را پر کنید");
      return;
    }
    setSubmitLoading(true);

    try {
      const coverUrl = await uploadFile(coverFile, "covers");
      const pdfUrl = await uploadFile(pdfFile, "pdfs");
      if (!coverUrl || !pdfUrl) return setSubmitLoading(false);

      const slug = title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
      const { error } = await supabase
        .from("books")
        .insert([
          { title, description, cover_url: coverUrl, pdf_url: pdfUrl, slug },
        ]);
      if (error) toast.error("خطا در ثبت کتاب: " + error.message);
      else {
        toast.success("کتاب با موفقیت اضافه شد");
        setTitle("");
        setDescription("");
        setCoverFile(null);
        setPdfFile(null);
        fetchBooks();
      }
    } catch {
      toast.error("خطا در ثبت کتاب");
    }
    setSubmitLoading(false);
  };

  const deleteBook = async (id: number, coverUrl: string, pdfUrl: string) => {
    if (!confirm("آیا مطمئن هستید؟")) return;
    setLoading(true);

    const getFilePathFromUrl = (url: string) => {
      const parts = url.split("/storage/v1/object/public/");
      return parts.length < 2 ? null : parts[1];
    };

    try {
      const coverPath = getFilePathFromUrl(coverUrl);
      if (coverPath) await supabase.storage.from("books").remove([coverPath]);

      const pdfPath = getFilePathFromUrl(pdfUrl);
      if (pdfPath) await supabase.storage.from("books").remove([pdfPath]);

      const { error } = await supabase.from("books").delete().eq("id", id);
      if (error) toast.error("خطا در حذف کتاب: " + error.message);
      else {
        toast.success("کتاب حذف شد");
        fetchBooks();
      }
    } catch {
      toast.error("خطای غیرمنتظره در حذف کتاب");
    } finally {
      setLoading(false);
    }
  };

  const editBook = async (
    id: number,
    currentTitle: string,
    currentDesc: string
  ) => {
    const newTitle = prompt("عنوان جدید کتاب:", currentTitle);
    if (!newTitle) return;
    const newDesc = prompt("توضیحات جدید کتاب:", currentDesc || "");
    const { error } = await supabase
      .from("books")
      .update({ title: newTitle, description: newDesc })
      .eq("id", id);
    if (error) toast.error("خطا در ویرایش کتاب: " + error.message);
    else {
      toast.success("کتاب ویرایش شد");
      fetchBooks();
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-900 rounded-lg shadow-xl text-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-400">
        📚 پنل مدیریت کتاب‌ها
      </h2>
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="mb-10 bg-gray-800 p-6 rounded-lg border border-gray-700"
      >
        <h3 className="text-xl font-semibold mb-4 text-green-300">
          افزودن کتاب جدید
        </h3>
        <input
          type="text"
          placeholder="عنوان کتاب"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-700 border border-gray-600 rounded px-4 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
          required
        />
        <textarea
          placeholder="توضیح کتاب"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-gray-700 border border-gray-600 rounded px-4 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-500 text-white resize-none h-24"
        />
        <label className="block mb-2 font-medium text-green-300">
          کاور کتاب (عکس)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
          required
          className="mb-4 text-gray-300"
        />
        <label className="block mb-2 font-medium text-green-300">
          فایل PDF کتاب
        </label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdfFile(e.target.files?.[0] ?? null)}
          required
          className="mb-4 text-gray-300"
        />
        <button
          type="submit"
          disabled={submitLoading}
          className="bg-green-600 hover:bg-green-700 transition-colors text-white font-semibold py-2 px-6 rounded-lg disabled:opacity-50"
        >
          {submitLoading ? "در حال ارسال..." : "📥 ثبت کتاب"}
        </button>
      </form>
      <h3 className="text-2xl font-semibold mb-4 text-green-400">
        لیست کتاب‌ها
      </h3>
      {loading && (
        <p className="text-center text-gray-400">در حال بارگذاری...</p>
      )}
      <div className="overflow-x-auto rounded-lg border border-gray-700 shadow-lg">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-700 text-green-300">
            <tr>
              <th className="border border-gray-600 p-3 text-center">کاور</th>
              <th className="border border-gray-600 p-3 text-center">عنوان</th>
              <th className="border border-gray-600 p-3 text-center">
                توضیحات
              </th>
              <th className="border border-gray-600 p-3 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {books.length === 0 && !loading && (
              <tr>
                <td
                  colSpan={4}
                  className="p-4 text-center text-gray-500 bg-gray-800"
                >
                  کتابی یافت نشد
                </td>
              </tr>
            )}
            {books.map((book) => (
              <tr
                key={book.id}
                className="odd:bg-gray-800 even:bg-gray-850 hover:bg-gray-700 transition-colors"
              >
                <td className="border border-gray-700 p-3 text-center">
                  <Image
                    src={book.cover_url}
                    alt={book.title}
                    className="inline-block h-20 w-14 object-cover rounded"
                    height={300}
                    width={300}
                  />
                </td>
                <td className="border border-gray-700 p-3 text-center font-semibold text-white">
                  {book.title}
                </td>
                <td className="border border-gray-700 p-3 text-center text-gray-300 max-w-xs truncate">
                  {book.description}
                </td>
                <td className="border border-gray-700 p-3 text-center space-x-2">
                  <button
                    onClick={() =>
                      editBook(book.id, book.title, book.description)
                    }
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-1 rounded-lg shadow"
                  >
                    ✏️ ویرایش
                  </button>
                  <button
                    onClick={() =>
                      deleteBook(book.id, book.cover_url, book.pdf_url)
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg shadow"
                  >
                    🗑 حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
