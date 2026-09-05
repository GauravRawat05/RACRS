import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GSD Application",
  description: "Next.js application scaffolded with GSD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
