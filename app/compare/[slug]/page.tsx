import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import "../compare.css";
import { comparisons } from "../data";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(comparisons).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = comparisons[slug];
  if (!item) return {};

  const url = `https://metisagent.tech/compare/${slug}`;

  return {
    title: item.metaTitle,
    description: item.metaDescription,
    keywords: [
      `Metis vs ${item.competitorName}`,
      `${item.competitorName} alternative`,
      `${item.competitorName} vs Metis`,
      `open source ${item.competitorName} alternative`,
      "coding agent",
      "AI coding assistant",
      "terminal agent harness",
    ],
    alternates: {
      canonical: `/compare/${slug}`,
    },
    openGraph: {
      title: item.metaTitle,
      description: item.metaDescription,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: item.metaTitle,
      description: item.metaDescription,
    },
  };
}

export default async function CompetitorDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = comparisons[slug];

  if (!item) {
    notFound();
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: item.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://metisagent.tech",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Compare",
        item: "https://metisagent.tech/compare",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Metis vs ${item.competitorName}`,
        item: `https://metisagent.tech/compare/${item.slug}`,
      },
    ],
  };

  return (
    <div className="compare-page graph-paper">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header */}
      <header className="compare-header">
        <Link className="compare-brand" href="/">
          <Image
            src="/metis-mark.svg"
            alt="Metis"
            width={26}
            height={26}
            style={{ borderRadius: 6 }}
          />
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

      {/* Main Content */}
      <main className="compare-main">
        {/* Breadcrumbs */}
        <nav className="compare-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/compare">Compare</Link>
          <span>/</span>
          <span aria-current="page">Metis vs {item.competitorName}</span>
        </nav>

        {/* Hero */}
        <section className="compare-hero">
          <span className="compare-badge">{item.badge}</span>
          <h1 className="compare-title">{item.title}</h1>
          <p className="compare-subtitle">{item.summary}</p>
          <div className="compare-actions">
            <a
              href="https://github.com/Wholiver/metis"
              target="_blank"
              rel="noreferrer"
              className="compare-btn-primary"
            >
              Get Metis on GitHub ↗
            </a>
            <Link href="/compare" className="compare-btn-secondary">
              ← View All Comparisons
            </Link>
          </div>
        </section>

        {/* Key Reasons to Choose Metis */}
        <section className="deep-dive-section">
          <h2>Why Developers Choose Metis over {item.competitorName}</h2>
          <div className="deep-dive-grid">
            {item.whyChooseMetis.map((reason, idx) => {
              const [title, ...rest] = reason.split(":");
              return (
                <div key={idx} className="deep-dive-card">
                  <h4>{title}</h4>
                  <p>{rest.join(":")}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Head-to-Head Feature Matrix */}
        <section className="matrix-card">
          <div className="matrix-header">
            <h3>Head-to-Head Feature Matrix: Metis vs {item.competitorName}</h3>
          </div>
          <div className="matrix-table-wrapper">
            <table className="matrix-table">
              <thead>
                <tr>
                  <th>Feature / Dimension</th>
                  <th className="highlight">Metis</th>
                  <th>{item.competitorName}</th>
                </tr>
              </thead>
              <tbody>
                {item.matrix.map((row, idx) => (
                  <tr key={idx}>
                    <td>
                      <strong>{row.feature}</strong>
                    </td>
                    <td className="highlight">{row.metis}</td>
                    <td>{row.competitor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Architectural Deep Dives */}
        {item.deepDives.length > 0 && (
          <section className="deep-dive-section">
            <h2>Architectural Deep Dive</h2>
            <div className="deep-dive-grid">
              {item.deepDives.map((dd, idx) => (
                <div key={idx} className="deep-dive-card">
                  <h4>{dd.title}</h4>
                  <p>{dd.content}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Frequently Asked Questions */}
        {item.faqs.length > 0 && (
          <section className="faq-section">
            <h2>Frequently Asked Questions</h2>
            {item.faqs.map((faq, idx) => (
              <div key={idx} className="faq-item">
                <div className="faq-question">{faq.q}</div>
                <div className="faq-answer">{faq.a}</div>
              </div>
            ))}
          </section>
        )}

        {/* Call to Action Box */}
        <div className="compare-install-box">
          <h3>Try Metis Today</h3>
          <p>
            Experience the power of an autonomous coding agent harness designed for real engineering tasks.
          </p>
          <div className="compare-code-pill">
            <code>npm i -g @wholiver_hu/metis</code>
          </div>
          <div style={{ marginTop: 20 }}>
            <Link
              href="/"
              className="compare-btn-primary"
              style={{ background: "#2563eb" }}
            >
              Download for Desktop (macOS / Windows) →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
