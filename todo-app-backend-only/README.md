# Docker Practice: Todo App Backend

I want to test this to see if it eliminates the "works on my machine" problem. Feel free to run and test it yourself.

This project is a simple TODO backend that runs in Docker containers. It has both **dev** and **prod** setups, mainly for learning and experimenting - very simple, but useful for practice.

---

### Prerequisite

You must have **Docker** installed on your machine to run this project.

---

# Instructions to Run the Code

1. Open this folder in your integrated terminal.
2. Choose the environment you want to run:
    - **Development**:
        
        Run the following command:
        
        ```bash
        docker compose -f compose.dev.yaml up --build
        
        ```
        
    - **Production** (to simulate production with different environment variables):
        
        Run the following command:
        
        ```bash
        docker compose -f compose.prod.yaml up --build
        
        ```
        

---

### API Routes for Testing (Postman / HTTP Client)

**Note:** Port is `3000` for dev and `4000` for prod.

- **Get all todos:**
    
    `GET <http://localhost:3000/api/todos`>
    
- **Create a todo:**
    
    `POST <http://localhost:3000/api/todos/create`>
    
    **Body:**
    
    ```json
    {
      "title": "Your title",
      "notes": "Optional notes"
    }
    
    ```
    

### Update a Todo

**Endpoint:**

`PUT <http://localhost:3000/api/todos/update/:id`>

**Params:**

- `id` (todo ID)

**Body:**

```json
{
  "title": "Updated title",
  "notes": "Updated notes"
}

```

### Delete a Todo

**Endpoint:**

`DELETE <http://localhost:3000/api/todos/delete/:id`>

**Params:**

- `id` (todo ID)

**Example using cURL:**

```bash
curl -X DELETE <http://localhost:3000/api/todos/delete/1>

```

# Stop containers

```docker
docker compose -f compose.dev.yaml down
```

### or for production

```docker
docker compose -f compose.prod.yaml down
```

### Optional: Remove volumes if you want a clean state:

```docker
docker compose -f compose.dev.yaml down -v
docker compose -f compose.prod.yaml down -v
```