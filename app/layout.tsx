import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://metisagent.tech";

const title = "Metis — Maximize LLM Coding Performance | Open-Source Autonomous Coding Harness";
const description =
  "Metis is the open-source coding agent harness engineered to elevate LLM coding performance to production grade. Features closed-loop test verification, automated self-healing, cross-session persistent memory, and multi-provider model routing for Claude, DeepSeek, and OpenAI.";

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
    "LLM coding performance",
    "maximize LLM performance",
    "AI coding agent",
    "coding harness",
    "autonomous coding agent",
    "coding agent harness",
    "Claude Code alternative",
    "Cursor alternative",
    "Cline alternative",
    "Aider alternative",
    "Codex CLI alternative",
    "open source coding agent",
    "closed-loop test verification",
    "self-healing code",
    "AI agent for developers",
    "提升大模型编程性能",
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
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/metis-mark.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "icon", type: "image/png", sizes: "192x192", url: "/icon-192.png" },
      { rel: "icon", type: "image/png", sizes: "512x512", url: "/icon-512.png" },
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
        alt: "Metis — Maximize LLM Coding Performance",
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
        "The open-source autonomous coding agent harness engineered to elevate LLM coding performance with closed-loop verification, automated self-healing, and persistent memory.",
      softwareVersion: "1.3.2",
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
        "Elevates LLM coding performance to production-grade reliability",
        "Closed-loop test execution and automated self-healing",
        "Cross-session persistent memory and lesson distillation",
        "Hierarchical multi-agent team delegation (Architect, Builder, Reviewer)",
        "Multi-provider freedom: Claude 3.7 Sonnet, DeepSeek V3/R1, OpenAI, Ollama",
        "Dual interface: Terminal TUI + Electron Desktop diff review workspace",
        "Local offline model support with 100% private execution",
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
        "The world-leading coding harness architecture for autonomous AI agents and developers.",
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
        "Get started with Metis to elevate your AI model's programming quality and verify code automatically.",
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
          name: "What is Metis and how does it elevate LLM coding performance?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Metis is an open-source coding agent harness that wraps around your AI models. Unlike chatbots that output unverified code, Metis elevates model performance through a closed-loop verification cycle: running tests, catching errors, self-healing syntax bugs, and retaining cross-session architectural memory.",
          },
        },
        {
          "@type": "Question",
          name: "Is Metis a free and open-source alternative to Claude Code and Cursor?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Metis is 100% open-source under the MIT license. You can connect your own API keys (Anthropic, DeepSeek, OpenAI) or run completely offline with local models (Ollama) with zero subscription fees.",
          },
        },
        {
          "@type": "Question",
          name: "Which operating systems and models are supported by Metis?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Metis runs natively on macOS (Apple Silicon and Intel), Windows (native executable and WSL), and Linux. Supported models include Claude 3.7 Sonnet, DeepSeek V3/R1, GPT-4o, o3-mini, and any local GGUF model via Ollama.",
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/metis-mark.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
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
