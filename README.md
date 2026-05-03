# Carlo Car Rental

Carlo is a full-stack car rental app with a React/Vite frontend and an Express/MongoDB backend. Users can sign up, log in, browse cars, and manage their own listings through authenticated API calls.

## Architecture

- `frontend/`: React, React Router, Tailwind CSS, reusable UI components, API client utilities, unit tests, and an E2E smoke test.
- `backend/`: Express API, JWT authentication middleware, Mongoose models, route-level tests, and MongoDB integration through `MONGO_URI`.
- `.github/workflows/ci.yml`: **Phase 1** — unit/integration tests with JUnit reports and artifacts; **Phase 2** — Terraform init/validate on pull requests, and on `main` push format/init/validate/plan/apply (S3 per rubric: unique name, versioning, encryption, public access blocked); **Phase 3** — Docker build/push to ECR and ECS Fargate deploy + stability checks. **ECS is the deployment target** (EKS/Kubernetes is not in scope).
- `.github/dependabot.yml`: checks frontend/backend npm dependencies and GitHub Actions weekly.
- `scripts/deploy-ec2.sh`: idempotent EC2 deployment script used by GitHub Actions over SSH.

## Workflow

1. **Push or pull request** → **Phase 1** runs (lint, tests with reports, frontend build, E2E smoke).
2. **Pull request** → **Phase 2** runs Terraform format check, init, and validate (no AWS apply).
3. **Push to `main`** → **Phase 2 & 3**: Terraform plan/apply (infrastructure including S3 + ECR + ECS), then Docker image build/push and ECS Fargate deployment with service verification.
4. Optional: `.github/workflows/deploy-ec2.yml` is **manual only** (`workflow_dispatch`) for EC2-style deploys.

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

GitHub Actions secrets (**Settings → Secrets and variables → Actions**), per project rubric:

**Required for Terraform apply + ECS on `main`:**

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_SESSION_TOKEN`
- `AWS_REGION`

**Optional (app / restricted IAM):**

- `MONGO_URI`, `JWT_SECRET` — passed into the ECS task when set.
- `ECS_EXECUTION_ROLE_ARN` (and optionally `ECS_TASK_ROLE_ARN`) — use when your AWS account (e.g. AWS Academy) blocks creating new IAM roles; supply an existing ECS execution role ARN.

**EC2 workflow only (if you use `deploy-ec2.yml`):**

- SSH: `EC2_HOST`, `EC2_USER`, `EC2_SSH_KEY`, `EC2_APP_DIR`
- SSM: `EC2_INSTANCE_ID`, `EC2_APP_DIR` (plus the four AWS secrets above)

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
