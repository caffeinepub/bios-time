# Specification

## Summary
**Goal:** Add a dedicated BIOS-TIME “Voile de Chair” ritual web simulation featuring a three-screen flow (Souffle → Bloom → Boussole) with a time-of-day reactive “Deep Liquid Aura” look, plus English/French localization with auto-detect and manual switching.

**Planned changes:**
- Add a clear navigation entry from the existing app shell to start/exit the new BIOS-TIME ritual flow without deep links.
- Implement ritual-only “Deep Liquid Aura” styling: continuously animated living gradient that shifts by local time-of-day, plus subtle glassmorphism panels and airy thin typography; keep the rest of the app’s parchment theme unchanged.
- Build Screen 1 (Souffle / Celestial Oculus): centered pulsing Oculus (~7.83 Hz), orbiting Sun/Moon indicators, minimal status line, and long-press to transition to Screen 2.
- Build Screen 2 (Bloom / Data Blossom): metamorphosis animation into a frosted receptacle; three orbiting petal panels (Sky/Lunar, Body/Biometrics, Earth/Environment) with drag-toward-petal interaction and release-to-absorb close behavior.
- Add Screen 2 feedback: hang-drum-like harmonic pad audio during bloom open, optional Vibration API “haptics” with fallback, and an obvious on-screen mute/stop control.
- Build Screen 3 (Boussole Sonore / Alignment Ritual): trigger via landscape orientation with a manual fallback control; render a more transparent mode with luminous ring + particle ray, alignment “sweet spot” lock/unlock, and simulated direction input when device orientation is unavailable.
- Add Screen 3 “3D audio” simulation via Web Audio stereo panning that centers/strengthens near alignment and stabilizes when locked; show a non-blocking, translated message if audio requires user interaction.
- Implement French localization for all new ritual UI text with: first-visit auto-detect (French when browser language indicates fr* else English) and Settings-based manual language switching persisted in localStorage.
- Add graceful error handling so missing/blocked audio, orientation, or vibration APIs never crash the app and instead show translated, non-blocking notices with alternative interaction paths.
- Add and use required static ritual visual assets from `frontend/public/assets/generated` (no backend routing).

**User-visible outcome:** Users can launch a new BIOS-TIME ritual experience from the app, move through Souffle → Bloom → Boussole with interactive visuals/audio (with mute and fallbacks), and switch between English and French (auto-detected by default unless a preference is saved).
