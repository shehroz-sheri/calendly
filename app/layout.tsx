import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import ReduxProvider from "../providers/reduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Calendly",
  description: "Appointment Management System",
  verification: {
    google: 'UCFN5BpvqSAcTiDWGL7ZngKAcY2KdHjMd3j7fHElLRI',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3057716282027202"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={`${inter.className} text-dark`}>
        <SessionProvider session={session}>
          <ReduxProvider>
            <Toaster />
            {children}
          </ReduxProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
