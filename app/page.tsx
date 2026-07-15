"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

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

const chapters = [
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
] as const;

function MetisTerminal({ sceneIndex }: { sceneIndex: number }) {
  const scene = terminalScenes[sceneIndex];

  return (
    <div className="tui-frame" aria-live="polite" aria-label={`Metis terminal demo: ${scene.label}`}>
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
        <a className="brand" href="#top" aria-label="Metis home">
          <Image src="/metis-mark.svg" alt="" width={30} height={30} priority />
          <span>metis</span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#why">Why</a>
          <a href="#story">How it works</a>
          <a href="#principles">Principles</a>
          <a href="https://github.com/Wholiver/metis/tree/main/docs" target="_blank" rel="noreferrer">Docs</a>
        </nav>
        <a className="github-link" href="https://github.com/Wholiver/metis" target="_blank" rel="noreferrer">
          GitHub <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero graph-paper" id="top">
        <div className="hero-ruler ruler-left" aria-hidden="true" />
        <div className="hero-ruler ruler-right" aria-hidden="true" />
        <div className="hero-mark" aria-hidden="true">
          <Image src="/metis-mark.svg" alt="" width={90} height={90} priority />
        </div>
        <p className="eyebrow"><span /> terminal-first coding agent</p>
        <h1>
          Your model knows how to code.
          <em>Metis helps it finish.</em>
        </h1>
        <p className="hero-copy">
          Better context, reusable experience, and verified results around the model you already use.
        </p>

        <div className="install-shell" aria-label="Install Metis">
          <div className="manager-tabs" role="tablist" aria-label="Package manager">
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
            <button type="button" onClick={copyInstall} aria-label="Copy install command">
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        <a className="scroll-cue" href="#why"><span>↓</span> see the system around the model</a>
      </section>

      <section className="thesis" id="why">
        <div className="section-index">01 / WHY METIS</div>
        <div>
          <p className="thesis-overline">Same underlying model.</p>
          <h2>A better way to<br /><em>search, remember, work, and check.</em></h2>
        </div>
        <p>
          Metis does not replace the model or change its weights. It strengthens the system around it—so the model begins with better evidence, preserves useful experience, and finishes with proof.
        </p>
      </section>

      <section className="story" id="story">
        <div className="story-terminal">
          <div className="terminal-sticky">
            <p className="terminal-caption"><span>LIVE</span> scroll-driven Metis session</p>
            <MetisTerminal sceneIndex={activeScene} />
            <div className="scene-progress" aria-label={`Demo scene ${activeScene + 1} of ${chapters.length}`}>
              {chapters.map((chapter, index) => (
                <button
                  key={chapter.number}
                  className={activeScene === index ? "active" : ""}
                  onClick={() => chapterRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" })}
                  aria-label={`View chapter ${chapter.number}`}
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
        <div className="section-index">02 / PRACTICAL OUTCOME</div>
        <div className="proof-number">57<sup>%</sup></div>
        <div className="proof-copy">
          <h2>Less time in one same-task user comparison.</h2>
          <div className="comparison">
            <div><span>Metis</span><i className="metis-bar">1m 30s</i></div>
            <div><span>Baseline</span><i className="base-bar">3m 30s</i></div>
          </div>
          <small>One user test, not a universal benchmark. Results vary by task, model, tools, and environment.</small>
        </div>
      </section>

      <section className="principles" id="principles">
        <div className="principles-heading">
          <div className="section-index">03 / DESIGN PRINCIPLES</div>
          <h2>Reliable by habit,<br /><em>not by hope.</em></h2>
          <p>Metis makes disciplined agent behavior part of the harness.</p>
        </div>
        <div className="principle-grid">
          <article><span>⌕</span><h3>No action before search</h3><p>Investigate code and constraints before making changes.</p></article>
          <article><span>◇</span><h3>No context left to chance</h3><p>Load instructions, skills, and relevant experience up front.</p></article>
          <article><span>↻</span><h3>No lesson learned twice</h3><p>Carry durable technical knowledge into later sessions.</p></article>
          <article><span>≋</span><h3>No long task without state</h3><p>Append-only logs preserve decisions, errors, and next steps.</p></article>
          <article><span>✓</span><h3>No “done” without proof</h3><p>Build, test, inspect, and check every requirement.</p></article>
          <article><span>⌁</span><h3>No single interface lock-in</h3><p>TUI, Print/JSON, RPC, and SDK use the same agent layer.</p></article>
        </div>
      </section>

      <section className="final-cta graph-paper">
        <div className="hero-mark cta-mark" aria-hidden="true">
          <Image src="/metis-mark.svg" alt="" width={76} height={76} />
        </div>
        <p className="eyebrow"><span /> open source · MIT licensed</p>
        <h2>Give your model<br /><em>a better way to work.</em></h2>
        <div className="cta-actions">
          <button type="button" onClick={copyInstall}>$ {installCommands[manager]}</button>
          <a href="https://github.com/Wholiver/metis" target="_blank" rel="noreferrer">View on GitHub ↗</a>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top">
          <Image src="/metis-mark.svg" alt="" width={26} height={26} />
          <span>metis</span>
        </a>
        <p>Better context. Reusable experience. Verified results.</p>
        <nav aria-label="Footer links">
          <a href="https://www.npmjs.com/package/@wholiver_hu/metis" target="_blank" rel="noreferrer">npm</a>
          <a href="https://github.com/Wholiver/metis/tree/main/docs" target="_blank" rel="noreferrer">Docs</a>
          <a href="https://github.com/Wholiver/metis" target="_blank" rel="noreferrer">GitHub</a>
        </nav>
        <small>MIT License · Built by Wholiver</small>
      </footer>
    </main>
  );
}
