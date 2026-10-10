import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { learningUnitIds, validateCandidateGraph, validateStage2E, validateStage2Security } from './validate-stage2-security.mjs';

const read = path => readFileSync(path, 'utf8');
const fixture = () => ({
  reviewText: read('docs/project/stage-2e-security-observability-review.md'),
  inventoryText: read('docs/project/stage-2e-production-safety-inventory.md'),
  mapText: read('docs/roadmap/learning-unit-map.md'),
  priorReviewTexts: [
    read('docs/project/stage-2b-foundations-review.md'),
    read('docs/project/stage-2c-data-review.md'),
    read('docs/project/stage-2d-distributed-interaction-review.md'),
  ],
});
const errorsAfter = mutate => {
  const current = fixture();
  return validateStage2Security({ ...current, reviewText: mutate(current.reviewText) }).errors;
};

test('accepts the complete Security evidence', () => {
  assert.deepEqual(validateStage2Security(fixture()).errors, []);
});

test('accepts Security and Observability against the full Learning Unit graph', () => {
  const result = validateStage2E(fixture());
  assert.deepEqual(result.errors, []);
  assert.equal(learningUnitIds(fixture().mapText).size, 137);
  assert.equal(result.securityGraph.edges, 43);
  assert.equal(result.securityGraph.roots, 116);
  assert.equal(result.graph.edges, 46);
  assert.equal(result.graph.roots, 114);
  assert.ok(result.graph.roots > 1);
});

test('rejects malformed decision-table rows', () => {
  const errors = errorsAfter(text => text.replace('| REQUIRED | sec-trust-boundary-threat-model -> sec-auth-session-token | LOCAL |', '| REQUIRED | sec-trust-boundary-threat-model -> sec-auth-session-token |'));
  assert.ok(errors.some(error => error.startsWith('malformed row')));
});

test('rejects missing authoritative relations', () => {
  const errors = errorsAfter(text => text.replace(/^\| RECOMMENDED \| delivery-cloud-responsibility-managed-services.*\r?\n/m, ''));
  assert.ok(errors.includes('missing Security relation delivery-cloud-responsibility-managed-services -> sec-data-encryption-key-lifecycle'));
});

test('rejects a false singleton whole-unit proxy', () => {
  const errors = errorsAfter(text => text.replace('EXTERNAL — WHOLE-UNIT PROXY NOT_ACCEPTABLE', 'EXTERNAL — WHOLE-UNIT PROXY ACCEPTABLE'));
  assert.ok(errors.includes('false singleton whole-unit proxy sec-auth-session-token -> sec-authorization-object-tenant'));
});

test('rejects duplicate active decisions', () => {
  const duplicate = '| REQUIRED | sec-trust-boundary-threat-model -> sec-auth-session-token | LOCAL | duplicate evidence | duplicate boundary |\n';
  const errors = errorsAfter(text => text.replace('| REQUIRED | sec-auth-session-token -> sec-authorization-object-tenant', `${duplicate}| REQUIRED | sec-auth-session-token -> sec-authorization-object-tenant`));
  assert.ok(errors.includes('duplicate active decision Security sec-trust-boundary-threat-model -> sec-auth-session-token'));
});

test('rejects missing target over-gating coverage', () => {
  const errors = errorsAfter(text => text.replace(/^\| lu-sec-data-encryption-key-lifecycle.*\r?\n/m, ''));
  assert.ok(errors.includes('missing over-gating target lu-sec-data-encryption-key-lifecycle'));
});

test('rejects an invalid decision type', () => {
  const errors = errorsAfter(text => text.replace('| RECOMMENDED | net-request-path-dns -> sec-injection-ssrf-input-output | SURFACE |', '| RECOMMENDED | net-request-path-dns -> sec-injection-ssrf-input-output | LOCAL |'));
  assert.ok(errors.includes('invalid decision net-request-path-dns -> sec-injection-ssrf-input-output'));
});

test('rejects a real cross-stage candidate cycle', () => {
  const nodes = new Set(['lu-sec-authorization-object-tenant', 'lu-sec-unseen-attack-transfer', 'lu-other-root']);
  const result = validateCandidateGraph(nodes, [
    ['lu-sec-authorization-object-tenant', 'lu-sec-unseen-attack-transfer'],
    ['lu-sec-unseen-attack-transfer', 'lu-sec-authorization-object-tenant'],
  ]);
  assert.ok(result.errors.includes('candidate graph cycle'));
});

test('rejects candidate graphs that collapse to one root', () => {
  const result = validateCandidateGraph(new Set(['lu-a']), []);
  assert.ok(result.errors.includes('candidate graph does not preserve multiple entry roots'));
});
