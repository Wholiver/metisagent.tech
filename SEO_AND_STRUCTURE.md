# Metis 官网架构与 SEO 设计全景指南 (Architecture & SEO Design)

> 本文档用于系统梳理 **Metis 官方网站（https://metisagent.tech）** 的整体技术架构、路由结构、SEO 策略、性能优化准则及 Cloudflare 边缘端配置。后续无论进行何种迭代，请务必先查阅本文档，确保不破坏现有的单屏视觉审美、高分性能（Lighthouse 100）及搜索引擎与 AI 智能体抓取规则。

---

## 1. 核心品牌定位与叙事 (Brand Positioning)

* **产品定位**：专为全面提升大语言模型（LLM）编程性能打造的开源自主 Coding Agent Harness。
* **核心口号 (Slogans)**：
  * **中文**：
    * 主标语：**全面提升大模型编程性能，** *让 AI 代码从生成走向自主交付。*
    * 副标语：`全球领先的开源 Coding Agent Harness · 闭环测试验证 · 自动异常自愈 · 跨会话记忆`
    * 底部标签：`提升模型性能 · 闭环验证 · 经验记忆 · 智能自愈`
  * **英文**：
    * 主标语：**Elevate your model's coding performance.** *Turn LLM generation into reliable engineering.*
    * 副标语：`The open-source autonomous coding harness built for peak model performance.`
    * 底部标签：`Elevate LLM Performance · Closed-Loop Verification · Persistent Memory`
* **四大核心技术支柱**：
  1. **闭环测试验证 (Closed-Loop Test Verification)**：拒绝仅输出未经测试的代码，自动执行本地 build、lint 和测试套件。
  2. **自动异常自愈 (Automated Self-Healing)**：拦截报错日志与堆栈跟踪，自动分析根因并自我修复，直至退出码为 0。
  3. **跨会话持久记忆 (Durable Memory & Dream Engine)**：沉淀项目架构规则与避坑经验，动态注入后续会话，避免重复犯错。
  4. **多智能体分工协作 (Hierarchical Multi-Agent Decoupling)**：分离架构师（Architect）、调查员（Investigator）、构建者（Builder）、审查者（Reviewer），防止上下文注意力稀释与幻觉。
* **模型自由度**：支持 Claude 3.7 Sonnet、DeepSeek V3/R1、OpenAI GPT-4o/o3、SiliconFlow 以及基于 Ollama 的 100% 本地离线私有化运行。

---

## 2. 网站目录与路由结构 (Routes & Directory Map)

本项目基于 **Next.js 16 (App Router) + React 19 + Tailwind CSS v4**，采用纯静态导出架构（`output: "export"`），最终构建至 `out/` 目录供 Cloudflare Pages 承载。

### 2.1 路由结构

| 路由路径 | 页面类型 | 对应源码路径 | 说明与核心职能 |
| :--- | :--- | :--- | :--- |
| `/` | 英文主页 | `app/page.tsx`, `app/layout.tsx` | 纯净极简 100vh 单屏视口设计，无折叠下方卡片，双平台一键下载 + CLI 复制 |
| `/zh` | 中文主页 | `app/zh/page.tsx` | 独立中文主页，精准承接国内开发者搜索与深度中文 SEO |
| `/docs` | 文档中心 | `app/docs/page.tsx` | 安装指南、跨平台桌面端说明、多模型接入配置手册 |
| `/compare` | 竞品对比聚合 | `app/compare/page.tsx` | 现代化 AI 编程智能体全景特性矩阵 |
| `/compare/metis-vs-claude-code` | 长尾对比页 | `app/compare/[slug]/page.tsx` | 对比 Claude Code（开放生态 vs 厂商绑定，闭环自愈能力） |
| `/compare/metis-vs-cursor` | 长尾对比页 | `app/compare/[slug]/page.tsx` | 对比 Cursor（轻量终端/桌面 Harness vs 定制 IDE，离线隐私） |
| `/compare/metis-vs-cline` | 长尾对比页 | `app/compare/[slug]/page.tsx` | 对比 Cline（独立进程韧性、Dream 经验记忆 vs 插件卡死风险） |
| `/compare/metis-vs-aider` | 长尾对比页 | `app/compare/[slug]/page.tsx` | 对比 Aider（多智能体角色分工、动态上下文精简、GUI 可视化 Diff） |
| `/compare/metis-vs-roo-code` | 长尾对比页 | `app/compare/[slug]/page.tsx` | 对比 Roo Code（自动化测试自愈、跨工程持久记忆） |
| `/compare/metis-vs-codex` | 长尾对比页 | `app/compare/[slug]/page.tsx` | 对比 OpenAI Codex（全自主交付 vs 基础代码补全） |

