# AGENTS.md — QuanNet Authoring Contract

This repository contains a learner-first engineering learning system.

Before changing any Learning Lab, lesson narrative, learning visual, quiz tied to a lesson, or research/source-map file:

1. Read `docs/engineering-learning-standard.md`.
2. Treat that file as the canonical learning-design source of truth.
3. Preserve the declared learner prerequisite boundary.
4. Do not silently introduce unexplained concepts.
5. Treat vocabulary friction as a learner blocker. For a new term: explain it inline if one sentence is enough; use inline explanation + glossary support if it recurs; if it requires its own mechanism, teach that mini-concept before continuing. Never make the glossary a prerequisite for understanding the current paragraph.
6. Use **Concept Origin Before Definition**:
   `problem → simple approach → limitation → need → intuition → concept name → mechanism → evidence`.
7. Keep core lessons self-contained. External sources are reinforcement only.
8. For major new/reworked lessons, research before authoring and create/update an author-facing source map using `docs/research/source-map-template.md`.
9. Use official/current primary sources for factual correctness and strong teaching sources for pedagogy. Record version boundaries when behavior is version-sensitive.
10. Never copy transcripts, source prose, diagrams, screenshots or near-identical animations.
11. Prefer mechanism-specific learning components under `src/components/learning/`. Do not build a generic visual engine without repeated proven need.
12. Visuals must answer a learning question and map simplified state to real observable evidence.
13. Labs must follow `Question → Predict → Run → Inspect → Interpret → Why → Learn`.
14. Do not force one exact runtime/database outcome when multiple valid outcomes are possible.
15. Keep learner-facing content natural Vietnamese UTF-8. Preserve common industry technical terms when they help with docs, logs or interviews.
16. Keep code/commands Windows-friendly when reasonable.
17. Keep UI compact and readable. Geometry represents data; prose explains data.
18. Do not modify unrelated lessons or expand curriculum scope unless the task explicitly asks for it.
19. Do not continue polishing a frozen lesson without new learner evidence or a concrete correctness/UI bug.

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

For lesson authoring/review, use:

`docs/authoring/golden-lesson-checklist.md`

For research traceability, use:

`docs/research/source-map-template.md`
