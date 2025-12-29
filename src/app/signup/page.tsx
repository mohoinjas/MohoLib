"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  // انیمیشن progress bar
  useEffect(() => {
    if (isSuccess) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 3.33; // 100% در 3 ثانیه (30 بار * 3.33)
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isSuccess]);

  const handleSignUp = async () => {
    // Basic validation
    if (!email || !password || !username) {
      toast.error("لطفاً همه فیلدها را پر کنید");
      return;
    }

    // Username validation (optional)
    if (username.length < 3 || username.length > 20) {
      toast.error("نام کاربری باید بین 3 تا 20 کاراکتر باشد");
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      toast.error("نام کاربری فقط می‌تواند شامل حروف انگلیسی، اعداد و _ باشد");
      return;
    }

    setIsLoading(true);

    try {
      // Check if username already exists
      const { data: existingUser } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", username)
        .single();

      if (existingUser) {
        toast.error("این نام کاربری قبلاً استفاده شده است");
        setIsLoading(false);
        return;
      }

      // Sign up user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        setIsLoading(false);
        return;
      }

      if (data?.user) {
        // Insert profile with username
        const { error: insertError } = await supabase.from("profiles").insert({
          id: data.user.id,
          email,
          username,
          role: "user",
        });

        if (insertError) {
          toast.error("خطا در ایجاد پروفایل: " + insertError.message);
          setIsLoading(false);
          return;
        }

        // نمایش پیام موفقیت
        setIsSuccess(true);
        setProgress(0);
        toast.success("ثبت‌نام با موفقیت انجام شد! ایمیل تایید برایتان ارسال می‌شود");
        
        // بعد از 3 ثانیه به صفحه خانه هدایت شود
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    } catch (error) {
      toast.error("خطا در ثبت‌نام: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      <Toaster
        toastOptions={{
          style: {
            background: "rgba(30,41,59,0.95)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(148,163,184,0.2)",
            borderRadius: "12px",
            color: "#f1f5f9",
          },
        }}
      />

      <div className="w-full max-w-md relative z-10">
        {/* Dark glass morphism card */}
        <div className="bg-gray-800/50 rounded-3xl shadow-lg p-8 border border-gray-700">
          {isSuccess ? (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-6 shadow-lg">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-green-500 mb-4">
                ثبت‌نام موفقیت‌آمیز بود!
              </h2>
              <p className="text-gray-300 text-lg mb-2">
                ایمیل تایید برایتان ارسال می‌شود
              </p>
              <p className="text-gray-400 text-sm">
                در حال انتقال به صفحه اصلی...
              </p>
              <div className="mt-8">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2 text-shadow">
                  ثبت‌نام
                </h2>
                <p className="text-gray-400">به کتابخانه ما بپیوندید</p>
              </div>

              <div className="space-y-6">
            <div className="relative group">
              <input
                className="w-full p-4 bg-gray-700/50 border border-gray-600 rounded-2xl placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="نام کاربری"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
                disabled={isLoading}
              />
            </div>

            <div className="relative group">
              <input
                className="w-full p-4 bg-gray-700/50 border border-gray-600 rounded-2xl placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="ایمیل"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="relative group">
              <input
                className="w-full p-4 bg-gray-700/50 border border-gray-600 rounded-2xl placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="رمز عبور"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <button
              className={`w-full p-4 rounded-2xl font-bold text-lg transition-all duration-300 transform ${
                isLoading
                  ? "bg-gray-600 cursor-not-allowed text-gray-400"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              }`}
              onClick={handleSignUp}
              disabled={isLoading}
            >
              <div className="flex items-center justify-center space-x-2">
                {isLoading && (
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin ml-2"></div>
                )}
                <span>{isLoading ? "در حال ثبت‌نام..." : "ثبت‌نام"}</span>
              </div>
            </button>
          </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
