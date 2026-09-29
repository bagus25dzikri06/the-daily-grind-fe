import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Exo_2 } from "next/font/google";
import "../globals.css";
import Header from "./components/layouts/header";
import Footer from "./components/layouts/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: "TDG Cashier System",
  description: "A cashier system that ease all The Daily Grind customers in ordering their favorite dishes as well as coffee and non-coffee based beverages",
};

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={`${inter.className} antialiased`} suppressHydrationWarning={true}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
