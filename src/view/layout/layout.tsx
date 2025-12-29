"use client";
import { ReactNode } from "react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import Navbar from "@/view/layout/Navbar";
import NextTopLoader from "nextjs-toploader";


const supabase = createPagesBrowserClient();

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <SessionContextProvider supabaseClient={supabase}>
          <Navbar />
          <main>
            <NextTopLoader />
            {children}
          </main>
        </SessionContextProvider>
      </body>
    </html>
  );
}
