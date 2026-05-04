# Carlo Car Rental

Carlo is a full-stack car rental app with a React/Vite frontend and an Express/MongoDB backend. Users can sign up, log in, browse cars, and manage their own listings through authenticated API calls.

## Architecture

- `frontend/`: React, React Router, Tailwind CSS, reusable UI components, API client utilities, unit tests, and an E2E smoke test.
- `backend/`: Express API, JWT authentication middleware, Mongoose models, route-level tests, and MongoDB integration through `MONGO_URI`.
- `.github/workflows/ci.yml`: **Phase 1** — unit/integration tests with JUnit reports and artifacts; **Phase 2** — Terraform init/validate/plan/apply (S3 per rubric: unique name, versioning, encryption, public access blocked); **Phase 3** — Docker build, push to ECR, ECS Fargate deploy, and running-service verification. **ECS is the deployment target** (EKS/Kubernetes is not in scope).
- `.github/dependabot.yml`: checks frontend/backend npm dependencies and GitHub Actions weekly.
- `terraform/`: AWS infrastructure code for S3 state, ECR, and ECS Fargate.

## Workflow

1. **Push or pull request** → **Phase 1** runs (lint, tests with reports, frontend build, E2E smoke).
2. **Pull request** → **Phase 2** runs Terraform format check, init, validate, and plan.
3. **Push to `main`** → **Phase 2 & 3**: Terraform plan/apply (infrastructure including S3 + ECR + ECS), then Docker image build/push and ECS Fargate deployment with service verification.

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

**Required for Terraform apply + ECS on `main` (matches course rubric):**

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_SESSION_TOKEN`
- `AWS_REGION`

The workflow **does not require any other GitHub secrets** for a basic deploy:

- It creates an S3 bucket **`carlo-tfstate-<your-account-id>`** automatically (if allowed) and stores Terraform state there so runs do not hit “already exists” on every push.
- It tries to **discover** an existing **`ecsTaskExecutionRole`** (or similar) for ECS. AWS Academy often already has this after you use ECS once in the console; if not, open **ECS** in the console once or create that role per AWS docs.

**Optional overrides (only if you want them):**

- `ECS_EXECUTION_ROLE_ARN` — force a specific execution role instead of auto-discovery.
- `MONGO_URI`, `JWT_SECRET` — passed into the ECS task when set.
- `ECS_TASK_ROLE_ARN` — optional separate task role.

**Security:** Learner-lab keys are temporary. Never paste access keys or session tokens in screenshots, chat, or public repos. If they were exposed, end the lab session and start a new one, then update the four GitHub secrets.

## Testing Strategy

- Frontend unit tests cover reusable filter helpers used by UI pages.
- Backend unit tests cover JWT middleware behavior.
- Backend integration tests exercise Express routes with mocked model methods.
- E2E smoke coverage is included under `frontend/e2e/` for Playwright-compatible runs.

## Design Decisions

- The backend app is exported separately from server startup so tests can exercise routes without opening a production port or connecting to MongoDB.
- API calls are centralized in `frontend/src/utils/api.js` so auth headers and base URLs are handled consistently.
- Deployment is script-driven and idempotent: directories are created with `mkdir -p`, dependencies are installed deterministically, and PM2 restart/start commands can run repeatedly.

## Terraform / CI troubleshooting

**`RepositoryAlreadyExistsException` (ECR) or log group already exists**  
You likely had a failed run **before** remote state was configured. Either delete the leftover `carlo-backend` ECR repository and `/ecs/carlo-backend` log group in the AWS console, then re-run CI, or import them into state (advanced).

**`AccessDenied` on `iam:CreateRole`**  
Ensure an **`ecsTaskExecutionRole`** (or equivalent) exists in the account so the workflow can discover it, or add optional secret `ECS_EXECUTION_ROLE_ARN` with that role’s ARN.

**`AccessDenied` on `s3:CreateBucket` (state bucket)**  
Your lab may block creating `carlo-tfstate-<account-id>`. Ask your instructor or create an allowed bucket manually and we can wire a secret again if needed.

## Challenges

- The original project had placeholder pages and no CI/test/deployment files, so the work focused on making the evaluation checklist verifiable.
- The current folder was not its own Git repository. Initialize or connect this folder to the intended GitHub repository before pushing.
