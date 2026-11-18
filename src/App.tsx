import React, { useEffect, useState } from 'react';
import {
  ARTICLE_SECTIONS,
  EXISTING_AUTOCAD_AI_FEATURES,
  AI_TAXONOMY_COMPARISON,
  PROPOSED_MISSING_CAPABILITIES,
  PRACTICAL_SOLUTIONS_TODAY,
  ARCHITECTURE_STAGES,
  CITATION_SOURCES,
  FAQ_ITEMS,
  RELATED_ARTICLES,
  THREE_SCENE_MODES,
  ThreeSceneMode,
  CapabilityCategory,
  filterCapabilitiesByCategory,
  filterFeaturesByVersion,
  calculateReadingProgress,
  calculateRevisionTimeSavings,
} from './data/articleData';
import { CadThreeVisualizer } from './components/CadThreeVisualizer';
import { IdealWorkflowSimulator } from './components/IdealWorkflowSimulator';
import { SeoAndSchemaPanel } from './components/SeoAndSchemaPanel';
import {
  BookOpen,
  ChevronDown,
  Copy,
  Check,
  ExternalLink,
  ArrowUpRight,
  Compass,
  Clock,
  Cpu,
  ShieldAlert,
  Wrench,
  GraduationCap,
  Building2,
} from 'lucide-react';
import heroWorkstationImg from './assets/images/editorial_cad_engineer_workstation_1795011774240.jpg';
import blueprintLayersImg from './assets/images/editorial_dwg_blueprint_layers_1795011775955.jpg';
import teamReviewImg from './assets/images/editorial_engineering_team_review_1795011776549.jpg';

const HERO_WORKSTATION_IMG = heroWorkstationImg;
const BLUEPRINT_LAYERS_IMG = blueprintLayersImg;
const TEAM_REVIEW_IMG = teamReviewImg;

