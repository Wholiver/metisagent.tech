"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Language, LanguageSwitcher, useLanguage } from "../language-switcher";

type LocalizedText = Record<Language, string>;
type DocLinkSource = { title: LocalizedText; description: LocalizedText; href: string };
type DocGroupSource = { id: string; title: LocalizedText; links: DocLinkSource[] };
type DocLink = { title: string; description: string; href: string; group: string };

const githubDocs = "https://github.com/Wholiver/metis/blob/main/docs";
const localized = (en: string, zh: string): LocalizedText => ({ en, zh });

const groupSources: DocGroupSource[] = [
  {
    id: "start-here",
    title: localized("Start here", "开始使用"),
    links: [
      { title: localized("Quickstart", "快速开始"), description: localized("Install, authenticate, and run your first useful session.", "完成安装与认证，开始第一次 Metis 会话。"), href: `${githubDocs}/quickstart.md` },
      { title: localized("Using Metis", "使用 Metis"), description: localized("Interactive mode, commands, context files, and CLI reference.", "了解交互模式、斜杠命令、上下文文件和 CLI 用法。"), href: `${githubDocs}/usage.md` },
      { title: localized("Providers", "模型提供商"), description: localized("Subscription login, API keys, and supported model providers.", "配置订阅登录、API 密钥和模型提供商。"), href: `${githubDocs}/providers.md` },
      { title: localized("Security", "安全"), description: localized("Project trust, local permissions, and external isolation guidance.", "了解项目信任、本地权限和外部隔离方式。"), href: `${githubDocs}/security.md` },
      { title: localized("Containerization", "容器化"), description: localized("Isolate Metis with Gondolin, Docker, or OpenShell.", "使用 Gondolin、Docker 或 OpenShell，为 Metis 提供隔离环境。"), href: `${githubDocs}/containerization.md` },
      { title: localized("Settings", "设置"), description: localized("Global and project configuration.", "配置全局设置和项目设置。"), href: `${githubDocs}/settings.md` },
      { title: localized("Keybindings", "快捷键"), description: localized("Default shortcuts and custom keybindings.", "查看默认快捷键，或自定义按键绑定。"), href: `${githubDocs}/keybindings.md` },
      { title: localized("Sessions", "会话"), description: localized("Resume, branch, fork, clone, and navigate session trees.", "恢复会话、创建分支、派生或克隆会话，以及浏览会话树。"), href: `${githubDocs}/sessions.md` },
      { title: localized("Compaction", "上下文压缩"), description: localized("Context compaction and branch summarization.", "了解上下文压缩和分支摘要机制。"), href: `${githubDocs}/compaction.md` },
    ],
  },
  {
    id: "reliability",
    title: localized("Reliability", "可靠性"),
    links: [
      { title: localized("Memory & Lessons", "记忆与经验"), description: localized("Reuse decisions, project knowledge, and hard-won technical lessons.", "复用过往决策、项目知识和技术经验。"), href: "https://github.com/Wholiver/metis#memory-and-lessons" },
      { title: localized("Dream", "Dream"), description: localized("Consolidate completed work into durable, structured experience.", "把一次任务里的有效经验，整理成以后还能用的知识。"), href: "https://github.com/Wholiver/metis#dream" },
      { title: localized("Search before action", "先搜索，再行动"), description: localized("Investigate repositories and authoritative sources before editing.", "改代码前，先查代码库和权威资料。"), href: "https://github.com/Wholiver/metis#search-before-action" },
      { title: localized("Logs & verification", "日志与验证"), description: localized("Preserve task state and prove completion against requirements.", "记录任务状态，并用验证结果证明工作已经完成。"), href: "https://github.com/Wholiver/metis#logs-and-verification" },
    ],
  },
  {
    id: "customization",
    title: localized("Customization", "定制与扩展"),
    links: [
      { title: localized("Extensions", "扩展"), description: localized("TypeScript modules for tools, commands, events, and custom UI.", "用 TypeScript 扩展工具、命令、事件和界面。"), href: `${githubDocs}/extensions.md` },
      { title: localized("Skills", "Skills"), description: localized("Reusable on-demand capabilities with progressive disclosure.", "把常用工作流封装成按需加载的 Skills。"), href: `${githubDocs}/skills.md` },
      { title: localized("Prompt templates", "提示词模板"), description: localized("Reusable prompts expanded from slash commands.", "用斜杠命令调用可复用的提示词模板。"), href: `${githubDocs}/prompt-templates.md` },
      { title: localized("Themes", "主题"), description: localized("Built-in themes, tokens, and custom terminal styling.", "选择内置主题，或自定义终端样式。"), href: `${githubDocs}/themes.md` },
      { title: localized("Metis packages", "Metis Packages"), description: localized("Bundle and share extensions, skills, prompts, and themes.", "把扩展、Skills、提示词和主题打包分享。"), href: `${githubDocs}/packages.md` },
      { title: localized("Custom models", "自定义模型"), description: localized("Add model entries for supported provider APIs.", "为受支持的 Provider API 添加模型。"), href: `${githubDocs}/models.md` },
      { title: localized("Custom providers", "自定义 Provider"), description: localized("Implement custom APIs and OAuth flows.", "接入自定义 API 和 OAuth 登录流程。"), href: `${githubDocs}/custom-provider.md` },
    ],
  },
  {
    id: "programmatic",
    title: localized("Programmatic usage", "程序化接入"),
    links: [
      { title: localized("SDK", "SDK"), description: localized("Embed Metis in Node.js applications.", "在 Node.js 应用中直接调用 Metis。"), href: `${githubDocs}/sdk.md` },
      { title: localized("RPC mode", "RPC 模式"), description: localized("Integrate over a stdin/stdout JSONL protocol.", "通过 stdin/stdout 上的 JSONL 协议接入 Metis。"), href: `${githubDocs}/rpc.md` },
      { title: localized("JSON event stream", "JSON 事件流"), description: localized("Run print mode with structured events.", "用结构化 JSON 事件接收运行过程。"), href: `${githubDocs}/json.md` },
      { title: localized("TUI components", "TUI 组件"), description: localized("Build terminal interfaces for extensions.", "为扩展开发自定义终端界面。"), href: `${githubDocs}/tui.md` },
    ],
  },
  {
    id: "reference",
    title: localized("Reference", "格式与参考"),
    links: [
      { title: localized("Session format", "会话格式"), description: localized("JSONL entries, trees, metadata, and SessionManager behavior.", "了解 JSONL 条目、会话树、元数据和 SessionManager。"), href: `${githubDocs}/session-format.md` },
    ],
  },
  {
    id: "platform",
    title: localized("Platform setup", "平台配置"),
    links: [
      { title: localized("Windows", "Windows"), description: localized("Configure the shell executable used on Windows.", "设置 Metis 在 Windows 上使用的 Shell。"), href: `${githubDocs}/windows.md` },
      { title: localized("Termux on Android", "Android 上的 Termux"), description: localized("Run Metis in Termux.", "在 Termux 中运行 Metis。"), href: `${githubDocs}/termux.md` },
      { title: localized("tmux", "tmux"), description: localized("Recommended configuration and key behavior.", "使用推荐配置，避免按键行为异常。"), href: `${githubDocs}/tmux.md` },
      { title: localized("Terminal setup", "终端设置"), description: localized("Colors, key protocols, and terminal compatibility.", "调整颜色、按键协议和终端兼容性。"), href: `${githubDocs}/terminal-setup.md` },
      { title: localized("Shell aliases", "Shell 别名"), description: localized("Useful shell integrations and aliases.", "添加常用的 Shell 集成和命令别名。"), href: `${githubDocs}/shell-aliases.md` },
    ],
  },
  {
    id: "development",
    title: localized("Development", "开发"),
    links: [
      { title: localized("Development guide", "开发指南"), description: localized("Local setup, project structure, builds, and debugging.", "搭建本地开发环境，了解项目结构、构建和调试。"), href: `${githubDocs}/development.md` },
      { title: localized("Contributing", "参与贡献"), description: localized("Repository contribution guidance and required checks.", "提交改动前，请先了解贡献规范和必需检查。"), href: "https://github.com/Wholiver/metis/blob/main/CONTRIBUTING.md" },
    ],
  },
];

