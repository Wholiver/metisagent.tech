"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type DocLink = {
  title: string;
  description: string;
  href: string;
  group: string;
};

const githubDocs = "https://github.com/Wholiver/metis/blob/main/docs";

const groups: Array<{ id: string; title: string; links: DocLink[] }> = [
  {
    id: "start-here",
    title: "Start here",
    links: [
      { title: "Quickstart", description: "Install, authenticate, and run your first useful session.", href: `${githubDocs}/quickstart.md`, group: "Start here" },
      { title: "Using Metis", description: "Interactive mode, commands, context files, and CLI reference.", href: `${githubDocs}/usage.md`, group: "Start here" },
      { title: "Providers", description: "Subscription login, API keys, and supported model providers.", href: `${githubDocs}/providers.md`, group: "Start here" },
      { title: "Security", description: "Project trust, local permissions, and external isolation guidance.", href: `${githubDocs}/security.md`, group: "Start here" },
      { title: "Containerization", description: "Isolate Metis with Gondolin, Docker, or OpenShell.", href: `${githubDocs}/containerization.md`, group: "Start here" },
      { title: "Settings", description: "Global and project configuration.", href: `${githubDocs}/settings.md`, group: "Start here" },
      { title: "Keybindings", description: "Default shortcuts and custom keybindings.", href: `${githubDocs}/keybindings.md`, group: "Start here" },
      { title: "Sessions", description: "Resume, branch, fork, clone, and navigate session trees.", href: `${githubDocs}/sessions.md`, group: "Start here" },
      { title: "Compaction", description: "Context compaction and branch summarization.", href: `${githubDocs}/compaction.md`, group: "Start here" },
    ],
  },
  {
    id: "reliability",
    title: "Reliability",
    links: [
      { title: "Memory & Lessons", description: "Reuse decisions, project knowledge, and hard-won technical lessons.", href: "https://github.com/Wholiver/metis#memory-and-lessons", group: "Reliability" },
      { title: "Dream", description: "Consolidate completed work into durable, structured experience.", href: "https://github.com/Wholiver/metis#dream", group: "Reliability" },
      { title: "Search before action", description: "Investigate repositories and authoritative sources before editing.", href: "https://github.com/Wholiver/metis#search-before-action", group: "Reliability" },
      { title: "Logs & verification", description: "Preserve task state and prove completion against requirements.", href: "https://github.com/Wholiver/metis#logs-and-verification", group: "Reliability" },
    ],
  },
  {
    id: "customization",
    title: "Customization",
    links: [
      { title: "Extensions", description: "TypeScript modules for tools, commands, events, and custom UI.", href: `${githubDocs}/extensions.md`, group: "Customization" },
      { title: "Skills", description: "Reusable on-demand capabilities with progressive disclosure.", href: `${githubDocs}/skills.md`, group: "Customization" },
      { title: "Prompt templates", description: "Reusable prompts expanded from slash commands.", href: `${githubDocs}/prompt-templates.md`, group: "Customization" },
      { title: "Themes", description: "Built-in themes, tokens, and custom terminal styling.", href: `${githubDocs}/themes.md`, group: "Customization" },
      { title: "Metis packages", description: "Bundle and share extensions, skills, prompts, and themes.", href: `${githubDocs}/packages.md`, group: "Customization" },
      { title: "Custom models", description: "Add model entries for supported provider APIs.", href: `${githubDocs}/models.md`, group: "Customization" },
      { title: "Custom providers", description: "Implement custom APIs and OAuth flows.", href: `${githubDocs}/custom-provider.md`, group: "Customization" },
    ],
  },
  {
    id: "programmatic",
    title: "Programmatic usage",
    links: [
      { title: "SDK", description: "Embed Metis in Node.js applications.", href: `${githubDocs}/sdk.md`, group: "Programmatic usage" },
      { title: "RPC mode", description: "Integrate over a stdin/stdout JSONL protocol.", href: `${githubDocs}/rpc.md`, group: "Programmatic usage" },
      { title: "JSON event stream", description: "Run print mode with structured events.", href: `${githubDocs}/json.md`, group: "Programmatic usage" },
      { title: "TUI components", description: "Build terminal interfaces for extensions.", href: `${githubDocs}/tui.md`, group: "Programmatic usage" },
    ],
  },
  {
    id: "reference",
    title: "Reference",
    links: [
      { title: "Session format", description: "JSONL entries, trees, metadata, and SessionManager behavior.", href: `${githubDocs}/session-format.md`, group: "Reference" },
    ],
  },
  {
    id: "platform",
    title: "Platform setup",
    links: [
      { title: "Windows", description: "Configure the shell executable used on Windows.", href: `${githubDocs}/windows.md`, group: "Platform setup" },
      { title: "Termux on Android", description: "Run Metis in Termux.", href: `${githubDocs}/termux.md`, group: "Platform setup" },
      { title: "tmux", description: "Recommended configuration and key behavior.", href: `${githubDocs}/tmux.md`, group: "Platform setup" },
      { title: "Terminal setup", description: "Colors, key protocols, and terminal compatibility.", href: `${githubDocs}/terminal-setup.md`, group: "Platform setup" },
      { title: "Shell aliases", description: "Useful shell integrations and aliases.", href: `${githubDocs}/shell-aliases.md`, group: "Platform setup" },
    ],
  },
  {
    id: "development",
    title: "Development",
    links: [
      { title: "Development guide", description: "Local setup, project structure, builds, and debugging.", href: `${githubDocs}/development.md`, group: "Development" },
      { title: "Contributing", description: "Repository contribution guidance and required checks.", href: "https://github.com/Wholiver/metis/blob/main/CONTRIBUTING.md", group: "Development" },
    ],
  },
];