export default function App() {
  const [readingProgress, setReadingProgress] = useState<number>(0);
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [activeSectionId, setActiveSectionId] = useState<string>('section-1');
  const [activeThreeMode, setActiveThreeMode] =
    useState<ThreeSceneMode['id']>('workstation');
  const [versionFilter, setVersionFilter] = useState<
    'ALL' | 'AutoCAD 2023' | 'AutoCAD 2024' | 'AutoCAD 2025' | 'AutoCAD 2026'
  >('ALL');
  const [capabilityCategory, setCapabilityCategory] =
    useState<CapabilityCategory>('all');
  const [activeCodeTab, setActiveCodeTab] = useState<string>(
    PRACTICAL_SOLUTIONS_TODAY[0].id
  );
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [openFaqIds, setOpenFaqIds] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-2': true,
  });
  const [revisionCountInput, setRevisionCountInput] = useState<number>(50);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      setReadingProgress(
        calculateReadingProgress(scrollTop, scrollHeight, clientHeight)
      );

      for (let i = ARTICLE_SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(ARTICLE_SECTIONS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180) {
            setActiveSectionId(ARTICLE_SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredExistingFeatures = filterFeaturesByVersion(
    EXISTING_AUTOCAD_AI_FEATURES,
    versionFilter
  );

  const filteredCapabilities = filterCapabilitiesByCategory(
    PROPOSED_MISSING_CAPABILITIES,
    capabilityCategory
  );

  const activeSolution =
    PRACTICAL_SOLUTIONS_TODAY.find((s) => s.id === activeCodeTab) ||
    PRACTICAL_SOLUTIONS_TODAY[0];

  const revisionMetrics = calculateRevisionTimeSavings(revisionCountInput, 6, 18);

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleJumpToThreeMode = (mode: ThreeSceneMode['id']) => {
    setActiveThreeMode(mode);
    const studioEl = document.getElementById('interactive-3d-studio');
    studioEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-[#060B16] text-slate-100 selection:bg-sky-500/30 selection:text-sky-200">
      {/* Reading Progress Hairline Bar */}
      <div
        role="progressbar"
        aria-label="Article reading progress"
        aria-valuenow={readingProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-slate-900"
      >
        <div
          className="h-full bg-sky-400 transition-transform duration-150 origin-left"
          style={{ transform: `scaleX(${readingProgress / 100})` }}
        />
      </div>

      {/* Top Navigation Bar (Strict 3-Zone Contract: Brand — 5 Nav Links — 1 Primary Action) */}
      <header className="sticky top-0 z-40 flex items-center justify-between gap-4 sm:gap-8 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-800/80 bg-[#060B16]/95 backdrop-blur-md">
        <a
          href="#top"
          className="text-base sm:text-lg font-editorial font-bold tracking-tight text-white whitespace-nowrap shrink-0"
        >
          CAD Horizon Review
        </a>

        <nav
          aria-label="Primary Article Sections"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300"
        >
          <a
            href="#section-2"
            className="hover:text-sky-400 transition-colors whitespace-nowrap shrink-0"
          >
            Existing AI
          </a>
          <a
            href="#section-3"
            className="hover:text-sky-400 transition-colors whitespace-nowrap shrink-0"
          >
            Missing Capabilities
          </a>
          <a
            href="#section-6"
            className="hover:text-sky-400 transition-colors whitespace-nowrap shrink-0"
          >
            Engineering Hurdles
          </a>
          <a
            href="#section-8"
            className="hover:text-sky-400 transition-colors whitespace-nowrap shrink-0"
          >
            Today's Solutions
          </a>
          <a
            href="#section-9"
            className="hover:text-sky-400 transition-colors whitespace-nowrap shrink-0"
          >
            AI Architecture
          </a>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#seo-spec-section"
            className="px-3.5 sm:px-4 py-2 text-xs font-semibold text-slate-950 bg-sky-400 rounded-lg hover:bg-sky-300 transition-colors whitespace-nowrap shrink-0"
          >
            SEO & Schema Spec
          </a>
        </div>
      </header>

      {/* Main Publication Container */}
      <main id="top" className="max-w-[1360px] mx-auto px-4 sm:px-8 pt-10 pb-24">
        {/* =================================================================== */}
        {/* EDITORIAL HERO & BYLINE HEADER                                      */}
        {/* =================================================================== */}
        <article>
          <header className="max-w-4xl mx-auto pb-10 border-b border-slate-800/90">
            {/* Unboxed Metadata Line (Zero-Pill Discipline) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-widest text-sky-400 mb-4">
              <span>Vol. XIV · Computational Engineering & CAD Systems</span>
              <span aria-hidden="true" className="text-slate-600">
                ·
              </span>
              <span className="text-slate-400">Primary Topic: AI in AutoCAD</span>
              <span aria-hidden="true" className="text-slate-600">
                ·
              </span>
              <span className="text-slate-400">24 Min Deep-Dive Report</span>
            </div>

            {/* Article Title (H1) */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.35rem] font-editorial font-semibold text-white leading-[1.13] tracking-tight">
              Why Doesn't AutoCAD Have a Full AI Design Assistant Yet? The Problems
              Faced by CAD Professionals and the Future of AI-Powered Design.
            </h1>

            {/* Editorial Deck / Standfirst */}
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
              While generative artificial intelligence writes software modules and
              renders photorealistic imagery in seconds, mechanical, civil,
              electrical, and architectural engineers still execute thousands of
              manual entity selections inside DWG files. We investigate what
              Autodesk’s machine-learning tools already deliver in AutoCAD
              2023–2026, why a full conversational DWG assistant remains one of
              computer science’s hardest geometric problems, and how engineering
              teams can automate production drafting today.
            </p>

            {/* Author & Research Verification Strip */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-slate-200 font-medium">
                  By Dr. Marcus Vance, PE (Mechanical & CAD Systems) & Elena
                  Rostova, M.Arch (Computational Design)
                </span>
                <span aria-hidden="true">·</span>
                <span>Reviewed against AutoCAD 2023–2026 Documentation</span>
                <span aria-hidden="true">·</span>
                <span>Published November 2026</span>
              </div>
              <div className="font-mono text-sky-400 tabular-nums">
                Reading Progress: {readingProgress}%
              </div>
            </div>
          </header>

          {/* ================================================================= */}
          {/* INTERACTIVE 3D STUDIO SHOWCASE (All 5 Required 3D Visuals)        */}
          {/* ================================================================= */}
          <div id="interactive-3d-studio" className="my-10">
            <CadThreeVisualizer
              activeMode={activeThreeMode}
              onSelectMode={setActiveThreeMode}
            />
          </div>

          {/* ================================================================= */}
          {/* ASYMMETRIC TWO-COLUMN EDITORIAL LAYOUT (TOC Rail + 68ch Prose)    */}
          {/* ================================================================= */}
          <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* LEFT STICKY TABLE OF CONTENTS & 3D FIGURE JUMP RAIL (Collapsible on mobile, Sticky on Laptop) */}
            <aside
              aria-label="Table of Contents and 3D Figures"
              className="lg:col-span-4 lg:sticky lg:top-20 space-y-4 sm:space-y-6"
            >
              {/* Mobile Collapsible Toggle Button (Hidden on Laptop lg+) */}
              <div className="lg:hidden">
                <button
                  type="button"
                  onClick={() => setMobileTocOpen((prev) => !prev)}
                  aria-expanded={mobileTocOpen}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-slate-800 bg-[#081020] text-xs font-mono text-sky-400"
                >
                  <span>
                    Monograph Index (12 Chapters & 5 3D Figures) · {readingProgress}% Read
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileTocOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>

              <div
                className={`${
                  mobileTocOpen ? 'block' : 'hidden'
                } lg:block space-y-6`}
              >
                <div className="rounded-xl border border-slate-800/90 bg-[#081020] p-5">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                    <span className="text-xs font-mono uppercase tracking-wider text-sky-400">
                      Monograph Index
                    </span>
                    <span className="text-xs font-mono text-slate-400 tabular-nums">
                      {readingProgress}% Read
                    </span>
                  </div>
                  <nav aria-label="Chapter Navigation">
                    <ol className="space-y-1.5 text-xs">
                      {ARTICLE_SECTIONS.map((sec) => {
                        const isCurrent = activeSectionId === sec.id;
                        return (
                          <li key={sec.id}>
                            <a
                              href={`#${sec.id}`}
                              onClick={() => {
                                setActiveSectionId(sec.id);
                                setMobileTocOpen(false);
                              }}
                              className={`flex items-center gap-2.5 py-1.5 px-2.5 rounded-md transition-colors ${
                                isCurrent
                                  ? 'bg-sky-500/15 text-sky-300 font-semibold'
                                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                              }`}
                            >
                              <span className="font-mono text-[11px] text-slate-500 tabular-nums shrink-0">
                                {sec.number}
                              </span>
                              <span className="truncate">{sec.title}</span>
                            </a>
                          </li>
                        );
                      })}
                    </ol>
                  </nav>
                </div>

                {/* Quick 3D Visual Scene Launcher in Margin Rail */}
                <div className="rounded-xl border border-slate-800/90 bg-[#081020] p-5">
                  <div className="text-xs font-mono uppercase tracking-wider text-sky-400 pb-2.5 mb-3 border-b border-slate-800">
                    Interactive 3D Visual Figures
                  </div>
                  <div className="space-y-2">
                    {THREE_SCENE_MODES.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          handleJumpToThreeMode(m.id);
                          setMobileTocOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between gap-2 ${
                          activeThreeMode === m.id
                            ? 'bg-sky-500/20 text-sky-200 border border-sky-500/40 font-medium'
                            : 'bg-[#060B16] text-slate-400 hover:text-slate-200 border border-slate-800/70'
                        }`}
                      >
                        <span className="truncate">
                          Fig. {m.number} — {m.shortTitle}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-sky-400" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* RIGHT MAIN EDITORIAL PROSE COLUMN (8 Cols) */}
            <div className="lg:col-span-8 space-y-16">
              {/* ============================================================= */}
              {/* SECTION 1: INTRODUCTION                                       */}
              {/* ============================================================= */}
              <section id="section-1" className="scroll-mt-24 space-y-6">
                <div className="text-xs font-mono uppercase tracking-widest text-sky-400">
                  01 / The Production Engineering Bottleneck
                </div>
                <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-white">
                  1. Introduction: Friday Afternoon and the 50-Modification DWG Revision
                </h2>

                <div className="max-w-prose space-y-5 text-base text-slate-200 leading-[1.8]">
                  <p className="first-letter:text-5xl first-letter:font-editorial first-letter:font-bold first-letter:text-sky-400 first-letter:float-left first-letter:mr-3.5 first-letter:mt-1">
                    Imagine a senior CAD design engineer working at a multi-disciplinary
                    engineering firm on a Thursday evening. Seventy-two hours before an
                    Issued for Construction (IFC) deadline, the lead structural and MEP
                    coordinators return a consolidated coordination review containing
                    exactly 50 redlined drawing modifications across a master plant
                    arrangement DWG file.
                  </p>
                  <p>
                    None of the 50 modifications require fundamental scientific
                    breakthroughs. Instead, they demand relentless, high-stakes manual
                    precision inside AutoCAD: shifting a secondary containment wall by
                    250 millimeters, updating 18 dependent linear and baseline
                    dimensions, replacing 14 legacy valve blocks with updated flanged
                    assemblies, migrating misclassified contractor geometry off Layer{' '}
                    <code className="text-sky-300 bg-slate-900 px-1.5 py-0.5 rounded text-sm">
                      0
                    </code>{' '}
                    onto standardized ISO 13567 layers, adjusting multileader
                    annotations that now collide with structural gridlines, re-scaling
                    three Paper Space viewports, verifying company `.DWS` drawing
                    standards, and checking every modified callout manually before
                    initialing the title block.
                  </p>
                </div>

                {/* High-Resolution Documentary Editorial Figure */}
                <figure className="my-8 rounded-xl border border-slate-800 bg-[#081020] overflow-hidden">
                  <div className="relative aspect-video w-full bg-slate-900">
                    <img
                      src={HERO_WORKSTATION_IMG}
                      alt="Senior CAD engineer inspecting dual-monitor 2D DWG floorplans and 3D orthographic assemblies at a dark engineering workstation"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <figcaption className="px-5 py-3 text-xs font-serif italic text-slate-400 border-t border-slate-800/80">
                    Plate I — In large engineering enterprises, executing a 50-item
                    revision sheet still requires thousands of sequential manual cursor
                    picks, layer verifications, and viewport checks.
                  </figcaption>
                </figure>

                {/* Checklist & Interactive Revision Time Calculator */}
                <div className="rounded-xl border border-slate-800 bg-[#091224] p-6 space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                    <div>
                      <h3 className="text-base font-semibold text-white">
                        Anatomy of a 50-Modification DWG Revision Cycle
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Adjust the revision item count below to compare manual execution
                        against a supervised AI CAD workflow.
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <label
                        htmlFor="revision-count-range"
                        className="text-xs font-mono text-slate-300"
                      >
                        Modifications:
                      </label>
                      <input
                        id="revision-count-range"
                        type="range"
                        min={10}
                        max={200}
                        step={10}
                        value={revisionCountInput}
                        onChange={(e) => setRevisionCountInput(Number(e.target.value))}
                        className="w-28 accent-sky-400 cursor-pointer"
                      />
                      <span className="font-mono text-sm font-semibold text-sky-400 tabular-nums w-12">
                        {revisionCountInput}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
                    <div className="rounded-lg border border-slate-800 bg-[#060B16] p-4">
                      <div className="text-xs text-slate-400">Manual Drafting Time</div>
                      <div className="text-2xl font-bold text-amber-400 tabular-nums mt-1">
                        {revisionMetrics.manualHours} hrs
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        @ ~6.0 mins per multi-layer edit + QA
                      </div>
                    </div>
                    <div className="rounded-lg border border-slate-800 bg-[#060B16] p-4">
                      <div className="text-xs text-slate-400">
                        Supervised AI Assistant (Proposed)
                      </div>
                      <div className="text-2xl font-bold text-emerald-400 tabular-nums mt-1">
                        {revisionMetrics.aiHours} hrs
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        @ ~18s engineer review per staged edit
                      </div>
                    </div>
                    <div className="rounded-lg border border-slate-800 bg-[#060B16] p-4">
                      <div className="text-xs text-slate-400">
                        Engineering Capacity Recovered
                      </div>
                      <div className="text-2xl font-bold text-sky-400 tabular-nums mt-1">
                        {revisionMetrics.hoursSaved} hrs ({revisionMetrics.reductionPercent}%)
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        Reallocated to design & clash verification
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300 pt-2">
                    <div className="p-2.5 rounded bg-[#060B16] border border-slate-800/70">
                      1. Open master DWG & verify active Xref paths
                    </div>
                    <div className="p-2.5 rounded bg-[#060B16] border border-slate-800/70">
                      2. Locate target entities across dense overlapping layers
                    </div>
                    <div className="p-2.5 rounded bg-[#060B16] border border-slate-800/70">
                      3. Stretch geometry & re-associate linear dimensions
                    </div>
                    <div className="p-2.5 rounded bg-[#060B16] border border-slate-800/70">
                      4. Replace blocks & preserve attribute tag values
                    </div>
                    <div className="p-2.5 rounded bg-[#060B16] border border-slate-800/70">
                      5. Audit layer compliance & clear entity overrides
                    </div>
                    <div className="p-2.5 rounded bg-[#060B16] border border-slate-800/70">
                      6. Update Paper Space viewports, REVCLOUDs & title blocks
                    </div>
                  </div>
                </div>

                {/* Editorial Pull Quote (Top/Bottom Hairline Divider — No Left Accent Bar) */}
                <blockquote className="my-10 py-8 border-y border-slate-800 text-center px-4">
                  <p className="text-xl sm:text-2xl font-editorial italic text-slate-100 leading-relaxed max-w-2xl mx-auto">
                    “Why can’t engineers simply tell AutoCAD what needs to change and
                    allow an AI assistant to perform the requested modifications under
                    their supervision?”
                  </p>
                  <footer className="mt-3 text-xs font-mono uppercase tracking-widest text-sky-400">
                    The Central Question of Modern Computational Drafting
                  </footer>
                </blockquote>
              </section>

              {/* ============================================================= */}
              {/* SECTION 2: DOES AUTOCAD ALREADY HAVE AI?                      */}
              {/* ============================================================= */}
              <section id="section-2" className="scroll-mt-24 space-y-6 pt-8 border-t border-slate-800/80">
                <div className="text-xs font-mono uppercase tracking-widest text-sky-400">
                  02 / Official Capabilities Audit (AutoCAD 2023–2026)
                </div>
                <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-white">
                  2. Does AutoCAD Already Have AI? Separating Reality from Misconception
                </h2>

                <div className="max-w-prose space-y-5 text-base text-slate-200 leading-[1.8]">
                  <p>
                    To evaluate the state of <strong>AI in AutoCAD</strong> fairly, we
                    must begin with an unambiguous factual correction: it is inaccurate
                    to claim that AutoCAD has no artificial intelligence features. Over
                    the last four annual release cycles (AutoCAD 2023, 2024, 2025, and
                    2026), Autodesk has shipped a focused suite of machine-learning and
                    AI-powered productivity capabilities designed to reduce repetitive
                    drafting friction.
                  </p>
                  <p>
                    However, understanding why CAD professionals still feel the absence
                    of a "full AI design assistant" requires distinguishing clearly
                    between four distinct technological paradigms:{' '}
                    <strong>deterministic automation</strong>,{' '}
                    <strong>machine learning assistance</strong>,{' '}
                    <strong>generative design optimization</strong>, and a{' '}
                    <strong>conversational generative CAD agent</strong>.
                  </p>
                </div>

                {/* Version Filter + Official Feature Matrix */}
                <div className="rounded-xl border border-slate-800 bg-[#091224] overflow-hidden">
                  <div className="px-5 py-4 bg-[#070E1C] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-white">
                        Verified Autodesk AutoCAD AI & Machine Learning Features
                      </h3>
                      <p className="text-xs text-slate-400">
                        Filter by release version to inspect capabilities and
                        architectural boundaries.
                      </p>
                    </div>
                    <div
                      role="group"
                      aria-label="Filter AutoCAD features by version"
                      className="flex flex-wrap gap-1.5"
                    >
                      {(
                        [
                          'ALL',
                          'AutoCAD 2023',
                          'AutoCAD 2024',
                          'AutoCAD 2025',
                          'AutoCAD 2026',
                        ] as const
                      ).map((ver) => (
                        <button
                          key={ver}
                          type="button"
                          onClick={() => setVersionFilter(ver)}
                          className={`px-2.5 py-1 rounded text-xs font-mono transition-colors whitespace-nowrap shrink-0 ${
                            versionFilter === ver
                              ? 'bg-sky-500 text-slate-950 font-semibold'
                              : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          {ver}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="divide-y divide-slate-800/80">
                    {filteredExistingFeatures.map((feat) => (
                      <div key={feat.id} className="p-5 space-y-2.5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="text-base font-semibold text-sky-300">
                            {feat.name}
                          </h4>
                          <div className="text-xs font-mono text-slate-400">
                            <span>Introduced: {feat.introducedVersion}</span>
                            <span aria-hidden="true" className="mx-1.5">
                              ·
                            </span>
                            <span className="text-slate-300">{feat.classification}</span>
                          </div>
                        </div>
                        <p className="text-sm text-slate-200 leading-relaxed">
                          {feat.whatItDoes}
                        </p>
                        <div className="rounded-lg bg-[#060B16] border border-slate-800/90 p-3 text-xs space-y-1">
                          <div className="text-amber-300/90">
                            <strong>Current Architectural Boundary:</strong>{' '}
                            {feat.architecturalBoundary}
                          </div>
                          <div className="text-slate-500 font-mono">
                            Version History: {feat.expandedVersions} · Source:{' '}
                            {feat.officialDocRef}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comparison Table: AI Assistance vs Automation vs ML vs Generative Design */}
                <div className="space-y-3 pt-4">
                  <h3 className="text-lg font-semibold text-white">
                    Distinguishing the Four Paradigms: Automation, ML, Generative Design
                    & Conversational CAD
                  </h3>
                  <div className="overflow-x-auto rounded-xl border border-slate-800">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="bg-[#070E1C] border-b border-slate-800 text-slate-300 font-mono text-xs uppercase">
                          <th className="py-3.5 px-4">Paradigm</th>
                          <th className="py-3.5 px-4">Core Mechanism</th>
                          <th className="py-3.5 px-4">CAD Example</th>
                          <th className="py-3.5 px-4">Synthesizes New Intent?</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80 bg-[#091224]">
                        {AI_TAXONOMY_COMPARISON.map((row) => (
                          <tr key={row.paradigm} className="align-top">
                            <td className="py-3.5 px-4 font-semibold text-white">
                              {row.paradigm}
                            </td>
                            <td className="py-3.5 px-4 text-slate-300">
                              {row.mechanism}
                            </td>
                            <td className="py-3.5 px-4 text-slate-300">
                              {row.exampleInCad}
                            </td>
                            <td className="py-3.5 px-4 font-mono text-xs text-sky-300">
                              {row.canCreateNewDesignIntent}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 3: WHAT IS ACTUALLY MISSING? (12 CAPABILITIES)        */}
              {/* ============================================================= */}
              <section id="section-3" className="scroll-mt-24 space-y-6 pt-8 border-t border-slate-800/80">
                <div className="text-xs font-mono uppercase tracking-widest text-sky-400">
                  03 / The Capability Gap Analysis
                </div>
                <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-white">
                  3. What Is Actually Missing? Twelve Proposed Capabilities for a True AI
                  CAD Assistant
                </h2>

                <div className="max-w-prose space-y-5 text-base text-slate-200 leading-[1.8]">
                  <p>
                    Existing AutoCAD AI tools operate primarily as{' '}
                    <em>pattern recognizers</em> and <em>suggestion engines</em>. Smart
                    Blocks recognizes repeated geometry and predicts insertion snaps;
                    Markup Assist performs OCR on PDF callouts; Autodesk Assistant
                    answers help queries. What remains missing is an{' '}
                    <strong>
                      integrated, context-aware semantic design assistant
                    </strong>{' '}
                    capable of reading, constructing, validating, and revising DWG
                    geometry across layers and sheets under human supervision.
                  </p>
                  <p className="text-sm text-amber-300/90 bg-amber-950/20 border border-amber-500/30 rounded-lg px-4 py-3">
                    <strong>Editorial Note:</strong> The 12 capabilities detailed below
                    are <em>proposed research capabilities</em> representing unmet
                    industry requirements—not existing out-of-the-box AutoCAD features.
                  </p>
                </div>

                {/* Interactive Category Filter for the 12 Missing Capabilities */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div
                    role="tablist"
                    aria-label="Filter 12 proposed AI capabilities by domain"
                    className="flex flex-wrap gap-1.5 p-1 rounded-lg bg-[#081020] border border-slate-800"
                  >
                    {(
                      [
                        { id: 'all', label: 'All 12 Capabilities' },
                        { id: 'geometry', label: 'Geometry & Drafting (4)' },
                        { id: 'qa', label: 'QA & Standards (5)' },
                        { id: 'doc3d', label: 'Documentation & 3D (3)' },
                      ] as const
                    ).map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={capabilityCategory === tab.id}
                        onClick={() => setCapabilityCategory(tab.id)}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                          capabilityCategory === tab.id
                            ? 'bg-sky-500 text-slate-950 font-semibold'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-mono text-slate-400 tabular-nums">
                    Showing {filteredCapabilities.length} of 12 proposed capabilities
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredCapabilities.map((cap) => (
                    <div
                      key={cap.id}
                      className="rounded-xl border border-slate-800/90 bg-[#091224] p-5 flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                          <span className="text-sky-400 font-semibold tabular-nums">
                            PROPOSED CAPABILITY #{cap.id < 10 ? `0${cap.id}` : cap.id}
                          </span>
                          <span>{cap.categoryLabel}</span>
                        </div>
                        <h3 className="text-base font-semibold text-white">
                          {cap.title}
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          <strong className="text-slate-200">Manual Status Quo: </strong>
                          {cap.currentManualReality}
                        </p>
                        <p className="text-xs text-slate-200 leading-relaxed">
                          <strong className="text-sky-300">Target AI Workflow: </strong>
                          {cap.proposedAiCapability}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
                        <span className="text-amber-400">Bottleneck:</span>{' '}
                        {cap.technicalBottleneck}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 4: REAL PROBLEMS FACED BY STUDENTS                    */}
              {/* ============================================================= */}
              <section id="section-4" className="scroll-mt-24 space-y-6 pt-8 border-t border-slate-800/80">
                <div className="text-xs font-mono uppercase tracking-widest text-sky-400">
                  04 / Engineering Education & Pedagogical Friction
                </div>
                <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-white">
                  4. Real Problems Faced by Engineering and Architecture Students
                </h2>

                <div className="max-w-prose space-y-5 text-base text-slate-200 leading-[1.8]">
                  <p>
                    Every autumn, hundreds of thousands of first-year mechanical, civil,
                    electrical, and architectural students open AutoCAD for the first
                    time. Instead of focusing on spatial reasoning, load paths,
                    manufacturability, or ASME Y14.5 / ISO 128 engineering communication,
                    students spend their initial semesters battling syntax memorization
                    and interface complexity.
                  </p>
                  <p>
                    Consider the nine recurring obstacles that dominate undergraduate
                    CAD laboratories:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      title: '1. Learning Hundreds of Commands & Aliases',
                      desc: 'AutoCAD exposes over 1,000 commands and more than 1,100 system variables (such as DIMSCALE, LTSCALE, PSLTSCALE, Mirrtext, and PEDITACCEPT). A single mistyped system variable can silently break dimension scaling.',
                    },
                    {
                      title: '2. Remembering Command-Line Shortcuts',
                      desc: 'Fluency requires muscle memory for dozens of PGP aliases (L, PL, TR, EX, O, F, CHA, MA, LA, X, B). Beginners lose hours searching ribbons for sub-options hidden inside command prompts.',
                    },
                    {
                      title: '3. Decoding Complex Multi-Layer Drawings',
                      desc: 'When students open a real-world architectural or civil survey DWG containing 180 layers and nested Xrefs, there is no intelligent "explain this drawing structure" guide to walk them through its hierarchy.',
                    },
                    {
                      title: '4. Creating Accurate, Associative Dimensions',
                      desc: 'Students routinely struggle with annotative scales vs. viewport scales, accidentally snapping extension lines to hatch patterns or overriding dimension text instead of fixing inaccurate geometry.',
                    },
                    {
                      title: '5. Managing Layers & ByLayer Discipline',
                      desc: 'Beginners frequently draft entire assignments on Layer 0 or Defpoints(which never plots), or apply hardcoded RGB colors that defeat plot style tables (.CTB / .STB).',
                    },
                    {
                      title: '6. Diagnosing Invisible Drafting Mistakes',
                      desc: 'When a HATCH command fails with "Boundary definition error," students rarely know how to locate a 0.02 mm unclosed corner gap or an accidental non-zero Z coordinate.',
                    },
                    {
                      title: '7. Repetitive Mechanical Drafting Assignments',
                      desc: 'Drawing 36 identical gear teeth, bolt hole circles, or truss bays without mastering polar arrays and dynamic blocks turns engineering homework into mechanical tedium.',
                    },
                    {
                      title: '8. Applying ISO / ASME Engineering Standards',
                      desc: 'Software permits any lineweight, arrow size, or projection angle—giving zero real-time pedagogical feedback when a student mixes First-Angle and Third-Angle orthographic projections.',
                    },
                    {
                      title: '9. Converting 2D Orthographic Views to 3D Models',
                      desc: 'Mentally folding top, front, and right-side 2D views into a 3D solid (and aligning UCS coordinate systems for PRESSPULL and REVOLVE) remains one of the highest dropout hurdles in freshman graphics.',
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-lg border border-slate-800/90 bg-[#081020] p-4 space-y-1.5"
                    >
                      <h3 className="text-sm font-semibold text-sky-300">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-slate-800 bg-[#091326] p-5 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <GraduationCap className="w-4 h-4 text-sky-400" />
                    <span>
                      Pedagogical Imperative: Why an AI Tutor Should Coach, Not Cheat
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    An educational AI assistant inside AutoCAD should not simply
                    complete a student’s homework from a prompt. Instead, a{" "}
                    <strong>Pedagogical Socratic Mode</strong> could inspect a student’s
                    drawing in real time and explain:{" "}
                    <em>
                      “Your hatch boundary on the flange section is failing because
                      Vertex 4 and Vertex 5 have a 0.18 mm gap at (142.4, 88.0), and
                      three hidden lines are currently placed on the continuous visible
                      edge layer instead of an ISO dashed hidden layer.”
                    </em>{" "}
                    That transforms AI from a shortcut into an always-available lab
                    instructor.
                  </p>
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 5: PROBLEMS FACED BY EMPLOYEES IN LARGE COMPANIES     */}
              {/* ============================================================= */}
              <section id="section-5" className="scroll-mt-24 space-y-6 pt-8 border-t border-slate-800/80">
                <div className="text-xs font-mono uppercase tracking-widest text-sky-400">
                  05 / Enterprise & Industrial Scale
                </div>
                <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-white">
                  5. Problems Faced by Employees in Large Engineering Companies
                </h2>

                <div className="max-w-prose space-y-5 text-base text-slate-200 leading-[1.8]">
                  <p>
                    In a five-person studio, a drafting inconsistency can be resolved by
                    walking across the room. In a multinational Engineering,
                    Procurement, and Construction (EPC) firm, automotive supplier, or
                    infrastructure consultancy managing 15,000 active DWG sheets across
                    six time zones, manual CAD bottlenecks compound into multi-million-dollar
                    schedule risks.
                  </p>
                </div>

                <figure className="my-8 rounded-xl border border-slate-800 bg-[#081020] overflow-hidden">
                  <div className="relative aspect-[4/3] max-h-[420px] w-full bg-slate-900">
                    <img
                      src={TEAM_REVIEW_IMG}
                      alt="Multidisciplinary civil and mechanical engineering team reviewing large-format technical drawings with redline revision markups"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <figcaption className="px-5 py-3 text-xs font-serif italic text-slate-400 border-t border-slate-800/80">
                    Plate II — Multi-disciplinary coordination reviews require
                    synchronizing architectural, structural, civil, piping, and
                    electrical DWG Xrefs under unforgiving submittal deadlines.
                  </figcaption>
                </figure>

                <div className="max-w-prose space-y-4 text-base text-slate-200 leading-[1.8]">
                  <p>
                    Enterprise CAD managers and senior designers consistently point to
                    ten structural workflow pressures where current tools fall short:
                  </p>
                  <ul className="space-y-3 text-sm text-slate-300">
                    <li>
                      <strong className="text-white">
                        1. Thousands of Cascading Drawing Revisions:
                      </strong>{' '}
                      When an equipment vendor changes a compressor skid footprint by
                      150 mm late in detailed engineering, that single dimensional
                      change ripples across foundation drawings, anchor bolt plans,
                      piping isometrics, cable tray layouts, and maintenance clearance
                      sheets.
                    </li>
                    <li>
                      <strong className="text-white">
                        2. Repetitive Cross-Sheet Drafting Operations:
                      </strong>{' '}
                      Updating a standard detail note, fire-damper symbol, or title-block
                      client logo across 400 layout tabs still requires manual batch
                      scripting or tedious sheet-by-sheet edits when attributes were not
                      initially linked to a Sheet Set (`.DST`).
                    </li>
                    <li>
                      <strong className="text-white">
                        3. Heavy, Legacy DWG Files (50 MB–250 MB):
                      </strong>{' '}
                      Infrastructure corridor drawings and brownfield factory plans
                      accumulate decades of unpurged `Regapps` (registered application
                      IDs), orphaned DGN linestyle dictionaries, nested blocks, and
                      dense civil contour polylines that degrade pan/zoom regeneration.
                    </li>
                    <li>
                      <strong className="text-white">
                        4. Competing Client & Regulatory Drawing Standards:
                      </strong>{' '}
                      An engineering firm may simultaneously deliver projects under the
                      U.S. National CAD Standard (AIA), ISO 13567, BS 1192, and bespoke
                      owner-operator CAD manuals—each mandating different layer naming
                      schemas, text heights, and CTB pen weights.
                    </li>
                    <li>
                      <strong className="text-white">
                        5. Cross-Departmental Xref Coordination:
                      </strong>{' '}
                      When Civil updates site grading, Architecture shifts building
                      grids, and MEP routes ductwork, unresolved External Reference
                      (Xref) circular dependencies or shifted basepoints (`INSBASE`) can
                      silently misalign entire building wings.
                    </li>
                    <li>
                      <strong className="text-white">
                        6. Revision Tracking & Audit Traceability:
                      </strong>{' '}
                      ISO 9001 quality audits require knowing <em>why</em> a dimension
                      changed, <em>who</em> approved it, and <em>which</em> calculation
                      package authorized the update—metadata rarely linked directly to
                      the modified DWG entities.
                    </li>
                    <li>
                      <strong className="text-white">
                        7. Pre-Submittal Quality Control Bottlenecks:
                      </strong>{' '}
                      Senior principal engineers spend disproportionate billable hours
                      highlighting missing north arrows, unclosed revision clouds, scale
                      mismatches, and overridden dimensions rather than reviewing load
                      calculations.
                    </li>
                    <li>
                      <strong className="text-white">
                        8. Disconnected Engineering Documentation:
                      </strong>{' '}
                      Equipment schedules in Excel, P&ID tags in AutoCAD, and valve
                      datasheets in PDF frequently drift out of sync because 2D linework
                      is not bidirectionally bound to a central relational database.
                    </li>
                    <li>
                      <strong className="text-white">
                        9. Compressed EPC & Design-Build Deadlines:
                      </strong>{' '}
                      Fast-track industrial projects issue 30%, 60%, 90%, and IFC
                      packages in overlapping waves, leaving zero buffer for manual
                      redrafting.
                    </li>
                    <li>
                      <strong className="text-white">
                        10. Global Multi-Site Team Handoffs:
                      </strong>{' '}
                      When a design package transitions between offices in Houston,
                      London, and Bengaluru, subtle differences in template usage or
                      custom `.SHX` font availability cause immediate plotting failures.
                    </li>
                  </ul>
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 6: WHY IS A FULL AI CAD ASSISTANT DIFFICULT?          */}
              {/* ============================================================= */}
              <section id="section-6" className="scroll-mt-24 space-y-6 pt-8 border-t border-slate-800/80">
                <div className="text-xs font-mono uppercase tracking-widest text-sky-400">
                  06 / Technical, Legal & Architectural Barriers
                </div>
                <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-white">
                  6. Why Is a Full AI CAD Assistant Difficult to Develop?
                </h2>

                <div className="max-w-prose space-y-5 text-base text-slate-200 leading-[1.8]">
                  <p>
                    If large language models can generate thousands of lines of React or
                    Python code in seconds, why hasn’t Autodesk—or any major CAD
                    vendor—shipped a full natural-language copilot that directly edits
                    production DWG geometry?
                  </p>
                  <p className="text-xs font-mono text-slate-300 bg-[#081020] border border-slate-800 rounded-lg p-3.5">
                    <strong>Methodological Transparency:</strong> Autodesk does not
                    publicly disclose all internal R&D trade-offs or product roadmap
                    constraints. The analysis below separates{' '}
                    <span className="text-sky-300">
                      Verified Technical Facts
                    </span>{' '}
                    (documented DWG architecture, API structures, and engineering codes)
                    from{' '}
                    <span className="text-amber-300">
                      Industry Systems Analysis & Reasonable Hypotheses
                    </span>{' '}
                    regarding cloud economics and product liability.
                  </p>
                </div>

                <figure className="my-8 rounded-xl border border-slate-800 bg-[#081020] overflow-hidden">
                  <div className="relative aspect-video w-full bg-slate-900">
                    <img
                      src={BLUEPRINT_LAYERS_IMG}
                      alt="Scientific isometric rendering of a multi-layered CAD blueprint exploding vertically into structural, dimensional, mechanical, and annotation layers"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <figcaption className="px-5 py-3 text-xs font-serif italic text-slate-400 border-t border-slate-800/80">
                    Plate III — A production DWG file is not a flat raster image; it is
                    a deeply nested hierarchical database of binary object handles,
                    topological tolerances, and cross-referenced layers.
                  </figcaption>
                </figure>

                {/* 12 Technical & Business Hurdles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      tag: 'Verified Fact · Mathematical Precision',
                      title: '1. Double-Precision Floating-Point Accuracy',
                      body: 'LLMs predict discrete text tokens probabilistically, whereas AutoCAD stores coordinates in IEEE 754 64-bit floating-point numbers requiring tolerances down to 10⁻⁶ millimeters. A 0.05 mm rounding drift breaks tangent arcs and CNC toolpaths.',
                    },
                    {
                      tag: 'Verified Fact · Data Representation',
                      title: '2. The "Bag-of-Vectors" Semantic Gap',
                      body: 'In a traditional 2D DWG, a structural column is often just four unconnected LINE entities or an un-named LWPOLYLINE. Unlike BIM (Revit) or parametric MCAD (Inventor), the file does not explicitly label those four lines as a load-bearing column.',
                    },
                    {
                      tag: 'Verified Fact · Geometric Constraints',
                      title: '3. Implicit Topological & Dimensional Constraints',
                      body: 'Moving a wall in a 2D plan requires trimming intersecting partition lines, moving door blocks along the wall vector, healing room hatches, and stretching associative dimensions without breaking adjacent rooms.',
                    },
                    {
                      tag: 'Verified Fact · Regulatory Codes',
                      title: '4. Multi-Jurisdictional Design Standards',
                      body: 'A valid drawing must simultaneously satisfy ASME Y14.5, ISO 128, local fire egress codes, and company-specific .DWS rules. Context varies drastically between a printed 1:50 floorplan and a 1:2 mechanical spindle detail.',
                    },
                    {
                      tag: 'Verified Fact · Professional Law',
                      title: '5. Engineering Safety, Stamping & Legal Liability',
                      body: 'When a licensed Professional Engineer (PE) or Registered Architect stamps a drawing, they assume personal and corporate legal liability. An autonomous AI that silently alters a beam flange thickness or pressure rating creates unacceptable safety hazards.',
                    },
                    {
                      tag: 'Verified Fact · Binary Architecture',
                      title: '6. DWG Binary Compatibility & Object Handles',
                      body: 'The native DWG format maintains backward/forward compatibility across decades of ObjectARX custom entities, persistent AcDbHandle references, Xdata, and reactors. Directly mutating entities without API transactions corrupts database pointers.',
                    },
                    {
                      tag: 'Industry Analysis · Real-World Messiness',
                      title: '7. Complex, Non-Standard Legacy Drawings',
                      body: 'Real industrial drawings are rarely clean textbook examples: they contain exploded blocks, scaled blocks with unequal X/Y factors, overlapping polylines, and mixed imperial/metric Xrefs accumulated over 30 years.',
                    },
                    {
                      tag: 'Industry Analysis · Training Data Scarcity',
                      title: '8. Proprietary Data & Training Corpus Barriers',
                      body: 'Unlike open-source software code on GitHub, the world’s highest-quality production DWG files are confidential intellectual property locked inside private corporate vaults, defence contractors, and utility providers.',
                    },
                    {
                      tag: 'Verified Fact · Enterprise Governance',
                      title: '9. Enterprise Security, ITAR & Air-Gapped Networks',
                      body: 'Defense, aerospace, energy, and semiconductor firms prohibit transmitting proprietary DWG geometry to external multi-tenant cloud LLMs, requiring strict zero-data-retention guarantees or local on-device inference.',
                    },
                    {
                      tag: 'Industry Hypothesis · Cloud Economics',
                      title: '10. Context-Window & Cloud Computing Costs',
                      body: 'A single production DWG containing 250,000 entities serializes into tens of millions of tokens if represented naively as text/DXF. Running frontier LLM inference on every pan, zoom, or edit across millions of seats is economically prohibitive without compact spatial graphs.',
                    },
                    {
                      tag: 'Verified Fact · Probabilistic Failure Modes',
                      title: '11. Zero Tolerance for AI Hallucinations',
                      body: 'In creative writing, a hallucination is a minor annoyance; in a structural steel shop drawing, a hallucinated bolt edge distance or omitted weld symbol leads to fabricated steel that fails inspection on the job site.',
                    },
                    {
                      tag: 'Systems Analysis · UX Ergonomics',
                      title: '12. Human-in-the-Loop Verification Overhead',
                      body: 'If an AI assistant modifies 200 entities at once, the engineer must be able to visually audit and verify all 200 changes faster than it would take to draw them manually—requiring specialized transient diff UI.',
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-xl border border-slate-800/90 bg-[#081020] p-5 space-y-2"
                    >
                      <div className="text-[11px] font-mono uppercase tracking-wider text-sky-400">
                        {item.tag}
                      </div>
                      <h3 className="text-sm font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 7: WHAT WOULD THE IDEAL AI AUTOCAD LOOK LIKE?         */}
              {/* ============================================================= */}
              <section id="section-7" className="scroll-mt-24 space-y-6 pt-8 border-t border-slate-800/80">
                <div className="text-xs font-mono uppercase tracking-widest text-sky-400">
                  07 / Conceptual Specification & Supervised Workflows
                </div>
                <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-white">
                  7. What Would the Ideal AI-Powered AutoCAD Look Like?
                </h2>

                <div className="max-w-prose space-y-5 text-base text-slate-200 leading-[1.8]">
                  <p>
                    An ideal AI design assistant for AutoCAD would not operate as a
                    "black box" that overwrites files behind the scenes. Instead, it
                    would function as a{' '}
                    <strong>
                      deterministic, constraint-aware engineering copilot
                    </strong>{' '}
                    that translates natural language into staged ObjectARX transactions,
                    previews every proposed modification in the viewport, explains its
                    reasoning, and waits for explicit engineer sign-off.
                  </p>
                  <p>
                    Below are three concrete, proposed workflows illustrating how this
                    human-supervised paradigm should operate in practice. Use the
                    interactive simulator to inspect each step and test the Stage 7
                    Engineer Approval Gate:
                  </p>
                </div>

                {/* Interactive Simulator for the 3 Required Conceptual Examples */}
                <IdealWorkflowSimulator />
              </section>

              {/* ============================================================= */}
              {/* SECTION 8: PRACTICAL SOLUTIONS AVAILABLE TODAY                */}
              {/* ============================================================= */}
              <section id="section-8" className="scroll-mt-24 space-y-6 pt-8 border-t border-slate-800/80">
                <div className="text-xs font-mono uppercase tracking-widest text-sky-400">
                  08 / Actionable Engineering Playbook
                </div>
                <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-white">
                  8. Practical Solutions Available Today: Automating AutoCAD Without
                  Waiting
                </h2>

                <div className="max-w-prose space-y-5 text-base text-slate-200 leading-[1.8]">
                  <p>
                    CAD professionals and engineering firms do not need to wait for a
                    future release to eliminate 60% to 80% of repetitive drafting labor.
                    AutoCAD already possesses one of the deepest, most mature
                    deterministic automation ecosystems in industrial software—spanning{' '}
                    <strong>AutoLISP / Visual LISP</strong>,{' '}
                    <strong>Headless Core Console (`accoreconsole.exe`)</strong>, the{' '}
                    <strong>ObjectARX / Managed .NET 8 API</strong>, and{' '}
                    <strong>Autodesk Platform Services (APS) Design Automation</strong>.
                  </p>
                  <p>
                    Crucially, while modern LLMs cannot directly edit a live binary DWG
                    canvas by themselves, they are exceptionally good at{' '}
                    <strong>
                      generating deterministic AutoLISP routines, `.SCR` scripts, and C#
                      `.NET` plugins
                    </strong>{' '}
                    that you can inspect and run safely inside AutoCAD today.
                  </p>
                </div>

                {/* Interactive Code Solutions Explorer */}
                <div className="rounded-xl border border-slate-800 bg-[#081020] overflow-hidden">
                  <div
                    role="tablist"
                    aria-label="Actionable AutoCAD Automation Code Examples"
                    className="flex flex-wrap gap-1.5 px-5 py-3 bg-[#060C18] border-b border-slate-800"
                  >
                    {PRACTICAL_SOLUTIONS_TODAY.map((sol) => {
                      const isActive = sol.id === activeSolution.id;
                      return (
                        <button
                          key={sol.id}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          onClick={() => setActiveCodeTab(sol.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                            isActive
                              ? 'bg-sky-500 text-slate-950 font-semibold'
                              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          {sol.title}
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-5 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <div className="text-xs font-mono text-sky-400">
                          {activeSolution.environment}
                        </div>
                        <h3 className="text-base font-semibold text-white mt-0.5">
                          {activeSolution.title}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyCode(
                            activeSolution.id,
                            activeSolution.codeSnippet
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-100 transition-colors whitespace-nowrap shrink-0"
                      >
                        {copiedCodeId === activeSolution.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copied {activeSolution.codeFilename}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-sky-400" />
                            <span>Copy {activeSolution.codeFilename}</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed">
                      {activeSolution.explanation}
                    </p>

                    <div className="rounded-lg border border-slate-800 bg-[#040811] p-4 overflow-x-auto">
                      <pre className="text-xs font-mono text-slate-200 leading-relaxed">
                        <code>{activeSolution.codeSnippet}</code>
                      </pre>
                    </div>

                    <div className="text-xs font-mono text-slate-400 flex flex-wrap items-center justify-between gap-2 pt-1">
                      <span>
                        <strong className="text-sky-300">Best For:</strong>{' '}
                        {activeSolution.bestFor}
                      </span>
                      <span>{activeSolution.executionNote}</span>
                    </div>
                  </div>
                </div>

                {/* Additional Actionable Best Practices Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="rounded-lg border border-slate-800/90 bg-[#081020] p-4 space-y-1.5">
                    <h4 className="text-sm font-semibold text-white">
                      Reusable `.DWT` Templates & `.DWS` Standards
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Lock down ISO/AIA layers, dimension styles, table styles, and plot
                      configurations inside read-only `.DWT` templates paired with
                      automated `CHECKSTANDARDS` `.DWS` files so drafters never invent
                      ad-hoc layers.
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-800/90 bg-[#081020] p-4 space-y-1.5">
                    <h4 className="text-sm font-semibold text-white">
                      Dynamic Block Libraries + Tool Palettes
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Consolidate 50 static blocks into a single constraint-driven
                      Dynamic Block with Lookup Tables and Visibility States, deployed
                      via shared network Tool Palettes and AutoCAD 2024–2026 Smart
                      Blocks Replacement.
                    </p>
                  </div>
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 9: PROPOSED AI + AUTOCAD WORKFLOW ARCHITECTURE        */}
              {/* ============================================================= */}
              <section id="section-9" className="scroll-mt-24 space-y-6 pt-8 border-t border-slate-800/80">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs font-mono uppercase tracking-widest text-sky-400">
                    09 / Reference Systems Architecture
                  </div>
                  <button
                    type="button"
                    onClick={() => handleJumpToThreeMode('architecture')}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    <span>Inspect 3D Architecture Pipeline (Fig. 03)</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-white">
                  9. Proposed AI + AutoCAD Workflow: The 9-Stage Hybrid Architecture
                </h2>

                <div className="max-w-prose space-y-5 text-base text-slate-200 leading-[1.8]">
                  <p>
                    How should a production-grade AI design assistant be architected so
                    that it achieves conversational flexibility without ever sacrificing
                    floating-point geometric accuracy or professional liability? The
                    solution is a <strong>Neuro-Symbolic Hybrid Pipeline</strong> where
                    the language model acts strictly as a semantic planner, while a
                    deterministic CAD geometry kernel and human approval gate govern
                    every database modification.
                  </p>
                </div>

                {/* Visual 9-Stage Pipeline Diagram */}
                <div className="rounded-xl border border-slate-800 bg-[#081020] p-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
                    <h3 className="text-sm font-mono uppercase tracking-wider text-sky-400">
                      9-Stage Neuro-Symbolic DWG Execution Pipeline
                    </h3>
                    <span className="text-xs font-mono text-slate-400">
                      User Prompt → Deterministic Solver → Human Sign-Off → DWG Commit
                    </span>
                  </div>

                  <div className="space-y-3">
                    {ARCHITECTURE_STAGES.map((st, index) => (
                      <div key={st.stageNumber} className="relative">
                        <div className="rounded-lg border border-slate-800/90 bg-[#060B16] p-4 space-y-2">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                              <span className="font-mono text-xs font-bold text-sky-400 tabular-nums">
                                STAGE 0{st.stageNumber}
                              </span>
                              <span className="text-slate-600" aria-hidden="true">
                                ·
                              </span>
                              <h4 className="text-sm font-semibold text-white">
                                {st.name}
                              </h4>
                            </div>
                            <span className="text-xs font-mono text-slate-400">
                              {st.layerType}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {st.description}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-800/60 text-[11px] font-mono">
                            <div className="text-slate-400">
                              <strong className="text-slate-200">Output:</strong>{' '}
                              {st.output}
                            </div>
                            <div className="text-emerald-400/90">
                              <strong>Safety Guard:</strong> {st.failurePrevention}
                            </div>
                          </div>
                        </div>
                        {index < ARCHITECTURE_STAGES.length - 1 && (
                          <div
                            aria-hidden="true"
                            className="flex justify-center my-1 text-sky-500/60 font-mono text-xs"
                          >
                            ↓
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 10: THE FUTURE OF CAD SOFTWARE                        */}
              {/* ============================================================= */}
              <section id="section-10" className="scroll-mt-24 space-y-6 pt-8 border-t border-slate-800/80">
                <div className="text-xs font-mono uppercase tracking-widest text-sky-400">
                  010 / 2027–2032 Industry Horizon
                </div>
                <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-white">
                  10. The Future of CAD Software: Eight Converging Frontiers
                </h2>

                <div className="max-w-prose space-y-5 text-base text-slate-200 leading-[1.8]">
                  <p>
                    As foundational spatial graphs, multimodal vision-language models,
                    and cloud-native CAD kernels mature, the boundary between 2D
                    drafting and intelligent systems engineering will dissolve across
                    eight key frontiers:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      title: '1. Conversational Constraint-Driven CAD',
                      body: 'Engineers will combine precision mouse snaps with natural-language relational commands ("Space these 12 anchor bolts equally along the north girder flange maintaining 45 mm edge distance").',
                    },
                    {
                      title: '2. AI-Assisted Multi-Discipline Engineering',
                      body: 'Background agents will continuously cross-check structural, mechanical, and electrical DWG Xrefs against design calculations, surfacing dimensional conflicts before coordination meetings.',
                    },
                    {
                      title: '3. Automated Drawing Documentation & Schedules',
                      body: 'Generating orthographic projection sheets, section cuts, weld maps, and ISO-compliant BOM tables from 3D models or 2D layouts will transition from days of manual detailing to supervised one-click staging.',
                    },
                    {
                      title: '4. Co-Pilot Generative Design in 2D & 3D',
                      body: 'Rather than restricting generative topology optimization to specialized FEA workspaces, everyday drafting environments will offer real-time routing, truss layout, and material-nesting trade-off suggestions.',
                    },
                    {
                      title: '5. Intelligent Continuous CAD Quality Checking',
                      body: 'Just as modern IDEs run static type-checkers and linters on every keystroke, CAD software will feature real-time ASME Y14.5 / ISO 128 semantic linters that flag ambiguous tolerances and unclosed geometry.',
                    },
                    {
                      title: '6. Multimodal Drawing & Field Understanding',
                      body: 'Engineers will feed site laser-scan point clouds, smartphone photos of existing mechanical rooms, vendor PDF cut-sheets, and P&ID diagrams into a unified multimodal workspace that registers them to the DWG coordinate system.',
                    },
                    {
                      title: '7. Hands-Free Voice-Controlled CAD Manipulation',
                      body: 'Paired with a 6-DOF SpaceMouse and precision cursor, low-latency voice commands will trigger complex layer isolation, dimension styling, and inspection filters without breaking visual focus on the model.',
                    },
                    {
                      title: '8. AI-Powered Interactive Engineering Education',
                      body: 'University CAD workstations will include Socratic tutoring layers that guide students through orthographic projection, GDT tolerances, and manufacturability rules in real time.',
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-xl border border-slate-800/90 bg-[#081020] p-5 space-y-2"
                    >
                      <h3 className="text-sm font-semibold text-sky-300">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 11: CONCLUSION                                        */}
              {/* ============================================================= */}
              <section id="section-11" className="scroll-mt-24 space-y-6 pt-8 border-t border-slate-800/80">
                <div className="text-xs font-mono uppercase tracking-widest text-sky-400">
                  11 / Synthesis & Call to the CAD Industry
                </div>
                <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-white">
                  11. Conclusion: Elevating the Engineer, Not Replacing the Profession
                </h2>

                <div className="max-w-prose space-y-5 text-base text-slate-200 leading-[1.8]">
                  <p>
                    The absence of a full conversational AI design assistant in AutoCAD
                    today is not a sign of technological stagnation. Rather, it reflects
                    the extraordinary mathematical rigor, topological complexity, and
                    life-safety accountability embedded in every production DWG file.
                    Autodesk’s existing AI capabilities—Smart Blocks, Markup Import and
                    Markup Assist, Object Detection, Macro Advisor, and Autodesk
                    Assistant—have laid essential groundwork in computer vision and
                    in-canvas assistance.
                  </p>
                  <p>
                    Yet the next leap forward must bridge the chasm between{' '}
                    <em>recognizing patterns</em> and{' '}
                    <em>executing supervised, constraint-validated engineering changes</em>.
                    Artificial intelligence should never attempt to replace the licensed
                    engineer, architect, or skilled CAD draftsperson. Instead, its
                    mandate in computer-aided design is clear: eliminate the exhausting
                    mechanical drudgery of 50-revision redline chases, catch avoidable
                    human drafting errors before fabrication, and return time to the
                    human mind for structural ingenuity, spatial craft, and sound
                    engineering judgment.
                  </p>
                </div>

                <blockquote className="my-8 py-8 border-y border-slate-800 text-center px-4">
                  <p className="text-lg sm:text-xl font-editorial italic text-slate-100 leading-relaxed max-w-2xl mx-auto">
                    “The goal of AI in CAD is not autonomous drawing without engineers;
                    it is engineering freed from the tyranny of repetitive manual
                    command picking.”
                  </p>
                </blockquote>
              </section>

              {/* ============================================================= */}
              {/* SECTION 12: FAQ, CITATIONS, RELATED ARTICLES & SEO SPEC       */}
              {/* ============================================================= */}
              <section id="section-faq" className="scroll-mt-24 space-y-10 pt-8 border-t border-slate-800/80">
                <div className="space-y-4">
                  <div className="text-xs font-mono uppercase tracking-widest text-sky-400">
                    12 / Research FAQ & Official Documentation Citations
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-white">
                    Frequently Asked Questions: AI in AutoCAD
                  </h2>

                  <div className="space-y-3">
                    {FAQ_ITEMS.map((faq) => {
                      const isOpen = !!openFaqIds[faq.id];
                      return (
                        <div
                          key={faq.id}
                          className="rounded-xl border border-slate-800 bg-[#081020] overflow-hidden"
                        >
                          <button
                            type="button"
                            onClick={() => toggleFaq(faq.id)}
                            aria-expanded={isOpen}
                            className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-900/60 transition-colors"
                          >
                            <span className="text-sm sm:text-base font-semibold text-white">
                              {faq.question}
                            </span>
                            <ChevronDown
                              className={`w-4 h-4 text-sky-400 shrink-0 transition-transform duration-200 ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <div className="px-5 pb-4 pt-1 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60">
                              <p>{faq.answer}</p>
                              <div className="mt-2 text-xs font-mono text-sky-400">
                                Reference: {faq.relatedSection}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Official Citations & Sources */}
                <div className="rounded-xl border border-slate-800 bg-[#081020] p-6 space-y-4">
                  <h3 className="text-lg font-editorial font-semibold text-white">
                    Official Autodesk Documentation & Engineering Standards Citations
                  </h3>
                  <ol className="space-y-3 text-xs text-slate-300 list-decimal list-inside">
                    {CITATION_SOURCES.map((cit) => (
                      <li
                        key={cit.id}
                        className="pb-3 border-b border-slate-800/70 last:border-none last:pb-0"
                      >
                        <span className="font-semibold text-white">{cit.title}</span> —{' '}
                        <span className="text-slate-400">
                          {cit.publisher} ({cit.year})
                        </span>
                        <p className="mt-1 text-slate-400 pl-4">{cit.verifiedClaim}</p>
                        <a
                          href={cit.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 pl-4 inline-flex items-center gap-1 font-mono text-sky-400 hover:text-sky-300"
                        >
                          <span>{cit.url}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* SEO & Schema.org Complete Specification Panel */}
                <div id="seo-spec-section" className="scroll-mt-24">
                  <SeoAndSchemaPanel />
                </div>

                {/* Related Articles */}
                <div className="space-y-4 pt-4">
                  <h3 className="text-xl font-editorial font-semibold text-white">
                    Related Engineering & Computational CAD Research
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {RELATED_ARTICLES.map((rel) => (
                      <a
                        key={rel.title}
                        href={`#${rel.targetSection}`}
                        className="group rounded-xl border border-slate-800/90 bg-[#081020] p-5 flex flex-col justify-between hover:border-sky-500/50 transition-colors"
                      >
                        <div className="space-y-2.5">
                          <div className="text-xs font-mono text-slate-400">
                            <span>{rel.category}</span>
                            <span aria-hidden="true" className="mx-1.5">
                              ·
                            </span>
                            <span>{rel.readTime}</span>
                          </div>
                          <h4 className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors leading-snug">
                            {rel.title}
                          </h4>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            {rel.summary}
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-800/70 flex items-center justify-between text-xs font-mono text-sky-400">
                          <span>{rel.date}</span>
                          <span>Read Section →</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </article>
      </main>

      {/* Clean Editorial Footer */}
      <footer className="border-t border-slate-800/90 bg-[#040811] py-10 px-6">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <span className="font-editorial font-semibold text-slate-200">
              CAD Horizon Engineering Review
            </span>{' '}
            · Independent Research in Computer-Aided Design & Engineering Automation
          </div>
          <div className="flex items-center gap-6">
            <a href="#top" className="hover:text-slate-200 transition-colors">
              Back to Top
            </a>
            <a
              href="#interactive-3d-studio"
              className="hover:text-slate-200 transition-colors"
            >
              3D Spatial Figures
            </a>
            <a
              href="#seo-spec-section"
              className="hover:text-slate-200 transition-colors"
            >
              Schema.org Metadata
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
