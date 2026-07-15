"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { LanguageSwitcher, useLanguage } from "./language-switcher";

const installCommands = {
  npm: "npm i -g @wholiver_hu/metis@rc",
  pnpm: "pnpm add -g @wholiver_hu/metis@rc",
  bun: "bun add -g @wholiver_hu/metis@rc",
} as const;

type PackageManager = keyof typeof installCommands;
type LineKind = "section" | "path" | "user" | "thinking" | "tool" | "success" | "assistant" | "code";

type TerminalScene = {
  label: string;
  status: string;
  model: string;
  lines: Array<{ kind: LineKind; text: string }>;
};

const terminalScenes: TerminalScene[] = [
  {
    label: "context loaded",
    status: "↑18.4k ↓6.2k  31%/272k (auto)",
    model: "(openai-codex) gpt-5.6 • high",
    lines: [
      { kind: "section", text: "[Context]" },
      { kind: "path", text: "  AGENTS.md" },
      { kind: "path", text: "  docs/security.md" },
      { kind: "section", text: "[Memory]" },
      { kind: "path", text: "  brain-map.md → auth-refresh-boundary" },
      { kind: "section", text: "[Skills]" },
      { kind: "path", text: "  repository-search · verification" },
      { kind: "user", text: "Build the auth flow. Reuse existing patterns and verify every requirement." },
      { kind: "thinking", text: "Checking project instructions and prior lessons…" },
    ],
  },
  {
    label: "searching repository",
    status: "↑23.8k ↓8.1k  39%/272k (auto)",
    model: "(openai-codex) gpt-5.6 • high",
    lines: [
      { kind: "user", text: "Map the refresh-token path before editing." },
      { kind: "tool", text: "search  refresh token session boundary" },
      { kind: "path", text: "  src/auth/middleware.ts:84" },
      { kind: "path", text: "  src/auth/callback.ts:117" },
      { kind: "path", text: "  test/auth/refresh.test.ts:42" },
      { kind: "tool", text: "read    src/auth/middleware.ts" },
      { kind: "tool", text: "read    src/auth/callback.ts" },
      { kind: "assistant", text: "Found the state owner and the exact regression boundary. No speculative rewrite needed." },
    ],
  },
  {
    label: "memory reused",
    status: "↑27.1k ↓9.4k  43%/272k (auto)",
    model: "(openai-codex) gpt-5.6 • high",
    lines: [
      { kind: "section", text: "[Relevant lesson]" },
      { kind: "code", text: "token-refresh-boundary.md" },
      { kind: "path", text: "  Keep refresh state in the session owner." },
      { kind: "path", text: "  Test expiry, cancellation, and replay." },
      { kind: "tool", text: "edit    src/auth/session.ts" },
      { kind: "tool", text: "edit    test/auth/refresh.test.ts" },
      { kind: "success", text: "✓ Reused prior diagnosis; avoided a second debugging loop." },
      { kind: "assistant", text: "Implementation matches repository ownership and error-handling conventions." },
    ],
  },
  {
    label: "dream consolidation",
    status: "working memory  3 checkpoints",
    model: "dream • consolidation",
    lines: [
      { kind: "section", text: "[Dream]" },
      { kind: "thinking", text: "Reviewing completed work and durable signals…" },
      { kind: "tool", text: "read    session working log" },
      { kind: "tool", text: "filter  routine output" },
      { kind: "success", text: "✓ Promoted one reusable lesson" },
      { kind: "code", text: "lessons/auth-refresh-invariants.md" },
      { kind: "path", text: "  weight: 5  ·  linked from brain-map" },
      { kind: "assistant", text: "Temporary task context became useful experience for the next session." },
    ],
  },
  {
    label: "verification complete",
    status: "↑34.7k ↓13.8k  52%/272k (auto)",
    model: "(openai-codex) gpt-5.6 • high",
    lines: [
      { kind: "section", text: "[Verify]" },
      { kind: "tool", text: "bash    pnpm test -- auth" },
      { kind: "success", text: "✓ 42 tests passed" },
      { kind: "tool", text: "bash    pnpm build" },
      { kind: "success", text: "✓ build completed" },
      { kind: "tool", text: "inspect rendered output" },
      { kind: "success", text: "✓ success, failure, expiry, cancellation" },
      { kind: "assistant", text: "Done. Requirement check: 4 / 4. No unresolved work remains." },
    ],
  },
  {
    label: "ready for integration",
    status: "session saved  ·  tree available",
    model: "metis v1.1.0-rc.1",
    lines: [
      { kind: "section", text: "[Interfaces]" },
      { kind: "path", text: "  Interactive TUI" },
      { kind: "path", text: "  Print / JSON" },
      { kind: "path", text: "  RPC" },
      { kind: "path", text: "  Node.js SDK" },
      { kind: "user", text: "metis --mode json -p \"verify release readiness\"" },
      { kind: "code", text: "{ \"status\": \"verified\", \"checks\": 7 }" },
      { kind: "assistant", text: "Use Metis directly, automate it, or embed the agent layer in your product." },
    ],
  },
];