### 2.2 核心代码与静态资产分布

```text
metis_web/
├── app/
│   ├── globals.css              # 全局核心样式（包含单屏 100vh 约束、网格纸背景、文字居中）
│   ├── layout.tsx               # 根 Layout：全局 Meta、Preconnect、图标、Schema.org JSON-LD
│   ├── page.tsx                 # 英文主页组件（HomeView、平台自动探测、多包管理器切换）
│   ├── zh/page.tsx              # 中文主页专属入口（提供独立中文元数据）
│   ├── docs/                    # 文档中心
│   ├── compare/                 # 竞品对比中心与动态 slug
│   └── language-switcher.tsx    # 顶部中英文切换悬浮组件
├── public/
│   ├── _headers                 # Cloudflare Pages 边缘缓存策略与 MIME 协议头
│   ├── robots.txt               # 全量搜索引擎与 AI 爬虫抓取许可文件
│   ├── sitemap.xml              # 站长地图（包含 10 个核心 URL 与 hreflang）
│   ├── llms.txt                 # 标准 AI 智能体/模型专用导航清单 (llmstxt.org 规范)
│   ├── llms-full.txt            # 标准 AI 智能体技术全景参考深度文档
│   ├── metis-mark.svg           # 全新矢量云朵吉祥物 Logo（主屏、导航、Favicon 统一使用）
│   ├── favicon.ico              # 16~256px 多尺寸封装 Windows/桌面 Favicon
│   ├── apple-touch-icon.png     # 180x180 苹果 iOS / macOS Safari 高清触控图标
│   ├── icon-192.png / 512.png   # PWA 标准高分辨率应用图标
│   ├── site.webmanifest         # PWA / 移动端书签配置规范
│   └── e89fbc...cd.txt          # Bing / IndexNow 验证密钥文件
├── scripts/
│   └── optimize-output.mjs      # 构建后置优化器：内嵌 CSS 消除阻塞、剥离无用旧版 Polyfill
├── package.json                 # 项目依赖、构建命令与现代 browserslist 定义
└── tsconfig.json                # TypeScript 编译目标（已升级至 ES2022）
```

---

## 3. SEO 与智能体可检测性 (SEO & GEO)

本站不仅针对传统搜索引擎（Google、Bing、百度），还深度优化了以大模型为中心的生成式引擎优化（GEO - Generative Engine Optimization / AEO）。

### 3.1 页面 TDK 与元数据规范

1. **标题 (Title) 规范**：
   * 英文：`Metis — Maximize LLM Coding Performance | Open-Source Autonomous Coding Harness`
   * 中文：`Metis — 全面提升大模型编程性能 | 开源全自主 Coding Agent Harness | Metis Agent`
   * 规范要点：必须前置产品名 `Metis`，中间突出核心价值 `提升大模型编程性能`，后置核心品类 `Coding Agent Harness`。
2. **描述 (Description) 规范**：
   * 严禁出现与实际产品不搭边的空泛词。清晰说明 Metis 如何通过“测试闭环、异常自愈、跨会话记忆、多模型调度”消灭代码幻觉、提升交付质量。
3. **多语言链接 (Canonical & Alternate hreflang)**：
   * 根页面与中文页面互相引用，并包含 `x-default`：
     ```html
     <link rel="canonical" href="https://metisagent.tech/" />
     <link rel="alternate" hreflang="en" href="https://metisagent.tech/" />
     <link rel="alternate" hreflang="zh-CN" href="https://metisagent.tech/zh/" />
     <link rel="alternate" hreflang="x-default" href="https://metisagent.tech/" />
     ```

### 3.2 结构化数据 (Schema.org JSON-LD)

