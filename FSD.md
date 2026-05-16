# landing-page-vote — Feature Specification Document

## Overview
A React + Vite landing page for **CodeVote**, a developer polling platform. Currently a single-page static site with a hero, one live poll demo, feature cards, and a footer.

## 5 New Features

### F1: Multiple Poll Categories (Tabs)
Add a tab bar above the poll demo to switch between different poll topics:
- **🏆 Best Code Editor** (VS Code, Neovim, JetBrains, Sublime Text) — *existing*
- **⚛️ Favorite Framework** (React, Vue, Svelte, Solid) — *new*
- **🗄️ Preferred Database** (PostgreSQL, SQLite, MongoDB, Redis) — *new*

Each tab stores its own vote state. Voting is per-tab — you can vote once per category. Tabs use a pill-style toggle matching the site's design system. Active tab gets accent color treatment.

### F2: Animated Counter on Scroll (Intersection Observer)
The hero stats bar numbers (`2,847`, `12,430+`, `99.9%`) animate counting up from 0 when they scroll into viewport. Uses `IntersectionObserver` — triggers once per session. Numbers ease-in over 2 seconds with a cubic-bezier curve. Respects `prefers-reduced-motion`.

### F3: Dark / Light Theme Toggle
Add a sun/moon toggle button in the navigation. Toggles CSS custom properties between dark and light palettes. Persists preference in `localStorage`. Transition via `transition: background-color 0.3s, color 0.3s, border-color 0.3s`. Defaults to system preference via `prefers-color-scheme`.

### F4: Share Poll Button with Copy-to-Clipboard
A "Share Poll" button in the voting demo footer. On click, copies the page URL to clipboard and shows a toast notification "✅ Link copied!". Toast auto-dismisses after 2 seconds. Button shows a link icon (🔗) when idle. Styled as a secondary inline button.

### F5: Reading Progress Indicator
A thin horizontal bar (3px, accent color) fixed at the very top of the viewport, above the nav. Width fills from 0% to 100% based on scroll progress through the document. Uses `requestAnimationFrame` for smooth updates. Hidden when at the very top of the page. Gradient colored to match the accent.

## Technical Constraints
- All features are client-side only (no backend, no API calls)
- Pure CSS transitions/animations where possible (no external animation libraries)
- Accessible: keyboard-nav on tabs and buttons, aria attributes where needed
- Responsive: all new components work on mobile
- Type: JSDoc comments for complex logic
