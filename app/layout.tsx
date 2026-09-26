import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cabin Trip Expense Splitter",
  description: "Track shared expenses and see who owes whom.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