const installCommand = "npm i -g @wholiver_hu/metis@rc";

const docsCopy = {
  en: {
    homeLabel: "Metis home", navLabel: "Documentation navigation", home: "Home", docs: "Docs",
    search: "Search documentation", navigation: "Navigation", sectionsLabel: "Documentation sections",
    eyebrow: "DOCUMENTATION", title: "Metis Documentation", hero: "Guides and references for using, configuring, extending, and embedding Metis.",
    quickStart: "Quick start", quickStartLink: "Link to Quick start",
    requirements: "Requires Node.js", installLead: "Install the", installTail: "release from npm:",
    copied: "Copied", copy: "Copy", start: "Start Metis inside the project you want it to understand:",
    loginLead: "Use", loginTail: "for subscription providers, or configure an API key before launching. Then type a request and press Enter.",
    tip: "TIP", tipLead: "Add an", tipText: "file to give Metis project-specific instructions, constraints, and verification commands.",
    linkTo: "Link to", next: "Next step", startHere: "START HERE", onPage: "On this page",
    searchDialog: "Search documentation", searchPlaceholder: "Search Metis documentation…", searchQuery: "Search query",
    noResults: "No documentation found for", filter: "Type to filter", close: "Esc Close",
    license: "Metis · MIT License",
  },
  zh: {
    homeLabel: "Metis 首页", navLabel: "文档导航", home: "首页", docs: "文档",
    search: "搜索文档", navigation: "文档目录", sectionsLabel: "文档章节",
    eyebrow: "文档", title: "Metis 文档", hero: "从安装使用到自定义扩展与程序化接入，Metis 的完整指南都在这里。",
    quickStart: "快速开始", quickStartLink: "链接到快速开始",
    requirements: "需要 Node.js", installLead: "从 npm 安装", installTail: "版本：",
    copied: "已复制", copy: "复制", start: "进入你希望 Metis 处理的项目目录，然后启动：",
    loginLead: "使用订阅账号时，启动后运行", loginTail: "完成登录；使用 API 密钥时，请先配置环境变量。准备好后，输入任务并按 Enter。",
    tip: "提示", tipLead: "建议在项目中添加", tipText: "，写明项目约定、操作限制和验证命令。",
    linkTo: "链接到", next: "接下来", startHere: "先从这里开始", onPage: "本页内容",
    searchDialog: "搜索文档", searchPlaceholder: "搜索 Metis 文档…", searchQuery: "搜索关键词",
    noResults: "没有找到与这个关键词相关的文档：", filter: "输入关键词即可筛选", close: "Esc 关闭",
    license: "Metis · MIT 许可",
  },
} as const;

