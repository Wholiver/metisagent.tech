import type { Metadata } from "next";
import "./docs.css";

export const metadata: Metadata = {
  title: "Metis Documentation | Metis 文档",
  description: "Guides and references for Metis. Metis 使用、配置、扩展与嵌入指南。",
};

export default function DocsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
