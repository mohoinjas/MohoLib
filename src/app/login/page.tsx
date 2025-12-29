"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("لطفاً همه فیلدها را پر کنید");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("ورود موفق");
        router.push("/");
      }
    } catch (error) {
      toast.error("خطا در ورود");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
    
      <div className="w-full max-w-md relative z-10">
        {/* Dark glass morphism card */}
        <div className="bg-gray-800/50 rounded-3xl shadow-lg p-8 border border-gray-700">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2 text-shadow">
              ورود
            </h2>
            <p className="text-gray-400">به حساب کاربری خود وارد شوید</p>
          </div>

          <Toaster
            position="top-center"
            containerStyle={{
              top: 100,
              zIndex: 1000,
            }}
            toastOptions={{
              style: {
                background: "rgba(30,41,59,0.95)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(148,163,184,0.2)",
                borderRadius: "12px",
                color: "#f1f5f9",
                zIndex: 1000,
              },
            }}
          />

          <div className="space-y-6">
            <div className="relative group">
              <input
                className="w-full p-4 bg-gray-700/50 border border-gray-600 rounded-2xl placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="ایمیل"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
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
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
            </div>

            <button
              className={`w-full p-4 rounded-2xl font-bold text-lg transition-all duration-300 transform ${
                isLoading
                  ? "bg-gray-600 cursor-not-allowed text-gray-400"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              }`}
              onClick={handleLogin}
              disabled={isLoading}
            >
              <div className="flex items-center justify-center space-x-2">
                {isLoading && (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                )}
                <span>{isLoading ? "در حال ورود..." : "ورود"}</span>
              </div>
            </button>
          </div>

          <div className="mt-8 text-center space-y-4">
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-600"></div>
              <span className="px-4 text-gray-400 text-sm">یا</span>
              <div className="flex-1 border-t border-gray-600"></div>
            </div>

            <p className="text-gray-500 text-sm">
              حساب کاربری ندارید؟
              <span
                className="text-blue-500 font-semibold hover:text-blue-400 transition-colors cursor-pointer mr-2"
                onClick={() => router.push("/signup")}
              >
                ثبت‌نام کنید
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
