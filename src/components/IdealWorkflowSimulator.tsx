import React, { useState } from 'react';
import {
  CONCEPTUAL_WORKFLOW_EXAMPLES,
  ConceptualWorkflowExample,
} from '../data/articleData';
import { CheckCircle2, AlertTriangle, Play, RotateCcw, ShieldCheck, Terminal } from 'lucide-react';

export const IdealWorkflowSimulator: React.FC = () => {
  const [selectedExampleId, setSelectedExampleId] = useState<string>(
    CONCEPTUAL_WORKFLOW_EXAMPLES[0].id
  );
  const [approvalStates, setApprovalStates] = useState<
    Record<string, 'pending' | 'approved' | 'rejected'>
  >({
    'example-room': 'pending',
    'example-dimensions': 'pending',
    'example-revision': 'pending',
  });

  const activeExample: ConceptualWorkflowExample =
    CONCEPTUAL_WORKFLOW_EXAMPLES.find((ex) => ex.id === selectedExampleId) ||
    CONCEPTUAL_WORKFLOW_EXAMPLES[0];

  const currentApproval = approvalStates[activeExample.id] || 'pending';

  const handleSetApproval = (status: 'pending' | 'approved' | 'rejected') => {
    setApprovalStates((prev) => ({
      ...prev,
      [activeExample.id]: status,
    }));
  };

  return (
    <div className="my-8 rounded-xl border border-slate-800 bg-[#0A1222] overflow-hidden">
      {/* Header & Proposed Label */}
      <div className="px-4 sm:px-6 py-4 border-b border-slate-800 bg-[#070E1B] flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[11px] sm:text-xs font-mono text-sky-400 uppercase tracking-wider">
            Proposed Conceptual AI Workflow Specification (Not an Existing AutoCAD Feature)
          </div>
          <h4 className="text-base sm:text-lg font-semibold text-white mt-0.5">
            Interactive Walkthrough: How a Supervised AI CAD Assistant Should Operate
          </h4>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          Human-in-the-Loop Governance Active
        </div>
      </div>

      {/* Scenario Selector Tabs */}
      <div
        role="tablist"
        aria-label="Conceptual AI CAD Scenarios"
        className="flex flex-nowrap sm:flex-wrap gap-2 px-4 sm:px-6 py-3 bg-[#080F1D] border-b border-slate-800/80 overflow-x-auto touch-scroll-x"
      >
        {CONCEPTUAL_WORKFLOW_EXAMPLES.map((ex) => {
          const isSelected = ex.id === activeExample.id;
          return (
            <button
              key={ex.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedExampleId(ex.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                isSelected
                  ? 'bg-sky-500 text-slate-950 font-semibold shadow-sm'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {ex.label}
            </button>
          );
        })}
      </div>

      {/* Main Content Split */}
      <div className="p-4 sm:p-6 space-y-6">
        {/* Prompt Box & Tolerance Spec */}
        <div className="rounded-lg border border-slate-800 bg-[#060B16] p-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 mb-2">
            <span className="inline-flex items-center gap-1.5 font-mono text-sky-400">
              <Terminal className="w-3.5 h-3.5" />
              ENGINEER NATURAL-LANGUAGE INSTRUCTION:
            </span>
            <span>{activeExample.discipline}</span>
          </div>
          <p className="font-mono text-sm sm:text-base text-slate-100 bg-slate-900/90 border border-slate-800 rounded px-3.5 py-2.5">
            "{activeExample.userPrompt}"
          </p>
          <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
            {activeExample.contextSummary}
          </p>
          <div className="mt-2 pt-2 border-t border-slate-800/70 text-xs font-mono text-slate-400">
            {activeExample.toleranceSpec}
          </div>
        </div>

        {/* Step-by-Step Pipeline Execution */}
        <div className="space-y-3">
          <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Expected Deterministic Execution Sequence
          </h5>
          <div className="grid grid-cols-1 gap-3">
            {activeExample.steps.map((step) => (
              <div
                key={step.stepNumber}
                className={`rounded-lg border p-4 transition-colors ${
                  step.requiresApproval
                    ? currentApproval === 'approved'
                      ? 'border-emerald-500/50 bg-emerald-950/15'
                      : currentApproval === 'rejected'
                      ? 'border-amber-500/50 bg-amber-950/15'
                      : 'border-sky-500/40 bg-sky-950/15'
                    : 'border-slate-800/90 bg-[#070E1B]'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-semibold text-sky-400 tabular-nums">
                      STEP 0{step.stepNumber}
                    </span>
                    <span className="text-slate-600" aria-hidden="true">
                      ·
                    </span>
                    <span className="text-sm font-semibold text-slate-100">
                      {step.stage}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-slate-400">
                    {step.cadOutput}
                  </span>
                </div>
                <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Engineer Supervision & Approval Bar */}
        <div className="rounded-lg border border-slate-700/80 bg-[#060C18] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>Stage 7 Sandbox Gate: Engineer of Record Supervision</span>
            </div>
            <p className="text-xs text-slate-400">
              {currentApproval === 'pending' &&
                `Transient preview staged (${activeExample.verificationMetrics.entitiesAffected} entities on ${activeExample.verificationMetrics.layersValidated.join(', ')}). Waiting for engineer approval before committing to DWG database.`}
              {currentApproval === 'approved' &&
                `Transaction committed to AcDbDatabase (${activeExample.verificationMetrics.standardCompliance} verified). Reduced ${activeExample.verificationMetrics.manualTimeMinutes} min manual task to ${activeExample.verificationMetrics.supervisedAiSeconds}s supervised workflow.`}
              {currentApproval === 'rejected' &&
                'Transaction aborted cleanly via Database.TransactionManager.Abort(). Zero unintended changes written to DWG.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleSetApproval('approved')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                currentApproval === 'approved'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-sky-500 hover:bg-sky-400 text-slate-950'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Approve & Commit DWG</span>
            </button>
            <button
              type="button"
              onClick={() => handleSetApproval('rejected')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 ${
                currentApproval === 'rejected'
                  ? 'border-amber-500 bg-amber-500/20 text-amber-200'
                  : 'border-slate-700 bg-slate-900 text-slate-300 hover:text-white'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Abort Transaction</span>
            </button>
            {currentApproval !== 'pending' && (
              <button
                type="button"
                onClick={() => handleSetApproval('pending')}
                className="inline-flex items-center gap-1 px-2.5 py-2 rounded-lg text-xs text-slate-400 hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
