import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Exo_2 } from "next/font/google";
import "../globals.css";
import Sidebar from "./components/layouts/sidebar";
import AuthGuard from "./components/layouts/auth-guard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"]
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"]
});

const exo2 = Exo_2({
  variable: "--font-exo-2",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: "TDG Cashier System Admin",
  description: "A cashier system that ease all The Daily Grind customers in ordering their favorite dishes as well as coffee and non-coffee based beverages",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${exo2.variable} ${inter.className} antialiased`}
      >
        <div className="flex min-h-screen bg-white">
          <Sidebar />
          <main className="flex-1 ml-80 p-14 bg-[#F7F9FA] min-h-screen">
            <div className="max-w-6xl mx-auto">
              <AuthGuard>{children}</AuthGuard>
            </div>
          </main>
          <ToastContainer position="bottom-right" />
        </div>
      </body>
    </html>
  );
}