import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://metisagent.tech";

const title = "Metis — Open-Source Coding Agent & Harness | 让编程模型可靠完成任务";
const description =
  "Metis is the open-source, terminal-first & desktop coding agent harness. Features context compaction, test-driven verification, and multi-provider LLM support. 通过更完整的上下文、可复用经验和自动化结果验证，让编程模型写得更好、完成得更快。";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s | Metis Agent",
  },
  description,
  keywords: [
    "Metis",
    "Metis Agent",
    "metisagent.tech",
    "AI coding agent",
    "coding agent",
    "AI agent for developers",
    "autonomous coding agent",
    "terminal coding agent",
    "coding harness",
    "Claude Code alternative",
    "Cursor alternative",
    "Cline alternative",
    "Aider alternative",
    "Codex CLI alternative",
    "open source coding agent",
    "context compaction",
    "execution verification",
    "AI 编程助手",
    "开源 AI Agent",
    "终端编程智能体",
  ],
  authors: [{ name: "Wholiver", url: "https://github.com/Wholiver" }],
  creator: "Wholiver",
  publisher: "Metis",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      "zh-CN": "/zh",
      "x-default": "/",
    },
  },
  icons: {
    icon: "/metis-mark.svg",
    shortcut: "/metis-mark.svg",
    apple: "/metis-readme-icon.png",
  },
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: "Metis Agent",
    locale: "en_US",
    alternateLocale: ["zh_CN"],
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1536,
        height: 1024,
        alt: "Metis - Open-Source Coding Agent Harness",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#software`,
      name: "Metis",
      url: SITE_URL,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "macOS, Windows, Linux",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "The open-source terminal-first coding agent harness that helps AI coding models search, remember, execute, and verify reliably.",
      softwareVersion: "1.3.2",
      license: "https://opensource.org/licenses/MIT",
      sameAs: [
        "https://github.com/Wholiver/metis",
        "https://www.npmjs.com/package/@wholiver_hu/metis",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Metis Agent",
      description:
        "The world-leading coding harness architecture for autonomous AI agents and developers.",
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      inLanguage: ["en", "zh-CN"],
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Metis",
      url: SITE_URL,
      logo: `${SITE_URL}/metis-readme-icon.png`,
      sameAs: ["https://github.com/Wholiver/metis"],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
