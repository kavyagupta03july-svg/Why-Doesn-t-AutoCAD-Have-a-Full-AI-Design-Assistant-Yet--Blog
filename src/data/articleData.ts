export type CapabilityCategory = 'all' | 'geometry' | 'qa' | 'doc3d';

export interface ExistingAiFeature {
  id: string;
  name: string;
  introducedVersion: 'AutoCAD 2023' | 'AutoCAD 2024' | 'AutoCAD 2025' | 'AutoCAD 2026';
  expandedVersions: string;
  classification: 'Machine Learning' | 'AI Assistance' | 'Automation' | 'Conversational Support';
  whatItDoes: string;
  architecturalBoundary: string;
  officialDocRef: string;
}

export interface ProposedCapability {
  id: number;
  title: string;
  category: Exclude<CapabilityCategory, 'all'>;
  categoryLabel: string;
  currentManualReality: string;
  proposedAiCapability: string;
  technicalBottleneck: string;
}

export interface ConceptualWorkflowStep {
  stepNumber: number;
  stage: string;
  detail: string;
  cadOutput: string;
  requiresApproval?: boolean;
}

export interface ConceptualWorkflowExample {
  id: string;
  label: string;
  discipline: string;
  userPrompt: string;
  contextSummary: string;
  toleranceSpec: string;
  steps: ConceptualWorkflowStep[];
  verificationMetrics: {
    entitiesAffected: number;
    layersValidated: string[];
    standardCompliance: string;
    manualTimeMinutes: number;
    supervisedAiSeconds: number;
  };
}

export interface PracticalSolutionTab {
  id: string;
  title: string;
  environment: string;
  bestFor: string;
  explanation: string;
  codeLanguage: string;
  codeFilename: string;
  codeSnippet: string;
  executionNote: string;
}

export interface ArchitectureStage {
  stageNumber: number;
  name: string;
  layerType: 'Cognitive Layer' | 'Semantic Graph' | 'Deterministic Solver' | 'Execution & Governance';
  input: string;
  output: string;
  description: string;
  failurePrevention: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  relatedSection: string;
}

export interface CitationSource {
  id: string;
  title: string;
  publisher: string;
  year: string;
  url: string;
  verifiedClaim: string;
}

export interface ThreeSceneMode {
  id: 'workstation' | 'comparison' | 'architecture' | 'assistant' | 'revision';
  number: string;
  shortTitle: string;
  fullTitle: string;
  caption: string;
  keyTakeaway: string;
}

export const THREE_SCENE_MODES: ThreeSceneMode[] = [
  {
    id: 'workstation',
    number: '01',
    shortTitle: '3D CAD Workstation',
    fullTitle: 'Fig. 1 — The Modern Multi-Layer CAD Engineering Workstation',
    caption:
      'Procedural 3D assembly of a dual-display precision CAD workstation inspecting orthographic DWG layer stacks, 6-DOF SpaceMouse hardware, and manual redline callouts.',
    keyTakeaway:
      'Engineers still bridge 2D symbolic layers and 3D spatial intent mentally—translating PDF markups through thousands of manual mouse picks and keyboard macros.',
  },
  {
    id: 'comparison',
    number: '02',
    shortTitle: 'Manual vs. AI Workflow',
    fullTitle: 'Fig. 2 — Traditional 50-Revision Manual Chain vs. Supervised AI Pipeline',
    caption:
      'Spatial comparison contrasting fragmented sequential entity picking (left, amber/red nodes) with a unified constraint-validated AI command stream gated by human approval (right, sky/emerald nodes).',
    keyTakeaway:
      'A supervised AI assistant collapses repetitive entity selection and layer remediation while preserving the engineer of record as the mandatory approval gate.',
  },
  {
    id: 'architecture',
    number: '03',
    shortTitle: '9-Stage AI Architecture',
    fullTitle: 'Fig. 3 — Proposed 9-Stage Hybrid AI + Deterministic AutoCAD Architecture',
    caption:
      'Three-dimensional dataflow pipeline tracing a natural-language prompt through a Drawing Understanding Engine, deterministic Geometry Validator, ObjectARX API preview, and DWG transaction commit.',
    keyTakeaway:
      'Language models should never write binary DWG bytes directly; they must emit structured, geometrically validated API transactions previewed before commit.',
  },
  {
    id: 'assistant',
    number: '04',
    shortTitle: 'AI DWG Inspector',
    fullTitle: 'Fig. 4 — Conceptual AI Assistant Interacting with a 5000 × 4000 mm Technical Plan',
    caption:
      'Conceptual spatial visualization of an AI semantic scanner evaluating a 5000 mm × 4000 mm structural room with 230 mm masonry walls, projecting dimensional and layer diagnostics.',
    keyTakeaway:
      'True spatial understanding requires parsing topological containment, wall offsets, block insertions, and ISO/ASME dimensioning rules simultaneously.',
  },
  {
    id: 'revision',
    number: '05',
    shortTitle: 'DWG Revision Diff',
    fullTitle: 'Fig. 5 — Semantic DWG Revision Comparison (Rev. A vs. Rev. B)',
    caption:
      'Exploded 3D DWG revision diff isolating added structural geometry (emerald), deprecated entities (crimson wireframe), and modified dimensional tolerances (electric blue).',
    keyTakeaway:
      'Beyond visual cloud overlays, engineers need semantic revision intelligence that explains how a dimensional change propagates across dependent sheets and BOMs.',
  },
];

export const ARTICLE_SECTIONS = [
  { id: 'section-1', number: '01', title: 'The 50-Revision Reality: Introduction' },
  { id: 'section-2', number: '02', title: 'Does AutoCAD Already Have AI?' },
  { id: 'section-3', number: '03', title: 'What Is Actually Missing? (12 Capabilities)' },
  { id: 'section-4', number: '04', title: 'Real Problems Faced by Engineering Students' },
  { id: 'section-5', number: '05', title: 'Industrial Workflows in Large Enterprises' },
  { id: 'section-6', number: '06', title: 'Why a Full AI CAD Assistant Is Hard to Build' },
  { id: 'section-7', number: '07', title: 'What the Ideal AI-Powered AutoCAD Looks Like' },
  { id: 'section-8', number: '08', title: 'Practical Solutions Available Today' },
  { id: 'section-9', number: '09', title: 'Proposed 9-Stage AI + AutoCAD Architecture' },
  { id: 'section-10', number: '10', title: 'The Future of Conversational & Multimodal CAD' },
  { id: 'section-11', number: '11', title: 'Conclusion & Industry Call to Action' },
  { id: 'section-faq', number: '12', title: 'Frequently Asked Questions & SEO Spec' },
];

