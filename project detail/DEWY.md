# 💧 Dewy — Glassmorphic Water Intake Logger

A mobile-first React app for tracking daily hydration, built from the design screens in `Design Inspo/`. Periwinkle/indigo palette, soft lavender→blue gradients, and a frosted-glass (glassmorphism) UI throughout.

## Stack
- **React 18** + **Vite 5**
- **react-router-dom** for screen navigation
- **lucide-react** for crisp SVG icons
- Plain CSS with design tokens (no UI framework) — glass surfaces via `backdrop-filter`
- State persisted to `localStorage`

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
```

## Screens
| Screen | Route | Highlights |
| --- | --- | --- |
| Login | `/login` | Email/password, show-hide toggle, Google/Apple |
| Sign Up | `/signup` | Name/email/password, terms |
| Home | `/app/home` | Animated **bottle fill**, quick-add tiles, recent intake, FAB |
| Insights | `/app/insights` | **Progress ring**, weekly bar chart, recent activity |
| Reminders | `/app/reminders` | Smart toggle, frequency, quiet hours, alerts list |
| Settings | `/app/settings` | Goal slider, metric/imperial, reminders, streak |

Any login (or social button) signs you in — auth is mocked for the demo. Logged drinks, goal,
units, and reminder settings all persist across reloads.

## Structure
```
src/
  context/AppContext.jsx   # intake state, goal, units, streak, derived hooks
  components/              # GlassCard, BottomNav, Switch, Segmented, BottleFill, ProgressRing, DrinkIcon
  screens/                 # Login, Signup, Home, Insights, Reminders, Settings
  index.css                # design tokens + glassmorphism system
```
