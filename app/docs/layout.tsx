import type { Metadata } from "next";
import "./docs.css";

export const metadata: Metadata = {
  title: "Metis Documentation",
  description: "Guides and references for using, configuring, extending, and embedding Metis.",
};

export default function DocsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