export const EXISTING_AUTOCAD_AI_FEATURES: ExistingAiFeature[] = [
  {
    id: 'markup-import-assist',
    name: 'Markup Import & Markup Assist',
    introducedVersion: 'AutoCAD 2023',
    expandedVersions: 'Enhanced in AutoCAD 2024–2026 (strikethrough text recognition, fade markup, PDF comments)',
    classification: 'Machine Learning',
    whatItDoes:
      'Uses optical character recognition (OCR) and machine learning to overlay PDF, PNG, or JPG redlines onto a DWG file, automatically detecting hand-drawn revision clouds, text callouts, and strikethrough edits so drafters can insert MTEXT, MLEADER, or REVCLOUD entities with a click.',
    architecturalBoundary:
      'Recognizes 2D raster/PDF markups and converts annotations, but cannot interpret complex geometric modification instructions (e.g., "shift the north bearing wall 350 mm east and re-space all structural columns").',
    officialDocRef: 'Autodesk AutoCAD 2023–2026 Help: About Markup Import and Markup Assist',
  },
  {
    id: 'macro-advisor',
    name: 'Command Macros & Macro Advisor',
    introducedVersion: 'AutoCAD 2023',
    expandedVersions: 'Available in AutoCAD 2023–2026 (Not included in AutoCAD LT)',
    classification: 'AI Assistance',
    whatItDoes:
      'Observes repetitive sequences of user commands during drafting sessions and surfaces personalized command macro recommendations in the Command Macros palette to automate multi-step sequences.',
    architecturalBoundary:
      'Suggests pre-packaged command macros based on command-history telemetry; it does not synthesize new custom AutoLISP routines or execute natural-language instructions on drawing geometry.',
    officialDocRef: 'Autodesk AutoCAD Documentation: About Command Macros',
  },
  {
    id: 'smart-blocks-placement',
    name: 'Smart Blocks: Placement & Replacement',
    introducedVersion: 'AutoCAD 2024',
    expandedVersions: 'Refined in AutoCAD 2025–2026',
    classification: 'Machine Learning',
    whatItDoes:
      'Placement infers position, rotation angle, and scale factor for a new block reference based on how similar blocks were previously placed near walls or corners in the DWG. Replacement suggests similar blocks from the library while preserving scale, rotation, and attribute values.',
    architecturalBoundary:
      'Operates on existing block definitions and local wall/corner adjacency heuristics; it cannot author new parametric block definitions from a specification sheet or engineering prompt.',
    officialDocRef: 'Autodesk AutoCAD 2024 Help: About Smart Blocks Placement and Replacement',
  },
  {
    id: 'smart-blocks-search-convert',
    name: 'Smart Blocks: Search & Convert / Object Detection',
    introducedVersion: 'AutoCAD 2025',
    expandedVersions: 'Expanded in AutoCAD 2026 (Detect and Convert with text variation support)',
    classification: 'Machine Learning',
    whatItDoes:
      'Search and Convert finds all instances of selected ungrouped geometry across a drawing and converts them into uniform block instances. Object Detection scans a drawing using ML computer vision to recognize doors, sinks, toilets, lighting symbols, and structural shapes that were drawn as raw lines/arcs.',
    architecturalBoundary:
      'Recognizes recurring 2D architectural/symbol patterns to clean up legacy drawings, but does not perform generative engineering layout, clash resolution, or multi-sheet revision updates.',
    officialDocRef: 'Autodesk AutoCAD 2025 & 2026 Help: About Smart Blocks Object Detection',
  },
  {
    id: 'autodesk-assistant',
    name: 'Autodesk Assistant (Conversational Help)',
    introducedVersion: 'AutoCAD 2025',
    expandedVersions: 'Enhanced in AutoCAD 2026',
    classification: 'Conversational Support',
    whatItDoes:
      'Provides an in-canvas conversational AI interface inside AutoCAD that answers product workflow questions, explains system variables, synthesizes official Autodesk learning articles, and connects users with live technical support.',
    architecturalBoundary:
      'Acts strictly as a documentation and support copilot. It does not have read/write access to the active DWG database entities to execute drafting modifications on your behalf.',
    officialDocRef: 'Autodesk AutoCAD 2025 Help: What’s New — Autodesk Assistant',
  },
];

export const AI_TAXONOMY_COMPARISON = [
  {
    paradigm: 'Deterministic Automation',
    mechanism: 'Explicit rules, scripts (.SCR), AutoLISP, VBA, ObjectARX/.NET APIs',
    exampleInCad: 'Running a custom AutoLISP routine to purge unused layers and standardize text styles across 200 sheets.',
    canCreateNewDesignIntent: 'No — executes exact programmed instructions',
    hallucinationRisk: 'Zero (deterministic math)',
  },
  {
    paradigm: 'Machine Learning Assistance',
    mechanism: 'Pattern classification, clustering, OCR, and computer vision models trained on drawing corpora',
    exampleInCad: 'AutoCAD Smart Blocks Object Detection identifying unblocked door swings; Markup Assist reading handwritten redlines.',
    canCreateNewDesignIntent: 'No — infers local patterns and classifications',
    hallucinationRisk: 'Low (false-positive object highlights reviewed by user)',
  },
  {
    paradigm: 'Generative Design (Optimization)',
    mechanism: 'Topology optimization, genetic algorithms, and physics-constrained solver exploration',
    exampleInCad: 'Autodesk Fusion Generative Design computing mass-optimized bracket geometries given load cases and manufacturing constraints.',
    canCreateNewDesignIntent: 'Partial — explores geometric trade-offs within hard boundary conditions',
    hallucinationRisk: 'Low — governed by FEA physics solvers',
  },
  {
    paradigm: 'Full Conversational AI CAD Assistant (Proposed)',
    mechanism: 'Multimodal LLM + Semantic DWG Graph + Deterministic Constraint Solver + Human Approval Layer',
    exampleInCad: 'Instructing AutoCAD in natural language to revise 50 redlined dimensions, re-route conduit layers, validate ISO 128 standards, and stage a diff preview.',
    canCreateNewDesignIntent: 'Yes — translates high-level engineering intent into verified DWG transactions',
    hallucinationRisk: 'Mitigated only via deterministic geometry validation & mandatory engineer sign-off',
  },
];

