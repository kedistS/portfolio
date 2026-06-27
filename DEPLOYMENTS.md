# Portfolio Deployments

This repo can power two separate portfolio deployments with the same design and code.

## Backend Portfolio

Use these deployment settings:

- Build command: `pnpm build:backend`
- Output directory: `dist`
- Root page: `/`

This renders the backend-focused portfolio at the deployment root.

## AI / Knowledge Graph Portfolio

Use these deployment settings:

- Build command: `pnpm build:ai`
- Output directory: `dist`
- Root page: `/`

This renders the AI/KG-focused portfolio at the deployment root.

## Shared Pages

Both deployments also build:

- `/backend.html`
- `/ai.html`

So each deployed site can still link to the other focused version if needed.
