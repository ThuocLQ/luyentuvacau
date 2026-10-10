import { readFileSync } from 'node:fs';

const defaults = {
  review: 'docs/project/stage-2e-security-observability-review.md',
  inventory: 'docs/project/stage-2e-production-safety-inventory.md',
  map: 'docs/roadmap/learning-unit-map.md',
  priorReviews: ['docs/project/stage-2b-foundations-review.md', 'docs/project/stage-2c-data-review.md', 'docs/project/stage-2d-distributed-interaction-review.md'],
};

const securityHeading = 'Security relation-specific evidence — authoritative repair';
const overGatingHeading = 'Security target over-gating review';
const inventoryHeading = 'Package Security';
const reviewColumns = ['Kind', 'Relation', 'Decision', 'Concrete target-native evidence', 'Ownership / proxy boundary'];
const overGatingColumns = ['Target unit', 'LOCAL', 'EXTERNAL', 'SURFACED', 'OMITTED', 'Progression treatment', 'Over-gating check'];

const escape = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const cells = line => line.split('|').slice(1, -1).map(value => value.trim());
const relation = (from, to) => `${from} -> ${to}`;

function section(text, heading) {
  const match = new RegExp(`^## ${escape(heading)}\\s*$`, 'm').exec(text);
  if (!match) return null;
  const start = match.index + match[0].length;
  const next = /^## /m.exec(text.slice(start));
  return text.slice(start, next ? start + next.index : text.length);
}

function parseTable(text, heading, expectedColumns, errors) {
  const body = section(text, heading);
  if (body == null) {
    errors.push(`missing section ${heading}`);
    return [];
  }
  const lines = body.split(/\r?\n/).filter(line => line.startsWith('|'));
  if (lines.length < 2) {
    errors.push(`missing table ${heading}`);
    return [];
  }
  const header = cells(lines[0]);
  if (header.length !== expectedColumns.length || header.some((value, index) => value !== expectedColumns[index])) errors.push(`invalid header ${heading}`);
  const separator = cells(lines[1]);
  if (separator.length !== expectedColumns.length || !separator.every(value => /^:?-{3,}:?$/.test(value))) errors.push(`invalid separator ${heading}`);
  return lines.slice(2).map((line, index) => {
    const row = cells(line);
    if (row.length !== expectedColumns.length) errors.push(`malformed row ${heading} #${index + 1}`);
    return row;
  });
}

function inventoryRows(inventoryText, errors) {
  const body = section(inventoryText, inventoryHeading);
  if (body == null) {
    errors.push('missing Security inventory');
    return [];
  }
  const lines = body.split(/\r?\n/).filter(line => line.startsWith('|'));
  return lines.slice(2).map((line, index) => {
    const row = cells(line);
    if (row.length !== 6) errors.push(`malformed inventory row #${index + 1}`);
    return { kind: row[0], from: row[1], fromUnit: row[2], to: row[3], toUnit: row[4] };
  });
}

function unitPrimaries(mapText, unitId) {
  const match = new RegExp(`^## ${escape(unitId)}\\s*$`, 'm').exec(mapText);
  if (!match) return [];
  const tail = mapText.slice(match.index + match[0].length);
  const next = /^## /m.exec(tail);
  const body = tail.slice(0, next ? next.index : tail.length);
  const primaryStart = /^### Primary capabilities\s*$/m.exec(body);
  if (!primaryStart) return [];
  const primaryTail = body.slice(primaryStart.index + primaryStart[0].length);
  const nextSubsection = /^### /m.exec(primaryTail);
  const primary = primaryTail.slice(0, nextSubsection ? nextSubsection.index : primaryTail.length);
  return [...primary.matchAll(/^\| ([a-z0-9-]+) \|/gm)].map(match => match[1]);
}

function graph(edges) {
  const nodes = new Set(); const adjacent = new Map(); const indegree = new Map();
  for (const [from, to] of edges) {
    nodes.add(from); nodes.add(to);
    const targets = adjacent.get(from) ?? []; targets.push(to); adjacent.set(from, targets);
    indegree.set(to, (indegree.get(to) ?? 0) + 1);
    if (!indegree.has(from)) indegree.set(from, 0);
  }
  const queue = [...nodes].filter(node => indegree.get(node) === 0);
  const roots = queue.length;
  let visited = 0;
  for (let index = 0; index < queue.length; index += 1) {
    const node = queue[index]; visited += 1;
    for (const target of adjacent.get(node) ?? []) {
      indegree.set(target, indegree.get(target) - 1);
      if (indegree.get(target) === 0) queue.push(target);
    }
  }
  return { roots, cycle: visited !== nodes.size };
}

function priorExternalEdges(texts) {
  return texts.flatMap(text => text.split(/\r?\n/)).filter(line => line.includes('| EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE |')).map(line => {
    const row = cells(line);
    return [row[1], row[3]];
  }).filter(([from, to]) => from?.startsWith('lu-') && to?.startsWith('lu-'));
}

