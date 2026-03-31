# Insurance Offer Wizard

A 3-step insurance offer wizard built with React, TypeScript, and Vite. Supports Polish and English with automatic language detection.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## API Server

The risk calculation runs on a separate Express server.

```bash
cd server
npm install
npm run dev
```

The API runs on port 3001. In development, Vite proxies `/api` requests automatically.

### Endpoint

**POST /api/risk**

Request:
```json
{ "age": 30, "coverage": 50000, "type": "Car" }
```

Response:
```json
{ "score": 6.0, "level": "Medium" }
```

If the API is unavailable, the frontend falls back to client-side calculation.

## Docker

Run the full stack with Docker Compose:

```bash
docker-compose up --build
```

The app is available at [http://localhost](http://localhost). The frontend (nginx) proxies API requests to the backend container.

## Tests

```bash
npm run test          # Frontend tests
cd server && npm test # API tests
```

## CI

GitHub Actions runs lint, build, and test on every push/PR to `main`. See `.github/workflows/ci.yml`.

## Architecture

### Decisions

- **React Context** for state management — a 3-step wizard doesn't warrant Redux or Zustand
- **Zod + React Hook Form** for validation — type-safe schemas with performant form state
- **Custom i18n** — lightweight translation layer with auto-detection; sufficient for ~60 keys, easily replaceable with i18next if the app grows
- **Separate Express API** — risk calculation runs server-side via `POST /api/risk`, with client-side fallback if the API is unreachable
- **Tailwind CSS** — utility-first styling for rapid, consistent development
- **Docker Compose** — nginx serves the frontend and proxies `/api` to the Node container

### What's Implemented

- 3-step wizard with state preserved across navigation
- Form validation with inline error messages (Zod schemas)
- Conditional field rendering (Vehicle Year for Car insurance)
- Risk calculation: `(age / 10) + (coverage / 10000) + typeFactor`
- Polish/English with automatic browser language detection
- ERGO-style button animations (outlined → fill sweep on hover)
- Date of Birth modal picker (replaces plain age input)
- Express API server for risk score calculation
- React Error Boundary with console.error logging
- Docker setup (nginx + Express API via docker-compose)
- GitHub Actions CI pipeline (lint, build, test)
- Unit tests for business logic, validation, and i18n

### Error Handling

- React Error Boundary catches render errors and shows a fallback UI
- API failures are logged via `console.error` with client-side fallback for risk calculation
- The mock offer submission API has a 10% simulated failure rate for testing error states

### Folder Structure

```
src/
  components/    — Reusable UI (Button, Input, Select, Checkbox, StepIndicator, ErrorBoundary)
  steps/         — Wizard step forms
  hooks/         — useWizard, useTranslation
  utils/         — Risk calculation (async fetch + fallback), date utilities
  schemas/       — Zod validation schemas
  types/         — TypeScript interfaces
  api/           — Mock API
  context/       — React Context providers
  translations/  — PL/EN translation files

server/          — Express API (POST /api/risk)
```

### Future Improvements

- Data persistence (localStorage / database)
- Authentication
- Extended wizard (more steps, more fields)
- Improved accessibility (ARIA attributes)
- Multi-language support beyond PL/EN
- Replace mock offer submission with real backend
- Add Sentry or structured logging service
