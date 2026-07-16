import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the bilingual Metis home page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Metis[^<]*让编程模型把事情做完<\/title>/);
  assert.match(html, /Your model knows how to code/);
  assert.match(html, /Metis helps it finish/);
  assert.match(html, /aria-label="Choose site language"/);
  assert.match(html, />EN<\/button>/);
  assert.match(html, />中文<\/button>/);
  assert.match(html, /href="\/docs"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("server-renders the bilingual documentation hub", async () => {
  const response = await render("/docs");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<title>Metis Documentation \| Metis 文档<\/title>/);
  assert.match(html, /Metis Documentation/);
  assert.match(html, /npm i -g @wholiver_hu\/metis@rc/);
  assert.match(html, /v1\.1\.0-rc\.1/);
  assert.match(html, /aria-label="Choose site language"/);
  assert.match(html, />中文<\/button>/);
});

test("keeps language preference shared across home and docs", async () => {
  const [switcher, home, docs] = await Promise.all([
    readFile(new URL("../app/language-switcher.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/docs/page.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(switcher, /metis-language/);
  assert.match(switcher, /navigator\.language/);
  assert.match(switcher, /localStorage\.setItem/);
  assert.match(switcher, /document\.documentElement\.lang/);
  assert.match(home, /Metis 让它把事情做完/);
  assert.match(home, /LanguageSwitcher/);
  assert.match(docs, /Metis 文档/);
  assert.match(docs, /LanguageSwitcher/);
});
