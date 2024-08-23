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
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
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