const homeCopy = {
  en: {
    homeLabel: "Metis home",
    navigationLabel: "Primary navigation",
    navWhy: "Why",
    navHow: "How it works",
    navPrinciples: "Principles",
    navDocs: "Docs",
    heroEyebrow: "terminal-first coding agent",
    heroLine: "Your model knows how to code.",
    heroEmphasis: "Metis helps it finish.",
    heroCopy: "Better context, reusable experience, and verified results around the model you already use.",
    installLabel: "Install Metis",
    packageManagerLabel: "Package manager",
    copyCommand: "Copy install command",
    copied: "Copied",
    copy: "Copy",
    scrollCue: "see the system around the model",
    whyIndex: "01 / WHY METIS",
    thesisOverline: "Same underlying model.",
    thesisLine: "A better way to",
    thesisEmphasis: "search, remember, work, and check.",
    thesisCopy: "Metis does not replace the model or change its weights. It strengthens the system around it—so the model begins with better evidence, preserves useful experience, and finishes with proof.",
    live: "LIVE",
    terminalCaption: "scroll-driven Metis session",
    terminalDemo: "Metis terminal demo",
    demoScene: "Demo scene",
    of: "of",
    viewChapter: "View chapter",
    proofIndex: "02 / PRACTICAL OUTCOME",
    proofTitle: "Less time in one same-task user comparison.",
    baseline: "Baseline",
    proofNote: "One user test, not a universal benchmark. Results vary by task, model, tools, and environment.",
    principlesIndex: "03 / DESIGN PRINCIPLES",
    principlesLine: "Reliable by habit,",
    principlesEmphasis: "not by hope.",
    principlesCopy: "Metis makes disciplined agent behavior part of the harness.",
    principles: [
      ["⌕", "No action before search", "Investigate code and constraints before making changes."],
      ["◇", "No context left to chance", "Load instructions, skills, and relevant experience up front."],
      ["↻", "No lesson learned twice", "Carry durable technical knowledge into later sessions."],
      ["≋", "No long task without state", "Append-only logs preserve decisions, errors, and next steps."],
      ["✓", "No “done” without proof", "Build, test, inspect, and check every requirement."],
      ["⌁", "No single interface lock-in", "TUI, Print/JSON, RPC, and SDK use the same agent layer."],
    ],
    ctaEyebrow: "open source · MIT licensed",
    ctaLine: "Give your model",
    ctaEmphasis: "a better way to work.",
    githubCta: "View on GitHub ↗",
    footerCopy: "Better context. Reusable experience. Verified results.",
    footerLabel: "Footer links",
    footerCredit: "MIT License · Built by Wholiver",
  },
  zh: {
    homeLabel: "Metis 首页",
    navigationLabel: "主导航",
    navWhy: "为何选择",
    navHow: "工作方式",
    navPrinciples: "设计原则",
    navDocs: "文档",
    heroEyebrow: "终端优先的编程 Agent",
    heroLine: "你的模型会写代码。",
    heroEmphasis: "Metis 帮它完成工作。",
    heroCopy: "为你已经在用的模型补上更好的上下文、可复用的经验，以及经过验证的结果。",
    installLabel: "安装 Metis",
    packageManagerLabel: "包管理器",
    copyCommand: "复制安装命令",
    copied: "已复制",
    copy: "复制",
    scrollCue: "看看模型周围的系统",
    whyIndex: "01 / 为何选择 METIS",
    thesisOverline: "相同的底层模型。",
    thesisLine: "用更好的方式",
    thesisEmphasis: "搜索、记忆、工作与检查。",
    thesisCopy: "Metis 不会替换模型，也不会改变模型权重。它强化模型周围的系统，让模型从更好的证据出发，保留有用经验，并用验证结果完成工作。",
    live: "实时",
    terminalCaption: "滚动驱动的 Metis 会话",
    terminalDemo: "Metis 终端演示",
    demoScene: "演示场景",
    of: "/",
    viewChapter: "查看章节",
    proofIndex: "02 / 实际结果",
    proofTitle: "在一次相同任务的用户对比中，用时减少。",
    baseline: "基准",
    proofNote: "这是一次用户测试，并非通用基准。结果会随任务、模型、工具和环境而变化。",
    principlesIndex: "03 / 设计原则",
    principlesLine: "可靠源于习惯，",
    principlesEmphasis: "而不是期待。",
    principlesCopy: "Metis 把严谨的 Agent 行为纳入运行框架。",
    principles: [
      ["⌕", "行动前必须搜索", "改动前先调查代码与约束。"],
      ["◇", "上下文不靠运气", "预先加载指令、技能与相关经验。"],
      ["↻", "经验不重复学习", "把耐久的技术知识带入后续会话。"],
      ["≋", "长任务必须保留状态", "追加式日志保存决策、错误与下一步。"],
      ["✓", "没有证据，不算完成", "构建、测试、检查，并核对每项要求。"],
      ["⌁", "不绑定单一界面", "TUI、Print/JSON、RPC 与 SDK 共用同一 Agent 层。"],
    ],
    ctaEyebrow: "开源 · MIT 许可",
    ctaLine: "让你的模型",
    ctaEmphasis: "用更好的方式工作。",
    githubCta: "前往 GitHub ↗",
    footerCopy: "更好的上下文。可复用的经验。经过验证的结果。",
    footerLabel: "页脚链接",
    footerCredit: "MIT 许可 · Wholiver 构建",
  },
} as const;