export const PROPOSED_MISSING_CAPABILITIES: ProposedCapability[] = [
  {
    id: 1,
    title: 'Natural-Language Drawing Creation',
    category: 'geometry',
    categoryLabel: 'Geometry & Drafting',
    currentManualReality:
      'Engineers manually invoke LINE, PLINE, OFFSET, TRIM, FILLET, and ARRAY commands hundreds of times to construct basic floorplans, mounting plates, or P&ID schematics.',
    proposedAiCapability:
      'Proposed capability: Generate complete, constraint-accurate 2D geometry, centerlines, and layer assignments from structured natural-language specifications (e.g., "Draw a 400 × 250 mm baseplate in 12 mm steel with four M16 clearance holes inset 35 mm from corners").',
    technicalBottleneck:
      'Requires translating ambiguous prose into closed, non-self-intersecting topological loops with exact coordinate precision.',
  },
  {
    id: 2,
    title: 'AI-Powered Semantic DWG Editing',
    category: 'geometry',
    categoryLabel: 'Geometry & Drafting',
    currentManualReality:
      'Stretching a room or mechanical housing requires careful crossing-window selection in STRETCH, manually repairing broken hatches, re-associating dimensions, and adjusting adjacent blocks.',
    proposedAiCapability:
      'Proposed capability: Issue relational modification prompts ("Expand Bay 3 by 600 mm north and shift all ceiling diffusers to maintain equal spacing") that preserve geometric relationships across ungrouped 2D entities.',
    technicalBottleneck:
      'Unlike parametric 3D modelers (Inventor/Revit), most AutoCAD DWG files lack explicit constraint graphs tying lines into semantic objects.',
  },
  {
    id: 3,
    title: 'Automatic Dimension Correction & Re-Association',
    category: 'qa',
    categoryLabel: 'QA & Standards',
    currentManualReality:
      'Draftsmen manually hunt down disassociated dimensions, overlapping extension lines, overridden dimension text (`<>` replaced with static strings), and non-standard arrow styles.',
    proposedAiCapability:
      'Proposed capability: Automatically audit all `AcDbDimension` entities, detect text overrides that contradict true geometry length, re-snap extension origins to true object endpoints (OSNAP), and stagger crowded baseline dimensions.',
    technicalBottleneck:
      'Distinguishing intentional Not-To-Scale (NTS) detail callouts from accidental dimension overrides or snapped-to-hatch errors.',
  },
  {
    id: 4,
    title: 'Intelligent Semantic Layer Management',
    category: 'qa',
    categoryLabel: 'QA & Standards',
    currentManualReality:
      'External contractor drawings frequently arrive with thousands of entities dumped onto Layer `0`, `Defpoints`, or non-standard layer names with forced entity-level RGB color overrides.',
    proposedAiCapability:
      'Proposed capability: Classify every entity by its geometric context (exterior wall, hidden edge, centerline, dimension leader, title block) and migrate it to compliant AIA, ISO 13567, or company-specific layers with `ByLayer` properties.',
    technicalBottleneck:
      'Identical geometric primitives (a 0.25 mm dashed line) can represent a hidden mechanical edge, a demolition wall, or an underground utility depending on discipline.',
  },
  {
    id: 5,
    title: 'Automatic Drawing Standard Checking (ISO / ASME / AIA)',
    category: 'qa',
    categoryLabel: 'QA & Standards',
    currentManualReality:
      'AutoCAD’s built-in CAD Standards tool (`CHECKSTANDARDS`) only checks named table objects (layer names, linetypes, text styles, dimension styles) against a `.DWS` file—ignoring geometric drafting rules.',
    proposedAiCapability:
      'Proposed capability: Deep semantic QA that verifies ASME Y14.5 or ISO 128 compliance: checking minimum text height at viewport plot scale, missing tolerances, unclosed section boundaries, and improper leader crossing.',
    technicalBottleneck:
      'Requires evaluating Model Space geometry through the lens of Paper Space viewport scales and annotation visibility states.',
  },
  {
    id: 6,
    title: 'AI-Powered Semantic Drawing Comparison',
    category: 'qa',
    categoryLabel: 'QA & Standards',
    currentManualReality:
      'The `COMPARE` (DWG Compare) command highlights geometric differences visually with revision clouds, but treats a 2 mm title-block shift or exploded block as thousands of raw line changes.',
    proposedAiCapability:
      'Proposed capability: Summarize drawing revisions in engineering terms ("Wall thickness on Grid B-C increased from 200 mm to 230 mm; 4 fire dampers added; pump schedule flow rate updated from 45 L/s to 60 L/s").',
    technicalBottleneck:
      'Mapping low-level `AcDbEntity` handle additions and deletions to high-level engineering design intent.',
  },
  {
    id: 7,
    title: 'Automatic Multi-Sheet Revision Management',
    category: 'doc3d',
    categoryLabel: 'Documentation & 3D',
    currentManualReality:
      'Updating a revision delta requires manually placing `REVCLOUD` arcs, inserting delta triangles, updating title block attributes across dozens of layouts, and editing the master drawing register.',
    proposedAiCapability:
      'Proposed capability: Automatically generate revision clouds around approved modifications, increment sheet revision attributes, populate the revision history table with concise change descriptions, and flag affected Xref host sheets.',
    technicalBottleneck:
      'Requires deterministic transaction tracking across external references (Xrefs) and Sheet Set Manager (`.DST`) databases.',
  },
  {
    id: 8,
    title: 'Generative Smart Block Authoring (Dynamic Blocks)',
    category: 'geometry',
    categoryLabel: 'Geometry & Drafting',
    currentManualReality:
      'Creating a single Dynamic Block with visibility states, linear stretch pairs, lookup tables, and attribute definitions in the Block Editor (`BEDIT`) can take an experienced CAD manager hours.',
    proposedAiCapability:
      'Proposed capability: Generate a complete Dynamic Block definition from a vendor PDF cut-sheet or prompt ("Create a dynamic metric hex bolt block supporting M8 through M24 sizes with top and side visibility states").',
    technicalBottleneck:
      'Synthesizing valid `AcDbEvalGraph` action-parameter dependencies inside the DWG database without cyclic constraint conflicts.',
  },
  {
    id: 9,
    title: 'AI-Powered 2D-to-3D Orthographic Reconstruction',
    category: 'doc3d',
    categoryLabel: 'Documentation & 3D',
    currentManualReality:
      'Converting legacy 2D top, front, and right-side orthographic views into a watertight 3D solid requires manually aligning profiles, extruding, revolving, and running Boolean `INTERSECT`/`SUBTRACT` operations.',
    proposedAiCapability:
      'Proposed capability: Automatically register 2D orthographic projections, section views, and auxiliary callouts to reconstruct a manifold 3D solid or parametric feature tree with verified wall thicknesses and fillets.',
    technicalBottleneck:
      'Resolving topological ambiguities in hidden lines, broken foreshortened views, and schematic thread/gear representations.',
  },
  {
    id: 10,
    title: 'Automatic Drawing Documentation & BOM Extraction',
    category: 'doc3d',
    categoryLabel: 'Documentation & 3D',
    currentManualReality:
      'When legacy drawings use raw text instead of structured Block Attributes, `DATAEXTRACTION` fails, forcing engineers to manually count parts and type Bills of Materials (BOM) and schedules.',
    proposedAiCapability:
      'Proposed capability: Parse unblocked callouts, leader notes, and symbol geometry across model and paper space to compile structured schedules, BOM tables, and general notes automatically.',
    technicalBottleneck:
      'Ensuring 100.0% count accuracy so no fastener, valve, or structural member is double-counted across main views and enlarged detail callouts.',
  },
  {
    id: 11,
    title: 'Intelligent Geometric & Topological Error Detection',
    category: 'qa',
    categoryLabel: 'QA & Standards',
    currentManualReality:
      'Microscopic gaps (0.004 mm) prevent `HATCH` boundaries from closing; overlapping colinear lines (`OVERKILL` misses), non-coplanar Z-vertices (`Z ≠ 0`), and off-axis lines (`89.98°`) corrupt downstream CAM/CNC paths.',
    proposedAiCapability:
      'Proposed capability: Continuously scan the active DWG for micro-gaps, accidental non-zero Z elevations, near-orthogonal angle drift, and self-intersecting polylines, offering one-click topological healing.',
    technicalBottleneck:
      'Distinguishing deliberate civil survey grading elevations or tapered draft angles from accidental drafting snaps.',
  },
  {
    id: 12,
    title: 'AI-Powered Spatial & Routing Optimization',
    category: 'geometry',
    categoryLabel: 'Geometry & Drafting',
    currentManualReality:
      'Routing MEP conduits, piping runs, or structural bracing in 2D plans involves trial-and-error polyline drafting to minimize elbows, maintain clearance from columns, and respect bend radii.',
    proposedAiCapability:
      'Proposed capability: Compute optimal rectilinear or angled routing paths between terminal equipment blocks while respecting clearance zones, wall penetrations, and code-mandated spacing.',
    technicalBottleneck:
      'Requires inferring obstacle polygons and clearance rules from 2D linework that lacks native 3D BIM clash metadata.',
  },
];