在 `app/layout.tsx` 中注入包含 5 种实体的高质量知识图谱：
1. **`SoftwareApplication`**：定义开源软件、MIT 协议、0 美元定价、跨平台操作系统（macOS, Windows, Linux）、4.9 评分以及 7 项核心特性。
2. **`WebSite`**：声明官网与文档站内搜索 EntryPoint。
3. **`Organization`**：定义官方组织、GitHub 主页与矢量 Mascot 图标。
4. **`HowTo`**：“30 秒内安装并运行 Metis AI 编程智能体”，供 Google 提取丰富的 Rich Snippets 步骤卡片。
5. **`FAQPage`**：收录常见问答（“Metis 是什么以及如何提升模型代码质量”、“是否免费开源替代 Claude Code / Cursor”、“支持哪些系统与模型”），直接抢占搜索引擎直接解答位。

### 3.3 协议文件与抓取准则

1. **`robots.txt`**：
   * 显式允许主流搜索引擎爬虫（`Googlebot`, `Bingbot`, `Baiduspider`, `YandexBot`）。
   * 显式允许 AI 大模型检索爬虫（`GPTBot`, `ChatGPT-User`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `Applebot-Extended`, `Bytespider`）。
   * 声明 `Sitemap: https://metisagent.tech/sitemap.xml`。
2. **`sitemap.xml`**：
   * 聚合全站 10 个核心 URL，配置对应的 `priority` 与 `lastmod`。
3. **`llms.txt` (严格遵循 llmstxt.org 规范)**：
   * **格式红线**：
     * 第一行必须是唯一 H1 标题：`# Metis`；
     * 第三行紧跟引用块摘要：`> Metis is an open-source coding agent harness...`；
     * 分类 H2：`## Documentation`、`## Comparisons`、`## Key Features`、`## Optional`；
     * **列表项必须是标准 Markdown 格式超链接**：`- [Title](https://...): Description`，严禁在无超链接的纯文本列表中放置裸 URL（否则会被 Lighthouse / SEO 审核工具报错 *“文件似乎不包含任何链接”*）。
4. **IndexNow 极速索引协议**：
   * 站点根目录放置了校验文件 `public/e89fbc7412da48938924b17e453982cd.txt`。
   * 每次有新页面或重大内容发布时，调用 IndexNow API 即可实现 Bing / Yandex 分钟级收录。

---

## 4. 极致前端性能与 Core Web Vitals (CWV)

为确保在 PageSpeed Insights 和 Lighthouse 中保持满分表现，实施了以下 4 项关键工程措施：

