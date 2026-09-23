"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Language, LanguageSwitcher, useLanguage } from "./language-switcher";

const VERSION = "1.3.2";
const GITHUB_REPO = "https://github.com/Wholiver/metis";
const GITHUB_RELEASES = `${GITHUB_REPO}/releases`;

const downloadOptions = [
  {
    id: "mac-arm64",
    platform: "macOS",
    arch: "Apple Silicon (M1/M2/M3/M4)",
    file: `Metis-${VERSION}-macos-arm64.dmg`,
    url: `${GITHUB_RELEASES}/download/v${VERSION}/Metis-${VERSION}-macos-arm64.dmg`,
    badge: "arm64",
  },
  {
    id: "windows-x64",
    platform: "Windows",
    arch: "64-bit Installer",
    file: `Metis-${VERSION}-windows-x64.exe`,
    url: `${GITHUB_RELEASES}/latest`,
    badge: "exe",
  },
];

const installCommands = {
  npm: "npm i -g @wholiver_hu/metis",
  pnpm: "pnpm add -g @wholiver_hu/metis",
  bun: "bun add -g @wholiver_hu/metis",
} as const;

type PackageManager = keyof typeof installCommands;

const copyContent = {
  en: {
    homeLabel: "Metis home",
    navDocs: "Docs",
    navCompare: "Compare",
    navArchitecture: "Architecture",
    navModels: "Models",
    navQuickstart: "Quickstart",
    navFaq: "FAQ",
    heroLine: "Your model knows how to code.",
    heroEmphasis: "Metis helps it finish.",
    heroCopy: "The world-leading coding harness architecture.",
    seoSubtitle: "The Open-Source Terminal & Desktop AI Coding Agent Harness",
    seoDescription:
      "Metis empowers AI models (Claude, DeepSeek, OpenAI) with multi-agent orchestration, dynamic context compaction, and autonomous test verification. A superior open-source alternative to Claude Code, Cursor, Cline, and Aider.",
    download: "Download Metis",
    downloadForMac: "Download for macOS",
    downloadForWin: "Download for Windows",
    downloadForLinux: "Download for Linux",
    otherPlatforms: "Other platforms & releases",
    viewAllReleases: "All releases on GitHub",
    githubCta: "GitHub",
    copied: "Copied!",
    copy: "Copy",
    copyCommand: "Copy install command",
    cliTag: "or install via CLI",
    pillarsBadge: "Architecture & Quality",
    pillarsTitle: "Engineered to Elevate LLM Coding Quality",
    pillarsDesc:
      "Large language models generate plausible code snippets. Metis transforms those snippets into verified, production-ready software through three foundational harness pillars.",
    pillar1Title: "Closed-Loop Verification & Self-Healing",
    pillar1Desc:
      "Never accept hallucinated completion. Metis executes project builds, runs test suites, catches non-zero exit codes, analyzes stack traces, and self-heals syntax and logic bugs until all tests pass.",
    pillar2Title: "Cross-Session Memory & Lessons",
    pillar2Desc:
      "Eliminate repetitive mistakes. Metis distills hard-won lessons, architectural decisions, and project constraints into structured memory that compounds across sessions.",
    pillar3Title: "Role-Decoupled Multi-Agent Delegation",
    pillar3Desc:
      "Prevent single-prompt attention dilution. Metis autonomously coordinates specialized Architect, Builder, Reviewer, and Investigator subagents in physically isolated Git worktrees.",
    modelsBadge: "Model Freedom",
    modelsTitle: "Bring Any Model. Zero Vendor Lock-in.",
    modelsDesc:
      "Switch between top frontier cloud APIs and 100% private local models with a single flag. You own your keys and choose your cost-to-intelligence ratio.",
    compareBadge: "Alternatives & Benchmarks",
    compareTitle: "Explore Open-Source Alternatives to Proprietary Tools",
    compareDesc:
      "See how Metis stacks up against leading coding assistants, and why engineering teams are adopting Metis as their autonomous coding harness.",
    quickstartBadge: "Quickstart",
    quickstartTitle: "Up and Running in 30 Seconds",
    quickstartDesc:
      "Install Metis in seconds and empower your coding workflow with autonomous execution and verification.",
    faqBadge: "FAQ",
    faqTitle: "Frequently Asked Questions",
    footerCredit: "MIT License · Built by Wholiver",
    footerTagline: "Context · Memory · Verification",
  },
  zh: {
    homeLabel: "Metis 首页",
    navDocs: "文档",
    navCompare: "竞品对比",
    navArchitecture: "架构体系",
    navModels: "大模型支持",
    navQuickstart: "快速上手",
    navFaq: "常见问答",
    heroLine: "会写代码，只是开始。",
    heroEmphasis: "可靠完成，才是结果。",
    heroCopy: "全球领先的 Coding Harness 架构",
    seoSubtitle: "开源终端优先与桌面端全能 Coding Agent Harness",
    seoDescription:
      "Metis 为编程大模型（Claude、DeepSeek、OpenAI）赋予多智能体协作、动态上下文精简与全自动测试验证闭环。是 Claude Code、Cursor、Cline、Aider 的高自由度开源替代方案。",
    download: "下载 Metis",
    downloadForMac: "下载 macOS 版",
    downloadForWin: "下载 Windows 版",
    downloadForLinux: "下载 Linux 版",
    otherPlatforms: "其它系统与历史版本",
    viewAllReleases: "在 GitHub 查看全部版本",
    githubCta: "GitHub",
    copied: "已复制",
    copy: "复制",
    copyCommand: "复制安装命令",
    cliTag: "或通过终端直接安装",
    pillarsBadge: "架构体系与质量",
    pillarsTitle: "专为显著提升大模型编程质量而生",
    pillarsDesc:
      "大模型擅长写代码片段，但难以独立交付可靠工程。Metis 通过三大核心 Harness 体系，将代码片段转化为可直接投产的可靠成果。",
    pillar1Title: "闭环验证与自动自愈",
    pillar1Desc:
      "绝不依赖大模型臆想的“完成”。Metis 自动执行构建、运行单元测试，捕获非 0 报错与异常堆栈，自主迭代修复语法与逻辑问题，直至测试全绿。",
    pillar2Title: "跨会话经验提炼与记忆",
    pillar2Desc:
      "杜绝大模型在同一代码库中“反复犯相同错误”。Metis 在任务完成后自动提炼踩坑记录与架构决策，将经验持久化为结构化项目记忆。",
    pillar3Title: "角色解耦的多智能体协同",
    pillar3Desc:
      "专业的人做专业的事。Metis 自动调度架构师 (Architect)、编码员 (Builder)、审查员 (Reviewer) 与探索员 (Investigator)，并在独立 Git Worktree 沙箱中并发推进。",
    modelsBadge: "模型自由",
    modelsTitle: "自由接入任何大模型 · 告别单厂商锁定",
    modelsDesc:
      "按工程场景灵活选型。既可调用前沿商业云端模型，也可一键接入本地离线开源大模型，无订阅绑架。",
    compareBadge: "竞品对比与平替",
    compareTitle: "探索主流商业编程工具的开源平替",
    compareDesc:
      "查看全维度技术特性对比，了解为什么前沿工程师选择迁移至 Metis。",
    quickstartBadge: "快速上手",
    quickstartTitle: "30 秒极速上手",
    quickstartDesc:
      "只需简单安装，即可为你熟悉的编程模型赋予自主闭环验证能力。",
    faqBadge: "常见问答",
    faqTitle: "常见问题解答",
    footerCredit: "MIT 开源 · Wholiver 构建",
    footerTagline: "上下文完整 · 经验复用 · 结果检验",
  },
} as const;

