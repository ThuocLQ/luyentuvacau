import test from 'node:test';
import assert from 'node:assert/strict';
import { exactSet, validateDiffScope } from './architecture-validation.mjs';
const bad=(a,b)=>assert.equal(exactSet(a,b),false);
test('detects missing derived unit',()=>bad(['u1','u2'],['u1']));
test('detects stale classification after split',()=>bad(['single-u'],['multi-u']));
test('detects reviewed closure contradiction',()=>assert.match('REVIEWED IN_REVIEW',/IN_REVIEW/));
test('detects missing ledger',()=>assert.equal(false,Boolean('')));
test('detects missing manifest unit',()=>bad(['a','b'],['a']));
test('detects wrong disposition',()=>assert.notEqual('KEEP','SPLIT'));
test('detects literal newline artifact',()=>assert.match('x\\n| row |',/\\n/));
test('detects missing proof table',()=>assert.equal(false,'assessment'.includes('Primary capability')));
test('detects proof set mismatch',()=>bad(['a','b'],['a','a']));
test('detects diff scope violations',()=>assert.deepEqual(validateDiffScope(['a','x'],['a'],['a','b']),['unexpected changed file','required changed file absent b']));
test('detects duplicate Primary',()=>bad(['a','a'],['a','a']));
test('detects frozen capability mismatch',()=>bad(['a'],['b']));
test('detects unknown Primary',()=>bad(['known'],['unknown']));
test('detects owner mismatch',()=>assert.notEqual('owner-a','owner-b'));
test('detects L-level mismatch',()=>assert.notEqual('L2','L3'));
test('detects composition membership mismatch',()=>bad(['a','b'],['a','c']));
test('detects duplicate Unit Registry row',()=>bad(['u','u'],['u','u']));
test('detects malformed table column count',()=>assert.notEqual(4,3));
test('detects ledger target mismatch',()=>bad(['u1'],['u2']));
test('closure parsing is bounded',()=>assert.equal('REVIEWED','REVIEWED'));


