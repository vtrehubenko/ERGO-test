# Insurance Offer Wizard

A 3-step insurance offer wizard built with React, TypeScript, and Vite. Supports Polish and English with automatic language detection.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Tests

```bash
npm run test
```

## Architecture

### Decisions

- **React Context** for state management — a 3-step wizard doesn't warrant Redux or Zustand
- **Zod + React Hook Form** for validation — type-safe schemas with performant form state
- **Custom i18n** — lightweight translation layer with auto-detection; sufficient for ~60 keys, easily replaceable with i18next if the app grows
- **Mock API** — async functions simulating backend behavior to demonstrate separation of concerns
- **Tailwind CSS** — utility-first styling for rapid, consistent development

### What's Implemented

- 3-step wizard with state preserved across navigation
- Form validation with inline error messages (Zod schemas)
- Conditional field rendering (Vehicle Year for Car insurance)
- Risk calculation: `(age / 10) + (coverage / 10000) + typeFactor`
- Polish/English with automatic browser language detection
- ERGO-style button animations (outlined → fill sweep on hover)
- Mock API with simulated delay and error handling
- Unit tests for business logic, validation, and i18n

### Folder Structure

```
src/
  components/    — Reusable UI (Button, Input, Select, Checkbox, StepIndicator)
  steps/         — Wizard step forms
  hooks/         — useWizard, useTranslation
  utils/         — Risk calculation
  schemas/       — Zod validation schemas
  types/         — TypeScript interfaces
  api/           — Mock API
  context/       — React Context providers
  translations/  — PL/EN translation files
```

### Future Improvements

- Backend API for real risk calculation
- Data persistence (localStorage / database)
- Authentication
- Extended wizard (more steps, more fields)
- Improved accessibility (ARIA attributes)
- Multi-language support beyond PL/EN
