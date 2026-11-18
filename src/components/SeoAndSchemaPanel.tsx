import React, { useState } from 'react';
import { SEO_SPECIFICATION, ARTICLE_SECTIONS } from '../data/articleData';
import { Copy, Check, Code2, Link2, FileText } from 'lucide-react';

export const SeoAndSchemaPanel: React.FC = () => {
  const [copiedSchema, setCopiedSchema] = useState(false);

  const schemaJsonString = JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline:
        "Why Doesn't AutoCAD Have a Full AI Design Assistant Yet? The Problems Faced by CAD Professionals and the Future of AI-Powered Design.",
      description: SEO_SPECIFICATION.metaDescription,
      keywords: [
        SEO_SPECIFICATION.primaryKeyword,
        ...SEO_SPECIFICATION.secondaryKeywords,
      ],
      url: `https://cadhorizon.engineering${SEO_SPECIFICATION.urlSlug}`,
      author: {
        '@type': 'Person',
        name: 'Dr. Marcus Vance, PE & Elena Rostova, M.Arch',
      },
      publisher: {
        '@type': 'Organization',
        name: 'CAD Horizon Engineering Review',
      },
      proficiencyLevel: 'Expert',
    },
    null,
    2
  );

  const handleCopySchema = () => {
    navigator.clipboard?.writeText(schemaJsonString);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-[#091120] p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-sky-400">
            Technical Publication Metadata & Indexing Architecture
          </span>
          <h3 className="text-xl font-editorial font-semibold text-white mt-1">
            SEO Specification, Heading Hierarchy & Schema.org Structured Data
          </h3>
        </div>
        <button
          type="button"
          onClick={handleCopySchema}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-100 transition-colors whitespace-nowrap shrink-0"
        >
          {copiedSchema ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Copied JSON-LD</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-sky-400" />
              <span>Copy Article JSON-LD</span>
            </>
          )}
        </button>
      </div>

      {/* Primary SEO Metadata Grid */}
      <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="rounded-lg border border-slate-800/90 bg-[#060B16] p-4">
          <dt className="text-xs font-mono uppercase text-slate-400">SEO Title Tag (60 chars core)</dt>
          <dd className="text-slate-100 font-medium mt-1">{SEO_SPECIFICATION.seoTitle}</dd>
        </div>
        <div className="rounded-lg border border-slate-800/90 bg-[#060B16] p-4">
          <dt className="text-xs font-mono uppercase text-slate-400">Canonical URL Slug</dt>
          <dd className="text-sky-400 font-mono text-xs mt-1 break-all">
            {SEO_SPECIFICATION.urlSlug}
          </dd>
        </div>
        <div className="rounded-lg border border-slate-800/90 bg-[#060B16] p-4 md:col-span-2">
          <dt className="text-xs font-mono uppercase text-slate-400">
            Meta Description (155 Characters)
          </dt>
          <dd className="text-slate-200 mt-1">{SEO_SPECIFICATION.metaDescription}</dd>
        </div>
        <div className="rounded-lg border border-slate-800/90 bg-[#060B16] p-4">
          <dt className="text-xs font-mono uppercase text-slate-400">Primary Target Keyword</dt>
          <dd className="text-sky-300 font-semibold mt-1">{SEO_SPECIFICATION.primaryKeyword}</dd>
        </div>
        <div className="rounded-lg border border-slate-800/90 bg-[#060B16] p-4">
          <dt className="text-xs font-mono uppercase text-slate-400">
            Secondary Target Keywords (10)
          </dt>
          <dd className="text-slate-300 text-xs mt-1 leading-relaxed">
            {SEO_SPECIFICATION.secondaryKeywords.join(' · ')}
          </dd>
        </div>
      </dl>

      {/* H1 / H2 / H3 Structural Outline & Suggested Internal Links */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border border-slate-800/90 bg-[#060B16] p-4 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-sky-400">
            <FileText className="w-3.5 h-3.5" />
            <span>Semantic H1 / H2 / H3 Document Tree</span>
          </div>
          <div className="text-xs text-slate-300 space-y-1.5 font-mono">
            <div className="text-white font-semibold">
              H1: Why Doesn't AutoCAD Have a Full AI Design Assistant Yet? The Problems Faced by CAD Professionals and the Future of AI-Powered Design.
            </div>
            {ARTICLE_SECTIONS.map((sec) => (
              <div key={sec.id} className="pl-3 text-slate-400">
                ├─ H2: {sec.number}. {sec.title}
              </div>
            ))}
            <div className="pl-6 text-slate-500">
              └─ H3 Sub-nodes: Smart Blocks, Markup Assist, 12 Missing Capabilities, Examples 1–3, AutoLISP/.NET Code, 9-Stage Pipeline
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-800/90 bg-[#060B16] p-4 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-sky-400">
            <Link2 className="w-3.5 h-3.5" />
            <span>Suggested Internal Editorial Links</span>
          </div>
          <ul className="space-y-2.5 text-xs">
            {SEO_SPECIFICATION.suggestedInternalLinks.map((link) => (
              <li
                key={link.targetUrl}
                className="pb-2 border-b border-slate-800/70 last:border-none last:pb-0"
              >
                <div className="font-medium text-slate-200">{link.anchorText}</div>
                <div className="font-mono text-sky-400 mt-0.5">
                  {link.targetUrl} <span className="text-slate-500">· {link.contextSection}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Embedded JSON-LD Preview */}
      <div className="rounded-lg border border-slate-800 bg-[#050912] p-4">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
          <span className="inline-flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-sky-400" />
            <span>Schema.org JSON-LD (TechArticle + FAQPage)</span>
          </span>
          <span>Embedded in document &lt;head&gt;</span>
        </div>
        <pre className="text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
          <code>{schemaJsonString}</code>
        </pre>
      </div>
    </div>
  );
};
