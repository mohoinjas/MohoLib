"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import toast, { Toaster } from "react-hot-toast";

type User = {
  id: string;
  email: string;
  role: string;
};

export default function AdminUserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("id, email, role");

    if (error) setError(error.message);
    else {
      setUsers(data ?? []);
      setError(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateUserRole = async (userId: string, newRole: string) => {
    setLoading(true);
    const { error } = await supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("id", userId);

    if (error) toast.error("خطا در بروزرسانی نقش: " + error.message);
    else {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
      toast.success("نقش کاربر بروزرسانی شد");
    }
    setLoading(false);
  };

  const deleteUser = async (userId: string) => {
    if (!confirm("آیا مطمئنید می‌خواهید این کاربر را حذف کنید؟")) return;
    setLoading(true);
    const { error } = await supabase.from("profiles").delete().eq("id", userId);

    if (error) toast.error("خطا در حذف کاربر: " + error.message);
    else {
      setUsers((prev) => prev.filter((user) => user.id !== userId));
      toast.success("کاربر حذف شد");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 my-8 bg-gray-900 rounded-lg shadow-xl text-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-400">
        👥 مدیریت کاربران
      </h1>
      <Toaster />
      {error && (
        <div className="bg-red-800 text-red-100 p-3 rounded mb-4 border border-red-600">
          {error}
        </div>
      )}

      {loading && (
        <p className="text-center mb-4 text-green-300 animate-pulse">
          در حال بارگذاری...
        </p>
      )}

      <div className="overflow-x-auto rounded-lg border border-gray-700 shadow-lg">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-800 text-green-300">
            <tr>
              <th className="border border-gray-700 p-3">ایمیل</th>
              <th className="border border-gray-700 p-3">نقش</th>
              <th className="border border-gray-700 p-3">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ id, email, role }) => (
              <tr
                key={id}
                className="odd:bg-gray-800 even:bg-gray-850 hover:bg-gray-700 transition-colors"
              >
                <td className="border border-gray-700 p-3">{email}</td>
                <td className="border border-gray-700 p-3">
                  <select
                    value={role}
                    onChange={(e) => updateUserRole(id, e.target.value)}
                    className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    disabled={loading}
                  >
                    <option value="user">کاربر عادی</option>
                    <option value="admin">ادمین</option>
                  </select>
                </td>
                <td className="border border-gray-700 p-3">
                  <button
                    onClick={() => deleteUser(id)}
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg shadow disabled:opacity-50"
                  >
                    🗑 حذف
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && !loading && (
              <tr>
                <td
                  colSpan={3}
                  className="p-4 text-center text-gray-400 bg-gray-800"
                >
                  هیچ کاربری یافت نشد.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
