import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.scss";
import ReactQueryProvider from "@/utils/providers/ReactQueryProvider";
import ToastProvider from "@/utils/providers/ToastProvider";
import Navbar from "@/components/organisms/Navbar";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Post List",
  description: "Post List - Today",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ReactQueryProvider>
          <ToastProvider>
            <Navbar />
            {children}
          </ToastProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