const chaptersByLanguage = {
  en: [
  {
    number: "01",
    kicker: "CONTEXT BEFORE CODE",
    title: "Give the model the right starting point.",
    copy: "Metis loads project instructions, relevant skills, and prior technical knowledge before substantive work begins. Better context changes the quality of every decision that follows.",
    note: "AGENTS.md · skills · brain map",
  },
  {
    number: "02",
    kicker: "SEARCH BEFORE ACTION",
    title: "Understand the repository. Then touch it.",
    copy: "Metis traces existing code, tests, ownership, and constraints before editing. That means fewer unsupported assumptions, smaller changes, and stronger compatibility.",
    note: "repository search · authoritative sources",
  },
  {
    number: "03",
    kicker: "MEMORY & LESSONS",
    title: "Experience compounds across sessions.",
    copy: "Useful decisions and hard-won technical lessons remain available after the session ends. The next task starts with evidence instead of rediscovery.",
    note: "reusable knowledge · weighted recall",
  },
  {
    number: "04",
    kicker: "DREAM",
    title: "Completed work becomes durable knowledge.",
    copy: "Dream reviews the full work history, filters routine noise, and promotes only genuinely reusable insights into structured memories and lessons.",
    note: "consolidate · connect · clean up",
  },
  {
    number: "05",
    kicker: "VERIFIED COMPLETION",
    title: "“Done” is an evidence-backed state.",
    copy: "Metis builds, tests, inspects output, and compares the result against every original requirement before reporting completion.",
    note: "build · test · inspect · compare",
  },
  {
    number: "06",
    kicker: "ONE AGENT LAYER",
    title: "Terminal-first. Not terminal-only.",
    copy: "Work in the interactive TUI, compose Metis in scripts with Print or JSON, integrate over RPC, or embed it with the Node.js SDK.",
    note: "TUI · Print/JSON · RPC · SDK",
  },
  ],
  zh: [
    {
      number: "01",
      kicker: "代码之前，先有上下文",
      title: "给模型正确的起点。",
      copy: "Metis 会在实质工作开始前加载项目指令、相关技能与既有技术知识。更好的上下文会改变之后每个决策的质量。",
      note: "AGENTS.md · 技能 · brain map",
    },
    {
      number: "02",
      kicker: "行动之前，先搜索",
      title: "先理解代码库，再动手。",
      copy: "Metis 会在编辑前追踪现有代码、测试、归属与约束，从而减少无依据的假设，让改动更小、兼容性更强。",
      note: "代码库搜索 · 权威来源",
    },
    {
      number: "03",
      kicker: "记忆与经验",
      title: "经验会跨会话累积。",
      copy: "有用的决策与来之不易的技术经验，会在会话结束后继续保留。下一项任务从证据出发，而不是重新摸索。",
      note: "可复用知识 · 加权召回",
    },
    {
      number: "04",
      kicker: "DREAM",
      title: "已完成的工作成为耐久知识。",
      copy: "Dream 审阅完整工作历史，过滤常规噪声，只把真正可复用的洞见提升为结构化记忆与经验。",
      note: "整理 · 连接 · 清理",
    },
    {
      number: "05",
      kicker: "经过验证的完成",
      title: "“完成”是一种有证据的状态。",
      copy: "Metis 会执行构建、测试、检查输出，并在报告完成前逐项核对最初要求。",
      note: "构建 · 测试 · 检查 · 核对",
    },
    {
      number: "06",
      kicker: "统一的 AGENT 层",
      title: "终端优先，但不只限于终端。",
      copy: "可在交互式 TUI 中工作，通过 Print 或 JSON 编排脚本，经 RPC 集成，或使用 Node.js SDK 嵌入 Metis。",
      note: "TUI · Print/JSON · RPC · SDK",
    },
  ],
} as const;

