import type { Metadata } from "next";
import { HomeView } from "../page";

export const metadata: Metadata = {
  title: "Metis — 同模型可验证拉高 Coding Agent 表现 | 开源终端优先智能体",
  description:
    "Metis 是开源 coding agent harness，同模型下可验证拉高表现。Terminal-Bench 同模约 82%（vs OpenCode ~67%）。多模型支持，终端优先设计，适合从 Claude Code / OpenCode 切换的用户。",
  keywords: [
    "coding agent 同模表现",
    "harness 可验证提升",
    "Metis",
    "Metis Agent",
    "终端编程智能体",
    "开源 AI Agent",
    "Claude Code 替代品",
    "OpenCode 替代品",
    "多模型 coding agent",
    "Terminal-Bench",
    "Coding Harness",
    "自主编程智能体",
    "DeepSeek 编程 Harness",
    "Aider 替代品",
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
    title: "Metis — 同模型可验证拉高 Coding Agent 表现 | 开源终端优先智能体",
    description:
      "同模型下，harness 可验证拉高 coding agent 表现。Terminal-Bench 同模约 82%（vs OpenCode ~67%）。MIT · 多模型 · 终端/桌面。",
    url: "https://metisagent.tech/zh",
    locale: "zh_CN",
    alternateLocale: ["en_US"],
    images: [
      {
        url: "/og.png",
        width: 1536,
        height: 1024,
        alt: "Metis — 同模型可验证拉高 Coding Agent 表现",
      },
    ],
  },
};

export default function ChineseHome() {
  return <HomeView initialLanguage="zh" />;
}
