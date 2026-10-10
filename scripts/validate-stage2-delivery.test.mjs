import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validateStage2Delivery } from './validate-stage2-security.mjs';

const read = path => readFileSync(path, 'utf8');
const fixture = () => ({
  reviewText: read('docs/project/stage-2f-delivery-review.md'), inventoryText: read('docs/project/stage-2f-delivery-inventory.md'),
  stage2eReviewText: read('docs/project/stage-2e-security-observability-review.md'), stage2eInventoryText: read('docs/project/stage-2e-production-safety-inventory.md'),
  mapText: read('docs/roadmap/learning-unit-map.md'), dependencyText: read('docs/roadmap/dependency-map.md'),
  priorReviewTexts: ['docs/project/stage-2b-foundations-review.md', 'docs/project/stage-2c-data-review.md', 'docs/project/stage-2d-distributed-interaction-review.md'].map(read),
});
const errorsAfter = mutate => { const current = fixture(); return validateStage2Delivery({ ...current, ...mutate(current) }).errors; };

test('accepts the complete Delivery package', () => {
  const result = validateStage2Delivery(fixture()); assert.deepEqual(result.errors, []); assert.deepEqual(result.counts, { required: 14, recommended: 16, targets: 9, internal: 3, fullTargets: 10, candidates: 3 }); assert.equal(result.graph.cycle, false); assert.ok(result.graph.roots > 1);
});
test('rejects a missing Delivery relation', () => assert.ok(errorsAfter(({ reviewText }) => ({ reviewText: reviewText.replace(/^\| RECOMMENDED \| delivery-rollout-rollback-strategies.*\r?\n/m, '') })).some(error => error.includes('missing Delivery relation delivery-rollout-rollback-strategies -> delivery-platform-transfer'))));
test('rejects a duplicate active Delivery decision', () => assert.ok(errorsAfter(({ reviewText }) => ({ reviewText: reviewText.replace('| REQUIRED | os-resource-exhaustion -> delivery-resources-cpu-memory', '| REQUIRED | os-process-thread-kernel -> delivery-container-process-lifecycle | LOCAL | duplicate | duplicate |\n| REQUIRED | os-resource-exhaustion -> delivery-resources-cpu-memory') })).some(error => error.includes('duplicate active decision Delivery os-process-thread-kernel -> delivery-container-process-lifecycle'))));
test('rejects a false Delivery whole-unit proxy', () => assert.ok(errorsAfter(({ reviewText }) => ({ reviewText: reviewText.replace('delivery-artifact-image-config -> delivery-platform-transfer | EXTERNAL — WHOLE-UNIT PROXY NOT_ACCEPTABLE', 'delivery-artifact-image-config -> delivery-platform-transfer | EXTERNAL — WHOLE-UNIT PROXY ACCEPTABLE') })).some(error => error.includes('false singleton whole-unit proxy delivery-artifact-image-config -> delivery-platform-transfer'))));
test('rejects omitted internal-edge accounting', () => assert.ok(errorsAfter(({ inventoryText }) => ({ inventoryText: inventoryText.replace(/^\| rel-change-rollout-rollback-risk.*\r?\n/m, '') })).some(error => error.includes('missing Delivery internal edge rel-change-rollout-rollback-risk -> delivery-rollout-rollback-strategies'))));
test('rejects a missing Delivery target over-gating record', () => assert.ok(errorsAfter(({ reviewText }) => ({ reviewText: reviewText.replace(/^\| lu-delivery-cloud-responsibility-managed-services.*\r?\n/m, '') })).some(error => error.includes('missing over-gating target lu-delivery-cloud-responsibility-managed-services'))));
test('rejects a backwards edge in the full graph', () => { const result = validateStage2Delivery({ ...fixture(), additionalCandidateEdges: [['lu-delivery-platform-transfer', 'lu-delivery-platform-evidence-debug']] }); assert.ok(result.errors.includes('candidate graph cycle')); });
