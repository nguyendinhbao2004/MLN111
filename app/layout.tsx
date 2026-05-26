import type { Metadata } from "next";
import { Roboto, Playfair_Display } from "next/font/google";
import "./globals.css";
import AIUsage from "./component/ui/ai-usage";

const vietnam = Roboto({
  variable: "--font-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "Hustle = Thành Công",
  description: "MLN111-Team3 project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${vietnam.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <AIUsage />
      </body>
    </html>
  );
}
