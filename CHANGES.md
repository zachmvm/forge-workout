# Forge Redesign — Changes

This refactor turns my original Gym-Mate scroll-form into a **3-step wizard** with a refined dark palette and an interactive anatomy picker. It keeps your existing workout-generation engine (`utils/functions.js`, `utils/swoldier.js`) **completely unchanged** — only the UI layer is new.

## What changed

### Config
- `tailwind.config.js` — extended theme with `ink`, `panel`, `lime`, `bone`, `dim`, `mute`, `edge` colors and `display`, `body`, `mono` font families.
- `index.html` — updated title, loaded Inter Tight + Inter + JetBrains Mono (dropped Poppins + Font Awesome).
- `src/index.css` — base body styles + custom lime range-slider thumb.

### App shell
- `src/App.jsx` — rewrote as a wizard state machine (`step` 0–4). Keeps original state hooks (`poison`, `muscles`, `goal`, `workout`).

### New components
- `Topbar.jsx` — logo + step progress + cancel.
- `BottomBar.jsx` — sticky back / continue footer.
- `Button.jsx` — `primary` / `ghost` / `quiet` variants with arrow icons.
- `StepHeader.jsx` — eyebrow + title + subtitle block.
- `OptionCard.jsx` — radio card with title, meta, description, optional badge.
- `Chip.jsx` — selected-muscle pill with remove button.
- `Anatomy.jsx` — front + back stylized body with clickable muscle regions (chest, shoulders, biceps, triceps, back, abs, quads, hamstrings, glutes, calves — matches your data exactly).
- `Intro.jsx` — landing screen with hero copy and step preview cards.
- `StepSplit.jsx` — pick `individual` / `upper_lower` / `bro_split` / `bodybuilder_split`.
- `StepMuscles.jsx` — branches by split: anatomy picker for `individual` (up to 3), day cards (push/pull/legs etc.) for the others.
- `StepGoal.jsx` — pick scheme + live preview of rep range / rest / compound:accessory mix.
- `Result.jsx` — generated session header, stats grid, exercise list.
- `ExerciseCard.jsx` — collapsible card with reps/rest/tempo stats and a tap-to-increment sets-done tracker.

### Deleted (replaced)
- `Hero.jsx` → `Intro.jsx`
- `Generator.jsx` → split across `StepSplit.jsx` + `StepMuscles.jsx` + `StepGoal.jsx`
- `SectionWrapper.jsx` → no longer needed
- `Workout.jsx` → `Result.jsx`

### Unchanged (your generator engine)
- `src/utils/functions.js`
- `src/utils/swoldier.js`
- `src/main.jsx`
- `vite.config.js`, `postcss.config.js`, `.eslintrc.cjs`, `package.json`

## Run it

```bash
npm install
npm run dev
```

No new dependencies — uses your existing React + Tailwind + Vite stack.

## Design notes

- **Palette:** ink `#0C100E` background, lime `#D4FF3A` single accent, bone `#E8E2D4` text.
- **Type:** Inter Tight for display (large headings), Inter for body, JetBrains Mono for labels and step indicators.
- **Tone:** confident but not aggressive — dropped the "WAR / poison / annihilation" copy in favor of "Build a program," "How do you train?," "What's the goal?"
- **Anatomy picker** caps at 3 muscle groups for `individual` (matches the original limit in `Generator.jsx`).
