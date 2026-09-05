import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const merriweather = Merriweather({ 
  subsets: ["latin"], 
  weight: ["300", "400", "700", "900"],
  variable: "--font-serif" 
});

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
      <body className={`${inter.variable} ${merriweather.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
