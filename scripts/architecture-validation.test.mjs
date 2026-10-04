import fs from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';
import { validateCanonical, collectChangedFiles } from './architecture-validation.mjs';
import os from 'node:os';
import { execFileSync } from 'node:child_process';

const read = path => fs.readFileSync(path, 'utf8');
const base = () => ({
  audit: read('docs/roadmap/learning-unit-audit.md'),
  map: read('docs/roadmap/learning-unit-map.md'),
  frozen: read('docs/roadmap/senior-backend-deep-track.md'),
  manifest: JSON.parse(read('docs/roadmap/stage-1-review-manifest.json')),
  dependency: read('docs/roadmap/dependency-map.md'),
});
const run = (change = state => state, options = {}) => validateCanonical((typeof change === 'function' ? change : state => state)(base()), options);
const has = (change, fragment, options) => assert.ok(run(change, options).errors.some(error => error.includes(fragment)), `${fragment}: ${run(change, options).errors.join('; ')}`);
const replace = (key, from, to) => state => ({ ...state, [key]: state[key].replace(from, to) });
const line = (text, needle) => text.split(/\r?\n/).find(value => value.includes(needle));

test('1 happy fixture calls the production validator', () => assert.deepEqual(run().errors, []));
test('2 missing derived Unit Registry unit', () => has(state => ({ ...state, map: state.map.replace(line(state.map, '| lu-race-atomicity |'), '') }), 'unit registry mismatch'));
test('3 stale singleton/multi classification', () => has(replace('audit', '| lu-prog-collections-complexity | prog-collections-complexity | 1 | Programming & Software Design Foundations | Singleton |', '| lu-prog-collections-complexity | prog-collections-complexity | 1 | Programming & Software Design Foundations | Multi |'), 'stale classification'));
test('4 reviewed closure cannot say IN_REVIEW', () => has(replace('audit', '## Runtime & Concurrency Decision Ledger', '**IN_REVIEW.**\n\n## Runtime & Concurrency Decision Ledger'), 'closure status Runtime & Concurrency'));
test('5 later IN_REVIEW batch does not poison Runtime closure', () => assert.equal(run({}, { batch: 'Runtime & Concurrency' }).errors.some(error => error.includes('closure status Runtime')), false));
test('6 missing Decision Ledger', () => has(replace('audit', '## Runtime & Concurrency Decision Ledger', '## Runtime & Concurrency Missing Ledger'), 'missing section Runtime & Concurrency Decision Ledger'));
test('7 missing manifest unit in ledger', () => has(state => { state.manifest.batches['Runtime & Concurrency'].originalUnits.pop(); return state; }, 'ledger scope Runtime & Concurrency'));
test('8 wrong KEEP SPLIT MERGE disposition', () => has(replace('audit', '| lu-race-atomicity | KEEP |', '| lu-race-atomicity | SPLIT |'), 'wrong disposition lu-race-atomicity'));
test('9 ledger target mismatch', () => has(replace('audit', '| lu-race-atomicity | KEEP | lu-race-atomicity |', '| lu-race-atomicity | KEEP | lu-runtime-diagnostics |'), 'ledger target mismatch lu-race-atomicity'));
test('10 literal newline table serialization', () => has(replace('map', '| Capability ID | Canonical owner | Frozen target level |', '\\n| Capability ID | Canonical owner | Frozen target level |'), 'literal newline artifact'));
test('11 missing canonical proof table', () => has(replace('map', '| Primary capability | What evidence in this same task proves it |', '| Missing proof |'), 'missing proof table'));
test('12 proof capability mismatch duplicate extra', () => has(state => ({ ...state, map: state.map.replace('| net-tcp-connection-semantics | Connect latency, reset/refused error and socket state establish peer lifecycle. |', '| net-connection-reuse-pooling | duplicate |') }), 'proof capability mismatch'));
test('13 duplicate Primary', () => has(state => ({ ...state, audit: state.audit.replace(line(state.audit, '| concurrency-interleavings-invariants |'), `${line(state.audit, '| concurrency-interleavings-invariants |')}\n${line(state.audit, '| concurrency-interleavings-invariants |')}`) }), 'duplicate Primary capability'));
test('14 missing frozen capability', () => has(state => ({ ...state, audit: state.audit.replace(line(state.audit, '| concurrency-interleavings-invariants |'), '') }), 'missing frozen capability concurrency-interleavings-invariants'));
test('15 unknown Primary', () => has(replace('audit', '| concurrency-interleavings-invariants |', '| unknown-capability |'), 'unknown Primary unknown-capability'));
test('16 owner fidelity', () => has(replace('audit', '| Programming & Software Design Foundations |', '| Wrong owner |'), 'owner mismatch'));
test('17 L-level fidelity', () => has(replace('audit', '| L3 | lu-race-atomicity |', '| L1 | lu-race-atomicity |'), 'L-level mismatch'));
test('18 composition membership exactness', () => has(replace('audit', '| lu-race-atomicity | concurrency-interleavings-invariants; concurrency-races-check-then-act; concurrency-synchronization-atomicity |', '| lu-race-atomicity | concurrency-interleavings-invariants |'), 'composition membership mismatch lu-race-atomicity'));
test('19 duplicate Unit Registry row', () => has(state => ({ ...state, map: state.map.replace(line(state.map, '| lu-race-atomicity |'), `${line(state.map, '| lu-race-atomicity |')}\n${line(state.map, '| lu-race-atomicity |')}`) }), 'duplicate Unit Registry row'));
test('20 malformed physical table columns', () => has(replace('audit', '| lu-race-atomicity | concurrency-interleavings-invariants;', '| lu-race-atomicity concurrency-interleavings-invariants;'), 'malformed table column count'));
test('21 generic placeholder rejected', () => has(replace('map', 'Partner lowers idle timeout; traffic spike produces resets and pool queues. Decide TCP versus pool cause before changing retries.', 'TODO'), 'generic placeholder lu-net-connection-reuse-pooling'));
test('22 legacy-v1 Runtime evidence remains compatible', () => assert.equal(run({}, { batch: 'Runtime & Concurrency' }).errors.length, 0));
test('23 batch mode rejects non-reviewed batch', () => has(state => state, 'batch not reviewed Distributed Systems', { batch: 'Distributed Systems' }));
test('24 diff scope rejects unexpected and missing required files', () => has(state => state, 'unexpected changed file', { changedFiles: ['docs/a.md'], allow: ['docs/b.md'], requireChanged: ['docs/b.md'] }));
test('25 explicit ignore supports pre-existing user-owned file', () => assert.deepEqual(run(state => state, { changedFiles: ['Anhanhemem.txt', 'scripts/architecture-validation.mjs'], allow: ['scripts/architecture-validation.mjs'], requireChanged: ['scripts/architecture-validation.mjs'], ignore: ['Anhanhemem.txt'] }).errors, []));

