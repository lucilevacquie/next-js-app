import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ProductsProvider } from "./context/productContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Victorian Plumbing | Online Bathroom Specialist | Clearance Event.",
  description:
    "Save big in our January Sale! Up to 70% Off showers, baths, suites, furniture & more! 4.5/5 Trustpilot | Free Delivery Over £499* | 0% Finance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <Header/> */}
        <main className="py-8">
          <ProductsProvider>{children}</ProductsProvider>
        </main>
        {/* <Footer/> */}
      </body>
    </html>
  );
}
