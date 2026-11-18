import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PROPOSED_MISSING_CAPABILITIES,
  EXISTING_AUTOCAD_AI_FEATURES,
  ARCHITECTURE_STAGES,
  CONCEPTUAL_WORKFLOW_EXAMPLES,
  SEO_SPECIFICATION,
  filterCapabilitiesByCategory,
  filterFeaturesByVersion,
  calculateReadingProgress,
  calculateRevisionTimeSavings,
} from './articleData';

test('PROPOSED_MISSING_CAPABILITIES contains all 12 required missing capabilities', () => {
  assert.equal(PROPOSED_MISSING_CAPABILITIES.length, 12);
  const ids = PROPOSED_MISSING_CAPABILITIES.map((c) => c.id);
  assert.deepEqual(ids, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
});

test('filterCapabilitiesByCategory filters accurately across categories', () => {
  const all = filterCapabilitiesByCategory(PROPOSED_MISSING_CAPABILITIES, 'all');
  assert.equal(all.length, 12);

  const geometry = filterCapabilitiesByCategory(PROPOSED_MISSING_CAPABILITIES, 'geometry');
  assert.ok(geometry.length > 0);
  assert.ok(geometry.every((item) => item.category === 'geometry'));

  const qa = filterCapabilitiesByCategory(PROPOSED_MISSING_CAPABILITIES, 'qa');
  assert.ok(qa.length > 0);
  assert.ok(qa.every((item) => item.category === 'qa'));

  const doc3d = filterCapabilitiesByCategory(PROPOSED_MISSING_CAPABILITIES, 'doc3d');
  assert.ok(doc3d.length > 0);
  assert.ok(doc3d.every((item) => item.category === 'doc3d'));
  assert.equal(geometry.length + qa.length + doc3d.length, 12);
});

test('filterFeaturesByVersion returns matching AutoCAD versions', () => {
  const all = filterFeaturesByVersion(EXISTING_AUTOCAD_AI_FEATURES, 'ALL');
  assert.equal(all.length, EXISTING_AUTOCAD_AI_FEATURES.length);

  const v2023 = filterFeaturesByVersion(EXISTING_AUTOCAD_AI_FEATURES, 'AutoCAD 2023');
  assert.equal(v2023.length, 2); // Markup Import/Assist and Macro Advisor
});

test('ARCHITECTURE_STAGES has all 9 sequential stages from User Prompt to Final Validation', () => {
  assert.equal(ARCHITECTURE_STAGES.length, 9);
  assert.ok(ARCHITECTURE_STAGES[0].name.includes('User Prompt'));
  assert.ok(ARCHITECTURE_STAGES[8].name.includes('Final'));
});

test('CONCEPTUAL_WORKFLOW_EXAMPLES covers all 3 required user prompt scenarios', () => {
  assert.equal(CONCEPTUAL_WORKFLOW_EXAMPLES.length, 3);
  assert.equal(
    CONCEPTUAL_WORKFLOW_EXAMPLES[0].userPrompt,
    'Create a rectangular room measuring 5000 mm by 4000 mm with 230 mm thick walls.'
  );
  assert.equal(
    CONCEPTUAL_WORKFLOW_EXAMPLES[1].userPrompt,
    'Find all incorrectly placed dimensions and identify possible corrections.'
  );
  assert.equal(
    CONCEPTUAL_WORKFLOW_EXAMPLES[2].userPrompt,
    'Compare this drawing with the previous revision and highlight all changes.'
  );
});

test('calculateReadingProgress bounds progress between 0 and 100', () => {
  assert.equal(calculateReadingProgress(0, 5000, 1000), 0);
  assert.equal(calculateReadingProgress(2000, 5000, 1000), 50);
  assert.equal(calculateReadingProgress(4500, 5000, 1000), 100);
  assert.equal(calculateReadingProgress(0, 800, 1000), 0);
});

test('calculateRevisionTimeSavings computes 50-revision scenario accurately', () => {
  const result = calculateRevisionTimeSavings(50, 6, 18);
  assert.equal(result.manualHours, 5.0);
  assert.equal(result.aiHours, 0.25);
  assert.equal(result.hoursSaved, 4.75);
  assert.equal(result.reductionPercent, 95);
});

test('SEO_SPECIFICATION includes required primary and 10 secondary keywords', () => {
  assert.equal(SEO_SPECIFICATION.primaryKeyword, 'AI in AutoCAD');
  assert.equal(SEO_SPECIFICATION.secondaryKeywords.length, 10);
});
