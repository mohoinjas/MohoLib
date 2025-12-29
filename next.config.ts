import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {}, // ✅ اصلاح‌شده
  },
  images: {
    domains: ['ipdmipasyahuasoihsuw.supabase.co'],
  },
};

export default withNextIntl(nextConfig);
