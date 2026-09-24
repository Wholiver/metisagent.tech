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
    heroLine: "Elevate your model's coding performance.",
    heroEmphasis: "Turn LLM generation into reliable engineering.",
    heroCopy: "The open-source autonomous coding harness built for peak model performance.",
    seoSubtitle: "Open-Source Coding Agent Harness Built to Maximize LLM Performance",
    seoDescription:
      "Metis is an open-source coding agent harness engineered to elevate LLM coding performance to production grade. Features closed-loop test verification, automated self-healing, cross-session memory, and multi-agent coordination for Claude, DeepSeek, and OpenAI models.",
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
    footerCredit: "MIT License · Built by Wholiver",
    footerTagline: "Elevate LLM Performance · Closed-Loop Verification · Persistent Memory",
  },
  zh: {
    homeLabel: "Metis 首页",
    navDocs: "文档",
    navCompare: "竞品对比",
    heroLine: "全面提升大模型编程性能，",
    heroEmphasis: "让 AI 代码从生成走向自主交付。",
    heroCopy: "全球领先的开源 Coding Agent Harness · 闭环测试验证 · 自动异常自愈 · 跨会话记忆",
    seoSubtitle: "专为全面提升大模型编程性能打造的开源 Coding Agent Harness",
    seoDescription:
      "Metis 专为全面提升大模型编程性能打造。通过自动化测试闭环、语法与逻辑异常自愈、跨会话经验记忆以及多智能体分工，让 Claude、DeepSeek、GPT 等模型告别代码幻觉，稳定交付真实工程代码。",
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
    footerCredit: "MIT 开源 · Wholiver 构建",
    footerTagline: "提升模型性能 · 闭环验证 · 经验记忆 · 智能自愈",
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
              src="/metis-mark.svg"
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
              src="/metis-mark.svg"
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

      {/* Pinned Minimalist Footer */}
      <footer className="minimal-footer">
        <div className="footer-left">
          <span>{copy.footerCredit}</span>
        </div>
        <div className="footer-right">
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