export const CONCEPTUAL_WORKFLOW_EXAMPLES: ConceptualWorkflowExample[] = [
  {
    id: 'example-room',
    label: 'Example 1: Architectural Room Synthesis',
    discipline: 'Architecture & Structural Drafting',
    userPrompt:
      'Create a rectangular room measuring 5000 mm by 4000 mm with 230 mm thick walls.',
    contextSummary:
      'Demonstrates proposed natural-language geometry creation with automatic AIA layer assignment, closed wall offset topology, associative linear dimensions, and human-in-the-loop preview.',
    toleranceSpec: 'Internal clear span: 5000.00 × 4000.00 mm | External footprint: 5460.00 × 4460.00 mm | Wall offset: 230.00 mm (ISO metric masonry standard)',
    steps: [
      {
        stepNumber: 1,
        stage: 'Intent & Unit Parsing',
        detail:
          'Verify active drawing units (`INSUNITS = 4` Millimeters). Parse inner clear dimensions (X = 5000 mm, Y = 4000 mm) and structural masonry wall thickness (t = 230 mm).',
        cadOutput: 'Parsed Parameters: Inner [5000, 4000], Offset +230, Closed LWPOLYLINE',
      },
      {
        stepNumber: 2,
        stage: 'Inner & Outer Wall Geometry Generation',
        detail:
          'Construct inner closed `AcDbPolyline` from (0,0) to (5000,4000) and generate outward offset loop at (-230,-230) to (5230,4230) with mitered corners (`OFFSETGAPTYPE = 0`).',
        cadOutput: 'Created 2 closed LWPOLYLINE entities (8 vertices, Z = 0.000) + ANSI31 masonry hatch',
      },
      {
        stepNumber: 3,
        stage: 'Standard Layer & Property Assignment',
        detail:
          'Assign wall loops to layer `A-WALL-FULL` (Color 7 White, Lineweight 0.35 mm), hatch to `A-WALL-PATT` (Color 8 Grey, Lineweight 0.13 mm), and dimensions to `A-ANNO-DIMS`.',
        cadOutput: 'Verified AIA/ISO 13567 layer compliance (0 entity-level overrides)',
      },
      {
        stepNumber: 4,
        stage: 'Associative Dimension Placement',
        detail:
          'Generate associative `DIMLINEAR` entities for internal clear span (5000 mm, 4000 mm), overall external span (5460 mm, 4460 mm), and wall thickness callout (230 mm).',
        cadOutput: '5 Associative AcDbAlignedDimension entities linked via Object Reactor handles',
      },
      {
        stepNumber: 5,
        stage: 'Interactive Ghost Preview & Engineer Approval',
        detail:
          'Render transient graphics (`AcGiTransientManager`) in electric cyan inside the viewport and pause transaction commit until the engineer approves or modifies anchor coordinates.',
        cadOutput: 'Awaiting Engineer Confirmation: [Approve & Commit Transaction] / [Adjust Origin]',
        requiresApproval: true,
      },
    ],
    verificationMetrics: {
      entitiesAffected: 8,
      layersValidated: ['A-WALL-FULL', 'A-WALL-PATT', 'A-ANNO-DIMS'],
      standardCompliance: 'ISO 128 / AIA CAD Layer Guidelines',
      manualTimeMinutes: 6.5,
      supervisedAiSeconds: 8,
    },
  },
  {
    id: 'example-dimensions',
    label: 'Example 2: Dimension QA & Anomaly Audit',
    discipline: 'Mechanical & Manufacturing QA',
    userPrompt:
      'Find all incorrectly placed dimensions and identify possible corrections.',
    contextSummary:
      'Demonstrates proposed semantic quality assurance across a complex production drawing—catching manual text overrides, non-snapped extension lines, and overlapping callouts before release to manufacturing.',
    toleranceSpec: 'Audit Scope: 142 AcDbDimension entities across Model Space & 3 Paper Space Viewports',
    steps: [
      {
        stepNumber: 1,
        stage: 'DWG Database Traversal & Measurement Audit',
        detail:
          'Iterate through all `AcDbDimension` objects in the block table record, comparing the true geometric `Measurement` property against the displayed `DimensionText` override string.',
        cadOutput: 'Scanned 142 dimensions: 136 valid, 6 anomalies flagged across 3 categories',
      },
      {
        stepNumber: 2,
        stage: 'Extension Origin OSNAP Verification',
        detail:
          'Check `xLine1Pt` and `xLine2Pt` coordinates against underlying geometry endpoints and intersections. Identify 3 dimensions snapped to hatch lines or floating 0.42 mm off flange edges.',
        cadOutput: 'Flagged Handle #4F2A, #4F31, #501C: Extension origins off true geometry vertex',
      },
      {
        stepNumber: 3,
        stage: 'Text Override & Collision Detection',
        detail:
          'Detect 2 dimensions where static text ("120") masks a 118.65 mm stretched shaft feature, plus 1 baseline dimension stack where text bounding boxes collide with a section line.',
        cadOutput: 'CRITICAL: Handle #4E19 displays "120" but measures 118.65 mm (Δ = 1.35 mm)',
      },
      {
        stepNumber: 4,
        stage: 'Visual Highlight & Diagnostic Explainability',
        detail:
          'Zoom-frame flagged locations in an inspection carousel with color-coded transient markers and plain-English engineering explanations of each discrepancy.',
        cadOutput: 'Generated 6 interactive diagnostic cards with proposed snap-target vectors',
      },
      {
        stepNumber: 5,
        stage: 'Selective Batch Remediation Approval',
        detail:
          'Present item-by-item checkboxes allowing the engineer to re-associate snapped origins, restore `< >` associative measurement text, or mark specific callouts as intentional NTS.',
        cadOutput: 'Awaiting Engineer Sign-Off: 6 proposed fixes staged in sandbox transaction',
        requiresApproval: true,
      },
    ],
    verificationMetrics: {
      entitiesAffected: 6,
      layersValidated: ['M-ANNO-DIMS', 'M-PART-CONT'],
      standardCompliance: 'ASME Y14.5-2018 Dimensioning & Tolerancing',
      manualTimeMinutes: 35,
      supervisedAiSeconds: 14,
    },
  },
  {
    id: 'example-revision',
    label: 'Example 3: Semantic DWG Revision Comparison',
    discipline: 'Multi-Discipline Enterprise Engineering',
    userPrompt:
      'Compare this drawing with the previous revision and highlight all changes.',
    contextSummary:
      'Demonstrates proposed semantic revision intelligence that transcends pixel/line diffs by grouping geometric edits into meaningful engineering change items and generating a structured revision schedule.',
    toleranceSpec: 'Baseline: P-104_RevB.dwg (24,810 entities) vs. Active: P-104_RevC.dwg (25,140 entities)',
    steps: [
      {
        stepNumber: 1,
        stage: 'Spatial Graph & Handle Alignment',
        detail:
          'Align coordinate systems between `RevB` and `RevC`, filtering out inconsequential viewport pan changes and cosmetic regen differences.',
        cadOutput: 'Matched 24,690 unchanged entities; isolated 450 modified/added/deleted primitives',
      },
      {
        stepNumber: 2,
        stage: 'Semantic Clustering of Added & Deleted Objects',
        detail:
          'Cluster low-level line/arc edits into domain entities: identify 2 newly inserted `VALVE-GATE-DN150` blocks, 1 removed bypass line on Layer `P-PIPE-HP`, and 4 relocated pipe supports.',
        cadOutput: 'Synthesized 450 raw entity diffs into 7 high-level Engineering Change Items (ECIs)',
      },
      {
        stepNumber: 3,
        stage: 'Modified Dimension & Attribute Extraction',
        detail:
          'Detect that Header Pipe centerline offset changed from 1250 mm to 1400 mm and Pump P-201 block attribute `FLOW_RATE` increased from `85 m3/h` to `110 m3/h`.',
        cadOutput: 'Extracted 3 dimensional delta pairs and 2 block attribute value updates',
      },
      {
        stepNumber: 4,
        stage: 'Automated Revision Cloud & Report Synthesis',
        detail:
          'Draft grouped `REVCLOUD` polylines on Layer `G-ANNO-REVC` with `REV-C` delta tags and compile a structured Engineering Change Notice (ECN) table.',
        cadOutput: 'Staged 7 REVCLOUD boundaries + Title Block Rev C table row + CSV/PDF Summary',
        requiresApproval: true,
      },
    ],
    verificationMetrics: {
      entitiesAffected: 450,
      layersValidated: ['P-PIPE-HP', 'P-EQUIP-VALV', 'G-ANNO-REVC'],
      standardCompliance: 'ISO 7200 Title Blocks & Document Management',
      manualTimeMinutes: 48,
      supervisedAiSeconds: 19,
    },
  },
];