export function validateStage2Security({ reviewText, inventoryText, mapText, priorReviewTexts = [] }) {
  const errors = [];
  const inventory = inventoryRows(inventoryText, errors);
  const expected = new Map(inventory.map(row => [relation(row.from, row.to), row]));
  const decisions = parseTable(reviewText, securityHeading, reviewColumns, errors).map(row => ({ kind: row[0], key: row[1], decision: row[2], evidence: row[3], boundary: row[4] }));
  const seen = new Set();
  for (const row of decisions) {
    if (seen.has(row.key)) errors.push(`duplicate active decision ${row.key}`);
    seen.add(row.key);
    const expectedRow = expected.get(row.key);
    if (!expectedRow) { errors.push(`extra Security relation ${row.key}`); continue; }
    if (row.kind !== expectedRow.kind) errors.push(`kind mismatch ${row.key}`);
    const allowed = row.kind === 'REQUIRED'
      ? ['LOCAL', 'EXTERNAL — WHOLE-UNIT PROXY ACCEPTABLE', 'EXTERNAL — WHOLE-UNIT PROXY NOT_ACCEPTABLE']
      : ['SURFACE', 'OMIT'];
    if (!allowed.includes(row.decision)) errors.push(`invalid decision ${row.key}`);
    if (!row.evidence || !row.boundary) errors.push(`missing evidence ${row.key}`);
    if (row.kind === 'REQUIRED' && row.decision.startsWith('EXTERNAL')) {
      const primary = unitPrimaries(mapText, expectedRow.fromUnit);
      if (!primary.includes(expectedRow.from)) errors.push(`source unit membership mismatch ${row.key}`);
      if (row.decision === 'EXTERNAL — WHOLE-UNIT PROXY ACCEPTABLE' && primary.length !== 1) errors.push(`false singleton whole-unit proxy ${row.key}`);
      if (!/Prior capability evidence|Prior assessment/i.test(row.evidence)) errors.push(`missing proxy evidence ${row.key}`);
    }
  }
  for (const key of expected.keys()) if (!seen.has(key)) errors.push(`missing Security relation ${key}`);
  const required = decisions.filter(row => row.kind === 'REQUIRED').length;
  const recommended = decisions.filter(row => row.kind === 'RECOMMENDED').length;
  if (required !== 18 || recommended !== 7 || decisions.length !== 25) errors.push(`incorrect computed counts ${required}/${recommended}/${decisions.length}`);

  const targets = new Set(inventory.map(row => row.toUnit));
  const overGating = parseTable(reviewText, overGatingHeading, overGatingColumns, errors);
  const accounted = new Set();
  for (const row of overGating) {
    if (accounted.has(row[0])) errors.push(`duplicate over-gating target ${row[0]}`);
    accounted.add(row[0]);
    if (!targets.has(row[0])) errors.push(`unknown over-gating target ${row[0]}`);
    if (!row.slice(1, 5).every(value => /^\d+$/.test(value))) errors.push(`invalid over-gating count ${row[0]}`);
    if (!row[5] || !row[6]) errors.push(`missing over-gating evidence ${row[0]}`);
    const expectedCounts = { LOCAL: 0, EXTERNAL: 0, SURFACE: 0, OMIT: 0 };
    for (const decision of decisions) {
      const inventoryRow = expected.get(decision.key);
      if (inventoryRow?.toUnit !== row[0]) continue;
      if (decision.decision === 'LOCAL') expectedCounts.LOCAL += 1;
      if (decision.decision.startsWith('EXTERNAL')) expectedCounts.EXTERNAL += 1;
      if (decision.decision === 'SURFACE') expectedCounts.SURFACE += 1;
      if (decision.decision === 'OMIT') expectedCounts.OMIT += 1;
    }
    const actualCounts = row.slice(1, 5).map(Number);
    if (actualCounts[0] !== expectedCounts.LOCAL || actualCounts[1] !== expectedCounts.EXTERNAL || actualCounts[2] !== expectedCounts.SURFACE || actualCounts[3] !== expectedCounts.OMIT) errors.push(`over-gating counts mismatch ${row[0]}`);
  }
  for (const target of targets) if (!accounted.has(target)) errors.push(`missing over-gating target ${target}`);
  if (overGating.length !== targets.size) errors.push(`incorrect over-gating count ${overGating.length}/${targets.size}`);

  const candidateEdges = decisions.filter(row => row.decision === 'EXTERNAL — WHOLE-UNIT PROXY ACCEPTABLE').map(row => {
    const source = expected.get(row.key); return [source.fromUnit, source.toUnit];
  });
  const diagnostics = graph([...priorExternalEdges(priorReviewTexts), ...candidateEdges]);
  if (diagnostics.cycle) errors.push('candidate graph cycle');
  if (candidateEdges.length && diagnostics.roots === 0) errors.push('candidate graph has no root');
  return { errors, counts: { required, recommended, targets: targets.size, candidates: candidateEdges.length, roots: diagnostics.roots } };
}

function main() {
  const result = validateStage2Security({
    reviewText: readFileSync(process.argv[2] ?? defaults.review, 'utf8'),
    inventoryText: readFileSync(process.argv[3] ?? defaults.inventory, 'utf8'),
    mapText: readFileSync(process.argv[4] ?? defaults.map, 'utf8'),
    priorReviewTexts: defaults.priorReviews.map(path => readFileSync(path, 'utf8')),
  });
  if (result.errors.length) {
    console.error(result.errors.join('\n'));
    process.exitCode = 1;
    return;
  }
  const { required, recommended, targets, candidates, roots } = result.counts;
  console.log(`Stage 2 Security validation passed: ${required} REQUIRED, ${recommended} RECOMMENDED, ${targets} target units, ${candidates} acceptable external candidates, ${roots} candidate roots.`);
}

if (process.argv[1]?.endsWith('validate-stage2-security.mjs')) main();
