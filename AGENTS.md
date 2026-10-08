# AGENTS.md — QuanNet Authoring Contract

This repository contains a learner-first engineering learning system.

## Session continuity bootstrap

Before substantial QuanNet work, especially after a new chat/session or agent handoff:

1. Read `docs/project/working-state.md`.
2. Verify the actual Git branch/ref and HEAD before continuing. If they differ from the recorded working state, Git is the factual state; investigate the divergence before editing.
3. Follow the canonical authorities referenced by the working-state file. Do not copy their full rules into the working-state file.
4. Use `docs/project/decision-log.md` for durable project/architecture decisions and rationale. It records history; it does not override current canonical artifacts.
5. Never infer unfinished work from chat history or model memory alone when repository state can resolve it.
6. After a substantial roadmap/curriculum/learning-design task, update `docs/project/working-state.md` to reflect the real final state and exact next task.
7. Add a decision-log entry only when a decision is durable enough that a future session could otherwise repeat or reverse the debate.
8. Keep continuity files compact. They are navigation and handoff surfaces, not duplicate specifications.

For conflicts, use this precedence:

`actual Git state + canonical authority artifacts → durable decision log → working-state cursor → chat/model memory`.

Before changing any Learning Lab, lesson narrative, learning visual, quiz tied to a lesson, or research/source-map file:

1. Read `docs/engineering-learning-standard.md`.
2. Before broadly reopening a mature lesson, read `docs/authoring/lesson-compliance-status.md`; require real learner evidence, a factual issue, or a concrete UI bug.
3. Do not mark a lesson as Human validated unless a real learner has completed a study session on that exact learner-facing version and produced learner evidence.
4. Treat the canonical standard as the learning-design source of truth.
5. Preserve the declared learner prerequisite boundary.
6. Do not silently introduce unexplained concepts.
7. Treat vocabulary friction as a learner blocker. For a new term: explain it inline if one sentence is enough; use inline explanation + glossary support if it recurs; if it requires its own mechanism, teach that mini-concept before continuing. Never make the glossary a prerequisite for understanding the current paragraph.
8. Use **Concept Origin Before Definition**:
   `problem → simple approach → limitation → need → intuition → concept name → mechanism → evidence`.
9. Keep core lessons self-contained. External sources are reinforcement only.
10. For major new/reworked lessons, research before authoring and create/update an author-facing source map using `docs/research/source-map-template.md`.
11. Use official/current primary sources for factual correctness and strong teaching sources for pedagogy. Record version boundaries when behavior is version-sensitive.
12. Never copy transcripts, source prose, diagrams, screenshots or near-identical animations.
13. Prefer mechanism-specific learning components under `src/components/learning/`. Do not build a generic visual engine without repeated proven need.
14. Visuals must answer a learning question and map simplified state to real observable evidence.
15. Labs must follow `Question → Predict → Run → Inspect → Interpret → Why → Learn`.
16. Do not force one exact runtime/database outcome when multiple valid outcomes are possible.
17. Keep learner-facing content natural Vietnamese UTF-8. Preserve common industry technical terms when they help with docs, logs or interviews.
18. Keep code/commands Windows-friendly when reasonable.
19. Keep UI compact and readable. Geometry represents data; prose explains data.
20. Do not modify unrelated lessons or expand curriculum scope unless the task explicitly asks for it.
21. Do not continue polishing a frozen lesson without new learner evidence or a concrete correctness/UI bug.

Before reporting completion for learner-facing changes, run the relevant repository validation commands, normally:

```bash
npm run validate:content
npm run validate:css
npm run lint
npm run test
npm run build
npm run check
```

Do not claim a command passed unless it actually ran successfully.

Before roadmap/curriculum architecture tasks that create, review, split, merge, reassign, project, freeze, or otherwise mutate architecture artifacts, read:

`docs/roadmap/architecture-execution-protocol.md`

For curriculum decomposition, Learning Unit grouping, Learning Unit prerequisite mapping, or capability → Learning Unit work, also read:

`docs/roadmap/lesson-decomposition-contract.md`

`lesson-decomposition-contract.md` defines semantic correctness for Learning Unit decomposition. `architecture-execution-protocol.md` defines execution, propagation, consistency, validation, and completion semantics.

For lesson authoring/review, use:

`docs/authoring/golden-lesson-checklist.md`

For research traceability, use:

`docs/research/source-map-template.md`

For architecture mutation tasks, run `npm run validate:architecture`; a failed gate blocks REVIEWED and commit. Use batch diff-scope flags before closure; prose does not waive a failed gate.

## ChatGPT ↔ Codex Decision Sync

Chat history is not the project source of truth. When a user-approved decision is supplied through a ChatGPT Session Sync task: verify Git/working-state; distinguish decisions from proposals; compare existing decisions; record durable decisions; update only explicitly authorized artifacts; update true progress and one next task; validate, commit and push. Do not store raw conversations, promote proposals silently, overwrite history without review, or claim false PASSED/REVIEWED/SEALED status. Future sessions reconstruct context from Git and canonical artifacts.