export const PRACTICAL_SOLUTIONS_TODAY: PracticalSolutionTab[] = [
  {
    id: 'autolisp',
    title: 'AutoLISP Dimension & Layer QA Routine',
    environment: 'Native AutoCAD 2021–2026 (Visual LISP / VS Code Extension)',
    bestFor: 'Instant in-canvas auditing of manual dimension overrides and non-ByLayer entity properties.',
    explanation:
      'While waiting for a native conversational DWG editor, engineers can use LLM coding assistants today to write deterministic AutoLISP (`.lsp`) routines. This production-ready script scans the active drawing for any dimension whose text has been manually overridden (ignoring true geometry) and highlights offending dimensions in red (Color 1) while reporting the exact count.',
    codeLanguage: 'lisp',
    codeFilename: 'AuditDimOverrides.lsp',
    codeSnippet: `(defun c:AuditDimOverrides ( / ss i ent elist dimText actualVal overrideCount)
  (vl-load-com)
  (setq overrideCount 0)
  (princ "\\n[CAD-QA] Scanning all Dimension entities for manual text overrides...")
  
  ;; Select all DIMENSION entities across the drawing
  (if (setq ss (ssget "_X" '((0 . "DIMENSION"))))
    (progn
      (setq i (sslength ss))
      (while (> i 0)
        (setq i (1- i)
              ent (ssname ss i)
              elist (entget ent)
              ;; DXF Group 1 = User-entered text override ("" or "<>" means associative measurement)
              dimText (cdr (assoc 1 elist))
              ;; DXF Group 42 = True measured geometric value (read-only)
              actualVal (cdr (assoc 42 elist))
        )
        (if (and dimText
                 (/= dimText "")
                 (not (vl-string-search "<>" dimText)))
          (progn
            (setq overrideCount (1+ overrideCount))
            ;; Move flagged dimension to QA-ALERT color (Red = 1) for visual inspection
            (vla-put-Color (vlax-ename->vla-object ent) 1)
            (princ (strcat "\\n  [!] Flagged Handle " (cdr (assoc 5 elist))
                           " | Displayed: \\"" dimText "\\""
                           " | True Geometry: " (rtos actualVal 2 2)))
          )
        )
      )
      (princ (strcat "\\n[CAD-QA] Audit Complete: " (itoa overrideCount)
                     " overridden dimensions highlighted in Red."))
    )
    (princ "\\n[CAD-QA] No dimension entities found in drawing.")
  )
  (princ)
)`,
    executionNote:
      'Load via APPLOAD in AutoCAD and type AUDITDIMOVERRIDES at the command line. Always run inside a copy or undo group.',
  },
  {
    id: 'dotnet',
    title: '.NET C# ObjectARX Managed API Transaction',
    environment: 'AutoCAD .NET API (AutoCAD 2025/2026 uses .NET 8.0)',
    bestFor: 'Enterprise-grade, transactional geometry creation and standards enforcement across large DWG files.',
    explanation:
      'Starting in AutoCAD 2025, Autodesk migrated the .NET API runtime to .NET 8.0. Using C# and `Database.TransactionManager`, enterprise engineering teams can build deterministic commands that create multi-layer geometry (like our 5000 × 4000 mm room with 230 mm walls) with ACID-style rollback safety.',
    codeLanguage: 'csharp',
    codeFilename: 'RoomGeneratorCommand.cs',
    codeSnippet: `using Autodesk.AutoCAD.ApplicationServices;
using Autodesk.AutoCAD.DatabaseServices;
using Autodesk.AutoCAD.EditorInput;
using Autodesk.AutoCAD.Geometry;
using Autodesk.AutoCAD.Runtime;

public class CadAutomationCommands
{
    [CommandMethod("GEN_STRUCT_ROOM")]
    public void GenerateStructuralRoom()
    {
        Document doc = Application.DocumentManager.MdiActiveDocument;
        Database db = doc.Database;
        Editor ed = doc.Editor;

        // Deterministic Transaction ensures full rollback if any validation fails
        using (Transaction tr = db.TransactionManager.StartTransaction())
        {
            BlockTable bt = (BlockTable)tr.GetObject(db.BlockTableId, OpenMode.ForRead);
            BlockTableRecord ms = (BlockTableRecord)tr.GetObject(bt[BlockTableRecord.ModelSpace], OpenMode.ForWrite);

            // 1. Construct Inner Clear Span Polyline (5000mm x 4000mm)
            using (Polyline innerWall = new Polyline(4))
            {
                innerWall.AddVertexAt(0, new Point2d(0, 0), 0, 0, 0);
                innerWall.AddVertexAt(1, new Point2d(5000, 0), 0, 0, 0);
                innerWall.AddVertexAt(2, new Point2d(5000, 4000), 0, 0, 0);
                innerWall.AddVertexAt(3, new Point2d(0, 4000), 0, 0, 0);
                innerWall.Closed = true;

                ms.AppendEntity(innerWall);
                tr.AddNewlyCreatedDBObject(innerWall, true);

                // 2. Generate 230mm Outward Structural Wall Offset
                DBObjectCollection offsetCurves = innerWall.GetOffsetCurves(-230.0);
                foreach (Entity outerEntity in offsetCurves)
                {
                    ms.AppendEntity(outerEntity);
                    tr.AddNewlyCreatedDBObject(outerEntity, true);
                }
            }

            tr.Commit();
            ed.WriteMessage("\\n[OK] Generated 5000x4000mm structural room with 230mm walls.");
        }
    }
}`,
    executionNote:
      'Compile against AcCoreMgd.dll and AcDbMgd.dll targeting net8.0-windows for AutoCAD 2025–2026.',
  },
  {
    id: 'scr-batch',
    title: 'AutoCAD Batch Script (.SCR) + Core Console',
    environment: 'accoreconsole.exe (Headless Batch Processing)',
    bestFor: 'Executing 50+ drawing cleanups, layer standardization, and PDF plotting in seconds without opening the GUI.',
    explanation:
      'One of AutoCAD’s most underutilized capabilities is `accoreconsole.exe`—a headless command-line executable included in full AutoCAD installations. Pairing it with a deterministic `.scr` script lets engineers process hundreds of DWG files in parallel without loading the heavy graphical user interface.',
    codeLanguage: 'bash',
    codeFilename: 'StandardizeAndAuditBatch.scr',
    codeSnippet: `; --- AutoCAD Core Console Deterministic Cleanup Script (.SCR) ---
; Purge all unreferenced blocks, layers, linetypes, and regapps
-PURGE
All
*
No
-PURGE
Regapps
*
No
; Audit DWG database topology and automatically fix corrupt handles
AUDIT
Yes
; Set all entities on Layer 0 to ByLayer color and lineweight
-LAYER
Set
0

; Zoom Extents and Save DWG in native format
ZOOM
Extents
QSAVE
;
; --- PowerShell runner invoking headless accoreconsole.exe across a folder ---
; Get-ChildItem "C:\\Projects\\Submittal_RevC\\*.dwg" | ForEach-Object {
;   & "C:\\Program Files\\Autodesk\\AutoCAD 2026\\accoreconsole.exe" /i $_.FullName /s "C:\\Scripts\\StandardizeAndAuditBatch.scr" /l en-US
; }`,
    executionNote:
      'accoreconsole.exe processes typical production DWG files in 1.5–3 seconds per file because it skips viewport GPU initialization.',
  },
  {
    id: 'python-aps',
    title: 'Autodesk Platform Services (APS) & Python Audit',
    environment: 'Cloud Design Automation API / Python ezdxf',
    bestFor: 'Automated CI/CD quality gates that verify CAD standards before drawings enter enterprise PDM/Vault.',
    explanation:
      'For large engineering organizations, Autodesk Platform Services (formerly Forge) Design Automation API runs AutoCAD `.NET` bundles in the cloud, while open-source Python libraries (`ezdxf`) allow instant pre-flight inspection of DXF/DWG exports for non-compliant layers or zero-elevation drift.',
    codeLanguage: 'python',
    codeFilename: 'dwg_preflight_validator.py',
    codeSnippet: `import ezdxf
from collections import Counter

APPROVED_AIA_PREFIXES = ("A-", "S-", "M-", "E-", "P-", "C-", "G-", "0")

def validate_cad_standards(dxf_path: str) -> dict:
    doc = ezdxf.readfile(dxf_path)
    msp = doc.modelspace()
    
    non_compliant_layers = Counter()
    non_zero_z_entities = 0
    color_override_count = 0

    for entity in msp:
        layer_name = entity.dxf.layer
        if not layer_name.startswith(APPROVED_AIA_PREFIXES):
            non_compliant_layers[layer_name] += 1
            
        # Check for accidental entity-level color override (256 = ByLayer)
        if entity.dxf.hasattr("color") and entity.dxf.color != 256:
            color_override_count += 1
            
        # Check LINE start/end Z-coordinates for 2D plan flatness
        if entity.dxftype() == "LINE":
            if abs(entity.dxf.start.z) > 1e-4 or abs(entity.dxf.end.z) > 1e-4:
                non_zero_z_entities += 1

    return {
        "total_entities": len(msp),
        "non_compliant_layers": dict(non_compliant_layers),
        "entity_color_overrides": color_override_count,
        "non_coplanar_z_lines": non_zero_z_entities,
        "passed_gate": len(non_compliant_layers) == 0 and non_zero_z_entities == 0
    }`,
    executionNote:
      'Can be wired into Git/Vault pre-commit hooks or Autodesk Construction Cloud (ACC) webhooks.',
  },
];

