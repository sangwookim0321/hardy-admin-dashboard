import type { Metadata } from "next";
import localFont from "next/font/local";
import "./assets/styles/globals.css";
import { Toaster } from 'react-hot-toast';

const pretendard = localFont({
  src: './assets/fonts/Pretendard-Regular.woff',
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-sans antialiased`}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
