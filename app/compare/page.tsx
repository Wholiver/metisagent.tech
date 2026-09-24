import type { Metadata } from "next";
import Link from "next/link";
import { MetisMascot } from "../metis-mascot";
import "./compare.css";
import { comparisons } from "./data";

export const metadata: Metadata = {
  title: "Metis vs Modern AI Coding Agents (2026 Comparison) | Best Alternatives",
  description:
    "Comprehensive 2026 comparison of Metis vs Claude Code, Cursor, Cline, Roo Code, Aider, Codex, and GitHub Copilot. Feature matrices, vendor lock-in analysis, and verification architecture.",
  keywords: [
    "AI coding agent comparison",
    "best AI coding agent 2026",
    "Claude Code alternative",
    "Cursor alternative",
    "Cline alternative",
    "Aider alternative",
    "open source coding agent",
    "coding agent harness",
    "Metis vs Cursor",
    "Metis vs Claude Code",
  ],
  alternates: {
    canonical: "/compare",
    languages: {
      en: "/compare",
      "zh-CN": "/compare",
    },
  },
  openGraph: {
    title: "Metis vs Modern AI Coding Agents (2026 Comparison)",
    description:
      "Comprehensive 2026 comparison of Metis vs Claude Code, Cursor, Cline, Roo Code, Aider, Codex, and GitHub Copilot.",
    url: "https://metisagent.tech/compare",
  },
};

