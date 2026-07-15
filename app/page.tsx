"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

const installCommands = {
  npm: "npm i -g @wholiver_hu/metis@rc",
  pnpm: "pnpm add -g @wholiver_hu/metis@rc",
  bun: "bun add -g @wholiver_hu/metis@rc",
} as const;

type PackageManager = keyof typeof installCommands;

const capabilities = [
  {
    index: "01",
    title: "Memory & Lessons",
    copy: "Reuse decisions, project knowledge, and technical lessons from earlier sessions instead of rediscovering them.",
    accent: "blue",
  },
  {
    index: "02",
    title: "Dream",
    copy: "Turn completed work into structured, reusable knowledge. Keep what matters; clean up what does not.",
    accent: "orange",
  },
  {
    index: "03",
    title: "Search before action",
    copy: "Understand the repository and check authoritative sources before making changes. Fewer guesses, stronger edits.",
    accent: "green",
  },
  {
    index: "04",
    title: "Verified completion",
    copy: "Build, test, inspect output, and compare every result with the original request before calling work finished.",
    accent: "violet",
  },
] as const;

const interfaces = [
  ["Interactive", "A focused terminal UI for everyday work."],
  ["Print / JSON", "Composable output for scripts and automation."],
  ["RPC", "A JSON protocol for non-Node integrations."],
  ["SDK", "Embed Metis in Node.js applications."],
] as const;

