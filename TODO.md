# TODO — landing-page-vote Feature Build

## Build Steps

### 1. Reading Progress Indicator (F5)
- [ ] Create a `ScrollProgress` component (`src/components/ScrollProgress.jsx`)
- [ ] Track scroll position via `window.scrollY` / document height
- [ ] Render a thin 3px bar at the very top (z-index above nav)
- [ ] Bar width = `(scrollY / (docHeight - viewportHeight)) * 100`
- [ ] Hide when scrollY === 0 (page top)
- [ ] Add gradient styling matching accent color
- [ ] Import and render in `App.jsx`

### 2. Theme Toggle (F3)
- [ ] Add light CSS variable set in `index.css` for `[data-theme="light"]`
- [ ] Create a `ThemeToggle` component (sun/moon icon button in nav)
- [ ] Implement toggle logic: `useState` + `useEffect` reading `localStorage`
- [ ] Apply `data-theme` attribute on `<html>` element
- [ ] Add smooth CSS transitions on `background-color`, `color`, `border-color`
- [ ] Respect `prefers-color-scheme` for initial default
- [ ] Import and render in `App.jsx`

### 3. Multiple Poll Categories (F1)
- [ ] Refactor `VotingDemo.jsx` to support multiple poll datasets
- [ ] Define poll categories: Code Editors, Frameworks, Databases
- [ ] Create a pill-style tab bar above the poll heading
- [ ] Each tab has its own vote state (votedId, options)
- [ ] Reset only the current tab's state — other tabs keep their votes
- [ ] Poll data structure: `{ id, icon, label, votes }[]` per tab
- [ ] Active tab styling with accent color

### 4. Animated Counter on Scroll (F2)
- [ ] Create a `useCountUp(int)` custom hook
- [ ] Create `AnimatedCounter` component that animates from 0 to target number
- [ ] Use `IntersectionObserver` to trigger animation once
- [ ] 2-second duration with `cubic-bezier(0.22, 1, 0.36, 1)` easing
- [ ] Respect `prefers-reduced-motion` (show final value immediately)
- [ ] Replace static stat numbers in `App.jsx` with `AnimatedCounter`

### 5. Share Poll Button (F4)
- [ ] Add share button to `VotingDemo.jsx` footer
- [ ] `navigator.clipboard.writeText()` to copy page URL
- [ ] Show toast notification "✅ Link copied!" for 2 seconds
- [ ] Toast auto-dismisses; one-at-a-time (no stacking)
- [ ] Style as inline secondary button with link icon

### 6. Build, Push & Deploy
- [ ] Run `npm run build` to verify no errors
- [ ] Stage, commit, and push to `main`
- [ ] Verify GitHub Actions deploy workflow runs
- [ ] Check GitHub Pages URL is reachable
- [ ] Inform user with the live URL
