# Docker Practice: Todo App Backend

A simple TODO backend for testing Docker and eliminating the "works on my machine" problem. Includes both **dev** and **prod** configurations for learning purposes.

---

## Prerequisites

- **Docker** installed on your machine

---

## Quick Start

### Development Setup

Runs locally with built-in Postgres. Works out of the box.

```bash
docker compose -f compose.dev.yaml up --build

```

Access at `http://localhost:3000`

### Production Setup

Uses external database (Neon).

1. Create a Neon database
2. Create `.env` file:

```bash
   DATABASE_URL=postgresql://username:password@your-neon-host.neon.tech/dbname?sslmode=require

```

1. Run:

```bash
   docker compose -f compose.prod.yaml up --build

```

Access at `http://localhost:4000`

---

## API Endpoints

**Note:** Dev uses port `3000`, prod uses port `4000`

### Get All Todos

```
GET <http://localhost:3000/api/todos>

```

### Create Todo

```
POST <http://localhost:3000/api/todos/create>

```

**Body:**

```json
{
  "title": "Your title",
  "notes": "Optional notes"
}

```

### Update Todo

```
PUT <http://localhost:3000/api/todos/update/:id>

```

**Body:**

```json
{
  "title": "Updated title",
  "notes": "Updated notes"
}

```

### Delete Todo

```
DELETE <http://localhost:3000/api/todos/delete/:id>

```

**Example with cURL:**

```bash
curl -X DELETE <http://localhost:3000/api/todos/delete/1>

```

---

## Stopping Containers

**Development:**

```bash
docker compose -f compose.dev.yaml down

```

**Production:**

```bash
docker compose -f compose.prod.yaml down

```

**Remove volumes (clean slate):**

```bash
docker compose -f compose.dev.yaml down -v
docker compose -f compose.prod.yaml down -v

```

---

## Project Structure

- `compose.dev.yaml` - Local development with Postgres
- `compose.prod.yaml` - Production setup with external DB
- `.env.example` - Template for environment variables