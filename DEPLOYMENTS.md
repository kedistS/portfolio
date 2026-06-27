# Portfolio Deployments

This repo powers two separate portfolio deployments with the same design and reusable code.
Each deployment serves only one focused portfolio at `/`.

## Backend Portfolio

Use these deployment settings:

- Build command: `pnpm build:backend`
- Output directory: `dist`
- Root page: `/`

This renders the backend-focused portfolio at the deployment root.
It does not expose the AI/KG portfolio page or AI/KG CV in `dist`.

## AI / Knowledge Graph Portfolio

Use these deployment settings:

- Build command: `pnpm build:ai`
- Output directory: `dist`
- Root page: `/`

This renders the AI/KG-focused portfolio at the deployment root.
It does not expose the backend portfolio page or backend CV in `dist`.

## Important

Do not add public links between the two deployments. Recruiters should only see
the portfolio version that matches the role they were sent.