export function HomeView({ initialLanguage = "en" }: { initialLanguage?: Language }) {
  const { language, setLanguage } = useLanguage(initialLanguage);
  const copy = copyContent[language];

  const [manager, setManager] = useState<PackageManager>("npm");
  const [copied, setCopied] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [detectedPlatform, setDetectedPlatform] = useState<"mac" | "win" | "linux" | "other">("mac");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes("mac")) {
      setDetectedPlatform("mac");
    } else if (ua.includes("win")) {
      setDetectedPlatform("win");
    } else if (ua.includes("linux")) {
      setDetectedPlatform("linux");
    } else {
      setDetectedPlatform("other");
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setDropdownOpen(false);
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dropdownOpen]);

  const copyInstall = useCallback(async () => {
    await navigator.clipboard.writeText(installCommands[manager]);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }, [manager]);

  const primaryDownload = (() => {
    if (detectedPlatform === "win") {
      return {
        label: copy.downloadForWin,
        url: `${GITHUB_RELEASES}/latest`,
        note: "64-bit EXE",
      };
    }
    if (detectedPlatform === "linux") {
      return {
        label: copy.downloadForLinux,
        url: GITHUB_RELEASES,
        note: "Releases",
      };
    }
    return {
      label: copy.downloadForMac,
      url: downloadOptions[0].url,
      note: "Apple Silicon .dmg",
    };
  })();

  return (
    <div className="viewport-shell graph-paper">
      {/* Top Header */}
      <header className="minimal-header">
        <div className="header-left">
          <Link className="brand" href="/" aria-label={copy.homeLabel}>
            <Image
              src="/metis-readme-icon.png"
              alt="Metis Logo"
              width={26}
              height={26}
              priority
              style={{ borderRadius: 6 }}
            />
            <span className="brand-name">metis</span>
          </Link>
          <a
            className="version-badge"
            href={GITHUB_RELEASES}
            target="_blank"
            rel="noreferrer"
            title={`Release v${VERSION}`}
          >
            v{VERSION}
          </a>
        </div>

        <div className="header-right">
          <a className="nav-doc-link" href="#architecture">
            {copy.navArchitecture}
          </a>
          <a className="nav-doc-link" href="#models">
            {copy.navModels}
          </a>
          <Link className="nav-doc-link" href="/compare">
            {copy.navCompare}
          </Link>
          <Link className="nav-doc-link" href="/docs">
            {copy.navDocs}
          </Link>
          <a
            className="github-icon-button"
            href={GITHUB_REPO}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Repository"
            title="Wholiver/metis on GitHub"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
          </a>
          <div className="header-sep" aria-hidden="true" />
          <LanguageSwitcher language={language} onChange={setLanguage} />
        </div>
      </header>

      {/* Main Hero Container */}
      <main className="hero-center" id="top">
        <div className="hero-content">
          <div className="brand-mark-wrapper" aria-hidden="true">
            <Image
              src="/metis-readme-icon.png"
              alt="Metis Icon"
              width={96}
              height={96}
              priority
              style={{ borderRadius: 20, boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}
            />
          </div>

          <h1 className="hero-title">Metis</h1>

          {/* Semantic SEO Headings (Visible to Screen Readers and Crawlers) */}
          <h2 className="sr-only">{copy.seoSubtitle}</h2>
          <p className="sr-only">{copy.seoDescription}</p>

          <div className="hero-slogan">
            <p className="slogan-primary">
              <span>{copy.heroLine}</span> <em>{copy.heroEmphasis}</em>
            </p>
            <p className="slogan-secondary">{copy.heroCopy}</p>
          </div>

          {/* Primary CTA Buttons */}
          <div className="action-row">
            {/* Split Download Pill with Dropdown */}
            <div className="download-group" ref={dropdownRef}>
              <div className="download-pill">
                <a
                  className="download-main-btn"
                  href={primaryDownload.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>{primaryDownload.label}</span>
                </a>

                <button
                  type="button"
                  className="download-arrow-btn"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                  aria-label="Choose platform download"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transform: dropdownOpen ? "rotate(180deg)" : "none",
                      transition: "transform 180ms ease",
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              </div>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="download-menu" role="menu">
                  <div className="menu-header">{copy.otherPlatforms}</div>
                  {downloadOptions.map((opt) => (
                    <a
                      key={opt.id}
                      href={opt.url}
                      target="_blank"
                      rel="noreferrer"
                      className="menu-item"
                      role="menuitem"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <div className="item-info">
                        <span className="item-platform">{opt.platform}</span>
                        <span className="item-arch">{opt.arch}</span>
                      </div>
                      <span className="item-badge">{opt.badge}</span>
                    </a>
                  ))}
                  <div className="menu-divider" />
                  <a
                    href={GITHUB_RELEASES}
                    target="_blank"
                    rel="noreferrer"
                    className="menu-item menu-item-link"
                    role="menuitem"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span>{copy.viewAllReleases}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              )}
            </div>

            {/* GitHub Secondary Pill */}
            <a
              className="github-btn"
              href={GITHUB_REPO}
              target="_blank"
              rel="noreferrer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span>{copy.githubCta}</span>
              <span className="arrow-icon" aria-hidden="true">↗</span>
            </a>
          </div>

          {/* Quick CLI copy bar */}
          <div className="cli-bar">
            <div className="cli-pm-selector" role="tablist" aria-label="Package manager">
              {(Object.keys(installCommands) as PackageManager[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={manager === item}
                  className={`pm-tab ${manager === item ? "active" : ""}`}
                  onClick={() => {
                    setManager(item);
                    setCopied(false);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="cli-snippet-wrapper">
              <span className="cli-prompt" aria-hidden="true">$</span>
              <code className="cli-code">{installCommands[manager]}</code>
              <button
                type="button"
                className={`cli-copy-btn ${copied ? "copied" : ""}`}
                onClick={copyInstall}
                aria-label={copy.copyCommand}
              >
                {copied ? (
                  <>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{copy.copied}</span>
                  </>
                ) : (
                  <>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    <span>{copy.copy}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* 1. Architecture Pillars */}
      <div className="section-divider" />
      <section className="content-section" id="architecture">
        <div className="section-badge">{copy.pillarsBadge}</div>
        <h2 className="section-title">{copy.pillarsTitle}</h2>
        <p className="section-desc">{copy.pillarsDesc}</p>
        <div className="pillars-grid">
          <div className="pillar-card">
            <div className="pillar-num">01 / CLOSED-LOOP VERIFICATION</div>
            <h3 className="pillar-title">{copy.pillar1Title}</h3>
            <p className="pillar-copy">{copy.pillar1Desc}</p>
          </div>
          <div className="pillar-card">
            <div className="pillar-num">02 / CONTINUOUS MEMORY</div>
            <h3 className="pillar-title">{copy.pillar2Title}</h3>
            <p className="pillar-copy">{copy.pillar2Desc}</p>
          </div>
          <div className="pillar-card">
            <div className="pillar-num">03 / MULTI-AGENT TEAMS</div>
            <h3 className="pillar-title">{copy.pillar3Title}</h3>
            <p className="pillar-copy">{copy.pillar3Desc}</p>
          </div>
        </div>
      </section>

      {/* 2. Models Matrix */}
      <div className="section-divider" />
      <section className="content-section" id="models">
        <div className="section-badge">{copy.modelsBadge}</div>
        <h2 className="section-title">{copy.modelsTitle}</h2>
        <p className="section-desc">{copy.modelsDesc}</p>
        <div className="models-grid">
          <div className="model-card">
            <span className="model-tag">Anthropic</span>
            <h3 className="model-name">Claude 3.7 &amp; 3.5 Sonnet</h3>
            <p className="model-desc">
              {language === "zh"
                ? "顶尖工程复杂逻辑推理、超长上下文架构拆解与重构。"
                : "Deep architectural reasoning, hybrid thought analysis, and full-repository refactoring."}
            </p>
          </div>
          <div className="model-card">
            <span className="model-tag">DeepSeek</span>
            <h3 className="model-name">DeepSeek V3 &amp; R1</h3>
            <p className="model-desc">
              {language === "zh"
                ? "极速高吞吐量编写与单步调试，成本仅为传统商业 API 的几十分之一。"
                : "Extreme throughput coding and chain-of-thought verification at 95% lower cost."}
            </p>
          </div>
          <div className="model-card">
            <span className="model-tag">OpenAI</span>
            <h3 className="model-name">GPT-4o &amp; o3-mini</h3>
            <p className="model-desc">
              {language === "zh"
                ? "敏捷指令遵从、强函数调用工具链以及精确的多轮修补能力。"
                : "High-precision function calling, tool execution, and agile multi-step instruction following."}
            </p>
          </div>
          <div className="model-card">
            <span className="model-tag">Local Offline</span>
            <h3 className="model-name">Ollama / LM Studio</h3>
            <p className="model-desc">
              {language === "zh"
                ? "100% 离线私密运行，支持 Qwen、Llama 等本地 GGUF 模型，零数据泄露。"
                : "100% confidential offline execution with zero telemetry. Your source code never leaves your device."}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Competitor Alternatives Grid */}
      <div className="section-divider" />
      <section className="content-section" id="compare">
        <div className="section-badge">{copy.compareBadge}</div>
        <h2 className="section-title">{copy.compareTitle}</h2>
        <p className="section-desc">{copy.compareDesc}</p>
        <div className="compare-showcase-grid">
          <Link href="/compare/metis-vs-claude-code/" className="compare-card">
            <div className="compare-card-title">
              <span>Metis vs Claude Code</span>
              <span className="compare-card-arrow">→</span>
            </div>
            <p className="compare-card-summary">
              {language === "zh"
                ? "打破 Anthropic 单模型绑定。提供桌面可视化 Diff、自愈测试闭环与自由接入 DeepSeek/本地模型。"
                : "Anthropic API independence, native Desktop GUI workspace, and automated test-driven self-healing."}
            </p>
            <div className="compare-card-arrow">
              {language === "zh" ? "查看深度对比" : "View Comparison"} →
            </div>
          </Link>

          <Link href="/compare/metis-vs-cursor/" className="compare-card">
            <div className="compare-card-title">
              <span>Metis vs Cursor</span>
              <span className="compare-card-arrow">→</span>
            </div>
            <p className="compare-card-summary">
              {language === "zh"
                ? "无需从已配置好的 VSCode / JetBrains 迁移。100% 代码隐私安全，零按人头月度订阅费。"
                : "Zero IDE migration needed. 100% local privacy without expensive monthly per-seat subscriptions."}
            </p>
            <div className="compare-card-arrow">
              {language === "zh" ? "查看深度对比" : "View Comparison"} →
            </div>
          </Link>

          <Link href="/compare/metis-vs-cline/" className="compare-card">
            <div className="compare-card-title">
              <span>Metis vs Cline</span>
              <span className="compare-card-arrow">→</span>
            </div>
            <p className="compare-card-summary">
              {language === "zh"
                ? "独立进程运行绝不卡死编辑器。原生支持跨任务经验记忆、动态上下文压缩与多智能体分工。"
                : "Independent decoupled background process won't freeze your editor, plus cross-session memory."}
            </p>
            <div className="compare-card-arrow">
              {language === "zh" ? "查看深度对比" : "View Comparison"} →
            </div>
          </Link>

          <Link href="/compare/metis-vs-codex/" className="compare-card">
            <div className="compare-card-title">
              <span>Metis vs Codex CLI</span>
              <span className="compare-card-arrow">→</span>
            </div>
            <p className="compare-card-summary">
              {language === "zh"
                ? "自主工程级交付 Harness vs 静态单行代码补全。多文件审查、自动跑测与自愈迭代。"
                : "Autonomous end-to-end task completion and self-healing verification vs static snippet generator."}
            </p>
            <div className="compare-card-arrow">
              {language === "zh" ? "查看深度对比" : "View Comparison"} →
            </div>
          </Link>

          <Link href="/compare/metis-vs-aider/" className="compare-card">
            <div className="compare-card-title">
              <span>Metis vs Aider</span>
              <span className="compare-card-arrow">→</span>
            </div>
            <p className="compare-card-summary">
              {language === "zh"
                ? "L0-L4 递归多智能体调度与物理 Worktree 隔离，搭配原生桌面端审查 vs 单线程终端脚本。"
                : "L0-L4 recursive subagent delegation and desktop visual diff workspace vs single-thread terminal script."}
            </p>
            <div className="compare-card-arrow">
              {language === "zh" ? "查看深度对比" : "View Comparison"} →
            </div>
          </Link>

          <Link href="/compare/metis-vs-copilot/" className="compare-card">
            <div className="compare-card-title">
              <span>Metis vs GitHub Copilot</span>
              <span className="compare-card-arrow">→</span>
            </div>
            <p className="compare-card-summary">
              {language === "zh"
                ? "自主完成大型工程重构与故障自愈，全面超越逐行补全式幽灵文字。"
                : "Autonomous multi-file repository refactoring vs line-by-line ghost text autocomplete."}
            </p>
            <div className="compare-card-arrow">
              {language === "zh" ? "查看深度对比" : "View Comparison"} →
            </div>
          </Link>
        </div>
      </section>

      {/* 4. Quickstart */}
      <div className="section-divider" />
      <section className="content-section" id="quickstart">
        <div className="section-badge">{copy.quickstartBadge}</div>
        <h2 className="section-title">{copy.quickstartTitle}</h2>
        <p className="section-desc">{copy.quickstartDesc}</p>
        <div className="quickstart-steps-grid">
          <div className="step-card">
            <div className="step-idx">1</div>
            <h3 className="step-title">
              {language === "zh" ? "一键安装全局 CLI" : "Install CLI Globally"}
            </h3>
            <p className="step-desc">
              <code>npm i -g @wholiver_hu/metis</code>
              <br />
              <span style={{ fontSize: "12px", color: "var(--muted)", display: "inline-block", marginTop: "6px" }}>
                {language === "zh"
                  ? "或直接下载 macOS (.dmg) / Windows (.exe) 桌面端。"
                  : "Or download the native desktop app for macOS or Windows."}
              </span>
            </p>
          </div>
          <div className="step-card">
            <div className="step-idx">2</div>
            <h3 className="step-title">
              {language === "zh" ? "在项目目录启动" : "Launch in Any Repository"}
            </h3>
            <p className="step-desc">
              <code>cd my-project &amp;&amp; metis</code>
              <br />
              <span style={{ fontSize: "12px", color: "var(--muted)", display: "inline-block", marginTop: "6px" }}>
                {language === "zh"
                  ? "自动扫描项目规范、Git 变更与测试套件。"
                  : "Automatically indexes instructions, Git worktree, and test suites."}
              </span>
            </p>
          </div>
          <div className="step-card">
            <div className="step-idx">3</div>
            <h3 className="step-title">
              {language === "zh" ? "闭环交付与检验" : "Verify and Deliver"}
            </h3>
            <p className="step-desc">
              {language === "zh"
                ? "下达任务目标。Metis 自动完成调研、多文件修改，并在测试跑通后才交付。"
                : "Prompt your goal. Metis executes edits, runs your test suite, and only concludes when all tests pass."}
            </p>
          </div>
        </div>
      </section>

      {/* 5. FAQ */}
      <div className="section-divider" />
      <section className="content-section" id="faq">
        <div className="section-badge">{copy.faqBadge}</div>
        <h2 className="section-title">{copy.faqTitle}</h2>
        <div className="faq-list-home">
          <div className="faq-item-home">
            <h3 className="faq-q">
              {language === "zh"
                ? "Metis 是如何提升大模型编程质量的？"
                : "How does Metis elevate LLM coding quality?"}
            </h3>
            <p className="faq-a">
              {language === "zh"
                ? "传统 AI 编程助手多为单次补全，经常遗漏边界条件或产生编译语法错误。Metis 作为专门的 Harness，通过持续测试反馈循环捕获错误并自我修复，结合跨任务经验记忆与多角色协同，彻底根除代码幻觉。"
                : "Traditional coding assistants stop at code generation. Metis wraps your model in a closed-loop execution harness: it runs test suites, catches compiler errors and stack traces, self-heals bugs iteratively, and persists architectural lessons across sessions."}
            </p>
          </div>
          <div className="faq-item-home">
            <h3 className="faq-q">
              {language === "zh"
                ? "Metis 是否完全开源且免费？"
                : "Is Metis completely free and open-source?"}
            </h3>
            <p className="faq-a">
              {language === "zh"
                ? "是的！Metis 遵循宽松的 MIT 开源协议。无论是终端 CLI 还是桌面端应用均完全免费开放，没有任何按人头强制订阅，你可以自由填入自己的 API Key 或配合本地 Ollama 零成本运行。"
                : "Yes! Metis is 100% open-source under the MIT license. You can connect your own API keys (Anthropic, DeepSeek, OpenAI) or run completely offline with local models (Ollama) with zero monthly subscriptions."}
            </p>
          </div>
          <div className="faq-item-home">
            <h3 className="faq-q">
              {language === "zh"
                ? "我是否需要抛弃当前的 VSCode 或现有开发环境？"
                : "Do I need to abandon my current IDE or editor?"}
            </h3>
            <p className="faq-a">
              {language === "zh"
                ? "完全不需要。Metis 是终端优先且自带桌面独立界面的 Harness，它直接在你的物理 Git 项目目录协同工作，与 VSCode、Cursor、JetBrains 或 Neovim 完美共存。"
                : "Not at all. Metis operates as an independent harness directly in your repository. It coexists seamlessly alongside VS Code, JetBrains, Cursor, or Neovim."}
            </p>
          </div>
          <div className="faq-item-home">
            <h3 className="faq-q">
              {language === "zh"
                ? "Metis 支持哪些操作系统？"
                : "What operating systems are supported?"}
            </h3>
            <p className="faq-a">
              {language === "zh"
                ? "Metis 原生支持 macOS（Apple Silicon 与 Intel 架构）、Windows（支持原生 EXE 与 WSL 环境）以及各大 Linux 发行版。"
                : "Metis natively supports macOS (both Apple Silicon and Intel), Windows (native executable and WSL), and all major Linux distributions."}
            </p>
          </div>
        </div>
      </section>

      {/* Pinned Minimalist Footer */}
      <footer className="minimal-footer">
        <div className="footer-left">
          <span>{copy.footerCredit}</span>
        </div>
        <div className="footer-right">
          <a href="#architecture">{copy.navArchitecture}</a>
          <span className="footer-dot" aria-hidden="true">·</span>
          <a href="#models">{copy.navModels}</a>
          <span className="footer-dot" aria-hidden="true">·</span>
          <Link href="/compare">{copy.navCompare}</Link>
          <span className="footer-dot" aria-hidden="true">·</span>
          <Link href="/docs">{copy.navDocs}</Link>
          <span className="footer-dot" aria-hidden="true">·</span>
          <a href={GITHUB_REPO} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <span className="footer-dot" aria-hidden="true">·</span>
          <a href="https://www.npmjs.com/package/@wholiver_hu/metis" target="_blank" rel="noreferrer">
            npm
          </a>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return <HomeView initialLanguage="en" />;
}
