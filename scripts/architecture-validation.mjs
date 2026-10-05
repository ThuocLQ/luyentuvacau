import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';

const file = (root, path) => fs.readFileSync(`${root}/${path}`, 'utf8');
const unique = values => [...new Set(values)];
export const exactSet = (a, b) => a.length === new Set(a).size && b.length === new Set(b).size && a.length === b.length && a.every(value => b.includes(value));
const exactOrder = (a, b) => a.length === b.length && a.every((value, index) => value === b[index]);
const add = (errors, message) => errors.push(message);

export function section(text, heading) {
  const match = new RegExp(`^## ${escape(heading)}\\s*$`, 'm').exec(text);
  if (!match) return null;
  const start = match.index + match[0].length;
  const next = /^## /m.exec(text.slice(start));
  return text.slice(start, next ? start + next.index : text.length);
}
const escape = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function table(text, heading, columns, errors) {
  const body = section(text, heading);
  if (body == null) { add(errors, `missing section ${heading}`); return []; }
  if (/\\n\s*\||`n\s*\|/.test(body)) add(errors, `literal newline artifact ${heading}`);
  const lines = body.split(/\r?\n/);
  const start = lines.findIndex(line => line.startsWith('| '));
  if (start < 0) { add(errors, `missing table ${heading}`); return []; }
  const header = cells(lines[start]);
  if (columns && !exactOrder(header, columns)) add(errors, `malformed table header ${heading}`);
  const separator = lines[start + 1] ?? '';
  if (!validSeparator(separator, header.length)) add(errors, `malformed table separator ${heading}`);
  const result = [];
  for (let i = start + 2; i < lines.length && lines[i].startsWith('|'); i += 1) {
    const row = cells(lines[i]);
    if (!linePhysical(lines[i], columns?.length ?? row.length) || (columns && row.length !== columns.length)) add(errors, `malformed table column count ${heading}`);
    else result.push(row);
  }
  return result;
}
const cells = line => line.split('|').slice(1, -1).map(value => value.trim());
const linePhysical = (line, count) => line.endsWith('|') && line.split('|').length === count + 2;
const validSeparator = (line, count) => linePhysical(line, count) && cells(line).every(cell => /^:?-{3,}:?$/.test(cell));
const splitIds = value => value.split(';').map(id => id.trim()).filter(Boolean);
const hasDuplicate = values => values.length !== new Set(values).size;

function frozenCapabilities(text, errors) {
  const rows = text.split(/\r?\n/).filter(line => line.startsWith('| ') && /\| L[1-4] \|/.test(line)).map(cells)
    .filter(row => /^[a-z]+-/.test(row[0]) && row[2].length > 0 && /^L[1-4]$/.test(row[4]));
  if (!rows.length) add(errors, 'missing frozen capability table');
  const map = new Map();
  for (const row of rows) {
    if (map.has(row[0])) add(errors, `duplicate frozen capability ${row[0]}`);
    map.set(row[0], { owner: row[2], level: row[4] });
  }
  return map;
}

function unitSections(map, registry, errors) {
  const result = new Map();
  for (const row of registry) {
    const id = row[0]; const occurrences = [...map.matchAll(new RegExp('^## ' + escape(id) + '\\s*$', 'gm'))].length;
    if (occurrences > 1) add(errors, `duplicate unit section ${id}`);
    const body = section(map, id);
    if (body == null) { add(errors, `missing unit section ${id}`); continue; }
    if (/\\n\s*\||`n\s*\|/.test(body)) add(errors, `literal newline artifact ${id}`);
    const match = /\| Capability ID \| Canonical owner \| Frozen target level \|\r?\n\|[-| ]+\|\r?\n((?:\|.*\|\r?\n?)+)/.exec(body);
    if (!match) { add(errors, `missing primary table ${id}`); continue; }
    const lines = match[1].trimEnd().split(/\r?\n/);
    const primary = [];
    for (const line of lines) {
      const rowCells = cells(line);
      if (!linePhysical(line, 3) || rowCells.length !== 3) add(errors, `malformed table column count ${id}`);
      else primary.push({ id: rowCells[0], owner: rowCells[1], level: rowCells[2] });
    }
    result.set(id, { body, primary });
  }
  return result;
}

