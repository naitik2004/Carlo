# Carlo Car Rental

Carlo is a full-stack car rental app with a React/Vite frontend and an Express/MongoDB backend. Users can sign up, log in, browse cars, and manage their own listings through authenticated API calls.

## Architecture

- `frontend/`: React, React Router, Tailwind CSS, reusable UI components, API client utilities, unit tests, and an E2E smoke test.
- `backend/`: Express API, JWT authentication middleware, Mongoose models, route-level tests, and MongoDB integration through `MONGO_URI`.
- `.github/workflows/ci.yml`: installs dependencies, runs lint, runs tests, and builds the frontend on `push` and `pull_request`.
- `.github/dependabot.yml`: checks frontend/backend npm dependencies and GitHub Actions weekly.
- `scripts/deploy-ec2.sh`: idempotent EC2 deployment script used by GitHub Actions over SSH.

## Workflow

1. Developers open a branch and make logical commits.
2. Pull requests trigger lint, unit tests, integration tests, and the frontend build.
3. Pushes to `main` also run the same checks.
4. The EC2 deployment workflow can SSH into an EC2 host and run `scripts/deploy-ec2.sh`.

## Local Development

```bash
npm run install:all
npm run lint
npm test
npm run build
```

Backend:

```bash
cp backend/.env.example backend/.env
npm run dev --prefix backend
```

Frontend:

```bash
cp frontend/.env.example frontend/.env
npm run dev --prefix frontend
```

## Environment Variables

Backend:

- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET`: JWT signing secret.
- `PORT`: backend port, defaults to `4000`.

Frontend:

- `VITE_API_URL`: backend base URL, for example `http://localhost:4000`.

## Testing Strategy

- Frontend unit tests cover reusable filter helpers used by UI pages.
- Backend unit tests cover JWT middleware behavior.
- Backend integration tests exercise Express routes with mocked model methods.
- E2E smoke coverage is included under `frontend/e2e/` for Playwright-compatible runs.

## Design Decisions

- The backend app is exported separately from server startup so tests can exercise routes without opening a production port or connecting to MongoDB.
- API calls are centralized in `frontend/src/utils/api.js` so auth headers and base URLs are handled consistently.
- Deployment is script-driven and idempotent: directories are created with `mkdir -p`, dependencies are installed deterministically, and PM2 restart/start commands can run repeatedly.

## Challenges

- The original project had placeholder pages and no CI/test/deployment files, so the work focused on making the evaluation checklist verifiable.
- The current folder was not its own Git repository. Initialize or connect this folder to the intended GitHub repository before pushing.
