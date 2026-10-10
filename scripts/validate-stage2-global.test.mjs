import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validateStage2Global } from './validate-stage2-security.mjs';

const read = path => readFileSync(path, 'utf8');
const fixture = () => {
  const priorReviewTexts = ['docs/project/stage-2b-foundations-review.md', 'docs/project/stage-2c-data-review.md', 'docs/project/stage-2d-distributed-interaction-review.md'].map(read);
  const architectureInput = {
    reviewText: read('docs/project/stage-2g-architecture-review.md'), inventoryText: read('docs/project/stage-2g-architecture-inventory.md'),
    testingReviewText: read('docs/project/stage-2f-testing-review.md'), testingInventoryText: read('docs/project/stage-2f-testing-inventory.md'),
    deliveryReviewText: read('docs/project/stage-2f-delivery-review.md'), deliveryInventoryText: read('docs/project/stage-2f-delivery-inventory.md'),
    stage2eReviewText: read('docs/project/stage-2e-security-observability-review.md'), stage2eInventoryText: read('docs/project/stage-2e-production-safety-inventory.md'), priorReviewTexts,
  };
  return { mapText: read('docs/roadmap/learning-unit-map.md'), dependencyText: read('docs/roadmap/dependency-map.md'), foundationsText: priorReviewTexts[0], dataText: priorReviewTexts[1], distributedText: priorReviewTexts[2], stage2eInventoryText: architectureInput.stage2eInventoryText, deliveryInventoryText: architectureInput.deliveryInventoryText, testingInventoryText: architectureInput.testingInventoryText, architectureInventoryText: architectureInput.inventoryText, architectureInput, progressionText: read('docs/roadmap/learning-unit-progression.md'), deliveryPlanText: read('docs/project/first-chapter-delivery-plan.md') };
};

test('accepts complete Stage 2 global projection accounting', () => {
  const result = validateStage2Global(fixture());
  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.totals, { capabilities: 167, units: 137, relations: 332, required: 201, recommended: 131, inter: 303, same: 29, reviewed: 304 });
  assert.equal(result.graph.edges, 64); assert.equal(result.graph.roots, 100); assert.equal(result.graph.cycle, false);
});

test('rejects a missing reviewed frozen inter-unit relation', () => {
  const current = fixture();
  const result = validateStage2Global({ ...current, architectureInventoryText: current.architectureInventoryText.replace(/^\| RECOMMENDED \| arch-evolution-migration-strangler.*\r?\n/m, '') });
  assert.ok(result.errors.some(error => error.startsWith('missing global review relation arch-evolution-migration-strangler -> arch-decision-communication-transfer')));
});

test('rejects an unfair historical multi-Primary whole-unit proxy', () => {
  const current = fixture();
  const result = validateStage2Global({ ...current, foundationsText: current.foundationsText.replace('NOT_ACCEPTABLE |', 'ACCEPTABLE_CANDIDATE |') });
  assert.ok(result.errors.some(error => error.includes('historical false whole-unit proxy Foundations runtime-retention-pooling-large-objects')));
});

test('rejects a real backwards edge in the full combined graph', () => {
  const current = fixture();
  const result = validateStage2Global({ ...current, additionalCandidateEdges: [['lu-arch-sync-async-integration', 'lu-arch-requirements-quality-attributes']] });
  assert.ok(result.errors.includes('candidate graph cycle'));
});

test('rejects stale canonical-map metadata', () => {
  const current = fixture();
  const result = validateStage2Global({ ...current, mapText: current.mapText.replace('Learning Units: 137', 'Learning Units: 132') });
  assert.ok(result.errors.includes('stale Learning Unit map metadata'));
});
