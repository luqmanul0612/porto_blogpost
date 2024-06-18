import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users Management",
  description: "Users Management",
};

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
