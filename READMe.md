# Evaluations Backend

Backend service for managing evaluations, questions, users, and employees.

## 🚀 Quick Start

1.  **Prerequisites:**

    - Node.js **v20.11+** (recommended: use [nvm](https://github.com/nvm-sh/nvm))
    - Docker & Docker Compose

2.  **Database:**

    ```bash
    docker compose up -d
    ```

3.  **Environment Variables:**
    Create a `.env` file with the following (adjust as needed):

    ```
    PORT=9000
    JWT_SECRET=your-secret-key
    JWT_DURATION=1h
    DB_URL=mongodb://localhost:27017/evaluations
    ```

4.  **Install Dependencies:**

    ```bash
    npm install
    ```

5.  **Run in Development Mode:**

    ```bash
    npm run start:dev
    ```

6.  **API Documentation:**
    - Swagger UI: [http://localhost:9000/api/docs](http://localhost:9000/api/docs)
    - OpenAPI JSON: [http://localhost:9000/api/docs.json](http://localhost:9000/api/docs.json)

## ⚙️ Other Commands

- **Run Tests:**
  ```bash
  npm run test
  ```
- **Create Admin User:**
  ```bash
  npm run create:admin -- user@example.com supersecurepassword
  ```

## 📁 Project Structure

```
├── src/
│   ├── config/             # Environment config, DB connections, Swagger setup
│   ├── controllers/        # Route handlers extending BaseController
│   ├── dtos/               # Output DTOs validated with Zod (also used for docs)
│   ├── middlewares/        # Global middlewares (error handler, security, context, etc.)
│   ├── models/             # Mongoose models and schemas
│   ├── routes/             # Routes declaration and registration
│   ├── services/           # Business logic and DB access (repositories)
│   ├── types/              # Zod schemas for request validation (input)
│   ├── utils/              # Shared utilities (e.g., error classes, request context)
│   └── inject.ts           # DI setup for app instance and dependencies
│
├── tests/                  # Controller unit tests using Jest, outside src
│   └── controllers/
│
├── .env                    # Environment variables
├── jest.config.js          # Jest config with path aliases and test match
├── tsconfig.json           # Base TypeScript config
├── tsconfig.spec.json      # TS config for tests
└── README.md
```

## 📐 Design Decisions

**BaseController Pattern:**

- All controllers extend `BaseController` to avoid duplicated logic for common operations (list, get, update, create).
- This promotes DRY (Don't Repeat Yourself) and standardizes controller behavior.

**Zod for validation & OpenAPI:**

- All inputs are validated using Zod schemas.
- The same schemas are extended with `.openapi()` metadata to generate documentation.
- Output DTOs (`dtos/`) also use Zod, ensuring consistency and type safety across responses.

**Typed Request Context:**

- `cls-hooked` or `express-cls-hooked` is used to inject contextual information (e.g., current user) globally.

**Custom Error Handling:**

- Unified error handling middleware returns standardized JSON responses.
- Custom errors (e.g., `HttpBadRequest`, `HttpNotFound`) extend a base `HttpError` class with status codes.

**Security Enhancements:**

- Include `rate-limiter` for API protection.
- JWT-based authentication with optional request guards for protected routes.

**Tests Outside `src/`:**

- Tests are located in `/tests/controllers`, keeping them separate from the production codebase.
- Uses `ts-jest`, path alias resolution, and mocks to isolate controller logic.

**Swagger-UI + JSON Mode:**

- OpenAPI docs are available at `/api/docs` with persistent login.
- `/api/docs.json` exposes the raw spec for importing into tools like Postman.
