import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, "..", "out");

if (!fs.existsSync(outDir)) {
  console.log("[optimize-output] out directory does not exist, skipping.");
  process.exit(0);
}

console.log("[optimize-output] Starting post-build optimization on out/...");

// 1. Optimize JS Chunks: Remove legacy polyfills detected by Lighthouse
const chunksDir = path.join(outDir, "_next", "static", "chunks");
if (fs.existsSync(chunksDir)) {
  const jsFiles = fs.readdirSync(chunksDir).filter((f) => f.endsWith(".js") && !f.includes(" 2"));
  let strippedCount = 0;

  for (const file of jsFiles) {
    const filePath = path.join(chunksDir, file);
    try {
      let code = fs.readFileSync(filePath, "utf8");
      let modified = false;

      // Remove Array.prototype.at polyfill
      if (code.includes("Array.prototype.at")) {
        code = code.replace(
          /Array\.prototype\.at\|\|\(Array\.prototype\.at=function\([^)]*\)\{[^}]*\}\)/g,
          "/* modern:Array.at */void 0"
        );
        modified = true;
      }

      // Remove Object.hasOwn polyfill
      if (code.includes("Object.hasOwn")) {
        code = code.replace(
          /Object\.hasOwn\|\|\(Object\.hasOwn=function\([^)]*\)\{[^}]*\}\)/g,
          "/* modern:Object.hasOwn */void 0"
        );
        modified = true;
      }

      // Remove Object.fromEntries polyfill
      if (code.includes("Object.fromEntries")) {
        code = code.replace(
          /Object\.fromEntries\|\|\(Object\.fromEntries=function\([^)]*\)\{[^}]*\}\)/g,
          "/* modern:Object.fromEntries */void 0"
        );
        modified = true;
      }

      // Remove Array.prototype.flat and flatMap polyfills
      if (code.includes("Array.prototype.flat")) {
        code = code.replace(
          /Array\.prototype\.flat\|\|\(Array\.prototype\.flat=function\([^)]*\)\{[^}]*\},Array\.prototype\.flatMap=function\([^)]*\)\{[^}]*\}\)/g,
          "/* modern:Array.flat */void 0"
        );
        modified = true;
      }

      // Remove String.prototype.trimStart / trimEnd polyfills
      if (code.includes("String.prototype.trimStart") || code.includes("String.prototype.trimEnd")) {
        code = code.replace(
          /"trimStart"in String\.prototype\|\|\(String\.prototype\.trimStart=String\.prototype\.trimLeft\)/g,
          "/* modern:trimStart */void 0"
        );
        code = code.replace(
          /"trimEnd"in String\.prototype\|\|\(String\.prototype\.trimEnd=String\.prototype\.trimRight\)/g,
          "/* modern:trimEnd */void 0"
        );
        modified = true;
      }

      if (modified) {
        fs.writeFileSync(filePath, code, "utf8");
        strippedCount++;
        console.log(`[optimize-output] Stripped legacy polyfills from: ${file}`);
      }
    } catch (err) {
      console.warn(`[optimize-output] Warning reading ${file}:`, err.message);
    }
  }
  console.log(`[optimize-output] Optimized ${strippedCount} JS chunk(s).`);
}

// 2. Optimize HTML Files: Inline render-blocking CSS into <style>
function getAllHtmlFiles(dir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    for (const file of list) {
      if (file.includes(" 2")) continue;
      const fullPath = path.join(dir, file);
      try {
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          results = results.concat(getAllHtmlFiles(fullPath));
        } else if (file.endsWith(".html")) {
          results.push(fullPath);
        }
      } catch {}
    }
  } catch {}
  return results;
}

const htmlFiles = getAllHtmlFiles(outDir);
let inlinedCssCount = 0;

for (const htmlPath of htmlFiles) {
  try {
    let html = fs.readFileSync(htmlPath, "utf8");
    let modified = false;

    // Find all <link rel="stylesheet" href="/_next/static/chunks/....css" ...>
    const linkRegex = /<link\s+rel="stylesheet"\s+href="(\/_next\/static\/chunks\/[^"]+\.css)"[^>]*\/?>/g;
    let match;

    while ((match = linkRegex.exec(html)) !== null) {
      const fullTag = match[0];
      const cssHref = match[1];
      const localCssPath = path.join(outDir, cssHref);

      if (fs.existsSync(localCssPath)) {
        try {
          const cssContent = fs.readFileSync(localCssPath, "utf8");
          const inlinedStyle = `<style data-href="${cssHref}">${cssContent}</style>`;
          html = html.replace(fullTag, inlinedStyle);
          modified = true;
        } catch {}
      }
    }

    if (modified) {
      fs.writeFileSync(htmlPath, html, "utf8");
      inlinedCssCount++;
      console.log(`[optimize-output] Inlined CSS into: ${path.relative(outDir, htmlPath)}`);
    }
  } catch (err) {
    console.warn(`[optimize-output] Skipping unreadable HTML: ${htmlPath}`);
  }
}

console.log(`[optimize-output] Inlined critical CSS into ${inlinedCssCount} HTML file(s).`);
console.log("[optimize-output] Optimization complete!");
