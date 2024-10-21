import "./globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import AuthProvider from "@/context/authContext";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Bank App",
  description: "A simple banking app",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <AuthProvider>
          <main>{children}</main>
          <div id="root"></div>
          <Toaster visibleToasts={1} position="top-center" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
