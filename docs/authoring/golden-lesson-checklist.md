# QuanNet Golden Lesson Authoring & Freeze Checklist

Use this checklist for a major new lesson or a substantial rewrite.

## A. Preflight

- [ ] Read `docs/engineering-learning-standard.md`.
- [ ] Declare learner prerequisites.
- [ ] Define one primary learning outcome.
- [ ] Define what is explicitly out of scope.
- [ ] Identify the real engineering question/problem.
- [ ] Identify the naive/simple approach and where it breaks.
- [ ] Build a concept dependency map.
- [ ] Check that motivation dependencies come before terminology.

## B. Research

- [ ] Create/update `docs/research/<lesson>-source-map.md`.
- [ ] Use at least one primary/official source for important factual claims.
- [ ] Use at least one strong teaching-oriented source when pedagogy benefits.
- [ ] Use video only when visual/temporal explanation materially helps.
- [ ] Record relevant product/runtime/version boundaries.
- [ ] Cross-check teaching simplifications against primary sources.
- [ ] Extract teaching insights, not prose/diagrams.
- [ ] Stop research once the mechanism, misconceptions, lab and production boundary are sufficiently grounded.

## C. Narrative

- [ ] Start from a question/problem, not vocabulary.
- [ ] Show the simplest approach.
- [ ] Show where it stops being sufficient.
- [ ] Create the need for the new property.
- [ ] Introduce intuition before the technical term.
- [ ] Name the concept only when the learner has a mental slot for it.
- [ ] Introduce one major idea at a time.
- [ ] Distinguish broad abstractions from specific implementations.
- [ ] Use tiny inspectable examples before generalization.
- [ ] Move production complexity after the foundational mechanism.

## D. Terminology & vocabulary friction

- [ ] No cold acronyms.
- [ ] No undefined metrics.
- [ ] No hidden prerequisite terms.
- [ ] I can read the section without Googling a word merely to understand the next sentence.
- [ ] A simple new term is explained inline at first meaningful use.
- [ ] A recurring engineering term has glossary support when that adds value.
- [ ] The lesson still makes sense without opening the glossary popup.
- [ ] A mechanism-heavy term is taught as a mini-concept instead of being hidden in a tooltip.
- [ ] Neighboring concepts are compared only around a real decision.
- [ ] Low-value jargon is removed rather than merely defined.
- [ ] Technical terms used in industry are preserved where useful.
- [ ] English terminology is paired with concise Vietnamese meaning/examples when needed, rather than awkwardly translated away.

## E. Visuals

- [ ] Every visual answers one main question.
- [ ] Learner predicts before reveal when useful.
- [ ] State/transitions are visible.
- [ ] Progressive disclosure is used for multi-step mechanisms.
- [ ] Visual maps to real evidence.
- [ ] Simplified models are labeled as simplified.
- [ ] Geometry represents data; prose stays outside geometry.
- [ ] No meaning depends only on color/animation.
- [ ] Mobile/touch/keyboard/reduced-motion remain usable.
- [ ] No unnecessary generic visualization framework was introduced.

## F. Hands-on lab

- [ ] Every experiment has Question.
- [ ] Prediction is requested before running.
- [ ] Commands/code are runnable.
- [ ] Inspect fields are explicit.
- [ ] Learner knows why each field matters.
- [ ] Observation precedes conclusion.
- [ ] Experiment isolates its main learning question.
- [ ] Multiple valid outcomes are acknowledged where appropriate.
- [ ] Toy mechanism is connected to real evidence.
- [ ] At least one meaningful failure/broken assumption is explored when relevant.
- [ ] Debugging uses Observation → Hypothesis → Evidence → Experiment → Conclusion.

## G. Production reasoning

- [ ] Production story appears after mechanism.
- [ ] Symptom is separated from conclusion.
- [ ] Known facts and unknowns are explicit.
- [ ] Competing hypotheses exist when realistic.
- [ ] Evidence can distinguish hypotheses.
- [ ] Correctness/performance boundary is clear.
- [ ] Trade-offs and costs are explicit.
- [ ] Version/workload assumptions are stated where needed.

## H. Transfer & communication

- [ ] Transfer changes a meaningful condition.
- [ ] Learner reasons before seeing model direction.
- [ ] Explain-it-back asks for mechanism, not definition.
- [ ] Vietnamese explanation comes before optional technical English.
- [ ] Final recall covers mechanism/evidence/failure/boundary/trade-off.

## I. UI/readability

- [ ] No long vertical labels.
- [ ] No prose inside percentage-width bars.
- [ ] No text clipping/overlap.
- [ ] No accidental horizontal page scroll.
- [ ] Typography is readable and compact.
- [ ] Semantic blocks help scanning rather than dominate the page.
- [ ] Desktop and mobile are manually checked for learner-facing changes.

## J. Validation

- [ ] `npm run validate:content`
- [ ] `npm run validate:css`
- [ ] `npm run lint`
- [ ] `npm run test`
- [ ] `npm run build`
- [ ] `npm run check`
- [ ] Browser verification performed.
- [ ] No claim of success without actual command/browser evidence.

## K. Freeze

A lesson may be technically frozen when:

- [ ] concept origin is understandable;
- [ ] mechanism is traceable;
- [ ] evidence matches the mental model;
- [ ] lab works;
- [ ] failure/debug reasoning exists where relevant;
- [ ] boundary/trade-off is clear;
- [ ] transfer is meaningful;
- [ ] no major unexplained terms remain;
- [ ] no ordinary vocabulary forces a web search just to continue reading;
- [ ] UI is readable.

Technical freeze is not the final pedagogy proof.

## L. Human study gate

After freeze:

- [ ] learner studies the lesson from the beginning;
- [ ] records where understanding breaks;
- [ ] records unexplained/premature terms and vocabulary that caused a search detour;
- [ ] records visuals that do not help;
- [ ] records confusing lab outcomes;
- [ ] records sections that feel too compressed or too verbose.

Only this learner evidence, or a concrete correctness/UI bug, should reopen a frozen lesson.