export default function DocsPage() {
  const { language, setLanguage } = useLanguage();
  const copy = docsCopy[language];
  const groups = useMemo(() => groupSources.map((group) => ({
    id: group.id,
    title: group.title[language],
    links: group.links.map((link): DocLink => ({
      title: link.title[language],
      description: link.description[language],
      href: link.href,
      group: group.title[language],
    })),
  })), [language]);
  const flatLinks = useMemo(() => groups.flatMap((group) => group.links), [groups]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return flatLinks;
    return flatLinks.filter((link) => `${link.title} ${link.description} ${link.group}`.toLowerCase().includes(normalized));
  }, [flatLinks, query]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (searchOpen) window.setTimeout(() => inputRef.current?.focus(), 0);
    else setQuery("");
  }, [searchOpen]);

  const copyInstall = async () => {
    await navigator.clipboard.writeText(installCommand);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <main className="docs-page">
      <header className="docs-header">
        <a className="docs-brand" href="/" aria-label={copy.homeLabel}>
          <Image src="/metis-mark.svg" alt="" width={28} height={28} priority />
          <span>metis</span><small>docs</small>
        </a>
        <nav aria-label={copy.navLabel}>
          <a href="/">{copy.home}</a>
          <a className="active" href="/docs">{copy.docs}</a>
          <a href="https://github.com/Wholiver/metis" target="_blank" rel="noreferrer">GitHub ↗</a>
        </nav>
        <div className="docs-actions">
          <LanguageSwitcher language={language} onChange={setLanguage} />
          <button className="docs-search-trigger" type="button" aria-label={copy.search} onClick={() => setSearchOpen(true)}>
            <span>{copy.search}</span><kbd>⌘ K</kbd>
          </button>
        </div>
      </header>

      <div className="docs-shell">
        <aside className="docs-sidebar" aria-label={copy.sectionsLabel}>
          <p>{copy.navigation}</p>
          {groups.map((group) => (
            <div className="sidebar-group" key={group.id}>
              <a href={`#${group.id}`}>{group.title}</a>
              {group.links.slice(0, group.id === "start-here" ? 9 : 5).map((link) => (
                <a href={link.href} target="_blank" rel="noreferrer" key={link.title}>{link.title}</a>
              ))}
            </div>
          ))}
        </aside>

        <article className="docs-content">
          <div className="docs-hero">
            <p className="docs-eyebrow">{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <div className="version-badge"><span>RC</span><b>v1.1.0-rc.1</b></div>
            <p>{copy.hero}</p>
          </div>

          <section className="docs-section quickstart-section" id="quick-start">
            <div className="section-title-row">
              <h2>{copy.quickStart}</h2>
              <a href="#quick-start" aria-label={copy.quickStartLink}>#</a>
            </div>
            <p>{copy.requirements} <code>&gt;=22.19.0</code>. {copy.installLead} <code>rc</code> {copy.installTail}</p>
            <div className="docs-code-block">
              <code><span>$</span> {installCommand}</code>
              <button type="button" onClick={copyInstall}>{copied ? copy.copied : copy.copy}</button>
            </div>
            <p>{copy.start}</p>
            <div className="docs-code-block compact"><code><span>$</span> cd /path/to/project<br /><span>$</span> metis</code></div>
            <p>{copy.loginLead} <code>/login</code> {copy.loginTail}</p>
            <div className="docs-callout">
              <span>{copy.tip}</span>
              <p>{copy.tipLead} <code>AGENTS.md</code> {copy.tipText}</p>
            </div>
          </section>

          {groups.map((group) => (
            <section className="docs-section" id={group.id} key={group.id}>
              <div className="section-title-row">
                <h2>{group.title}</h2>
                <a href={`#${group.id}`} aria-label={`${copy.linkTo} ${group.title}`}>#</a>
              </div>
              <div className="docs-link-list">
                {group.links.map((link) => (
                  <a href={link.href} target="_blank" rel="noreferrer" key={link.title}>
                    <span><strong>{link.title}</strong><small>{link.description}</small></span>
                    <i aria-hidden="true">↗</i>
                  </a>
                ))}
              </div>
            </section>
          ))}

          <div className="docs-next">
            <span>{copy.next}</span>
            <a href={`${githubDocs}/quickstart.md`} target="_blank" rel="noreferrer">
              <small>{copy.startHere}</small>
              <strong>{copy.quickStart}</strong>
              <i>→</i>
            </a>
          </div>

          <footer className="docs-footer">
            <span>{copy.license}</span>
            <a href="https://github.com/Wholiver/metis" target="_blank" rel="noreferrer">GitHub</a>
          </footer>
        </article>

        <aside className="docs-toc" aria-label={copy.onPage}>
          <p>{copy.onPage}</p>
          <a href="#quick-start">{copy.quickStart}</a>
          {groups.map((group) => <a href={`#${group.id}`} key={group.id}>{group.title}</a>)}
        </aside>
      </div>

      {searchOpen && (
        <div className="search-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setSearchOpen(false)}>
          <section className="search-dialog" role="dialog" aria-modal="true" aria-label={copy.searchDialog}>
            <div className="search-input-row">
              <span aria-hidden="true">⌕</span>
              <input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder={copy.searchPlaceholder} aria-label={copy.searchQuery} />
              <kbd>Esc</kbd>
            </div>
            <div className="search-results">
              {results.length ? results.slice(0, 10).map((link) => (
                <a href={link.href} target="_blank" rel="noreferrer" key={`${link.group}-${link.title}`}>
                  <span><small>{link.group}</small><strong>{link.title}</strong></span>
                  <i>↗</i>
                </a>
              )) : <p>{copy.noResults} “{query}”.</p>}
            </div>
            <div className="search-footer"><span>{copy.filter}</span><span>{copy.close}</span></div>
          </section>
        </div>
      )}
    </main>
  );
}