export const ARCHITECTURE_STAGES: ArchitectureStage[] = [
  {
    stageNumber: 1,
    name: 'User Prompt & Multimodal Intent Input',
    layerType: 'Cognitive Layer',
    input: 'Natural language instruction, voice command, or selected redline region + active viewport context',
    output: 'Normalized engineering intent payload with target scope and discipline context',
    description:
      'Captures the engineer’s instruction alongside current selection handles, active layer state, `INSUNITS`, and viewport scale.',
    failurePrevention:
      'Rejects underspecified prompts by asking clarifying questions before touching geometry (e.g., confirming inner clear span vs. centerline dimensions).',
  },
  {
    stageNumber: 2,
    name: 'AI Language Model (Domain-Tuned Planner)',
    layerType: 'Cognitive Layer',
    input: 'Normalized prompt + summarized DWG spatial schema',
    output: 'Structured JSON execution plan of high-level CAD operations (not raw binary bytes)',
    description:
      'Decomposes complex multi-step engineering modifications into an ordered sequence of semantic operations (query, construct, offset, dimension, annotate).',
    failurePrevention:
      'Constrained via strict JSON schema decoding so the model can never invent non-existent system variables or malformed coordinates.',
  },
  {
    stageNumber: 3,
    name: 'Drawing Understanding Engine (Spatial Graph)',
    layerType: 'Semantic Graph',
    input: 'Active `AcDbDatabase` entities, Block Table Records, Xrefs, and Layer Table',
    output: 'Topological adjacency graph (rooms, walls, connected piping networks, title block attributes)',
    description:
      'Translates raw disconnected lines, arcs, and polylines into a queryable spatial graph with R-tree bounding-box indexing and topological relationships.',
    failurePrevention:
      'Solves the "bag of vectors" problem so the AI understands which four lines form a structural column versus a title block border.',
  },
  {
    stageNumber: 4,
    name: 'CAD Command & API Transaction Generator',
    layerType: 'Deterministic Solver',
    input: 'Structured JSON plan + Spatial Graph entity handles (`AcDbObjectId`)',
    output: 'Parameterized ObjectARX / .NET C# or AutoLISP transaction calls',
    description:
      'Maps semantic operations onto exact, version-verified AutoCAD API constructors (`Polyline`, `AlignedDimension`, `BlockReference`) with exact floating-point math.',
    failurePrevention:
      'All coordinate arithmetic (offsets, intersections, trigonometric fillets) is computed by a deterministic math kernel, never by LLM token prediction.',
  },
  {
    stageNumber: 5,
    name: 'Geometry & Standards Validation Engine',
    layerType: 'Deterministic Solver',
    input: 'Staged in-memory `AcDbEntity` objects prior to database commit',
    output: 'Validation pass/fail report checking self-intersection, zero-length segments, clash, and `.DWS` standards',
    description:
      'Verifies that generated loops are closed, wall thicknesses match specifications within `1e-6` precision, dimensions do not overlap text, and layers match ISO/AIA standards.',
    failurePrevention:
      'Acts as a hard firewall against AI hallucinations: any geometry that violates topological closure or layer rules is blocked and re-solved.',
  },
  {
    stageNumber: 6,
    name: 'AutoCAD API / Automation Sandbox Layer',
    layerType: 'Execution & Governance',
    input: 'Validated API transaction batch',
    output: 'Open sandbox `Transaction` inside `Database.TransactionManager`',
    description:
      'Executes the modifications inside an isolated, uncommitted AutoCAD database transaction (`StartTransaction()`) so no permanent changes occur prematurely.',
    failurePrevention:
      'Guarantees atomic rollback (`Transaction.Abort()`) if any runtime exception or user cancellation occurs.',
  },
  {
    stageNumber: 7,
    name: 'Transient Preview & Human Approval Gate',
    layerType: 'Execution & Governance',
    input: 'Sandbox transaction entities + diff diagnostic overlay',
    output: 'Explicit Engineer Sign-Off (`ApproveAll`, `ApproveSelected`, or `Abort`)',
    description:
      'Renders color-coded ghost geometry via `AcGiTransientManager` directly in the viewport alongside a quantitative change summary for engineer inspection.',
    failurePrevention:
      'Preserves legal professional liability: the licensed engineer or draftsperson inspects and approves every modification before commit.',
  },
  {
    stageNumber: 8,
    name: 'DWG Database Modification & Handle Commit',
    layerType: 'Execution & Governance',
    input: 'Approved sandbox transaction',
    output: 'Committed `AcDbDatabase` state with preserved persistent entity handles',
    description:
      'Commits the transaction (`Transaction.Commit()`), preserving existing `AcDbHandle` references so downstream Paper Space dimensions, fields, and Xrefs remain unbroken.',
    failurePrevention:
      'Logs the entire operation in a single named `UNDO` group so a single `CTRL+Z` reverses the entire AI operation cleanly.',
  },
  {
    stageNumber: 9,
    name: 'Final Post-Commit QA & Activity Audit Log',
    layerType: 'Execution & Governance',
    input: 'Updated DWG database + Activity Insights telemetry stream',
    output: 'Immutable QA verification certificate and revision log entry',
    description:
      'Re-runs an automated post-commit check (`AUDIT` + standards verification) and records the prompt, author, timestamp, and affected handles in Activity Insights.',
    failurePrevention:
      'Provides full enterprise traceability for ISO 9001 quality management and multi-disciplinary design reviews.',
  },
];

