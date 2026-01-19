import type { Metadata } from "next";
import { Figtree, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/shared/lib/theme/ThemeProvider";
import { cn } from "@/shared/lib/utils";
import { Toaster } from "@/shared/ui/shadcn/Sonner";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zieglers - Turn Your Goals Into Action",
  description: "Transform your goals into 81 actionable steps with the Mandalart method.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(figtree.variable, "scroll-smooth")} suppressHydrationWarning>
      <body className={cn(`${geistSans.variable} ${geistMono.variable} antialiased`)}>
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
