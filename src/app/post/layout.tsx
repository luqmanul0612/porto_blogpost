import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post Detail",
  description: "Post Detail",
};

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
