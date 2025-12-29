"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

interface Profile {
  id: string;
  username: string;
  full_name: string;
  email: string;
  avatar_url: string;
  bio: string;
  role: string;
  created_at?: string;
  updated_at?: string;
}

interface Message {
  text: string;
  type: "success" | "error";
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile>({
    id: "",
    username: "",
    full_name: "",
    email: "",
    avatar_url: "",
    bio: "",
    role: "",
  });
  const [originalProfile, setOriginalProfile] = useState<Profile>(
    {} as Profile
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<Message>({
    text: "",
    type: "success",
  });

  // Get current user and profile data
  useEffect(() => {
    const getProfile = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push("/login");
          return;
        }

        setUser(user);

        const { data: profileData, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          setMessage({ text: "خطا در بارگیری پروفایل", type: "error" });
        } else if (profileData) {
          setProfile(profileData as Profile);
          setOriginalProfile(profileData as Profile);
        }
      } catch (error) {
        console.error("Error:", error);
        setMessage({ text: "خطا در بارگیری اطلاعات", type: "error" });
      } finally {
        setIsLoading(false);
      }
    };

    getProfile();
  }, [router]);

  const handleAvatarUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setMessage({
        text: "حجم فایل باید کمتر از 2 مگابایت باشد",
        type: "error",
      });
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setMessage({ text: "لطفاً یک فایل تصویری انتخاب کنید", type: "error" });
      return;
    }

    setIsUploading(true);
    setMessage({ text: "", type: "success" });

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `avatar_${user.id}_${Date.now()}.${fileExt}`;

      // Delete old avatar if exists
      if (profile.avatar_url) {
        const oldFileName = profile.avatar_url.split("/").pop();
        if (oldFileName) {
          await supabase.storage.from("avatars").remove([oldFileName]);
        }
      }

      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });
      console.log(data);

      if (error) {
        console.error("Storage error:", error);
        throw error;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(fileName);

      setProfile((prev) => ({
        ...prev,
        avatar_url: publicUrl,
      }));

      setMessage({ text: "تصویر با موفقیت آپلود شد", type: "success" });
    } catch (error) {
      console.error("Error uploading avatar:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setMessage({
        text: "خطا در آپلود تصویر: " + errorMessage,
        type: "error",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateUsername = async (username: string): Promise<boolean> => {
    if (username === originalProfile.username) return true;

    if (username.length < 3 || username.length > 20) {
      setMessage({
        text: "نام کاربری باید بین 3 تا 20 کاراکتر باشد",
        type: "error",
      });
      return false;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setMessage({
        text: "نام کاربری فقط می‌تواند شامل حروف انگلیسی، اعداد و _ باشد",
        type: "error",
      });
      return false;
    }

    const { data: existingUser } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", username)
      .single();

    if (existingUser) {
      setMessage({
        text: "این نام کاربری قبلاً استفاده شده است",
        type: "error",
      });
      return false;
    }

    return true;
  };

  const handleUpdateProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    setIsUpdating(true);
    setMessage({ text: "", type: "success" });

    try {
      // Validate username if it changed
      if (profile.username !== originalProfile.username) {
        const isValidUsername = await validateUsername(profile.username);
        if (!isValidUsername) {
          setIsUpdating(false);
          return;
        }
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          username: profile.username,
          full_name: profile.full_name,
          bio: profile.bio,
          avatar_url: profile.avatar_url,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) {
        setMessage({
          text: "خطا در به‌روزرسانی پروفایل: " + error.message,
          type: "error",
        });
      } else {
        setMessage({
          text: "پروفایل با موفقیت به‌روزرسانی شد",
          type: "success",
        });
        toast.success("پروفایل با موفقیت به‌روزرسانی شد");
        router.push("/");
        setOriginalProfile({ ...profile });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setMessage({
        text: "خطا در به‌روزرسانی: " + errorMessage,
        type: "error",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    } else {
      router.push("/");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 pt-24 relative overflow-hidden">
        {/* Simple background elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-600 rounded-full opacity-5"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-blue-600 rounded-full opacity-5"></div>

        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-600 border-t-blue-500 mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg">در حال بارگیری...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
     
      <div className="max-w-2xl mx-auto p-6 pt-24 relative z-10">
        <div className="bg-gray-800/50 shadow-lg rounded-3xl p-8 border border-gray-700">
          <div className="flex justify-between items-center mb-8">
            <Toaster
              toastOptions={{
                style: {
                  background: "rgba(31,41,55,0.95)",
                  border: "1px solid rgba(75,85,99,0.2)",
                  borderRadius: "12px",
                  color: "#f1f5f9",
                },
              }}
            />
            <h1 className="text-3xl font-bold text-blue-500">
              پروفایل کاربری
            </h1>
            <button
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              خروج
            </button>
          </div>

          {message.text && (
            <div
              className={`mb-6 p-4 rounded-2xl ${
                message.type === "success"
                  ? "bg-green-900/50 text-green-200 border border-green-600/30 shadow-lg"
                  : "bg-red-900/50 text-red-200 border border-red-600/30 shadow-lg"
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="space-y-6">
            {/* Avatar Section */}
            <div className="text-center mb-8">
              <div className="relative w-32 h-32 mx-auto mb-6">
                {profile.avatar_url ? (
                  <Image
                    src={profile.avatar_url}
                    alt="Avatar"
                    className="w-full h-full rounded-full object-cover border-4 border-blue-500/50 shadow-xl"
                    height={300}
                    width={300}
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-blue-600 flex items-center justify-center border-4 border-gray-600/50 shadow-xl">
                    <span className="text-white text-4xl font-bold">
                      {profile.username
                        ? profile.username[0].toUpperCase()
                        : "؟"}
                    </span>
                  </div>
                )}
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center border-2 border-gray-800">
                  <div className="w-4 h-4 bg-white rounded-full opacity-80"></div>
                </div>
              </div>
            </div>

            {/* Avatar Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-300 mb-2">
                عکس پروفایل
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                disabled={isUploading}
                className="w-full px-4 py-3 border border-gray-600/50 rounded-2xl bg-gray-700/50 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
              {isUploading && (
                <div className="flex items-center mt-2">
                  <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin ml-2"></div>
                  <p className="text-sm text-blue-400">در حال آپلود...</p>
                </div>
              )}
            </div>

            {/* Username */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-300 mb-2">
                نام کاربری *
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  value={profile.username || ""}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 pl-12 border border-gray-600/50 rounded-2xl bg-gray-700/50 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="نام کاربری"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-blue-500 rounded-full opacity-70"></div>
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-300 mb-2">
                نام کامل
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="full_name"
                  value={profile.full_name || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pl-12 border border-gray-600/50 rounded-2xl bg-gray-700/50 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="نام کامل"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-blue-500 rounded-full opacity-70"></div>
              </div>
            </div>

            {/* Email (read-only) */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                ایمیل
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={profile.email || ""}
                  disabled
                  className="w-full px-4 py-3 pl-12 border border-gray-600/30 rounded-2xl bg-gray-600/30 text-gray-400 cursor-not-allowed"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-gray-500 rounded-full opacity-50"></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                ایمیل قابل تغییر نیست
              </p>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-300 mb-2">
                بیوگرافی
              </label>
              <div className="relative">
                <textarea
                  name="bio"
                  value={profile.bio || ""}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-600/50 rounded-2xl bg-gray-700/50 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="درباره خود بنویسید..."
                />
              </div>
            </div>

            {/* Role (read-only) */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                نقش کاربری
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={profile.role || ""}
                  disabled
                  className="w-full px-4 py-3 pl-12 border border-gray-600/30 rounded-2xl bg-gray-600/30 text-gray-400 cursor-not-allowed"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-gray-500 rounded-full opacity-50"></div>
              </div>
            </div>

            {/* Update Button */}
            <div className="pt-6">
              <button
                type="button"
                onClick={() => handleUpdateProfile}
                disabled={isUpdating}
                className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform ${
                  isUpdating
                    ? "bg-gray-600 cursor-not-allowed text-gray-400"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  {isUpdating && (
                    <div className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin ml-2"></div>
                  )}
                  <span>
                    {isUpdating
                      ? "در حال به‌روزرسانی..."
                      : "به‌روزرسانی پروفایل"}
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Profile Info */}
          <div className="mt-10 pt-8 border-t border-gray-700">
            <h3 className="text-xl font-semibold mb-6 text-blue-500">
              اطلاعات حساب
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-700/30 p-4 rounded-2xl border border-gray-600/30">
                <span className="text-gray-400 text-sm block mb-1">
                  تاریخ عضویت:
                </span>
                <span className="text-gray-200 font-medium">
                  {user?.created_at
                    ? new Date(user.created_at).toLocaleDateString("fa-IR")
                    : "نامشخص"}
                </span>
              </div>
              <div className="bg-gray-700/30 p-4 rounded-2xl border border-gray-600/30">
                <span className="text-gray-400 text-sm block mb-1">
                  آخرین به‌روزرسانی:
                </span>
                <span className="text-gray-200 font-medium">
                  {profile.updated_at
                    ? new Date(profile.updated_at).toLocaleDateString("fa-IR")
                    : "هیچگاه"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
