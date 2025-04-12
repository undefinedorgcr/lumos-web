import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: "Lumos Protocol",
  description: "Lumos is a decentralized protocol for protecting your crypto assets while generating yield.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-[#1B1C1B] text-[#F0FFF6] ${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