test('26 malformed Multi Review columns are rejected by production validator', () => has(replace('audit', '| Unit ID | Shared problem / need | Shared mechanism / state trace | Shared observable evidence | Shared failure / debug story | Assessment-coherence argument |', '| Unit ID | Shared problem / need | Shared mechanism / state trace |'), 'malformed table header E. Multi-Capability Grouping Review'));
test('27 missing Markdown separator is rejected by production validator', () => has(replace('audit', '|---|---|---|---|---|', '| bogus |'), 'malformed table separator B. Primary-Home Registry'));
test('28 historical canonical-v2 placeholder is rejected by production validator', () => has(replace('map', 'Partner lowers idle timeout; traffic spike produces resets and pool queues. Decide TCP versus pool cause before changing retries.', 'One canonical scenario defined in map.'), 'generic placeholder lu-net-connection-reuse-pooling'));

test('29 generic placeholder in a REVIEWED singleton is rejected', () => has(replace('map', 'Separate runnable from blocked work, inspect scheduler/runtime queues and capacity, then explain how priority, pool exhaustion or unfair admission prevents execution.', 'One canonical scenario defined in map.'), 'generic placeholder lu-os-scheduling-starvation'));
test('30 proof table outside Shared assessment task is rejected', () => has(state => ({ ...state, map: state.map.replace('### Shared assessment task\n\nGiven connect/reset, socket state, pooled age/lifetime, active/queued count and port usage, decide TCP versus pool cause and set safe lifetime/limit.\n\n| Primary capability | What evidence in this same task proves it |', '### Shared assessment task\n\nGiven connect/reset, socket state, pooled age/lifetime, active/queued count and port usage, decide TCP versus pool cause and set safe lifetime/limit.\n\n| Moved proof | Evidence |').replace('### Transfer variation\n\nMany app replicas', '### Transfer variation\n\n| Primary capability | What evidence in this same task proves it |\n|---|---|\n| net-tcp-connection-semantics | evidence |\n| net-connection-reuse-pooling | evidence |\n\nMany app replicas') }), 'missing proof table lu-net-connection-reuse-pooling'));
test('31 status-looking bullet outside Stage-1 section cannot override status', () => assert.equal(run(state => ({ ...state, audit: `${state.audit}\n- Distributed Systems — REVIEWED\n` }), { batch: 'Distributed Systems' }).errors.some(error => error.includes('batch not reviewed Distributed Systems')), true));
test('32 reordered canonical headers are rejected', () => has(replace('audit', '| Capability ID | Canonical owner | Frozen level | Primary Unit | Domain candidate |', '| Canonical owner | Capability ID | Frozen level | Primary Unit | Domain candidate |'), 'malformed table header B. Primary-Home Registry'));

