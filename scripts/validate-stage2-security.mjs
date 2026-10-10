import { readFileSync } from 'node:fs';

const defaults = {
  review: 'docs/project/stage-2e-security-observability-review.md', inventory: 'docs/project/stage-2e-production-safety-inventory.md', map: 'docs/roadmap/learning-unit-map.md', dependency: 'docs/roadmap/dependency-map.md',
  priorReviews: ['docs/project/stage-2b-foundations-review.md', 'docs/project/stage-2c-data-review.md', 'docs/project/stage-2d-distributed-interaction-review.md'],
};
const reviewColumns = ['Kind', 'Relation', 'Decision', 'Concrete target-native evidence', 'Ownership / proxy boundary'];
const overGatingColumns = ['Target unit', 'LOCAL', 'EXTERNAL', 'SURFACED', 'OMITTED', 'Progression treatment', 'Over-gating check'];
const packages = [
  { name: 'Security', inventoryHeading: 'Package Security', evidenceHeading: 'Security relation-specific evidence — authoritative repair', overGatingHeading: 'Security target over-gating review', required: 18, recommended: 7, targets: 11 },
  { name: 'Observability', inventoryHeading: 'Package Observability', evidenceHeading: 'Observability relation-specific evidence — authoritative repair', overGatingHeading: 'Observability target over-gating review', required: 9, recommended: 10, targets: 7 },
  { name: 'Reliability / SRE', inventoryHeading: 'Package Reliability / SRE', evidenceHeading: 'Reliability / SRE relation-specific evidence — authoritative repair', overGatingHeading: 'Reliability / SRE target over-gating review', required: 8, recommended: 12, targets: 9 },
];
const deliveryPackage = { name: 'Delivery', inventoryHeading: 'Delivery inter-unit relations', evidenceHeading: 'Delivery relation-specific evidence', overGatingHeading: 'Delivery target over-gating review', required: 14, recommended: 16, targets: 9 };
const testingPackage = { name: 'Testing', inventoryHeading: 'Testing inter-unit relations', evidenceHeading: 'Testing relation-specific evidence', overGatingHeading: 'Testing target over-gating review', required: 9, recommended: 15, targets: 9 };
const architecturePackage = { name: 'Architecture', inventoryHeading: 'Architecture inter-unit relations', evidenceHeading: 'Architecture relation-specific evidence', overGatingHeading: 'Architecture target over-gating review', required: 18, recommended: 13, targets: 7 };
const escape = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const cells = line => line.split('|').slice(1, -1).map(value => value.trim());
const relation = (from, to) => `${from} -> ${to}`;

function section(text, heading) {
  const match = new RegExp(`^## ${escape(heading)}\\s*$`, 'm').exec(text);
  if (!match) return null;
  const start = match.index + match[0].length; const next = /^## /m.exec(text.slice(start));
  return text.slice(start, next ? start + next.index : text.length);
}

function parseTable(text, heading, expectedColumns, errors) {
  const body = section(text, heading);
  if (body == null) { errors.push(`missing section ${heading}`); return []; }
  const lines = body.split(/\r?\n/).filter(line => line.startsWith('|'));
  if (lines.length < 2) { errors.push(`missing table ${heading}`); return []; }
  const header = cells(lines[0]); const separator = cells(lines[1]);
  if (header.length !== expectedColumns.length || header.some((value, index) => value !== expectedColumns[index])) errors.push(`invalid header ${heading}`);
  if (separator.length !== expectedColumns.length || !separator.every(value => /^:?-{3,}:?$/.test(value))) errors.push(`invalid separator ${heading}`);
  return lines.slice(2).map((line, index) => {
    const row = cells(line); if (row.length !== expectedColumns.length) errors.push(`malformed row ${heading} #${index + 1}`); return row;
  });
}

function inventoryRows(text, heading, errors) {
  const body = section(text, heading);
  if (body == null) { errors.push(`missing inventory ${heading}`); return []; }
  return body.split(/\r?\n/).filter(line => line.startsWith('|')).slice(2).map((line, index) => {
    const row = cells(line); if (row.length !== 6) errors.push(`malformed inventory row ${heading} #${index + 1}`);
    return { kind: row[0], from: row[1], fromUnit: row[2], to: row[3], toUnit: row[4] };
  });
}

