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
          name: "What is Metis and how does it elevate LLM coding quality?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Metis is an open-source coding agent harness that wraps around your AI models. Unlike chatbots that output unverified code, Metis enforces a closed-loop verification cycle: running tests, catching errors, self-healing syntax bugs, and retaining cross-session architectural memory.",
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
