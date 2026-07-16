import type { Metadata } from "next";
import "./docs.css";

export const metadata: Metadata = {
  title: "Metis Documentation | Metis 文档",
  description: "Guides and references for Metis. 从安装使用到自定义扩展与程序化接入，Metis 的完整指南。",
};

export default function DocsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