test('33 missing manifest batch status is rejected', () => has(state => ({ ...state, audit: state.audit.replace(/- Production Engineering — PENDING\r?\n/, '') }), 'stage-1 batch registry mismatch'));
test('34 duplicate batch status is rejected', () => has(replace('audit', '- Production Engineering — PENDING', '- Production Engineering — PENDING\n- Production Engineering — PENDING'), 'stage-1 batch registry mismatch'));

test('35 frozen amendment capability missing from manifest scope is rejected', () => has(state => { state.manifest.amendments = []; return state; }, 'manifest capability coverage mismatch'));
test('36 declared amendment capability missing from Primary homes is rejected', () => has(state => ({ ...state, audit: state.audit.replace(line(state.audit, '| net-service-discovery-load-balancing |'), '') }), 'missing frozen capability net-service-discovery-load-balancing'));
test('37 amended singleton placeholder is rejected in reviewed Service batch', () => has(replace('map', 'Reason from a logical service name to a selected healthy backend as endpoints and load change.', 'One canonical scenario defined in map.'), 'generic placeholder lu-net-service-discovery-load-balancing'));
test('38 duplicate amendment declaration is rejected', () => has(state => { state.manifest.amendments[0].batches['Service & Network'].push('net-service-discovery-load-balancing'); return state; }, 'manifest capability coverage mismatch'));
test('39 collectChangedFiles reads unstaged, staged and untracked paths from a real git repository', () => { const root=fs.mkdtempSync(`${os.tmpdir()}/quannet-git-`); const run=args=>execFileSync('git',args,{cwd:root,stdio:'ignore'}); run(['init']); run(['config','user.email','test@example.test']); run(['config','user.name','test']); fs.writeFileSync(`${root}/tracked.txt`,'a'); run(['add','tracked.txt']); run(['commit','-m','base']); fs.writeFileSync(`${root}/tracked.txt`,'b'); fs.writeFileSync(`${root}/staged.txt`,'s'); run(['add','staged.txt']); fs.writeFileSync(`${root}/untracked.txt`,'u'); const changed=collectChangedFiles(root); assert.ok(changed.includes('tracked.txt')&&changed.includes('staged.txt')&&changed.includes('untracked.txt')); fs.rmSync(root,{recursive:true,force:true}); });


test('40 dependency row outside canonical registry is rejected', () => has(state => {
  const row = '| net-request-path-dns | net-service-discovery-load-balancing | REQUIRED | Discovery begins from a logical service name and resolver result. | logical name resolution versus endpoint discovery | Networking owns routing mechanism |';
  state.dependency = state.dependency.replace(row + '\n', '') + '\n' + row + '\n';
  return state;
}, 'dependency rows outside canonical registry'));
test('41 stale declared dependency count is rejected', () => has(replace('dependency', '- Dependency rows: 332', '- Dependency rows: 331'), 'dependency declared row count mismatch'));
test('42 incorrect dependency fingerprint is rejected', () => has(replace('dependency', 'SHA-256: 22ff3ea4c04a4630f00f2253bd0e16d0fb1ad9736026faf95d7c86280e8b77bd', 'SHA-256: 02ff3ea4c04a4630f00f2253bd0e16d0fb1ad9736026faf95d7c86280e8b77bd'), 'dependency fingerprint mismatch'));
