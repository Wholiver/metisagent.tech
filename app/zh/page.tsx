import type { Metadata } from "next";
import { HomeView } from "../page";

export const metadata: Metadata = {
  title: "Metis — 全面提升大模型编程性能 | 开源全自主 Coding Agent Harness",
  description:
    "Metis 专为全面提升大模型编程性能打造。通过自动化测试闭环、语法与逻辑异常自愈、跨会话经验记忆以及多智能体协同，消除大模型代码幻觉，让 Claude、DeepSeek、GPT 等模型从代码生成跃升至高可靠软件工程交付。",
  keywords: [
    "提升大模型编程性能",
    "大模型编程能力",
    "Metis",
    "Metis Agent",
    "AI 编程助手",
    "Coding Agent",
    "Coding Harness",
    "开源 AI Agent",
    "终端编程智能体",
    "代码自愈与闭环验证",
    "Claude Code 替代品",
    "Cursor 替代品",
    "Cline 对比",
    "Aider 替代品",
    "DeepSeek 编程 Harness",
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
    title: "Metis — 全面提升大模型编程性能 | 开源全自主 Coding Agent Harness",
    description:
      "专为全面提升大模型编程性能打造的开源自主 Coding Agent Harness。闭环测试验证、异常自动自愈、消除代码幻觉，让 AI 真正可靠交付。",
    url: "https://metisagent.tech/zh",
    locale: "zh_CN",
    alternateLocale: ["en_US"],
    images: [
      {
        url: "/og.png",
        width: 1536,
        height: 1024,
        alt: "Metis — 全面提升大模型编程性能",
      },
    ],
  },
};

export default function ChineseHome() {
  return <HomeView initialLanguage="zh" />;
}
