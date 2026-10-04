import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const file = (root, path) => fs.readFileSync(`${root}/${path}`, 'utf8');
const unique = values => [...new Set(values)];
export const exactSet = (a, b) => a.length === new Set(a).size && b.length === new Set(b).size && a.length === b.length && a.every(value => b.includes(value));
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
  if (columns && !exactSet(header, columns)) add(errors, `malformed table header ${heading}`);
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
    const id = row[0]; const body = section(map, id);
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
const placeholders = ['One bounded trace observes all Primary mechanisms.', 'TODO', 'TBD', 'unchanged composition'];

function proofCapabilities(body, errors, unit) {
  const marker = '| Primary capability | What evidence in this same task proves it |';
  const at = body.indexOf(marker);
  if (at < 0) { add(errors, `missing proof table ${unit}`); return []; }
  const lines = body.slice(at).split(/\r?\n/); const output = [];
  for (let i = 2; i < lines.length && lines[i].startsWith('|'); i += 1) {
    const row = cells(lines[i]);
    if (!linePhysical(lines[i], 2) || row.length !== 2) add(errors, `malformed proof table ${unit}`);
    else output.push(row[0]);
  }
  return output;
}

function reviewedBatches(audit) {
  return [...audit.matchAll(/^- (.+?) — (PENDING|IN_REVIEW|REVIEWED)$/gm)].map(([, name, status]) => ({ name, status }));
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

export function validateCanonical({ audit, map, frozen, manifest }, { batch, changedFiles, allow = [], requireChanged = [], ignore = [] } = {}) {
  const errors = [];
  const homes = table(audit, 'B. Primary-Home Registry', ['Capability ID', 'Canonical owner', 'Frozen level', 'Primary Unit', 'Domain candidate'], errors);
  const composition = table(audit, 'C. Unit Composition Registry', ['Unit ID', 'Primary capability IDs', 'Primary count', 'Owner set', 'Singleton / Multi'], errors);
  const single = table(audit, 'D. Singleton Review Registry', ['Unit ID', 'Capability', 'Strongest merge candidate(s)', 'Why merge rejected'], errors);
  const multi = table(audit, 'E. Multi-Capability Grouping Review', null, errors);
  const registry = table(map, 'Unit Registry', ['Unit ID', 'Working title', 'Domain candidate', 'Primary owner set', 'Primary capability count'], errors);
  const frozenMap = frozenCapabilities(frozen, errors);
  const homeMap = new Map();
  for (const row of homes) {
    const [id, owner, level, unit] = row;
    if (homeMap.has(id)) add(errors, `duplicate Primary capability ${id}`);
    homeMap.set(id, { owner, level, unit });
    const source = frozenMap.get(id);
    if (!source) { add(errors, `unknown Primary ${id}`); add(errors, `missing frozen capability ${id}`); }
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

  const rawBatches = manifest.batches ?? {}; const batches = Object.fromEntries(Object.entries(rawBatches).map(([name, value]) => [name, Array.isArray(value) ? { evidenceSchema: name === 'Runtime & Concurrency' ? 'legacy-v1' : 'canonical-v2', originalUnits: value } : value]));
  const status = new Map(reviewedBatches(audit).map(entry => [entry.name, entry.status]));
  if (batch && (!batches[batch] || status.get(batch) !== 'REVIEWED')) add(errors, `batch not reviewed ${batch}`);
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
    const finalUnits = unique(originals.flatMap(original => original.primaryCapabilities.map(capability => homeMap.get(capability)?.unit).filter(Boolean)));
    for (const id of finalUnits.filter(id => multiIds.includes(id))) {
      const body = unitMap.get(id)?.body ?? ''; const schema = schemas[info.evidenceSchema];
      if (!schema) add(errors, `unknown evidence schema ${name}`);
      else for (const heading of schema) if (!new RegExp(`^### ${escape(heading)}\\s*$`, 'm').test(body)) add(errors, `missing evidence heading ${id}: ${heading}`);
      if (info.evidenceSchema === 'canonical-v2') {
        const proof = proofCapabilities(body, errors, id);
        if (!exactSet(proof, homes.filter(home => home[3] === id).map(home => home[0]))) add(errors, `proof capability mismatch ${id}`);
      }
      if (placeholders.some(value => body.includes(value))) add(errors, `generic placeholder ${id}`);
    }
  }
  if (changedFiles) errors.push(...validateDiffScope(changedFiles, allow, requireChanged, ignore));
  return { errors: unique(errors), counts: { capabilities: homes.length, units: unitIds.length, singletons: singletonIds.length, multi: multiIds.length } };
}

export function validateArchitecture({ root = '.', batch, allow = [], requireChanged = [], ignore = [], changedFiles } = {}) {
  return validateCanonical({
    audit: file(root, 'docs/roadmap/learning-unit-audit.md'),
    map: file(root, 'docs/roadmap/learning-unit-map.md'),
    frozen: file(root, 'docs/roadmap/senior-backend-deep-track.md'),
    manifest: JSON.parse(file(root, 'docs/roadmap/stage-1-review-manifest.json')),
  }, { batch, allow, requireChanged, ignore, changedFiles: changedFiles ?? collectChangedFiles(root) });
}