export function learningUnitIds(mapText) { return new Set([...mapText.matchAll(/^## (lu-[a-z0-9-]+)\s*$/gm)].map(match => match[1])); }

function unitPrimaries(mapText, unitId) {
  const match = new RegExp(`^## ${escape(unitId)}\\s*$`, 'm').exec(mapText); if (!match) return [];
  const tail = mapText.slice(match.index + match[0].length); const next = /^## /m.exec(tail); const body = tail.slice(0, next ? next.index : tail.length);
  const start = /^### Primary capabilities\s*$/m.exec(body); if (!start) return [];
  const primaryTail = body.slice(start.index + start[0].length); const nextSubsection = /^### /m.exec(primaryTail);
  return [...primaryTail.slice(0, nextSubsection ? nextSubsection.index : primaryTail.length).matchAll(/^\| ([a-z0-9-]+) \|/gm)].map(match => match[1]);
}

export function validateCandidateGraph(nodes, edges) {
  const errors = []; const unique = new Map();
  for (const [from, to] of edges) { if (!nodes.has(from) || !nodes.has(to)) errors.push(`candidate graph unknown unit ${from} -> ${to}`); unique.set(`${from} -> ${to}`, [from, to]); }
  const adjacent = new Map([...nodes].map(node => [node, []])); const indegree = new Map([...nodes].map(node => [node, 0]));
  for (const [from, to] of unique.values()) if (adjacent.has(from) && indegree.has(to)) { adjacent.get(from).push(to); indegree.set(to, indegree.get(to) + 1); }
  const queue = [...nodes].filter(node => indegree.get(node) === 0); const roots = queue.length; let visited = 0;
  for (let index = 0; index < queue.length; index += 1) { const node = queue[index]; visited += 1; for (const target of adjacent.get(node)) { indegree.set(target, indegree.get(target) - 1); if (indegree.get(target) === 0) queue.push(target); } }
  if (visited !== nodes.size) errors.push('candidate graph cycle');
  if (roots < 2) errors.push('candidate graph does not preserve multiple entry roots');
  return { errors, edges: unique.size, roots, cycle: visited !== nodes.size };
}

function priorExternalEdges(texts) {
  return texts.flatMap(text => text.split(/\r?\n/)).filter(line => line.includes('| EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE |')).map(line => { const row = cells(line); return [row[1], row[3]]; }).filter(([from, to]) => from?.startsWith('lu-') && to?.startsWith('lu-'));
}

function frozenDependencyPairs(text) {
  return new Map(text.split(/\r?\n/).filter(line => /^\| [a-z0-9-]+ \| [a-z0-9-]+ \| (REQUIRED|RECOMMENDED) \|/.test(line)).map(line => {
    const row = cells(line); return [relation(row[0], row[1]), row[2]];
  }));
}

function primaryUnits(mapText) {
  const units = new Map();
  for (const unitId of learningUnitIds(mapText)) for (const capability of unitPrimaries(mapText, unitId)) units.set(capability, unitId);
  return units;
}

function validatePackage(config, reviewText, inventoryText, mapText, frozenPairs = new Map()) {
  const errors = []; const inventory = inventoryRows(inventoryText, config.inventoryHeading, errors); const expected = new Map(inventory.map(row => [relation(row.from, row.to), row]));
  for (const entry of inventory) {
    const frozen = frozenPairs.get(relation(entry.from, entry.to));
    if (!frozen) errors.push(`frozen dependency missing ${relation(entry.from, entry.to)}`);
    else if (frozen !== entry.kind) errors.push(`frozen dependency kind mismatch ${relation(entry.from, entry.to)}`);
  }
  const decisions = parseTable(reviewText, config.evidenceHeading, reviewColumns, errors).map(row => ({ kind: row[0], key: row[1], decision: row[2], evidence: row[3], boundary: row[4] })); const seen = new Set();
  for (const row of decisions) {
    if (seen.has(row.key)) errors.push(`duplicate active decision ${config.name} ${row.key}`); seen.add(row.key); const entry = expected.get(row.key);
    if (!entry) { errors.push(`extra ${config.name} relation ${row.key}`); continue; }
    if (row.kind !== entry.kind) errors.push(`kind mismatch ${row.key}`);
    const allowed = row.kind === 'REQUIRED' ? ['LOCAL', 'EXTERNAL — WHOLE-UNIT PROXY ACCEPTABLE', 'EXTERNAL — WHOLE-UNIT PROXY NOT_ACCEPTABLE'] : ['SURFACE', 'OMIT'];
    if (!allowed.includes(row.decision)) errors.push(`invalid decision ${row.key}`); if (!row.evidence || !row.boundary) errors.push(`missing evidence ${row.key}`);
    if (row.kind === 'REQUIRED' && row.decision.startsWith('EXTERNAL')) {
      const primary = unitPrimaries(mapText, entry.fromUnit); if (!primary.includes(entry.from)) errors.push(`source unit membership mismatch ${row.key}`);
      if (row.decision === 'EXTERNAL — WHOLE-UNIT PROXY ACCEPTABLE' && primary.length !== 1) errors.push(`false singleton whole-unit proxy ${row.key}`);
      if (!/Prior capability evidence|Prior assessment/i.test(row.evidence)) errors.push(`missing proxy evidence ${row.key}`);
    }
  }
  for (const key of expected.keys()) if (!seen.has(key)) errors.push(`missing ${config.name} relation ${key}`);
  const required = decisions.filter(row => row.kind === 'REQUIRED').length; const recommended = decisions.filter(row => row.kind === 'RECOMMENDED').length;
  if (required !== config.required || recommended !== config.recommended || decisions.length !== inventory.length) errors.push(`incorrect computed counts ${config.name} ${required}/${recommended}/${decisions.length}`);
  const targets = new Set(inventory.map(row => row.toUnit)); const overGating = parseTable(reviewText, config.overGatingHeading, overGatingColumns, errors); const accounted = new Set();
  for (const row of overGating) {
    if (accounted.has(row[0])) errors.push(`duplicate over-gating target ${row[0]}`); accounted.add(row[0]); if (!targets.has(row[0])) errors.push(`unknown over-gating target ${row[0]}`);
    if (!row.slice(1, 5).every(value => /^\d+$/.test(value))) errors.push(`invalid over-gating count ${row[0]}`); if (!row[5] || !row[6]) errors.push(`missing over-gating evidence ${row[0]}`);
    const actual = { LOCAL: 0, EXTERNAL: 0, SURFACE: 0, OMIT: 0 };
    for (const decision of decisions) { const entry = expected.get(decision.key); if (entry?.toUnit !== row[0]) continue; if (decision.decision === 'LOCAL') actual.LOCAL += 1; if (decision.decision.startsWith('EXTERNAL')) actual.EXTERNAL += 1; if (decision.decision === 'SURFACE') actual.SURFACE += 1; if (decision.decision === 'OMIT') actual.OMIT += 1; }
    const counts = row.slice(1, 5).map(Number); if (counts[0] !== actual.LOCAL || counts[1] !== actual.EXTERNAL || counts[2] !== actual.SURFACE || counts[3] !== actual.OMIT) errors.push(`over-gating counts mismatch ${row[0]}`);
  }
  for (const target of targets) if (!accounted.has(target)) errors.push(`missing over-gating target ${target}`); if (overGating.length !== config.targets) errors.push(`incorrect over-gating count ${config.name} ${overGating.length}/${config.targets}`);
  const external = decisions.filter(row => row.decision.startsWith('EXTERNAL')).map(row => { const entry = expected.get(row.key); return [entry.fromUnit, entry.toUnit]; });
  return { errors, decisions, external, counts: { required, recommended, targets: targets.size } };
}

export function validateStage2Security({ reviewText, inventoryText, mapText, dependencyText = '' }) { const result = validatePackage(packages[0], reviewText, inventoryText, mapText, frozenDependencyPairs(dependencyText)); return { errors: result.errors, counts: { ...result.counts, candidates: result.external.length } }; }
export function validateStage2E({ reviewText, inventoryText, mapText, dependencyText = '', priorReviewTexts = [], additionalCandidateEdges = [] }) {
  const frozenPairs = frozenDependencyPairs(dependencyText); const results = packages.map(config => validatePackage(config, reviewText, inventoryText, mapText, frozenPairs));
  const inventory = packages.flatMap(config => inventoryRows(inventoryText, config.inventoryHeading, []));
  const allTargets = new Set(inventory.map(entry => entry.toUnit)); const invariantPairs = [
    ['sec-auth-session-token', 'sec-oauth-oidc-awareness'], ['obs-instrumentation-context', 'obs-tracing-distributed-evidence'],
  ];
  const invariantErrors = []; const homes = primaryUnits(mapText);
  if (inventory.length !== 64 || inventory.filter(entry => entry.kind === 'REQUIRED').length !== 35 || inventory.filter(entry => entry.kind === 'RECOMMENDED').length !== 29 || allTargets.size !== 27) invariantErrors.push('Stage 2E inventory totals mismatch');
  for (const [from, to] of invariantPairs) {
    if (!frozenPairs.has(relation(from, to))) invariantErrors.push(`missing same-unit internal dependency ${relation(from, to)}`);
    else if (!homes.get(from) || homes.get(from) !== homes.get(to)) invariantErrors.push(`same-unit internal dependency home mismatch ${relation(from, to)}`);
  }
  const nodes = learningUnitIds(mapText); const prior = priorExternalEdges(priorReviewTexts);
  const securityGraph = validateCandidateGraph(nodes, [...prior, ...results[0].external]);
  const graph = validateCandidateGraph(nodes, [...prior, ...results.flatMap(result => result.external), ...additionalCandidateEdges]);
  return { errors: [...results.flatMap(result => result.errors), ...invariantErrors, ...graph.errors], packages: results.map((result, index) => ({ name: packages[index].name, ...result.counts, candidates: result.external.length })), securityGraph, graph, totals: { relations: inventory.length, targets: allTargets.size } };
}

export function validateStage2Delivery({ reviewText, inventoryText, stage2eReviewText, stage2eInventoryText, mapText, dependencyText = '', priorReviewTexts = [], additionalCandidateEdges = [] }) {
  const frozenPairs = frozenDependencyPairs(dependencyText);
  const internalRows = parseTable(inventoryText, 'Same-unit internal REQUIRED relations', ['From capability', 'To capability', 'Learning Unit', 'Reason'], []);
  const expectedInternal = [
    ['rel-health-readiness-semantics', 'delivery-probes-health', 'lu-rel-health-probes'],
    ['delivery-artifact-image-config', 'delivery-cicd-promotion-provenance', 'lu-delivery-artifact-provenance'],
    ['rel-change-rollout-rollback-risk', 'delivery-rollout-rollback-strategies', 'lu-release-rollout-rollback'],
  ];
  const errors = []; const homes = primaryUnits(mapText);
  if (internalRows.length !== 3) errors.push(`incorrect Delivery internal-edge count ${internalRows.length}/3`);
  const seenInternal = new Set();
  for (const row of internalRows) {
    const key = relation(row[0], row[1]); if (seenInternal.has(key)) errors.push(`duplicate Delivery internal edge ${key}`); seenInternal.add(key);
    if (frozenPairs.get(key) !== 'REQUIRED') errors.push(`invalid Delivery internal edge ${key}`);
    if (!homes.get(row[0]) || homes.get(row[0]) !== homes.get(row[1]) || homes.get(row[0]) !== row[2]) errors.push(`Delivery internal home mismatch ${key}`);
  }
  for (const [from, to, unit] of expectedInternal) if (!seenInternal.has(relation(from, to))) errors.push(`missing Delivery internal edge ${relation(from, to)}`);
  const strippedReview = reviewText.replace(/^\| lu-delivery-artifact-provenance \| 0 \| 0 \| 0 \| 0 \| Internal order only \|.*\r?\n/m, '');
  const result = validatePackage(deliveryPackage, strippedReview, inventoryText, mapText, frozenPairs);
  const fullOverGating = parseTable(reviewText, deliveryPackage.overGatingHeading, overGatingColumns, errors);
  if (fullOverGating.length !== 10) errors.push(`incorrect Delivery full-scope over-gating count ${fullOverGating.length}/10`);
  const fullTargets = new Set(fullOverGating.map(row => row[0]));
  if (!fullTargets.has('lu-delivery-artifact-provenance')) errors.push('missing internal-only Delivery over-gating target lu-delivery-artifact-provenance');
  const stage2e = packages.map(config => validatePackage(config, stage2eReviewText, stage2eInventoryText, mapText, frozenPairs));
  const nodes = learningUnitIds(mapText); const prior = priorExternalEdges(priorReviewTexts);
  const graph = validateCandidateGraph(nodes, [...prior, ...stage2e.flatMap(entry => entry.external), ...result.external, ...additionalCandidateEdges]);
  return { errors: [...errors, ...result.errors, ...stage2e.flatMap(entry => entry.errors), ...graph.errors], counts: { ...result.counts, internal: internalRows.length, fullTargets: fullTargets.size, candidates: result.external.length }, graph };
}

const withoutDeliveryInternalOnlyRow = text => text.split('\n').filter(line => !line.startsWith('| lu-delivery-artifact-provenance | 0 | 0 | 0 | 0 | Internal order only |')).join('\n');

export function validateStage2Testing({ reviewText, inventoryText, deliveryReviewText, deliveryInventoryText, stage2eReviewText, stage2eInventoryText, mapText, dependencyText = '', priorReviewTexts = [], additionalCandidateEdges = [] }) {
  const frozenPairs = frozenDependencyPairs(dependencyText); const errors = []; const homes = primaryUnits(mapText);
  const internal = parseTable(inventoryText, 'Same-unit internal REQUIRED relation', ['From capability', 'To capability', 'Learning Unit', 'Reason'], errors);
  const expectedInternal = relation('test-risk-strategy-boundaries', 'test-unit-integration-contract'); const internalRow = internal[0];
  if (internal.length !== 1) errors.push(`incorrect Testing internal-edge count ${internal.length}/1`);
  if (!internalRow || relation(internalRow[0], internalRow[1]) !== expectedInternal || internalRow[2] !== 'lu-test-risk-strategy-boundaries' || frozenPairs.get(expectedInternal) !== 'REQUIRED' || homes.get(internalRow?.[0]) !== internalRow?.[2] || homes.get(internalRow?.[1]) !== internalRow?.[2]) errors.push(`invalid Testing internal edge ${expectedInternal}`);
  const testing = validatePackage(testingPackage, reviewText, inventoryText, mapText, frozenPairs);
  const delivery = validatePackage(deliveryPackage, withoutDeliveryInternalOnlyRow(deliveryReviewText), deliveryInventoryText, mapText, frozenPairs);
  const stage2e = packages.map(config => validatePackage(config, stage2eReviewText, stage2eInventoryText, mapText, frozenPairs));
  const nodes = learningUnitIds(mapText); const prior = priorExternalEdges(priorReviewTexts);
  const graph = validateCandidateGraph(nodes, [...prior, ...stage2e.flatMap(entry => entry.external), ...delivery.external, ...testing.external, ...additionalCandidateEdges]);
  return { errors: [...errors, ...testing.errors, ...delivery.errors, ...stage2e.flatMap(entry => entry.errors), ...graph.errors], counts: { ...testing.counts, internal: internal.length, candidates: testing.external.length }, graph };
}

export function validateStage2F(input) {
  const testing = validateStage2Testing(input);
  const delivery = validateStage2Delivery({ reviewText: input.deliveryReviewText, inventoryText: input.deliveryInventoryText, stage2eReviewText: input.stage2eReviewText, stage2eInventoryText: input.stage2eInventoryText, mapText: input.mapText, dependencyText: input.dependencyText, priorReviewTexts: input.priorReviewTexts });
  const deliveryInventory = inventoryRows(input.deliveryInventoryText, deliveryPackage.inventoryHeading, []); const testingInventory = inventoryRows(input.inventoryText, testingPackage.inventoryHeading, []);
  const targets = new Set([...deliveryInventory, ...testingInventory].map(entry => entry.toUnit)); targets.add('lu-delivery-artifact-provenance');
  const totals = { relations: deliveryInventory.length + testingInventory.length, required: [...deliveryInventory, ...testingInventory].filter(entry => entry.kind === 'REQUIRED').length, recommended: [...deliveryInventory, ...testingInventory].filter(entry => entry.kind === 'RECOMMENDED').length, targets: targets.size, internal: delivery.counts.internal + testing.counts.internal };
  const errors = [...testing.errors, ...delivery.errors]; if (totals.relations !== 54 || totals.required !== 23 || totals.recommended !== 31 || totals.targets !== 19 || totals.internal !== 4) errors.push('Stage 2F combined totals mismatch');
  return { errors, testing, delivery, totals, graph: testing.graph };
}

const withoutArchitectureRootRow = text => text.split('\n').filter(line => !line.startsWith('| lu-arch-requirements-quality-attributes | 0 | 0 | 0 | 0 | Root architecture Unit |')).join('\n');

export function validateStage2Architecture({ reviewText, inventoryText, testingReviewText, testingInventoryText, deliveryReviewText, deliveryInventoryText, stage2eReviewText, stage2eInventoryText, mapText, dependencyText = '', priorReviewTexts = [], additionalCandidateEdges = [] }) {
  const frozenPairs = frozenDependencyPairs(dependencyText); const errors = []; const homes = primaryUnits(mapText);
  const internal = parseTable(inventoryText, 'Same-unit relations', ['Kind', 'From capability', 'To capability', 'Learning Unit', 'Reason'], errors);
  const expected = new Map([
    [relation('arch-boundaries-ownership', 'arch-data-ownership-source-of-truth'), ['REQUIRED', 'lu-arch-boundaries-data-ownership']],
    [relation('arch-cost-complexity-changeability', 'arch-decision-communication-transfer'), ['RECOMMENDED', 'lu-arch-cost-complexity-changeability']],
  ]);
  if (internal.length !== 2) errors.push(`incorrect Architecture internal-edge count ${internal.length}/2`);
  const seen = new Set(); for (const row of internal) { const key = relation(row[1], row[2]); seen.add(key); const info = expected.get(key); if (!info || row[0] !== info[0] || row[3] !== info[1] || frozenPairs.get(key) !== row[0] || homes.get(row[1]) !== row[3] || homes.get(row[2]) !== row[3]) errors.push(`invalid Architecture internal edge ${key}`); }
  for (const key of expected.keys()) if (!seen.has(key)) errors.push(`missing Architecture internal edge ${key}`);
  const architecture = validatePackage(architecturePackage, withoutArchitectureRootRow(reviewText), inventoryText, mapText, frozenPairs);
  const fullOverGating = parseTable(reviewText, architecturePackage.overGatingHeading, overGatingColumns, errors);
  if (fullOverGating.length !== 8 || !fullOverGating.some(row => row[0] === 'lu-arch-requirements-quality-attributes')) errors.push('invalid Architecture full-scope target coverage');
  const testing = validatePackage(testingPackage, testingReviewText, testingInventoryText, mapText, frozenPairs);
  const delivery = validatePackage(deliveryPackage, withoutDeliveryInternalOnlyRow(deliveryReviewText), deliveryInventoryText, mapText, frozenPairs);
  const stage2e = packages.map(config => validatePackage(config, stage2eReviewText, stage2eInventoryText, mapText, frozenPairs));
  const nodes = learningUnitIds(mapText); const prior = priorExternalEdges(priorReviewTexts);
  const graph = validateCandidateGraph(nodes, [...prior, ...stage2e.flatMap(entry => entry.external), ...delivery.external, ...testing.external, ...architecture.external, ...additionalCandidateEdges]);
  return { errors: [...errors, ...architecture.errors, ...testing.errors, ...delivery.errors, ...stage2e.flatMap(entry => entry.errors), ...graph.errors], counts: { ...architecture.counts, internal: internal.length, fullTargets: fullOverGating.length, candidates: architecture.external.length }, graph };
}

function main() {
  if (process.argv[2] === '--delivery') {
    const reviewText = readFileSync('docs/project/stage-2f-delivery-review.md', 'utf8'); const inventoryText = readFileSync('docs/project/stage-2f-delivery-inventory.md', 'utf8'); const mapText = readFileSync(defaults.map, 'utf8'); const dependencyText = readFileSync(defaults.dependency, 'utf8');
    const result = validateStage2Delivery({ reviewText, inventoryText, stage2eReviewText: readFileSync(defaults.review, 'utf8'), stage2eInventoryText: readFileSync(defaults.inventory, 'utf8'), mapText, dependencyText, priorReviewTexts: defaults.priorReviews.map(path => readFileSync(path, 'utf8')) });
    if (result.errors.length) { console.error(result.errors.join('\n')); process.exitCode = 1; return; }
    console.log(`Stage 2F Delivery validation passed: ${result.counts.required} REQUIRED/${result.counts.recommended} RECOMMENDED; ${result.counts.targets} inter-unit targets + ${result.counts.fullTargets - result.counts.targets} internal-only target; ${result.counts.internal} internal edges; ${result.counts.candidates} external candidates; combined graph ${result.graph.edges} unique edges/${result.graph.roots} roots, acyclic.`); return;
  }
  if (process.argv[2] === '--testing') {
    const mapText = readFileSync(defaults.map, 'utf8'); const dependencyText = readFileSync(defaults.dependency, 'utf8');
    const result = validateStage2F({ reviewText: readFileSync('docs/project/stage-2f-testing-review.md', 'utf8'), inventoryText: readFileSync('docs/project/stage-2f-testing-inventory.md', 'utf8'), deliveryReviewText: readFileSync('docs/project/stage-2f-delivery-review.md', 'utf8'), deliveryInventoryText: readFileSync('docs/project/stage-2f-delivery-inventory.md', 'utf8'), stage2eReviewText: readFileSync(defaults.review, 'utf8'), stage2eInventoryText: readFileSync(defaults.inventory, 'utf8'), mapText, dependencyText, priorReviewTexts: defaults.priorReviews.map(path => readFileSync(path, 'utf8')) });
    if (result.errors.length) { console.error(result.errors.join('\n')); process.exitCode = 1; return; }
    console.log(`Stage 2F Testing/Verification validation passed: ${result.testing.counts.required} REQUIRED/${result.testing.counts.recommended} RECOMMENDED; ${result.testing.counts.targets} targets; ${result.testing.counts.internal} internal edge; Stage 2F ${result.totals.relations} relations/${result.totals.targets} full-scope targets/${result.totals.internal} internal edges; graph ${result.graph.edges} unique edges/${result.graph.roots} roots, acyclic.`); return;
  }
  if (process.argv[2] === '--synthesis') {
    const mapText = readFileSync(defaults.map, 'utf8'); const dependencyText = readFileSync(defaults.dependency, 'utf8');
    const result = validateStage2Architecture({ reviewText: readFileSync('docs/project/stage-2g-architecture-review.md', 'utf8'), inventoryText: readFileSync('docs/project/stage-2g-architecture-inventory.md', 'utf8'), testingReviewText: readFileSync('docs/project/stage-2f-testing-review.md', 'utf8'), testingInventoryText: readFileSync('docs/project/stage-2f-testing-inventory.md', 'utf8'), deliveryReviewText: readFileSync('docs/project/stage-2f-delivery-review.md', 'utf8'), deliveryInventoryText: readFileSync('docs/project/stage-2f-delivery-inventory.md', 'utf8'), stage2eReviewText: readFileSync(defaults.review, 'utf8'), stage2eInventoryText: readFileSync(defaults.inventory, 'utf8'), mapText, dependencyText, priorReviewTexts: defaults.priorReviews.map(path => readFileSync(path, 'utf8')) });
    if (result.errors.length) { console.error(result.errors.join('\n')); process.exitCode = 1; return; }
    console.log(`Stage 2G Architecture validation passed: ${result.counts.required} REQUIRED/${result.counts.recommended} RECOMMENDED; ${result.counts.targets} inter-unit targets + ${result.counts.fullTargets - result.counts.targets} root target; ${result.counts.internal} internal edges; ${result.counts.candidates} External candidates; graph ${result.graph.edges} unique edges/${result.graph.roots} roots, acyclic.`); return;
  }
  const reviewText = readFileSync(process.argv[2] ?? defaults.review, 'utf8'); const inventoryText = readFileSync(process.argv[3] ?? defaults.inventory, 'utf8'); const mapText = readFileSync(process.argv[4] ?? defaults.map, 'utf8'); const dependencyText = readFileSync(defaults.dependency, 'utf8'); const priorReviewTexts = defaults.priorReviews.map(path => readFileSync(path, 'utf8'));
  const result = validateStage2E({ reviewText, inventoryText, mapText, dependencyText, priorReviewTexts }); if (result.errors.length) { console.error(result.errors.join('\n')); process.exitCode = 1; return; }
  console.log(`Stage 2E validation passed: ${result.packages.map(entry => `${entry.name} ${entry.required} REQUIRED/${entry.recommended} RECOMMENDED`).join('; ')}; ${result.totals.relations} relations/${result.totals.targets} targets; prior+Security graph ${result.securityGraph.edges} unique edges/${result.securityGraph.roots} roots; full graph ${result.graph.edges} unique external candidate edges/${result.graph.roots} roots, acyclic.`);
}
if (process.argv[1]?.endsWith('validate-stage2-security.mjs')) main();
