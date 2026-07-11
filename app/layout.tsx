import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Circle — The only durable business is a community",
  description:
    "Courses, events, payments, all yours. Circle AI builds it — your brand owns it.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full overflow-x-hidden antialiased`}>
      <body className="flex min-h-full flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}
