import type { Metadata } from "next";
import "./docs.css";

export const metadata: Metadata = {
  title: "Metis Documentation | Guides & References for AI Coding Agent Harness",
  description:
    "Comprehensive guides and references for Metis. From installation and multi-provider configuration to context compaction, subagents, and programmatic SDK.",
  keywords: [
    "Metis documentation",
    "Metis guides",
    "coding agent docs",
    "terminal agent CLI reference",
    "AI coding assistant setup",
    "Metis SDK",
    "Metis RPC mode",
    "Metis 文档",
  ],
  alternates: {
    canonical: "/docs",
  },
  openGraph: {
    title: "Metis Documentation | Guides & References",
    description:
      "Comprehensive guides and references for Metis. From installation and multi-provider configuration to context compaction, subagents, and programmatic SDK.",
    url: "https://metisagent.tech/docs",
  },
};

export default function DocsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
