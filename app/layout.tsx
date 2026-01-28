"use client";
//import type { Metadata } from "next";
import "./globals.css";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navigation from "./ui/Navigation";
import Footer from "./ui/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  useEffect(() => {
    document.title =
      "Nigeria Centre for Disease Control and Prevention - Learning Management System";
  }, []);

  const isDashboardRoute = pathname.startsWith("/dashboard");

  return (
    <html lang="en">
      <body className="bg-background text-foreground transition-colors font-sans antialiased">
        {!isDashboardRoute && <Navigation />}
        {children}
        {!isDashboardRoute && <Footer />}
      </body>
    </html>
  );
}
