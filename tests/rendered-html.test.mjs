import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const outputPath = pathname === "/" ? "../out/index.html" : `../out${pathname}/index.html`;
  return readFile(new URL(outputPath, import.meta.url), "utf8");
}

async function readStatic(relativePath) {
  return readFile(new URL(`../${relativePath}`, import.meta.url), "utf8");
}

test("exports the bilingual Metis home page with deep SEO", async () => {
  const html = await render();
  assert.match(html, /<title>Metis[^<]*让编程模型可靠完成任务/);
  assert.match(html, /Your model knows how to code/);
  assert.match(html, /Metis helps it finish/);
  assert.match(html, /aria-label="Choose site language"/);
  assert.match(html, />EN<\/button>/);
  assert.match(html, />中文<\/button>/);
  assert.match(html, /href="\/docs"/);
  assert.match(html, /href="\/compare"/);
  // SEO Canonical and Hreflang
  assert.match(html, /metisagent\.tech/);
  // Schema.org JSON-LD
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /SoftwareApplication/);
  assert.match(html, /DeveloperApplication/);
});

test("exports the Chinese dedicated home page", async () => {
  const html = await render("/zh");
  assert.match(html, /Metis/);
  assert.match(html, /全球领先的 Coding Harness 架构/);
  assert.match(html, /会写代码，只是开始/);
  assert.match(html, /可靠完成，才是结果/);
});

test("exports the competitor comparison hub", async () => {
  const html = await render("/compare");
  assert.match(html, /Metis vs Modern AI Coding Agents/);
  assert.match(html, /metis-vs-claude-code/);
  assert.match(html, /metis-vs-cursor/);
  assert.match(html, /metis-vs-cline/);
  assert.match(html, /metis-vs-codex/);
  assert.match(html, /metis-vs-aider/);
  assert.match(html, /metis-vs-copilot/);
  assert.match(html, /Feature &amp; Architecture Matrix|Overview Feature/);
});

test("exports the Metis vs Claude Code comparison page", async () => {
  const html = await render("/compare/metis-vs-claude-code");
  assert.match(html, /Metis vs Claude Code/);
  assert.match(html, /FAQPage/);
  assert.match(html, /BreadcrumbList/);
  assert.match(html, /Anthropic/);
  assert.match(html, /DeepSeek/);
});

test("exports the Metis vs Cursor comparison page", async () => {
  const html = await render("/compare/metis-vs-cursor");
  assert.match(html, /Metis vs Cursor/);
  assert.match(html, /FAQPage/);
  assert.match(html, /VS Code/);
});

test("exports the bilingual documentation hub", async () => {
  const html = await render("/docs");
  assert.match(html, /Metis Documentation/);
  assert.match(html, /npm i -g @wholiver_hu\/metis@rc/);
  assert.match(html, /v1\.1\.0-rc\.1/);
  assert.match(html, /aria-label="Choose site language"/);
  assert.match(html, />中文<\/button>/);
});

test("provides robots.txt and sitemap.xml for metisagent.tech", async () => {
  const [robots, sitemap, llms] = await Promise.all([
    readStatic("public/robots.txt"),
    readStatic("public/sitemap.xml"),
    readStatic("public/llms.txt"),
  ]);

  // Robots
  assert.match(robots, /https:\/\/metisagent\.tech\/sitemap\.xml/);
  assert.match(robots, /User-agent: GPTBot/);
  assert.match(robots, /User-agent: ClaudeBot/);
  assert.match(robots, /User-agent: PerplexityBot/);

  // Sitemap
  assert.match(sitemap, /https:\/\/metisagent\.tech\//);
  assert.match(sitemap, /https:\/\/metisagent\.tech\/zh/);
  assert.match(sitemap, /https:\/\/metisagent\.tech\/compare/);
  assert.match(sitemap, /https:\/\/metisagent\.tech\/compare\/metis-vs-claude-code/);
  assert.match(sitemap, /https:\/\/metisagent\.tech\/compare\/metis-vs-cursor/);

  // LLMs
  assert.match(llms, /https:\/\/metisagent\.tech/);
  assert.match(llms, /Metis vs Claude Code/);
  assert.match(llms, /Metis vs Cursor/);
});
