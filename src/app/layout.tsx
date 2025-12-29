import Layout from "@/view/layout/layout";
import { Metadata } from "next";
import { ReactNode } from "react";
import './globals.css';

export const metadata : Metadata = {
  title:"کتابخانه موهو",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <Layout>{children}</Layout>;
}