export default function Home() {
  const [manager, setManager] = useState<PackageManager>("npm");
  const [copied, setCopied] = useState(false);

  const copyInstall = useCallback(async () => {
    await navigator.clipboard.writeText(installCommands[manager]);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }, [manager]);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Metis home">
          <Image src="/metis-mark.svg" alt="" width={32} height={32} priority />
          <span>metis</span>
          <small>agent layer</small>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#why">Why Metis</a>
          <a href="#workflow">How it works</a>
          <a href="#interfaces">Interfaces</a>
        </nav>
        <a
          className="github-link"
          href="https://github.com/Wholiver/metis"
          target="_blank"
          rel="noreferrer"
        >
          GitHub <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero grid-paper" id="top">
        <div className="hero-orbit orbit-one" aria-hidden="true" />
        <div className="hero-orbit orbit-two" aria-hidden="true" />
        <div className="hero-mark" aria-hidden="true">
          <Image src="/metis-mark.svg" alt="" width={82} height={82} priority />
        </div>
        <p className="eyebrow"><span /> Open source · MIT licensed</p>
        <h1>
          Better context. Better code.
          <em>Finished work.</em>
        </h1>
        <p className="hero-copy">
          Metis is an agent layer that helps coding models search, remember,
          execute, and verify more reliably—without changing the model.
        </p>

        <div className="install-shell" aria-label="Install Metis">
          <div className="manager-tabs" role="tablist" aria-label="Package manager">
            {(Object.keys(installCommands) as PackageManager[]).map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={manager === item}
                onClick={() => {
                  setManager(item);
                  setCopied(false);
                }}
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
        <a className="scroll-cue" href="#why">
          <span>$</span> scroll to understand
        </a>
      </section>

      <section className="manifesto" id="why">
        <div className="section-kicker">01 / WHY METIS</div>
        <div className="manifesto-copy">
          <p>Same model.</p>
          <h2>A stronger system around it.</h2>
          <p className="large-copy">
            Metis gives models relevant context, reusable experience, and an
            evidence-based completion loop. Less repeated context. Fewer missed
            requirements. More work that actually lands.
          </p>
        </div>
        <div className="terminal-window" aria-label="Example Metis terminal session">
          <div className="terminal-bar">
            <div className="window-dots" aria-hidden="true"><i /><i /><i /></div>
            <span>metis · ~/project</span>
            <span className="terminal-status">● memory ready</span>
          </div>
          <div className="terminal-body">
            <p><b>❯</b> Fix the failing auth flow and verify it.</p>
            <p className="terminal-muted">metis / understand</p>
            <p><span className="check">✓</span> Loaded 3 relevant lessons</p>
            <p><span className="check">✓</span> Mapped auth middleware → callback → session</p>
            <p><span className="check">✓</span> Found regression in token refresh boundary</p>
            <p className="terminal-muted">metis / build</p>
            <p><span className="check">✓</span> Patched refresh state and added coverage</p>
            <p className="terminal-muted">metis / verify</p>
            <p><span className="check">✓</span> Build passed · 42 tests passed</p>
            <p className="terminal-done">Done. Requirement check: 4 / 4.</p>
          </div>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div>
          SEARCH <span>✦</span> REMEMBER <span>✦</span> EXECUTE <span>✦</span> VERIFY
          <span>✦</span> SEARCH <span>✦</span> REMEMBER <span>✦</span> EXECUTE <span>✦</span> VERIFY
        </div>
      </div>

      <section className="capabilities page-section">
        <div className="section-heading">
          <div className="section-kicker">02 / RELIABILITY</div>
          <h2>Built to remember.<br /><em>Wired to finish.</em></h2>
          <p>Four primitives reinforce every coding task.</p>
        </div>
        <div className="capability-grid">
          {capabilities.map((item) => (
            <article className={`capability-card ${item.accent}`} key={item.index}>
              <span className="card-index">{item.index}</span>
              <div className="card-glyph" aria-hidden="true">
                {item.index === "01" && <><i /><i /><i /><i /></>}
                {item.index === "02" && <><b>✦</b><i /><i /></>}
                {item.index === "03" && <><i /><i /><i /></>}
                {item.index === "04" && <><b>✓</b><i /></>}
              </div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="proof page-section">
        <div className="proof-stat">
          <span className="proof-value">57<sup>%</sup></span>
          <p>less time in one same-task user comparison</p>
        </div>
        <div className="proof-bars" aria-label="Task completion comparison">
          <div className="bar-row">
            <span>Metis</span><div className="bar metis-bar"><i>1m 30s</i></div>
          </div>
          <div className="bar-row">
            <span>Baseline</span><div className="bar baseline-bar"><i>3m 30s</i></div>
          </div>
          <small>Single user test. Results vary by task, model, tools, and environment.</small>
        </div>
      </section>

      <section className="workflow grid-paper" id="workflow">
        <div className="section-heading workflow-heading">
          <div className="section-kicker">03 / THE LOOP</div>
          <h2>Understand.<br />Build. <em>Verify.</em></h2>
        </div>
        <div className="workflow-track">
          <article>
            <span>01</span>
            <h3>Understand</h3>
            <p>Read the request, recall useful lessons, and investigate the codebase.</p>
            <code>search → context → plan</code>
          </article>
          <div className="track-line" aria-hidden="true"><i /></div>
          <article>
            <span>02</span>
            <h3>Build</h3>
            <p>Make focused changes and keep a durable, useful work record.</p>
            <code>edit → log → checkpoint</code>
          </article>
          <div className="track-line" aria-hidden="true"><i /></div>
          <article>
            <span>03</span>
            <h3>Verify</h3>
            <p>Test the result and compare it with every original requirement.</p>
            <code>build → test → inspect</code>
          </article>
        </div>
      </section>

      <section className="interfaces page-section" id="interfaces">
        <div className="section-heading interface-heading">
          <div className="section-kicker">04 / YOUR HARNESS</div>
          <h2>Terminal-first.<br /><em>Not terminal-only.</em></h2>
          <p>Use Metis directly, automate it, or embed the agent layer in your own product.</p>
        </div>
        <div className="interface-list">
          {interfaces.map(([title, copy], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
              <i aria-hidden="true">↗</i>
            </article>
          ))}
        </div>
        <div className="customize-strip">
          <p>MAKE IT YOURS</p>
          <span>Extensions</span><i>+</i><span>Skills</span><i>+</i><span>Themes</span><i>+</i><span>Packages</span>
        </div>
      </section>

      <section className="final-cta grid-paper">
        <div className="cta-mark" aria-hidden="true">
          <Image src="/metis-mark.svg" alt="" width={72} height={72} />
        </div>
        <p className="eyebrow"><span /> Node.js 22.19+</p>
        <h2>Give your model<br /><em>a better way to work.</em></h2>
        <div className="cta-actions">
          <button type="button" onClick={copyInstall}>$ {installCommands[manager]}</button>
          <a href="https://github.com/Wholiver/metis" target="_blank" rel="noreferrer">View on GitHub ↗</a>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top">
          <Image src="/metis-mark.svg" alt="" width={28} height={28} />
          <span>metis</span>
        </a>
        <p>Better context. Reusable experience. Verified results.</p>
        <div>
          <a href="https://www.npmjs.com/package/@wholiver_hu/metis" target="_blank" rel="noreferrer">npm</a>
          <a href="https://github.com/Wholiver/metis/tree/main/docs" target="_blank" rel="noreferrer">Docs</a>
          <a href="https://github.com/Wholiver/metis" target="_blank" rel="noreferrer">GitHub</a>
        </div>
        <small>MIT License · Built by Wholiver</small>
      </footer>
    </main>
  );
}