const schemas = {
  'legacy-v1': ['Shared problem / need', 'Shared mechanism / state trace', 'Shared observable evidence', 'Shared failure / debug story', 'Assessment-coherence argument', 'Transfer variation'],
  'canonical-v2': ['Canonical scenario', 'Integrated mechanism / state trace', 'Integrated evidence surface', 'Failure and debug loop', 'Shared assessment task', 'Transfer variation', 'Boundary decision'],
};
const placeholders = ['One bounded trace observes all Primary mechanisms.', 'strongest data boundary', 'One canonical scenario defined in map.', 'One bounded assessment is coherent.', 'Change workload, failure mode, topology or data distribution while preserving the mechanism above.', 'TODO', 'TBD', 'unchanged composition'];

function subsection(body, heading) {
  const match = new RegExp(`^### ${escape(heading)}\\s*$`, 'm').exec(body);
  if (!match) return null;
  const start = match.index + match[0].length; const next = /^### /m.exec(body.slice(start));
  return body.slice(start, next ? start + next.index : body.length);
}

function proofCapabilities(body, errors, unit) {
  const assessment = subsection(body, 'Shared assessment task') ?? '';
  const marker = '| Primary capability | What evidence in this same task proves it |';
  const at = assessment.indexOf(marker);
  if (at < 0) { add(errors, `missing proof table ${unit}`); return []; }
  const lines = assessment.slice(at).split(/\r?\n/); const output = [];
  if (!validSeparator(lines[1] ?? '', 2)) add(errors, `malformed proof table separator ${unit}`);
  for (let i = 2; i < lines.length && lines[i].startsWith('|'); i += 1) {
    const row = cells(lines[i]);
    if (!linePhysical(lines[i], 2) || row.length !== 2) add(errors, `malformed proof table ${unit}`);
    else output.push(row[0]);
  }
  return output;
}

function reviewedBatches(audit) {
  const body = section(audit, 'Stage-1 semantic review batches') ?? '';
  return [...body.matchAll(/^- (.+?) — (PENDING|IN_REVIEW|REVIEWED)$/gm)].map(([, name, status]) => ({ name, status }));
}

const dependencyColumns = ['From', 'To', 'Relation', 'Why prior context matters', 'Assumed slice', 'Ownership note'];
const dependencyLine = line => /^\| [a-z]+-[^|]+ \| [a-z]+-[^|]+ \| (REQUIRED|RECOMMENDED) \|/.test(line);

function declaredCount(body, label, errors) {
  const match = new RegExp('^- ' + escape(label) + ': (\\d+)$', 'm').exec(body);
  if (!match) { add(errors, 'missing declared dependency ' + label); return null; }
  return Number(match[1]);
}

