import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Metis — Better context. Finished work. | 让编程模型可靠完成任务";
const description = "An agent layer that helps coding models search, remember, execute, and verify more reliably. 通过更完整的上下文、可复用经验和结果验证，让编程模型写得更好、完成得更快。";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://metis-web.pages.dev",
  ),
  title,
  description,
  icons: {
    icon: "/metis-mark.svg",
    shortcut: "/metis-mark.svg",
  },
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Metis agent layer" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
