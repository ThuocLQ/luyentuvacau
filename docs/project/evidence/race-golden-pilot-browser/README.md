# Race Golden Pilot browser evidence

Run `npm run test:browser:race` from the repository root to refresh this folder.

The suite opens the real app and records geometry for every Guided step at 360px, 390px, 768px and 1280px. It captures representative screenshots at 390px and 1280px for homepage navigation, the first Race visual, the reloaded Guided-lab Reveal, the multi-instance boundary visual and assessment completion. The geometry report also records that a written prediction and observation restore after reload; this is local study progress, not execution or mastery verification.

`browser-report.json` records the command, viewport geometry and the screenshot paths. This is automated interaction/layout evidence only: it does not prove that a learner understood the lesson or ran the C# console lab.
