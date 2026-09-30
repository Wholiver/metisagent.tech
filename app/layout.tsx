import type { Metadata } from "next";
import "./globals.css";
import { VERSION } from "./release";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://metisagent.tech";

const title = "Metis — Same Model, Verified Harness Lift | Open-Source Coding Agent";
const description =
  "Metis is an open-source coding agent harness with verified same-model performance lift. Terminal-Bench ~82% vs OpenCode ~67%. Multi-model support, terminal-first design for Claude Code and OpenCode switchers.";

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
    "coding agent harness",
    "verified harness lift",
    "same model performance",
    "terminal coding agent",
    "open source coding agent",
    "Claude Code alternative",
    "OpenCode alternative",
    "multi-model coding agent",
    "Terminal-Bench",
    "autonomous coding agent",
    "AI coding agent",
    "Aider alternative",
    "closed-loop test verification",
    "self-healing code",
    "终端编程智能体",
    "开源 AI Agent",
    "coding agent 同模表现",
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
    icon: [
      { url: "/favicon.ico?v=2", sizes: "32x32" },
      { url: "/metis-cloud-mascot.svg?v=2", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: [
      { url: "/apple-touch-icon.png?v=2", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "icon", type: "image/png", sizes: "192x192", url: "/icon-192.png?v=2" },
      { rel: "icon", type: "image/png", sizes: "512x512", url: "/icon-512.png?v=2" },
    ],
  },
  manifest: "/site.webmanifest",
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
        alt: "Metis — Same Model, Verified Harness Lift",
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
        "Open-source coding agent harness with verified same-model performance lift. Terminal-Bench ~82% vs OpenCode ~67%. Multi-model, terminal-first design.",
      softwareVersion: VERSION,
      license: "https://opensource.org/licenses/MIT",
      downloadUrl: "https://github.com/Wholiver/metis/releases",
      screenshot: `${SITE_URL}/og.png`,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "138",
        bestRating: "5",
        worstRating: "1",
      },
      featureList: [
        "Verified same-model harness lift: Terminal-Bench ~82% vs OpenCode ~67%",
        "Multi-model support: Claude, DeepSeek, OpenAI, Ollama",
        "Terminal-first design for Claude Code and OpenCode switchers",
        "Dual interface: Terminal TUI + Desktop GUI",
        "Closed-loop test execution and automated self-healing",
        "Cross-session persistent memory",
        "MIT licensed, 100% open source",
      ],
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
        "Open-source coding agent with verified same-model harness lift. Terminal-first design for developers switching from Claude Code or OpenCode.",
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/docs?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
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
    {
      "@type": "HowTo",
      "@id": `${SITE_URL}/#howto`,
      name: "How to Install and Run Metis AI Coding Agent in 30 Seconds",
      description:
        "Get started with Metis, the open-source coding agent with verified same-model harness lift.",
      step: [
        {
          "@type": "HowToStep",
          name: "Install Metis",
          text: "Install Metis globally using npm (npm i -g @wholiver_hu/metis) or download the desktop installer for macOS/Windows.",
          url: `${SITE_URL}/#install`,
        },
        {
          "@type": "HowToStep",
          name: "Launch in Codebase",
          text: "Open your terminal in any Git project directory and type 'metis'.",
          url: `${SITE_URL}/docs`,
        },
        {
          "@type": "HowToStep",
          name: "Prompt Your Goal",
          text: "Assign tasks such as refactoring, bug fixes, or feature development. Metis searches, writes code, and tests until verified.",
          url: `${SITE_URL}/docs`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Metis and what is verified harness lift?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Metis is an open-source coding agent harness with verified same-model performance lift. On Terminal-Bench, Metis achieves ~82% with the same model where OpenCode scores ~67%. The harness wraps around your chosen model with closed-loop verification, test execution, and self-healing.",
          },
        },
        {
          "@type": "Question",
          name: "Why switch from Claude Code or OpenCode to Metis?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Switching from Claude Code: same capability with more freedom — not locked to one vendor, MIT licensed, multi-model support. Switching from OpenCode: verified same-model harness lift means measurably better results, not just 'good enough'.",
          },
        },
        {
          "@type": "Question",
          name: "Which models and platforms does Metis support?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Metis supports multiple model providers: Claude, DeepSeek, OpenAI, Ollama. Runs on macOS (Apple Silicon & Intel), Windows, and Linux. Both terminal TUI and desktop GUI interfaces available.",
          },
        },
      ],
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
        <link rel="preconnect" href="https://github.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="icon" href="/metis-cloud-mascot.svg?v=2" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2" />
        <link rel="manifest" href="/site.webmanifest" />
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