function validateDependencyRegistry(text, frozenMap, errors) {
  if (!text) { add(errors, 'missing dependency map'); return; }
  const rows = table(text, 'Dependency registry', dependencyColumns, errors);
  const body = section(text, 'Dependency registry') ?? '';
  const canonicalRaw = body.split(/\r?\n/).filter(dependencyLine);
  const globalRaw = text.split(/\r?\n/).filter(dependencyLine);
  if (globalRaw.length !== canonicalRaw.length) add(errors, 'dependency rows outside canonical registry');
  if (rows.length !== canonicalRaw.length) add(errors, 'malformed canonical dependency registry');
  const finalAudit = section(text, 'Final whole-graph audit') ?? '';
  const declaredRows = declaredCount(finalAudit, 'Dependency rows', errors);
  const declaredRequired = declaredCount(finalAudit, 'REQUIRED', errors);
  const declaredRecommended = declaredCount(finalAudit, 'RECOMMENDED', errors);
  const required = rows.filter(row => row[2] === 'REQUIRED').length;
  const recommended = rows.filter(row => row[2] === 'RECOMMENDED').length;
  if (declaredRows !== rows.length) add(errors, 'dependency declared row count mismatch');
  if (declaredRequired !== required) add(errors, 'dependency declared REQUIRED count mismatch');
  if (declaredRecommended !== recommended) add(errors, 'dependency declared RECOMMENDED count mismatch');
  const pairs = new Set();
  for (const row of rows) {
    const pair = row[0] + ' -> ' + row[1];
    if (pairs.has(pair)) add(errors, 'duplicate dependency pair ' + pair);
    pairs.add(pair);
    for (const id of row.slice(0, 2)) if (!frozenMap.has(id)) add(errors, 'unknown dependency capability ' + id);
  }
  const actual = createHash('sha256').update(canonicalRaw.join('\n') + '\n', 'utf8').digest('hex');
  const fingerprint = /Canonical registry fingerprint:\s*SHA-256: ([a-f0-9]{64})/i.exec(text)?.[1];
  if (!fingerprint || fingerprint !== actual) add(errors, 'dependency fingerprint mismatch');
}

export function collectChangedFiles(root = '.') {
  const run = args => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).split(/\r?\n/).filter(Boolean);
  return unique([...run(['diff', '--name-only']), ...run(['diff', '--cached', '--name-only']), ...run(['ls-files', '--others', '--exclude-standard'])]);
}
export function validateDiffScope(changed, allow = [], required = [], ignore = []) {
  const visible = changed.filter(path => !ignore.includes(path));
  return [
    ...(allow.length && visible.some(path => !allow.includes(path)) ? ['unexpected changed file'] : []),
    ...required.filter(path => !visible.includes(path)).map(path => `required changed file absent ${path}`),
  ];
}

