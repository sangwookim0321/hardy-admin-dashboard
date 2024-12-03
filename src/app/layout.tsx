import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

const pretendard = localFont({
  src: './fonts/Pretendard-Regular.woff',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: "Hardy Admin Dashboard",
  description: "Personal admin dashboard for managing projects",
  icons: {
    icon: '/hardy-admin-logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pretendard.variable} font-sans antialiased`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