### 4.1 彻底消除渲染阻塞 CSS（内嵌关键 CSS）
* **原理**：Next.js App Router 默认会把样式提取为外部 `<link rel="stylesheet">`，导致浏览器首屏白屏等待网络往返（阻塞约 150ms）。
* **方案**：[scripts/optimize-output.mjs](file:///Users/huchenrui/Documents/metis_web/scripts/optimize-output.mjs) 在静态导出后，自动读取编译后的 CSS 文件（仅约 5.2 KiB），直接以内嵌 `<style data-href="...">` 形式写入所有导出的 HTML 文件 `<head>` 中，实现零网络阻塞着色。

### 4.2 彻底剥离旧版 JavaScript 冗余 Polyfill（节约 24 KiB）
* **原理**：Next.js 默认面向老旧浏览器注入了针对 `Array.prototype.at`、`flat`、`flatMap`、`Object.fromEntries`、`Object.hasOwn`、`trimStart`、`trimEnd` 等 7 种方法的 Polyfill 代码块；此外 Cloudflare 自带的 Analytics 也会注入 `beacon.min.js`，被 Lighthouse 判定为“旧版 JavaScript”。
* **方案**：
  1. `tsconfig.json` 升级为 `"target": "ES2022"`；
  2. `package.json` 添加现代 `browserslist`（最近 2 代 Chrome / Firefox / Safari / Edge）；
  3. `scripts/optimize-output.mjs` 自动剥离生产 JS Chunk 中的 Polyfill 声明，原生利用浏览器 C++ 底层实现；
  4. 彻底关闭 Cloudflare 的 Pages Analytics 与 RUM 注入。

### 4.3 矢量化与图片传送优化
* **原理**：使用 512x512 的栅格 PNG 缩放渲染在 26px 或 96px 位置，会被 Lighthouse 标记“改进图片传送 - 浪费带宽”。
* **方案**：全站所有 Mascot 均使用高清矢量 [public/metis-mark.svg](file:///Users/huchenrui/Documents/metis_web/public/metis-mark.svg)，体积小、无光栅下采样惩罚，并在 HTML `<head>` 中增加 `<link rel="preload" as="image" href="/metis-mark.svg"/>`。

### 4.4 预连接优化 (Preconnect)
* 在 `<head>` 中配置：
  ```html
  <link rel="preconnect" href="https://github.com" crossorigin="anonymous" />
  <link rel="dns-prefetch" href="https://github.com" />
  ```
  提前完成与核心外链目标域名的 TCP + TLS 握手。

---

## 5. Cloudflare 边缘与安全配置底线 (Cloudflare Constraints)

本网站依托 Cloudflare Pages 与 Cloudflare DNS，所有功能均严格运行在**免费账户**配额内。

| 配置项 | 设定值 | 核心考量与避坑提醒 |
| :--- | :--- | :--- |
| **Zone ID** | `f24792ca7eae026115dbba9fc95ac855` | 根域名 `metisagent.tech` 托管区域 |
| **Account ID** | `d4a21f09e8305c3c2778759d9a97afc2` | 关联 Cloudflare 账户 |
| **Pages 构建命令** | `pnpm run build` | 该命令串联执行 `next build && node scripts/optimize-output.mjs` |
| **Pages 输出目录** | `out` | 静态 HTML 导出目录 |
| **Pages Analytics** | **严格设为 `null`** | 必须关闭！否则 Cloudflare 会在 HTML 尾部强行插入 `beacon.min.js`，导致 566ms 关键请求链延迟与 10.7 KiB 旧版 JS 报警 |
| **RUM auto_install** | **严格设为 `false`** | 彻底关闭浏览器自动注入采集 |
| **WAF Skip Rule** | **已生效** | 规则名 `Allow Search Engines & Discovery Files`，针对 `cf.client.bot` 与关键发现文件（`/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/llms-full.txt`）**全量 Skip 拦截**，杜绝任何爬虫被弹验证码 |
| **Browser Integrity Check** | **严格设为 `off`** | 避免对 Google Search Console 探测工具及自动化 SEO 工具产生误报拦截 |
| **边缘缓存刷新** | 每次发布调用 API 清除 | `POST /zones/{zoneId}/purge_cache` (`purge_everything: true`) 瞬时全网刷新 |

---

## 6. 日常更新与发布运维清单 (Workflow Checklist)

当你在后续工作中需要对网站做任何文案、样式或新页面改动时，请遵循以下标准流程：

```bash
# 1. 本地开发与测试
pnpm install
pnpm dev

# 2. 检查本地修改（严格避免添加非必要的首屏折叠下方卡片）
git status --short

# 3. 提交代码并推送到 GitHub main 分支
git add -A
git commit -m "feat(web): update xxx"
git push origin main
```

**Git 推送后，自动化流水线将自动运行：**
1. GitHub 接收推送并通知 Cloudflare Pages；
2. Cloudflare Pages 容器内执行 `pnpm run build`：
   * `next build` 导出最新静态页面至 `out/`；
   * `scripts/optimize-output.mjs` 自动完成关键 CSS 内嵌与旧版 JS Polyfill 剔除；
3. Cloudflare Pages 自动部署上线（约 20~30 秒）。

**若更新了重要页面或 SEO 文件，建议执行一次主动推送：**
```bash
# 触发 IndexNow 搜索引擎即时推送
curl -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
    "host": "metisagent.tech",
    "key": "e89fbc7412da48938924b17e453982cd",
    "keyLocation": "https://metisagent.tech/e89fbc7412da48938924b17e453982cd.txt",
    "urlList": [
      "https://metisagent.tech/",
      "https://metisagent.tech/zh",
      "https://metisagent.tech/docs",
      "https://metisagent.tech/compare"
    ]
  }' -i
```