export function validateCanonical({ audit, map, frozen, manifest, dependency = '' }, { batch, changedFiles, allow = [], requireChanged = [], ignore = [] } = {}) {
  const errors = [];
  const homes = table(audit, 'B. Primary-Home Registry', ['Capability ID', 'Canonical owner', 'Frozen level', 'Primary Unit', 'Domain candidate'], errors);
  const composition = table(audit, 'C. Unit Composition Registry', ['Unit ID', 'Primary capability IDs', 'Primary count', 'Owner set', 'Singleton / Multi'], errors);
  const single = table(audit, 'D. Singleton Review Registry', ['Unit ID', 'Capability', 'Strongest merge candidate(s)', 'Why merge rejected'], errors);
  const multi = table(audit, 'E. Multi-Capability Grouping Review', ['Unit ID', 'Shared problem / need', 'Shared mechanism / state trace', 'Shared observable evidence', 'Shared failure / debug story', 'Assessment-coherence argument'], errors);
  const registry = table(map, 'Unit Registry', ['Unit ID', 'Working title', 'Domain candidate', 'Primary owner set', 'Primary capability count'], errors);
  const frozenMap = frozenCapabilities(frozen, errors);
  validateDependencyRegistry(dependency, frozenMap, errors);
  const homeMap = new Map();
  for (const row of homes) {
    const [id, owner, level, unit] = row;
    if (homeMap.has(id)) add(errors, `duplicate Primary capability ${id}`);
    homeMap.set(id, { owner, level, unit });
    const source = frozenMap.get(id);
    if (!source) add(errors, `unknown Primary ${id}`);
    else { if (source.owner !== owner) add(errors, `owner mismatch ${id}`); if (source.level !== level) add(errors, `L-level mismatch ${id}`); }
  }
  for (const id of frozenMap.keys()) if (!homeMap.has(id)) add(errors, `missing frozen capability ${id}`);
  const unitIds = unique(homes.map(row => row[3]));
  if (hasDuplicate(registry.map(row => row[0]))) add(errors, 'duplicate Unit Registry row');
  if (!exactSet(unitIds, registry.map(row => row[0]))) add(errors, 'unit registry mismatch');
  const unitMap = unitSections(map, registry, errors);
  for (const id of unitIds) {
    const unit = unitMap.get(id); const homePrimary = homes.filter(row => row[3] === id);
    if (!unit || !exactSet(homePrimary.map(row => row[0]), unit.primary.map(row => row.id))) add(errors, `primary membership mismatch ${id}`);
    for (const entry of unit?.primary ?? []) { const source = homeMap.get(entry.id); if (!source || source.owner !== entry.owner || source.level !== entry.level) add(errors, `primary metadata mismatch ${id}`); }
  }
  if (hasDuplicate(composition.map(row => row[0])) || !exactSet(unitIds, composition.map(row => row[0]))) add(errors, 'composition unit membership mismatch');
  for (const row of composition) {
    const [id, idsText, countText, ownerText, kind] = row; const expected = homes.filter(home => home[3] === id);
    const ids = splitIds(idsText); const owners = splitIds(ownerText);
    if (!exactSet(ids, expected.map(home => home[0])) || Number(countText) !== expected.length || !exactSet(owners, unique(expected.map(home => home[1])))) add(errors, `composition membership mismatch ${id}`);
    if ((expected.length === 1 ? 'Singleton' : 'Multi') !== kind) add(errors, `stale classification ${id}`);
  }
  const singletonIds = composition.filter(row => row[4] === 'Singleton').map(row => row[0]);
  const multiIds = composition.filter(row => row[4] === 'Multi').map(row => row[0]);
  if (hasDuplicate(single.map(row => row[0])) || !exactSet(singletonIds, single.map(row => row[0]))) add(errors, 'singleton review mismatch');
  if (hasDuplicate(multi.map(row => row[0])) || !exactSet(multiIds, multi.map(row => row[0]))) add(errors, 'multi review mismatch');

  const amendmentCaps = (manifest.amendments ?? []).flatMap(amendment => Object.values(amendment.batches ?? {}).flat());
  const amendmentByBatch = new Map(); for (const amendment of manifest.amendments ?? []) for (const [name, ids] of Object.entries(amendment.batches ?? {})) amendmentByBatch.set(name, [...(amendmentByBatch.get(name) ?? []), ...ids]);
  const originalCaps = Object.values(manifest.batches ?? {}).flatMap(value => (Array.isArray(value) ? value : value.originalUnits ?? []).flatMap(unit => unit.primaryCapabilities));
  if (hasDuplicate([...originalCaps, ...amendmentCaps]) || !exactSet([...originalCaps, ...amendmentCaps], [...frozenMap.keys()])) add(errors, 'manifest capability coverage mismatch');
  const rawBatches = manifest.batches ?? {}; const batches = Object.fromEntries(Object.entries(rawBatches).map(([name, value]) => [name, Array.isArray(value) ? { evidenceSchema: name === 'Runtime & Concurrency' ? 'legacy-v1' : 'canonical-v2', originalUnits: value } : value]));
  const statusRows = reviewedBatches(audit);
  if (hasDuplicate(statusRows.map(row => row.name)) || !exactSet(Object.keys(batches), statusRows.map(row => row.name))) add(errors, 'stage-1 batch registry mismatch');
  const status = new Map(statusRows.map(entry => [entry.name, entry.status]));
  if (batch && (!batches[batch] || status.get(batch) !== 'REVIEWED')) add(errors, `batch not reviewed ${batch}`);
  const summaries = [];
  const selected = batch ? [batch] : [...status.entries()].filter(([, value]) => value === 'REVIEWED').map(([name]) => name);
  for (const name of selected) {
    const info = batches[name];
    if (!info) { add(errors, `missing manifest ${name}`); continue; }
    const closure = section(audit, `${name} batch closure`) ?? '';
    if (!/\*\*REVIEWED\.\*\*/.test(closure) || /\*\*IN_REVIEW\.\*\*/.test(closure)) add(errors, `closure status ${name}`);
    const ledger = table(audit, `${name} Decision Ledger`, ['Original unit', 'Primary disposition', 'Final canonical state'], errors);
    const originals = info.originalUnits ?? [];
    if (hasDuplicate(ledger.map(row => row[0])) || !exactSet(originals.map(row => row.id), ledger.map(row => row[0]))) add(errors, `ledger scope ${name}`);
    const baselineOwner = new Map(originals.flatMap(original => original.primaryCapabilities.map(capability => [capability, original.id])));
    for (const row of ledger) {
      const original = originals.find(item => item.id === row[0]); if (!original) continue;
      const targets = unique(original.primaryCapabilities.map(capability => homeMap.get(capability)?.unit).filter(Boolean));
      const absorbed = targets.length === 1 && homes.some(home => home[3] === targets[0] && baselineOwner.has(home[0]) && baselineOwner.get(home[0]) !== original.id);
      const disposition = targets.length > 1 ? 'SPLIT' : targets[0] !== original.id || absorbed ? 'MERGE' : 'KEEP';
      if (row[1] !== disposition) add(errors, `wrong disposition ${original.id}`);
      if (!exactSet(splitIds(row[2]), targets)) add(errors, `ledger target mismatch ${original.id}`);
    }
    const derived = { KEEP: 0, SPLIT: 0, MERGE: 0 };
    for (const row of ledger) if (derived[row[1]] !== undefined) derived[row[1]] += 1;
    const scopedCapabilities = [...originals.flatMap(original => original.primaryCapabilities), ...(amendmentByBatch.get(name) ?? [])];
    const finalUnits = unique(scopedCapabilities.map(capability => homeMap.get(capability)?.unit).filter(Boolean));
    for (const id of finalUnits) { const body = unitMap.get(id)?.body ?? ''; if (placeholders.some(value => body.includes(value))) add(errors, `generic placeholder ${id}`); }
    let proofsPassed = 0; const proofsExpected = finalUnits.filter(id => multiIds.includes(id) && info.evidenceSchema === 'canonical-v2').length;
    for (const id of finalUnits.filter(id => multiIds.includes(id))) {
      const body = unitMap.get(id)?.body ?? ''; const schema = schemas[info.evidenceSchema];
      if (!schema) add(errors, `unknown evidence schema ${name}`);
      else for (const heading of schema) if (!new RegExp(`^### ${escape(heading)}\\s*$`, 'm').test(body)) add(errors, `missing evidence heading ${id}: ${heading}`);
      if (info.evidenceSchema === 'canonical-v2') {
        const proof = proofCapabilities(body, errors, id);
        if (!exactSet(proof, homes.filter(home => home[3] === id).map(home => home[0]))) add(errors, `proof capability mismatch ${id}`);
        else proofsPassed += 1;
      }
    }
    summaries.push({ name, originals: originals.length, derived, proofsPassed, proofsExpected, schema: info.evidenceSchema });
  }
  if (changedFiles) errors.push(...validateDiffScope(changedFiles, allow, requireChanged, ignore));
  return { errors: unique(errors), counts: { capabilities: homes.length, homes: homes.length, units: unitIds.length, singletons: singletonIds.length, multi: multiIds.length }, batches: { reviewed: [...status.values()].filter(value => value === 'REVIEWED').length, pendingOrInReview: [...status.values()].filter(value => value !== 'REVIEWED').length, selected: summaries }, diffScopePassed: Boolean(changedFiles) && !errors.some(error => error.includes('changed file')) };
}

export function validateArchitecture({ root = '.', batch, allow = [], requireChanged = [], ignore = [], changedFiles } = {}) {
  return validateCanonical({
    audit: file(root, 'docs/roadmap/learning-unit-audit.md'),
    map: file(root, 'docs/roadmap/learning-unit-map.md'),
    frozen: file(root, 'docs/roadmap/senior-backend-deep-track.md'),
    manifest: JSON.parse(file(root, 'docs/roadmap/stage-1-review-manifest.json')),
    dependency: file(root, 'docs/roadmap/dependency-map.md'),
  }, { batch, allow, requireChanged, ignore, changedFiles: changedFiles ?? collectChangedFiles(root) });
}