function MetisTerminal({ sceneIndex, label }: { sceneIndex: number; label: string }) {
  const scene = terminalScenes[sceneIndex];

  return (
    <div className="tui-frame" aria-live="polite" aria-label={`${label}: ${scene.label}`}>
      <div className="tui-screen">
        <div className="tui-session-label"><span>metis</span><small>{scene.label}</small></div>
        <div className="tui-scene" key={sceneIndex}>
          {scene.lines.map((line, index) => (
            <p className={`tui-line ${line.kind}`} style={{ "--delay": `${index * 65}ms` } as React.CSSProperties} key={`${line.kind}-${index}`}>
              {line.text}
            </p>
          ))}
        </div>
        <div className="tui-input" aria-hidden="true"><span>❯</span><i /></div>
        <div className="tui-footer">
          <span>~/Documents/metis_v2 <b>(main)</b></span>
          <span>{scene.status} <b>· Dream: Ready</b></span>
          <span>{scene.model}</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { language, setLanguage } = useLanguage();
  const copy = homeCopy[language];
  const chapters = chaptersByLanguage[language];
  const [manager, setManager] = useState<PackageManager>("npm");
  const [copied, setCopied] = useState(false);
  const [activeScene, setActiveScene] = useState(0);
  const chapterRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveScene(Number((visible.target as HTMLElement).dataset.scene));
      },
      { rootMargin: "-28% 0px -42%", threshold: [0.05, 0.25, 0.5] },
    );

    chapterRefs.current.forEach((element) => element && observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const copyInstall = useCallback(async () => {
    await navigator.clipboard.writeText(installCommands[manager]);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }, [manager]);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label={copy.homeLabel}>
          <Image src="/metis-mark.svg" alt="" width={30} height={30} priority />
          <span>metis</span>
        </a>
        <nav className="nav-links" aria-label={copy.navigationLabel}>
          <a href="#why">{copy.navWhy}</a>
          <a href="#story">{copy.navHow}</a>
          <a href="#principles">{copy.navPrinciples}</a>
          <a href="/docs">{copy.navDocs}</a>
        </nav>
        <div className="header-actions">
          <LanguageSwitcher language={language} onChange={setLanguage} />
          <a className="github-link" href="https://github.com/Wholiver/metis" target="_blank" rel="noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <section className="hero graph-paper" id="top">
        <div className="hero-ruler ruler-left" aria-hidden="true" />
        <div className="hero-ruler ruler-right" aria-hidden="true" />
        <div className="hero-mark" aria-hidden="true">
          <Image src="/metis-mark.svg" alt="" width={90} height={90} priority />
        </div>
        <p className="eyebrow"><span /> {copy.heroEyebrow}</p>
        <h1>
          {copy.heroLine}
          <em>{copy.heroEmphasis}</em>
        </h1>
        <p className="hero-copy">
          {copy.heroCopy}
        </p>

        <div className="install-shell" aria-label={copy.installLabel}>
          <div className="manager-tabs" role="tablist" aria-label={copy.packageManagerLabel}>
            {(Object.keys(installCommands) as PackageManager[]).map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={manager === item}
                onClick={() => { setManager(item); setCopied(false); }}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="install-command">
            <span aria-hidden="true">$</span>
            <code>{installCommands[manager]}</code>
            <button type="button" onClick={copyInstall} aria-label={copy.copyCommand}>
              {copied ? copy.copied : copy.copy}
            </button>
          </div>
        </div>

        <a className="scroll-cue" href="#why"><span>↓</span> {copy.scrollCue}</a>
      </section>

      <section className="thesis" id="why">
        <div className="section-index">{copy.whyIndex}</div>
        <div>
          <p className="thesis-overline">{copy.thesisOverline}</p>
          <h2>{copy.thesisLine}<br /><em>{copy.thesisEmphasis}</em></h2>
        </div>
        <p>{copy.thesisCopy}</p>
      </section>

      <section className="story" id="story">
        <div className="story-terminal">
          <div className="terminal-sticky">
            <p className="terminal-caption"><span>{copy.live}</span> {copy.terminalCaption}</p>
            <MetisTerminal sceneIndex={activeScene} label={copy.terminalDemo} />
            <div className="scene-progress" aria-label={`${copy.demoScene} ${activeScene + 1} ${copy.of} ${chapters.length}`}>
              {chapters.map((chapter, index) => (
                <button
                  key={chapter.number}
                  className={activeScene === index ? "active" : ""}
                  onClick={() => chapterRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" })}
                  aria-label={`${copy.viewChapter} ${chapter.number}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="story-copy">
          {chapters.map((chapter, index) => (
            <article
              key={chapter.number}
              ref={(element) => { chapterRefs.current[index] = element; }}
              data-scene={index}
              className={activeScene === index ? "active" : ""}
            >
              <div className="chapter-number">{chapter.number}</div>
              <p className="chapter-kicker">{chapter.kicker}</p>
              <h2>{chapter.title}</h2>
              <p className="chapter-copy">{chapter.copy}</p>
              <code>{chapter.note}</code>
            </article>
          ))}
        </div>
      </section>

      <section className="proof graph-paper">
        <div className="section-index">{copy.proofIndex}</div>
        <div className="proof-number">57<sup>%</sup></div>
        <div className="proof-copy">
          <h2>{copy.proofTitle}</h2>
          <div className="comparison">
            <div><span>Metis</span><i className="metis-bar">1m 30s</i></div>
            <div><span>{copy.baseline}</span><i className="base-bar">3m 30s</i></div>
          </div>
          <small>{copy.proofNote}</small>
        </div>
      </section>

      <section className="principles" id="principles">
        <div className="principles-heading">
          <div className="section-index">{copy.principlesIndex}</div>
          <h2>{copy.principlesLine}<br /><em>{copy.principlesEmphasis}</em></h2>
          <p>{copy.principlesCopy}</p>
        </div>
        <div className="principle-grid">
          {copy.principles.map(([icon, title, description]) => (
            <article key={title}><span>{icon}</span><h3>{title}</h3><p>{description}</p></article>
          ))}
        </div>
      </section>

      <section className="final-cta graph-paper">
        <div className="hero-mark cta-mark" aria-hidden="true">
          <Image src="/metis-mark.svg" alt="" width={76} height={76} />
        </div>
        <p className="eyebrow"><span /> {copy.ctaEyebrow}</p>
        <h2>{copy.ctaLine}<br /><em>{copy.ctaEmphasis}</em></h2>
        <div className="cta-actions">
          <button type="button" onClick={copyInstall}>$ {installCommands[manager]}</button>
          <a href="https://github.com/Wholiver/metis" target="_blank" rel="noreferrer">{copy.githubCta}</a>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top">
          <Image src="/metis-mark.svg" alt="" width={26} height={26} />
          <span>metis</span>
        </a>
        <p>{copy.footerCopy}</p>
        <nav aria-label={copy.footerLabel}>
          <a href="https://www.npmjs.com/package/@wholiver_hu/metis" target="_blank" rel="noreferrer">npm</a>
          <a href="/docs">{copy.navDocs}</a>
          <a href="https://github.com/Wholiver/metis" target="_blank" rel="noreferrer">GitHub</a>
        </nav>
        <small>{copy.footerCredit}</small>
      </footer>
    </main>
  );
}