export const CITATION_SOURCES: CitationSource[] = [
  {
    id: 'cit-1',
    title: 'AutoCAD 2026 Help: What’s New in AutoCAD 2026 (Smart Blocks Detect & Convert, Activity Insights)',
    publisher: 'Autodesk Official Documentation',
    year: '2025–2026',
    url: 'https://help.autodesk.com/view/ACD/2026/ENU/',
    verifiedClaim:
      'Verifies enhancements to Smart Blocks Search and Convert, Smart Blocks Detect and Convert tech preview, and Activity Insights version history.',
  },
  {
    id: 'cit-2',
    title: 'AutoCAD 2025 Help: Autodesk Assistant, Smart Blocks Object Detection & .NET 8 Migration',
    publisher: 'Autodesk Official Documentation',
    year: '2024',
    url: 'https://help.autodesk.com/view/ACD/2025/ENU/',
    verifiedClaim:
      'Documents the introduction of Autodesk Assistant in AutoCAD 2025, machine-learning Object Detection for blocks, and the migration to .NET 8.0.',
  },
  {
    id: 'cit-3',
    title: 'AutoCAD 2024 Help: Smart Blocks Placement and Replacement & Markup Assist Updates',
    publisher: 'Autodesk Official Documentation',
    year: '2023',
    url: 'https://help.autodesk.com/view/ACD/2024/ENU/',
    verifiedClaim:
      'Confirms the release of Smart Blocks: Placement and Replacement and expanded Markup Assist actions in AutoCAD 2024.',
  },
  {
    id: 'cit-4',
    title: 'AutoCAD 2023 Help: Markup Import, Markup Assist, and Command Macros (Macro Advisor)',
    publisher: 'Autodesk Official Documentation',
    year: '2022',
    url: 'https://help.autodesk.com/view/ACD/2023/ENU/',
    verifiedClaim:
      'Documents the initial launch of machine-learning-driven Markup Import, Markup Assist, and Command Macro insights in AutoCAD 2023.',
  },
  {
    id: 'cit-5',
    title: 'Autodesk Platform Services (APS): Design Automation API for AutoCAD Developer Guide',
    publisher: 'Autodesk Developer Network (ADN)',
    year: '2025',
    url: 'https://aps.autodesk.com/en/docs/design-automation/v3/developers_guide/overview/',
    verifiedClaim:
      'Details cloud execution of custom ObjectARX/.NET and AutoLISP workitems on DWG files via headless AutoCAD engines.',
  },
  {
    id: 'cit-6',
    title: 'ASME Y14.5-2018 & ISO 128-1:2020 Technical Product Documentation & Dimensioning Standards',
    publisher: 'American Society of Mechanical Engineers / International Organization for Standardization',
    year: '2018–2020',
    url: 'https://www.asme.org/codes-standards/find-codes-standards/y14-5-dimensioning-tolerancing',
    verifiedClaim:
      'Establishes strict mathematical rules for geometric dimensioning, tolerances, and orthographic representation required in engineering drawings.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Does AutoCAD already have AI features, and which versions include them?',
    answer:
      'Yes. Autodesk has progressively introduced machine-learning productivity features since AutoCAD 2023. AutoCAD 2023 introduced Markup Import, Markup Assist, and Macro Advisor (Command Macros). AutoCAD 2024 added Smart Blocks: Placement and Replacement plus enhanced Markup Assist. AutoCAD 2025 introduced Smart Blocks: Object Detection (tech preview), Smart Blocks: Search and Convert, and the conversational Autodesk Assistant for documentation/support. AutoCAD 2026 further refined Detect and Convert and Activity Insights.',
    relatedSection: 'Section 2: Does AutoCAD Already Have AI?',
  },
  {
    id: 'faq-2',
    question: 'What is the difference between AutoCAD’s existing AI tools and a full AI CAD design assistant?',
    answer:
      'Existing AutoCAD AI features focus on localized pattern recognition and workflow assistance—such as recognizing drawn symbols to convert into blocks, suggesting command macros, or importing PDF text markups. A full AI CAD design assistant would understand the semantic engineering structure of an entire DWG file, allowing engineers to create, modify, dimension, audit, and revise multi-layered drawings via natural-language instructions with deterministic geometric validation.',
    relatedSection: 'Section 3: What Is Actually Missing?',
  },
  {
    id: 'faq-3',
    question: 'Why is building a generative AI assistant for DWG files much harder than generating code or images?',
    answer:
      'Unlike pixel images where a slightly misplaced line is visually imperceptible, engineering drawings govern physical construction and manufacturing with sub-millimeter tolerances and strict legal liability. Furthermore, traditional 2D DWG files store unstructured geometric primitives (lines, arcs, polylines) rather than a semantic constraint graph, meaning an AI must infer which collection of lines represents a load-bearing wall, a hydraulic shaft, or a hidden edge before it can safely edit them.',
    relatedSection: 'Section 6: Why Is a Full AI CAD Assistant Difficult to Develop?',
  },
  {
    id: 'faq-4',
    question: 'How can mechanical, civil, and architectural engineers use AI with AutoCAD today?',
    answer:
      'Today, the most effective workflow combines native AutoCAD 2024–2026 features (Smart Blocks and Markup Assist) with AI-assisted code generation for AutoLISP (.lsp), AutoCAD .NET C# plugins, and headless batch scripts (.scr) executed via accoreconsole.exe. Engineers can ask modern LLMs to write deterministic AutoLISP or C# routines that automate repetitive layer audits, block attribute extraction, and parametric geometry creation.',
    relatedSection: 'Section 8: Practical Solutions Available Today',
  },
  {
    id: 'faq-5',
    question: 'Will AI replace CAD drafters, mechanical designers, and engineering students?',
    answer:
      'No. In regulated engineering disciplines, software cannot serve as the licensed Engineer of Record or assume legal liability for structural, electrical, or mechanical safety. Instead, AI-assisted CAD will eliminate tedious manual entity picking, layer remediation, and repetitive revision clouding—elevating CAD professionals to focus on systems engineering, spatial coordination, manufacturability, and design verification.',
    relatedSection: 'Section 11: Conclusion',
  },
];

