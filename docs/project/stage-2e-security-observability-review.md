# Stage 2E Security + Observability Dependency Semantic Review — Working Evidence

NON-CANONICAL WORKING REVIEW — NOT ACCEPTED. The current relation evidence is structurally complete but uses generic templates and must be repaired relation-by-relation before Security or Observability can be marked reviewed. Candidate edges do not create learner locks. Reliability / SRE is explicitly out of scope.

## Security relation-specific evidence — authoritative repair

| Kind | Relation | Decision | Concrete target-native evidence | Ownership boundary |
|---|---|---|---|---|
| REQUIRED | sec-trust-boundary-threat-model -> sec-auth-session-token | LOCAL | Login form crosses browser-to-API boundary; label actor, credential and token before validating issuer/audience. Evidence: reject a token from the wrong issuer.|The auth unit owns token validation and session lifetime; it does not award source threat-model transfer evidence. |
| REQUIRED | sec-auth-session-token -> sec-authorization-object-tenant | EXTERNAL ACCEPTABLE | Prior assessment: map a verified token claim to an authenticated subject and reject forged/untrusted claims. Target then checks that subject against Order tenant ownership; a local definition cannot prove claim-trust reasoning.|Singleton source is a fair candidate proxy; still no automatic lock. |
| REQUIRED | api-contract-resource-semantics -> sec-authorization-object-tenant | LOCAL | GET /tenants/A/orders/7 identifies requested action and resource; target checks server-side tenant ownership before returning it. Evidence: deny cross-tenant request.|Does not assess the full API contract unit; only action/resource identification is recapped locally. |
| REQUIRED | sec-trust-boundary-threat-model -> sec-injection-ssrf-input-output | LOCAL | An image URL from a customer is passed to a fetcher; mark browser input and internal metadata endpoint as distinct boundaries. Evidence: block internal destination.|Target owns sink/destination control; no general threat-model assessment. |
| REQUIRED | sec-trust-boundary-threat-model -> sec-browser-boundaries-cors-csrf-xss | LOCAL | A malicious origin submits a cookie-bearing transfer request; identify origin, ambient cookie and protected action. Evidence: request fails CSRF/origin check.|Target owns browser defense choice, not complete threat-model transfer. |
| REQUIRED | net-http-semantics -> sec-browser-boundaries-cors-csrf-xss | LOCAL | Inspect Origin, Cookie and preflight headers on one transfer request. Evidence: explain which header is usable for the chosen browser defense.|No streaming, connection or HTTP lifetime assessment is claimed. |
| REQUIRED | sec-trust-boundary-threat-model -> sec-secrets-third-party-trust | LOCAL | A CI secret can call a payment API; identify asset, recipient and external boundary. Evidence: choose least scope and rotation event.|Target owns secret lifecycle and third-party trust, not full threat-model work. |
| REQUIRED | sec-trust-boundary-threat-model -> sec-abuse-bruteforce-resource-business-flow | LOCAL | Password-reset endpoint exposes account and email resources; identify attacker, protected resource and abuse path. Evidence: select identity/resource countermeasure.|Target owns abuse controls; source transfer assessment is not claimed. |
| REQUIRED | concurrency-races-check-then-act -> sec-race-business-logic-abuse | LOCAL | Two redeem requests both observe one coupon remaining. Evidence: demonstrate one atomic redemption or invariant-preserving rejection.|Target owns adversarial business abuse; no general concurrency assessment. |
| REQUIRED | sec-trust-boundary-threat-model -> sec-audit-detection-evidence | LOCAL | Admin changes a payout account; record actor, action, target and boundary. Evidence: reconstruct the event from audit fields.|Target owns audit completeness/detection, not full threat modelling. |
| REQUIRED | sec-authorization-object-tenant -> sec-unseen-attack-transfer | EXTERNAL ACCEPTABLE | Prior assessment: use trusted ownership state to reject an object-level authorization bypass. Target must apply that proven control while analysing an unfamiliar attack.|Singleton source is a fair candidate proxy; candidate only. |
| REQUIRED | sec-injection-ssrf-input-output -> sec-unseen-attack-transfer | EXTERNAL ACCEPTABLE | Prior assessment: demonstrate untrusted input stays data at a privileged sink/destination. Target needs that distinction when the unfamiliar case reaches a new sink.|Singleton proxy is fair; no automatic progression gate. |
| REQUIRED | sec-abuse-bruteforce-resource-business-flow -> sec-unseen-attack-transfer | EXTERNAL ACCEPTABLE | Prior assessment: choose identity/resource/business-flow limits for a concrete abuse path. Target reuses the reasoning in an unfamiliar attack chain.|Singleton proxy is fair; candidate only. |
| REQUIRED | sec-race-business-logic-abuse -> sec-unseen-attack-transfer | EXTERNAL ACCEPTABLE | Prior assessment: exploit and then protect a non-atomic business transition. Target must distinguish race abuse from input or authorization flaws.|Singleton proxy is fair; candidate only. |
| REQUIRED | sec-audit-detection-evidence -> sec-unseen-attack-transfer | EXTERNAL ACCEPTABLE | Prior assessment: use an audit timeline to confirm or refute a suspected security action. Target needs evidence-led triage, not just mitigation naming.|Singleton proxy is fair; candidate only. |
| REQUIRED | sec-trust-boundary-threat-model -> sec-cryptography-credentials-tokens | LOCAL | For a bearer token, state issuer, audience and boundary before selecting signature verification. Evidence: reject a token for another audience.|Target owns crypto primitive choice and credential proof. |
| REQUIRED | sec-cryptography-credentials-tokens -> sec-data-encryption-key-lifecycle | LOCAL | Compare password hash, token signature and database encryption for customer PII. Evidence: choose encryption and a key rotation action.|Target owns key lifecycle; source primitive-transfer assessment is not claimed. |
| REQUIRED | sec-secrets-third-party-trust -> sec-data-encryption-key-lifecycle | LOCAL | A service rotates a database key without exposing it to all workloads. Evidence: identify scope, audit and rotation owner.|Target owns encryption/key lifecycle, not third-party trust assessment. |
| RECOMMENDED | net-request-path-dns -> sec-injection-ssrf-input-output | SURFACE | At the SSRF URL-validation step, optionally show hostname resolution can turn a harmless-looking name into an internal address; never gate the exercise. |
| RECOMMENDED | api-circuit-bulkhead-rate-limit -> sec-abuse-bruteforce-resource-business-flow | SURFACE | After identifying credential stuffing, compare per-identity rate limiting with a bulkhead; abuse policy remains the assessed mechanism. |
| RECOMMENDED | obs-logs-structured-correlation -> sec-audit-detection-evidence | SURFACE | When reconstructing payout changes, optionally compare correlation ID with immutable actor/action audit fields; audit evidence remains target-owned. |
| RECOMMENDED | sec-secrets-third-party-trust -> sec-unseen-attack-transfer | OMIT | Secret delegation is a separate mechanism; adding it to the unfamiliar-attack assessment would hide the five substantive required sources. |
| RECOMMENDED | sec-browser-boundaries-cors-csrf-xss -> sec-unseen-attack-transfer | OMIT | Browser ambient-credential defense is a separate attack surface; omit rather than turn the transfer task into a browser survey. |
| RECOMMENDED | sec-auth-session-token -> sec-cryptography-credentials-tokens | SURFACE | During token signature verification, optionally contrast claims/lifetime with primitive choice; no prior pass required. |
| RECOMMENDED | delivery-cloud-responsibility-managed-services -> sec-data-encryption-key-lifecycle | SURFACE | At key ownership design, optionally distinguish provider-managed storage from application-managed rotation; the target still assesses lifecycle evidence. |

## Superseded draft evidence

The former generic combined tables were removed because they conflicted with the authoritative Security evidence above. Observability requires its own relation-specific repair before acceptance.

## Over-gating and fairness

- Security: 18 REQUIRED reviewed; 7 RECOMMENDED reviewed; `sec-unseen-attack-transfer` has five substantive candidate inputs and must keep all PASSED proxies candidate-only.
- Observability: 9 REQUIRED reviewed; 10 RECOMMENDED reviewed; diagnostic synthesis uses candidate evidence only for signals/latency and must not lock exploratory reading.
- Local rows explicitly teach only the frozen assumed slice in the target trace; no source coverage is claimed.
- No RECOMMENDED relation is an unlock gate.
- Reliability / SRE: unreviewed.
