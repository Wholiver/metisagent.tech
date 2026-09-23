import type { Metadata } from "next";
import { HomeView } from "../page";

export const metadata: Metadata = {
  title: "Metis — 全球领先的 Coding Harness 架构 | 开源 AI 编程助手",
  description:
    "Metis 是一款开源、终端优先与桌面端全能的 Coding Agent Harness。通过更完整的上下文、可复用经验和自动化结果验证，让编程模型写得更好、完成得更快。",
  keywords: [
    "Metis",
    "Metis Agent",
    "AI 编程助手",
    "Coding Agent",
    "开源 AI Agent",
    "终端编程智能体",
    "代码大模型 Harness",
    "Claude Code 替代品",
    "Cursor 替代品",
    "Cline 对比",
    "Aider 替代品",
    "自动化代码验证",
    "上下文压缩与精简",
    "自主编程智能体",
  ],
  alternates: {
    canonical: "/zh",
    languages: {
      en: "/",
      "zh-CN": "/zh",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Metis — 全球领先的 Coding Harness 架构 | 开源 AI 编程助手",
    description:
      "Metis 是一款开源、终端优先与桌面端全能的 Coding Agent Harness。通过更完整的上下文、可复用经验和自动化结果验证，让编程模型写得更好、完成得更快。",
    url: "https://metisagent.tech/zh",
    locale: "zh_CN",
    alternateLocale: ["en_US"],
  },
};

export default function ChineseHome() {
  return <HomeView initialLanguage="zh" />;
}