const flatLinks = groups.flatMap((group) => group.links);
const installCommand = "npm i -g @wholiver_hu/metis@rc";

export default function DocsPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return flatLinks;
    return flatLinks.filter((link) => `${link.title} ${link.description} ${link.group}`.toLowerCase().includes(normalized));
  }, [query]);

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
        <a className="docs-brand" href="/" aria-label="Metis home">
          <Image src="/metis-mark.svg" alt="" width={28} height={28} priority />
          <span>metis</span><small>docs</small>
        </a>
        <nav aria-label="Documentation navigation">
          <a href="/">Home</a>
          <a className="active" href="/docs">Docs</a>
          <a href="https://github.com/Wholiver/metis" target="_blank" rel="noreferrer">GitHub ↗</a>
        </nav>
        <button className="docs-search-trigger" type="button" aria-label="Search documentation" onClick={() => setSearchOpen(true)}>
          <span>Search documentation</span><kbd>⌘ K</kbd>
        </button>
      </header>

      <div className="docs-shell">
        <aside className="docs-sidebar" aria-label="Documentation sections">
          <p>Navigation</p>
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
            <p className="docs-eyebrow">DOCUMENTATION</p>
            <h1>Metis Documentation</h1>
            <div className="version-badge"><span>RC</span><b>v1.1.0-rc.1</b></div>
            <p>Guides and references for using, configuring, extending, and embedding Metis.</p>
          </div>

          <section className="docs-section quickstart-section" id="quick-start">
            <div className="section-title-row">
              <h2>Quick start</h2>
              <a href="#quick-start" aria-label="Link to Quick start">#</a>
            </div>
            <p>Requires Node.js <code>&gt;=22.19.0</code>. Install the <code>rc</code> release from npm:</p>
            <div className="docs-code-block">
              <code><span>$</span> {installCommand}</code>
              <button type="button" onClick={copyInstall}>{copied ? "Copied" : "Copy"}</button>
            </div>
            <p>Start Metis inside the project you want it to understand:</p>
            <div className="docs-code-block compact"><code><span>$</span> cd /path/to/project<br /><span>$</span> metis</code></div>
            <p>Use <code>/login</code> for subscription providers, or configure an API key before launching. Then type a request and press Enter.</p>
            <div className="docs-callout">
              <span>TIP</span>
              <p>Add an <code>AGENTS.md</code> file to give Metis project-specific instructions, constraints, and verification commands.</p>
            </div>
          </section>

          {groups.map((group) => (
            <section className="docs-section" id={group.id} key={group.id}>
              <div className="section-title-row">
                <h2>{group.title}</h2>
                <a href={`#${group.id}`} aria-label={`Link to ${group.title}`}>#</a>
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
            <span>Next step</span>
            <a href={`${githubDocs}/quickstart.md`} target="_blank" rel="noreferrer">
              <small>START HERE</small>
              <strong>Quickstart</strong>
              <i>→</i>
            </a>
          </div>

          <footer className="docs-footer">
            <span>Metis · MIT License</span>
            <a href="https://github.com/Wholiver/metis" target="_blank" rel="noreferrer">GitHub</a>
          </footer>
        </article>

        <aside className="docs-toc" aria-label="On this page">
          <p>On this page</p>
          <a href="#quick-start">Quick start</a>
          {groups.map((group) => <a href={`#${group.id}`} key={group.id}>{group.title}</a>)}
        </aside>
      </div>

      {searchOpen && (
        <div className="search-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setSearchOpen(false)}>
          <section className="search-dialog" role="dialog" aria-modal="true" aria-label="Search documentation">
            <div className="search-input-row">
              <span aria-hidden="true">⌕</span>
              <input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Metis documentation…" aria-label="Search query" />
              <kbd>Esc</kbd>
            </div>
            <div className="search-results">
              {results.length ? results.slice(0, 10).map((link) => (
                <a href={link.href} target="_blank" rel="noreferrer" key={`${link.group}-${link.title}`}>
                  <span><small>{link.group}</small><strong>{link.title}</strong></span>
                  <i>↗</i>
                </a>
              )) : <p>No documentation found for “{query}”.</p>}
            </div>
            <div className="search-footer"><span>Type to filter</span><span>Esc Close</span></div>
          </section>
        </div>
      )}
    </main>
  );
}