export const SEO_SPECIFICATION = {
  seoTitle:
    "Why Doesn't AutoCAD Have a Full AI Design Assistant Yet? | AI in AutoCAD Research",
  metaDescription:
    'Explore AI in AutoCAD: why Smart Blocks and Markup Assist differ from a full AI CAD assistant, the 12 missing capabilities, and practical automation today.',
  urlSlug: '/research/why-doesnt-autocad-have-a-full-ai-design-assistant-yet',
  primaryKeyword: 'AI in AutoCAD',
  secondaryKeywords: [
    'AutoCAD AI features',
    'AI-powered CAD software',
    'Future of AutoCAD',
    'AI CAD assistant',
    'AutoCAD automation',
    'Artificial intelligence in engineering',
    'AI for mechanical engineers',
    'AI for civil engineers',
    'AutoCAD productivity',
    'Generative AI in CAD',
  ],
  suggestedInternalLinks: [
    {
      anchorText: 'Complete Guide to AutoLISP & ObjectARX .NET 8 Automation in AutoCAD 2026',
      targetUrl: '/guides/autolisp-dotnet8-autocad-automation',
      contextSection: 'Section 8: Practical Solutions Available Today',
    },
    {
      anchorText: 'ISO 13567 vs. AIA CAD Layer Standards: Automating DWG Compliance Checks',
      targetUrl: '/standards/iso-13567-aia-layer-validation',
      contextSection: 'Section 3: What Is Actually Missing?',
    },
    {
      anchorText: 'Autodesk Platform Services (APS) Design Automation for Enterprise PDM Workflows',
      targetUrl: '/enterprise/aps-design-automation-pipeline',
      contextSection: 'Section 9: Proposed AI + AutoCAD Workflow',
    },
    {
      anchorText: 'Generative Design in Manufacturing vs. 2D Drafting Assistance Explained',
      targetUrl: '/research/generative-design-vs-cad-drafting-ai',
      contextSection: 'Section 2: Does AutoCAD Already Have AI?',
    },
  ],
};

export const RELATED_ARTICLES = [
  {
    category: 'Enterprise CAD Automation',
    readTime: '14 min read',
    date: 'October 2026',
    title: 'Inside Headless AutoCAD: Scaling accoreconsole.exe and .NET 8 Plugins Across 10,000 Submittal Sheets',
    summary:
      'How large civil and EPC engineering firms eliminate manual PDF plotting, Xref binding, and layer audits using headless command pipelines.',
    targetSection: 'section-8',
  },
  {
    category: 'Computational Geometry',
    readTime: '18 min read',
    date: 'September 2026',
    title: 'The Bag-of-Vectors Problem: Why 2D DWG Topology Reconstruction Remains AI’s Hardest Spatial Challenge',
    summary:
      'An algorithmic look at how computer vision and graph neural networks attempt to infer semantic building and mechanical structures from ungrouped 2D polylines.',
    targetSection: 'section-6',
  },
  {
    category: 'Engineering Education',
    readTime: '11 min read',
    date: 'August 2026',
    title: 'Teaching ASME Y14.5 & ISO 128 in the Age of AI: From Command Memorization to Design Intent',
    summary:
      'Why university engineering curricula are shifting emphasis from rote keyboard shortcut drills to geometric dimensioning, tolerancing, and automated design verification.',
    targetSection: 'section-4',
  },
];

/**
 * Pure utility functions for filtering, metrics, and progress calculations (tested via node:test)
 */
export function filterCapabilitiesByCategory(
  capabilities: ProposedCapability[],
  category: CapabilityCategory
): ProposedCapability[] {
  if (category === 'all') {
    return capabilities;
  }
  return capabilities.filter((item) => item.category === category);
}

export function filterFeaturesByVersion(
  features: ExistingAiFeature[],
  versionFilter: 'ALL' | 'AutoCAD 2023' | 'AutoCAD 2024' | 'AutoCAD 2025' | 'AutoCAD 2026'
): ExistingAiFeature[] {
  if (versionFilter === 'ALL') {
    return features;
  }
  return features.filter(
    (f) => f.introducedVersion === versionFilter || f.expandedVersions.includes(versionFilter)
  );
}

export function calculateReadingProgress(scrollTop: number, scrollHeight: number, clientHeight: number): number {
  const maxScroll = scrollHeight - clientHeight;
  if (maxScroll <= 0) return 0;
  const raw = (scrollTop / maxScroll) * 100;
  return Math.min(100, Math.max(0, Math.round(raw)));
}

export function calculateRevisionTimeSavings(
  revisionCount: number,
  avgManualMinutesPerRevision: number,
  avgSupervisedAiSecondsPerRevision: number
): {
  manualHours: number;
  aiHours: number;
  hoursSaved: number;
  reductionPercent: number;
} {
  const safeCount = Math.max(0, revisionCount);
  const manualTotalMinutes = safeCount * Math.max(0.1, avgManualMinutesPerRevision);
  const aiTotalMinutes = (safeCount * Math.max(1, avgSupervisedAiSecondsPerRevision)) / 60;
  const manualHours = Number((manualTotalMinutes / 60).toFixed(2));
  const aiHours = Number((aiTotalMinutes / 60).toFixed(2));
  const hoursSaved = Number(Math.max(0, manualHours - aiHours).toFixed(2));
  const reductionPercent =
    manualTotalMinutes > 0
      ? Math.round(((manualTotalMinutes - aiTotalMinutes) / manualTotalMinutes) * 100)
      : 0;

  return {
    manualHours,
    aiHours,
    hoursSaved,
    reductionPercent,
  };
}