export default function CompareHubPage() {
  const competitorList = Object.values(comparisons);

  return (
    <div className="compare-page graph-paper">
      {/* Header */}
      <header className="compare-header">
        <Link className="compare-brand" href="/">
          <MetisMascot size={26} style={{ borderRadius: 6 }} priority />
          <span>metis</span>
        </Link>
        <nav className="compare-nav">
          <Link href="/compare" className="active">
            Compare
          </Link>
          <Link href="/docs">Docs</Link>
          <a
            href="https://github.com/Wholiver/metis"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </nav>
      </header>

      {/* Main Container */}
      <main className="compare-main">
        {/* Breadcrumbs */}
        <nav className="compare-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span aria-current="page">Compare</span>
        </nav>

        {/* Hero */}
        <section className="compare-hero">
          <span className="compare-badge">2026 Industry Landscape</span>
          <h1 className="compare-title">
            Metis vs Modern AI Coding Agents
          </h1>
          <p className="compare-subtitle">
            An objective, in-depth architectural comparison between Metis and leading AI developer tools.
            Learn how Metis delivers autonomous execution verification, complete model provider independence, and zero telemetry lock-in.
          </p>
          <div className="compare-actions">
            <Link href="#matrix" className="compare-btn-primary">
              View Feature Matrix ↓
            </Link>
            <a
              href="https://github.com/Wholiver/metis"
              target="_blank"
              rel="noreferrer"
              className="compare-btn-secondary"
            >
              Star on GitHub ★
            </a>
          </div>
        </section>

        {/* Competitor Links Grid */}
        <section className="competitors-section" aria-label="Competitor Comparisons">
          <div className="competitors-grid">
            {competitorList.map((item) => (
              <Link
                key={item.slug}
                href={`/compare/${item.slug}`}
                className="competitor-card"
              >
                <div>
                  <span className="compare-badge" style={{ marginBottom: 8 }}>
                    {item.category}
                  </span>
                  <h3>Metis vs {item.competitorName}</h3>
                  <p>{item.summary}</p>
                </div>
                <span className="card-cta">
                  Full Head-to-Head Breakdown →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Full Overview Feature Matrix */}
        <section className="matrix-card" id="matrix">
          <div className="matrix-header">
            <h3>Overview Feature & Architecture Matrix</h3>
          </div>
          <div className="matrix-table-wrapper">
            <table className="matrix-table">
              <thead>
                <tr>
                  <th>Capability</th>
                  <th className="highlight">Metis</th>
                  <th>Claude Code</th>
                  <th>Cursor AI</th>
                  <th>Cline / Roo</th>
                  <th>Aider</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Open Source License</strong></td>
                  <td className="highlight"><span className="tag-yes">✓ MIT</span></td>
                  <td><span className="tag-no">✗ Closed</span></td>
                  <td><span className="tag-no">✗ Closed</span></td>
                  <td><span className="tag-yes">✓ Open</span></td>
                  <td><span className="tag-yes">✓ Open</span></td>
                </tr>
                <tr>
                  <td><strong>Model Provider Freedom</strong></td>
                  <td className="highlight"><span className="tag-yes">✓ Any (Claude, DeepSeek, OpenAI, Ollama)</span></td>
                  <td><span className="tag-no">✗ Anthropic only</span></td>
                  <td><span className="tag-partial">~ Cloud proxy</span></td>
                  <td><span className="tag-yes">✓ Multi-model</span></td>
                  <td><span className="tag-yes">✓ Multi-model</span></td>
                </tr>
                <tr>
                  <td><strong>User Interface</strong></td>
                  <td className="highlight"><strong>Terminal TUI + Desktop GUI</strong></td>
                  <td>Terminal CLI only</td>
                  <td>Forked VS Code IDE</td>
                  <td>VS Code Extension</td>
                  <td>Terminal CLI only</td>
                </tr>
                <tr>
                  <td><strong>Autonomous Test Verification</strong></td>
                  <td className="highlight"><span className="tag-yes">✓ Built-in self-healing loop</span></td>
                  <td><span className="tag-no">✗ Manual</span></td>
                  <td><span className="tag-no">✗ Manual</span></td>
                  <td><span className="tag-partial">~ Basic tools</span></td>
                  <td><span className="tag-partial">~ Lint checks</span></td>
                </tr>
                <tr>
                  <td><strong>Multi-Agent Hierarchy</strong></td>
                  <td className="highlight"><span className="tag-yes">✓ Investigator / Builder / Reviewer</span></td>
                  <td><span className="tag-partial">~ Subagents</span></td>
                  <td><span className="tag-no">✗ Single agent</span></td>
                  <td><span className="tag-no">✗ Single agent</span></td>
                  <td><span className="tag-no">✗ Single thread</span></td>
                </tr>
                <tr>
                  <td><strong>Local & Offline Inference</strong></td>
                  <td className="highlight"><span className="tag-yes">✓ Native Ollama & vLLM</span></td>
                  <td><span className="tag-no">✗ Not supported</span></td>
                  <td><span className="tag-no">✗ Not supported</span></td>
                  <td><span className="tag-yes">✓ Supported</span></td>
                  <td><span className="tag-yes">✓ Supported</span></td>
                </tr>
                <tr>
                  <td><strong>Zero Code Telemetry</strong></td>
                  <td className="highlight"><span className="tag-yes">✓ 100% Local runtime</span></td>
                  <td><span className="tag-partial">~ Anthropic policies</span></td>
                  <td><span className="tag-no">✗ Cloud indexed</span></td>
                  <td><span className="tag-yes">✓ Direct API</span></td>
                  <td><span className="tag-yes">✓ Direct API</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Deep Dive Pillars */}
        <section className="deep-dive-section">
          <h2>Why the "Harness Architecture" Changes Everything</h2>
          <div className="deep-dive-grid">
            <div className="deep-dive-card">
              <h4>1. Closing the Verification Loop</h4>
              <p>
                Most coding assistants stop once tokens are generated. Metis executes your test suites, intercepts compiler diagnostics, and repairs regressions autonomously until the task is complete.
              </p>
            </div>
            <div className="deep-dive-card">
              <h4>2. Context Compaction & Cost Optimization</h4>
              <p>
                By adopting intelligent context compaction and token pruning, Metis reduces prompt payload bloat by up to 60%, allowing you to tackle massive legacy codebases without exceeding context limits.
              </p>
            </div>
            <div className="deep-dive-card">
              <h4>3. True Freedom of Intelligence</h4>
              <p>
                Pair Claude 3.7 for high-level software architecture, DeepSeek V3 for rapid multi-file scaffolding, and local Ollama models for sensitive internal code — all within one cohesive workspace.
              </p>
            </div>
          </div>
        </section>

        {/* Install Box */}
        <div className="compare-install-box">
          <h3>Get Started with Metis in Seconds</h3>
          <p>Available as a global CLI or standalone cross-platform Desktop App.</p>
          <div className="compare-code-pill">
            <code>npm i -g @wholiver_hu/metis</code>
          </div>
          <div style={{ marginTop: 20 }}>
            <Link href="/" className="compare-btn-primary" style={{ background: "#2563eb" }}>
              Download Desktop App (.dmg / .exe) →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
