# Evaluations Backend

Backend service for managing evaluations, questions, users, and employees.

## 🚀 Requirements

- Node.js **v20.11+** (recommended: use [nvm](https://github.com/nvm-sh/nvm) for version management)
- Docker & Docker Compose

## 🐘 Database (MongoDB)

Make sure Docker is installed and running. To spin up the MongoDB container:

```bash
docker compose up -d
```

## ⚙️ Environment Variables

```
PORT=9000
JWT_SECRET=your-secret-key
JWT_DURATION=1h
DB_URL=mongodb://localhost:27017/evaluations
```

## 📦 Install Dependencies

```bash
npm install
```

## 🧪 Run in Development Mode

```bash
npm run start:dev
```

## 📚 API Documentation

Swagger UI is available at:

```bash
http://localhost:9000/api/docs
http://localhost:9000/api/docs.json
```

You can explore all available endpoints, request and response structures, and try out the API directly from the browser.

## Create user with admin privilege

```bash
npm run create:admin -- user@example.com supersecurepassword
```
