"use client";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import NavbarItem from "./navbarItem";
import Image from "next/image";

interface UserProfile {
  id: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  email?: string;
}

export default function UserHeader() {
  const user = useUser();
  const supabase = useSupabaseClient();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const item = NavbarItem();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, username, full_name, avatar_url, email")
        .eq("id", user?.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching profile:", error);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [user, fetchProfile]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (loading) {
    return (
      <header
        className="fixed w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50 shadow-2xl z-50"
        dir="rtl"
      >
        <div className="animate-pulse flex items-center justify-between p-4 max-w-7xl mx-auto">
          <div className="h-6 bg-gray-700 rounded w-32"></div>
          <div className="h-10 bg-gray-700 rounded w-24"></div>
        </div>
      </header>
    );
  }

  if (!user) {
    return (
      <header
        className="fixed w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50 shadow-2xl z-50"
        dir="rtl"
      >
        <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <span className="text-xl font-bold text-blue-500">
              کتابخانه موهو
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {item.map((data, index) => (
              <Link
                href={data.route}
                key={index}
                className="text-gray-300 hover:text-white hover:bg-gray-800/50 px-4 py-2 rounded-lg transition-all duration-300 font-medium"
              >
                {data.title}
              </Link>
            ))}
          </nav>
          <div className="flex invisible md:visible items-center space-x-3 rtl:space-x-reverse">
            <Link
              href="/login"
              className="px-6 py-2 text-blue-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-300 font-medium"
            >
              ورود
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all duration-300 font-medium"
            >
              ثبت نام
            </Link>
          </div>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800/95 backdrop-blur-md border-t border-gray-700/50">
            <nav className="flex flex-col space-y-2 p-4">
              {item.map((data, index) => (
                <Link
                  href={data.route}
                  key={index}
                  className="text-gray-300 hover:text-white hover:bg-gray-700/50 px-4 py-3 rounded-lg transition-all duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {data.title}
                </Link>
              ))}
              <div className="border-t border-gray-700 my-2"></div>
              <Link
                href="/login"
                className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 px-4 py-3 rounded-lg transition-all duration-300 font-medium text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                ورود
              </Link>
              <Link
                href="/signup"
                className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                ثبت نام
              </Link>
            </nav>
          </div>
        )}
      </header>
    );
  }

  return (
    <header
      className="fixed w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50 shadow-2xl z-50"
      dir="rtl"
    >
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse group"
        >
          <span className="text-xl font-bold text-blue-500">
            کتابخانه موهو
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
          {item.map((data, index) => (
            <Link
              href={data.route}
              key={index}
              className="text-gray-300 hover:text-white hover:bg-gray-800/50 px-4 py-2 rounded-lg transition-all duration-300 font-medium"
            >
              {data.title}
            </Link>
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="flex invisible items-center md:visible space-x-4 rtl:space-x-reverse">
          {/* User Profile Link */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center bg-gray-800/50 hover:bg-gray-800/80 px-4 py-2 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300"
            >
              {profile?.avatar_url ? (
                <Image
                  src={profile.avatar_url}
                  alt="آواتار"
                  className="w-8 h-8 rounded-full object-cover border-2 border-gray-600 group-hover:border-blue-400 transition-colors duration-300"
                  height={300}
                  width={300}
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center border-2 border-gray-600 group-hover:border-blue-500 transition-colors duration-300">
                  <span className="text-sm font-bold text-white">
                    {profile?.username?.charAt(0)?.toUpperCase() ||
                      profile?.full_name?.charAt(0)?.toUpperCase() ||
                      user.email?.charAt(0)?.toUpperCase() ||
                      "ک"}
                  </span>
                </div>
              )}
              <div className="ml-3 text-right">
                <span className="text-sm font-medium text-white">
                  {profile?.full_name || profile?.username || "کاربر"}
                </span>
                <span className="block text-xs text-gray-400">
                  مشاهده پروفایل
                </span>
              </div>
            </button>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-all"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  پروفایل
                </Link>
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setIsLogoutModalOpen(true);
                  }}
                  className="block w-full text-right px-4 py-2 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all cursor-pointer"
                >
                  خروج
                </button>
              </div>
            )}
          </div>

          {/* Logout Confirmation Modal */}
          {isLogoutModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
              <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-700 max-w-sm w-full">
                <h2 className="text-lg font-semibold text-white mb-4">
                  آیا مطمئنید که می‌خواهید خارج شوید؟
                </h2>
                <div className="flex justify-end space-x-3 rtl:space-x-reverse">
                  <button
                    onClick={() => setIsLogoutModalOpen(false)}
                    className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-all"
                  >
                    لغو
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-all"
                  >
                    خروج
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-700/50 shadow-2xl">
          <nav className="flex flex-col space-y-2 p-4">
            {/* Navigation Items */}
            {item.map((data, index) => (
              <Link
                href={data.route}
                key={index}
                className="text-gray-300 hover:text-white hover:bg-gray-800/50 px-4 py-3 rounded-lg transition-all duration-300 font-medium flex items-center space-x-3 rtl:space-x-reverse"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg
                  className="w-5 h-5 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <span>{data.title}</span>
              </Link>
            ))}

            <div className="border-t border-gray-700 my-3"></div>

            {/* User Profile in Mobile */}
            {user && (
              <Link
                href="/profile"
                className="text-gray-300 hover:text-white hover:bg-gray-800/50 px-4 py-3 rounded-lg transition-all duration-300 font-medium flex items-center space-x-3 rtl:space-x-reverse"
                onClick={() => setIsMenuOpen(false)}
              >
                {profile?.avatar_url ? (
                  <Image
                    src={profile?.avatar_url}
                    alt="آواتار"
                    className="w-6 h-6 rounded-full object-cover border border-gray-600"
                    height={300}
                    width={300}
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">
                      {profile?.username?.charAt(0)?.toUpperCase() ||
                        profile?.full_name?.charAt(0)?.toUpperCase() ||
                        user.email?.charAt(0)?.toUpperCase() ||
                        "ک"}
                    </span>
                  </div>
                )}
                <span>پروفایل کاربری</span>
              </Link>
            )}

            {/* Sign Out in Mobile */}
            {user && (
              <button
                onClick={() => {
                  handleSignOut();
                  setIsMenuOpen(false);
                }}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/20 px-4 py-3 rounded-lg transition-all duration-300 font-medium flex items-center space-x-3 rtl:space-x-reverse w-full text-right"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span>خروج از حساب</span>
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
