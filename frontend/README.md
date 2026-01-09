# Frontend (Minimal React)

Run locally:

```bash
cd frontend
npm install
npm run dev
```

This folder contains the minimal React frontend for the blog system, built with Vite.

## Prerequisites
- Node.js 18+ and npm

## Install

```bash
cd frontend
npm install
```

## Available scripts

- `npm run dev` — start the Vite dev server (default port 5173)
- `npm run build` — build production assets into `dist`
- `npm run preview` — preview the production build locally

## Environment
The frontend reads `VITE_API_URL` to know where the backend API is hosted. Defaults to `http://localhost:3000` in development.

Example (Windows PowerShell):

```powershell
$env:VITE_API_URL = "http://localhost:3000"
npm run dev
```

Or in Linux / macOS:

```bash
VITE_API_URL=http://localhost:3000 npm run dev
```

## Build & Preview

```bash
npm run build
npm run preview
```

## Notes
- The project ignores `node_modules/` (see `.gitignore`).
- The frontend expects the backend to expose the API endpoints on `VITE_API_URL`.

If you need help wiring the frontend to a different backend URL or adding environment-specific settings, tell me which environment and I will add instructions.

```bash
VITE_API_URL=http://localhost:3000 npm run dev
```
